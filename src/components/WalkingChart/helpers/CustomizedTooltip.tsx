import * as React from "react";
import DateRenderer from "../../DateRenderer/DateRenderer";
import { Typography } from "@material-ui/core";
import "../constants/styles.css"

class CustomizedTooltip extends React.Component<any> {
  render() {
    const { active, payload } = this.props;
    if (active && payload) {
      const data = payload[0].payload;
      return (
        <div className="CustomizedTooltip-root">
          <DateRenderer date={data.date} />
          <Typography className="CustomizedTooltip-distance">{`Дистанция: ${data.distance}`}</Typography>
        </div>
      );
    }
    return null;
  }
}

export default CustomizedTooltip;
