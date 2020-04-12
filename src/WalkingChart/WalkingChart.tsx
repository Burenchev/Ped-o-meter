import * as React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { observer } from "mobx-react-lite";
import { Typography } from "@material-ui/core";
import PedometerStore from "../store/PedometerStore";
import "./constants/styles.css"

type Props = {
  store: PedometerStore;
};

const WalkingChart: React.FC<Props> = observer((props: Props) => {
  const data = props.store.data;

  const tickFormatter = (content: Date) => {
    const parsedDate = new Date(content);
    const dateString = parsedDate.toLocaleDateString("ru");
    return dateString;
  };

  return (
    <div className="WalkingChart-root">
      <Typography className="WalkingChart-header">Суммарная активность</Typography>
      <LineChart width={600} height={400} data={data}>
        <Line type="linear" dataKey="distance" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" tickFormatter={tickFormatter} />
        <YAxis />
        <Tooltip/>
      </LineChart>
    </div>
  );
});

export default WalkingChart;
