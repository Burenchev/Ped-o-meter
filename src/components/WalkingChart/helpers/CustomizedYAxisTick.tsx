import * as React from "react";

class CustomizedYAxisTick extends React.Component<any> { // any оставлен намеренно, не удалось найти типы пропсов для кастомных элементов recharts
  render() {
    const { y, payload } = this.props;
    return (
      <text
        x={40}
        y={y}
        dy={3}
        fill={"#FF000"}
        fontSize={10}
        textAnchor="middle"
      >
        {payload.value}
      </text>
    );
  }
}

export default CustomizedYAxisTick;
