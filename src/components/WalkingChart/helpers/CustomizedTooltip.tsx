import * as React from "react";
import { Typography } from "@material-ui/core";

import DateRenderer from "../../DateRenderer/DateRenderer";
import "../styles.css";

class CustomizedTooltip extends React.Component<any> { // any оставлен намеренно, не удалось найти типы пропсов для кастомных элементов recharts
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
