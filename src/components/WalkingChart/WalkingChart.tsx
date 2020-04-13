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
import {minBy, maxBy, sumBy, sortBy} from "lodash"
import PedometerStore from "../../store/PedometerStore";
import CustomizedLabel from "./helpers/CustomizedLabel"
import CustomizedXAxisTick from "./helpers/CustomizedXAxisTick"
import CustomizedYAxisTick from "./helpers/CustomizedYAxisTick"
import CustomizedTooltip from "./helpers/CustomizedTooltip"
import "./constants/styles.css";

type Props = {
  store: PedometerStore;
};

const WalkingChart: React.FC<Props> = observer((props: Props) => {
  const data = props.store.data;
  const sortedData = sortBy(data, "date")
  const preparedData = sortedData.length > 7 ? sortedData.slice(-7) : sortedData

const getMinimum = () => {
  const min = minBy(preparedData, "distance")
  if (min) {
    return min.distance
  }
  return 0
}

const getMaximum = () => {
  const max = maxBy(preparedData, "distance")
  if (max) {
    return max.distance
  }
  return 0
}

const getSum = () => {
  const sum = sumBy(preparedData, "distance")
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
        <LineChart width={800} height={320} data={preparedData}>
          <Line type="linear" dataKey="distance" stroke="#EC174F" label={<CustomizedLabel/>} dot={{ stroke: '#EC174F', strokeWidth: 4 }}/>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis interval={0} dataKey="date" tick={<CustomizedXAxisTick/>} padding={{left: 30, right: 30}}/>
          <YAxis tick={<CustomizedYAxisTick/>} padding={{top: 30, bottom: 30}}/>
          <Tooltip content={<CustomizedTooltip/>} />
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
