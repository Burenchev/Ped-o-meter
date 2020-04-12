import * as React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { observer } from "mobx-react-lite";
import { Typography } from "@material-ui/core";
import {minBy, maxBy, sumBy} from "lodash"
import PedometerStore from "../../store/PedometerStore";
import CustomizedLabel from "./helpers/CustomizedLabel"
import CustomizedXAxisTick from "./helpers/CustomizedXAxisTick"
import CustomizedYAxisTick from "./helpers/CustomizedYAxisTick"
import "./constants/styles.css";

type Props = {
  store: PedometerStore;
};

const WalkingChart: React.FC<Props> = observer((props: Props) => {
  const data = props.store.data;

const getMinimum = () => {
  const dataToParse = data.length > 7 ? data.slice(-7) : data.slice();
  const min = minBy(dataToParse, "distance")
  if (min) {
    return min.distance
  }
  return 0
}

const getMaximum = () => {
  const dataToParse = data.length > 7 ? data.slice(-7) : data.slice();
  const max = maxBy(dataToParse, "distance")
  if (max) {
    return max.distance
  }
  return 0
}

const getSum = () => {
  const dataToParse = data.length > 7 ? data.slice(-7) : data.slice();
  const sum = sumBy(dataToParse, "distance")
  if (sum) {
    return sum
  }
  return 0
}

  return (
    <div className="WalkingChart-root">
      <Typography className="WalkingChart-header">
        Суммарная активность
      </Typography>
      <div className="WalkingChart-chartContainer">
        <LineChart width={800} height={320} data={data}>
          <Line type="linear" dataKey="distance" stroke="#EC174F" label={<CustomizedLabel/>} dot={{ stroke: '#EC174F', strokeWidth: 4 }}/>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" tick={<CustomizedXAxisTick/>} padding={{left: 30, right: 30}}/>
          <YAxis tick={<CustomizedYAxisTick/>} padding={{top: 30, bottom: 30}}/>
          <Tooltip />
        </LineChart>
      </div>
      <div className="WalkingChart-footer">
  <Typography className="WalkingChart-footerTypo">{`Минимум: ${getMinimum()}м`}</Typography>
        <Typography className="WalkingChart-footerTypo">{`Максимум: ${getMaximum()}м`}</Typography>
        <div>
          <Typography className="WalkingChart-footerTypo">Суммарно за 7 дней:</Typography>
          <Typography className="WalkingChart-footerTypo">{`${getSum()}м`}</Typography>
        </div>
      </div>
    </div>
  );
});

export default WalkingChart;
