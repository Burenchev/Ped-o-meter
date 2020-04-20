import * as React from "react";

import { LabelProps } from "../constants/types";

class CustomizedLabel extends React.Component<LabelProps> {
  render() {
    const { x, y, value } = this.props;
    return (
      <text
        x={x}
        y={y}
        dy={-10}
        fill={"#EC174F"}
        fontSize={14}
        textAnchor="middle"
      >
        {value}
      </text>
    );
  }
}

export default CustomizedLabel;
