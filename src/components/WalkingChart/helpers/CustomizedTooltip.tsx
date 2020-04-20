import * as React from "react";
import { Typography } from "@material-ui/core";

import DateRenderer from "../../DateRenderer/DateRenderer";
import { TooltipProps } from "../constants/types";
import "../constants/styles.css";

class CustomizedTooltip extends React.Component<TooltipProps> {
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
