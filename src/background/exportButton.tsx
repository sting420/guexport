import React from "react";
import { exportEvent } from "./export";

export class ExportButton extends React.Component<any, any> {
  getHandle() {
    return () => {
      exportEvent(this.props.link);
    };
  }
  render() {
    return (
      <img
        alt="Export to GC"
        src={this.props.img}
        className="exportButton"
        onClick={this.getHandle()}
      ></img>
    );
  }
}
