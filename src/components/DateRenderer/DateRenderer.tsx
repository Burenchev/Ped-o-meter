import * as React from "react";
import { Typography } from "@material-ui/core";
import "./constants/styles.css"

type Props = {
  date: string;
};
const DateRenderer: React.FC<Props> = (props: Props) => {
  const parsedDate = new Date(props.date);
  const dateString = parsedDate.toLocaleDateString("ru");
  const weekDay = new Intl.DateTimeFormat("ru", {
    weekday: "long",
  }).format(parsedDate);
  return (
    <>
      <Typography className="DateRenderer-weekday">{weekDay}</Typography>
      <Typography className="DateRenderer-date">{dateString}</Typography>
    </>
  );
};

export default DateRenderer;
