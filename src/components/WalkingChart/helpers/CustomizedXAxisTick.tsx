import * as React from "react";

class CustomizedXAxisTick extends React.Component<any> { // any оставлен намеренно, не удалось найти типы пропсов для кастомных элементов recharts
  render() {
    const { x, payload } = this.props;

    const parsedDate = new Date(payload.value);
    const dateString = parsedDate.toLocaleDateString("ru");
    return (
      <text
        x={x}
        y={300}
        dy={12}
        fill={"#FF000"}
        fontSize={8}
        textAnchor="middle"
      >
        {dateString}
      </text>
    );
  }
}

export default CustomizedXAxisTick;
