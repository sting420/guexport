import { Event } from "./types";

function stringify(obj: Record<string, string>) {
  return Object.keys(obj)
    .map(function (k) {
      return encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]);
    })
    .join("&");
}

function generateGCLink(event: Event) {
  const details = {
    action: "TEMPLATE",
    text: event.title,
    details: event.desc,
    location: event.location,
    ctz: event.timezone,
    dates: `${event.start}/${event.end}`,
    recur: `RRULE:${event.rrule}`,
  };

  return `https://calendar.google.com/calendar/render?${stringify(details)}`;
}

function parseEvent(eventString: string): Event {
  let obj = {} as Record<string, string>;
  const lines = eventString.split("\n");
  for (const line of lines) {
    const data = line.split(":");
    obj[data[0]] = data[1];
  }
  const tz = obj["TZID"];
  const startKey: string = `DTSTART;TZID=${tz}`.trim();
  const endKey: string = `DTEND;TZID=${tz}`.trim();

  const e = {
    title: obj["SUMMARY"],
    desc: `${obj["SUMMARY"]}\n(${obj["CATEGORIES"]})`,
    location: obj["LOCATION"],
    rrule: obj["RRULE"],
    timezone: tz,
    start: obj[startKey],
    end: obj[endKey],
  } as Event;
  return e;
}

export function exportEvent(dataLink: string) {
  fetch(dataLink, {
    method: "GET",
  }).then((resp) => {
    resp.text().then((body) => {
      // console.log(body);
      const event = parseEvent(body);
      const gcLink = generateGCLink(event);
      window.open(gcLink, "_blank")?.focus();
    });
  });
}
