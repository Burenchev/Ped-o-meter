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

import CustomizedLabel from "./helpers/CustomizedLabel";
import CustomizedXAxisTick from "./helpers/CustomizedXAxisTick";
import CustomizedYAxisTick from "./helpers/CustomizedYAxisTick";
import CustomizedTooltip from "./helpers/CustomizedTooltip";
import { getSum, getMinimum, getMaximum } from "./utils/utils";
import { DBItem } from "../../store/types";

import { Props, ChartItem } from "./constants/types";
import "./styles.css";

const WalkingChart: React.FC<Props> = observer((props: Props) => {
  const data: DBItem[] = props.store.chartData;
  const slicedData = data.length > 7 ? data.slice(-7) : data.slice();

  const preparedData: ChartItem[] = slicedData.map((item: any) => {
    item.date = `${item.date}`;
    return item;
  });

  return (
    <div className="WalkingChart-root">
      <Typography className="WalkingChart-header">
        Суммарная активность
      </Typography>
      <div className="WalkingChart-chartContainer">
        <LineChart width={800} height={320} data={preparedData}>
          <Line
            type="linear"
            dataKey="distance"
            stroke="#EC174F"
            label={<CustomizedLabel />}
            dot={{ stroke: "#EC174F", strokeWidth: 4 }}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            interval={0}
            dataKey="date"
            tick={<CustomizedXAxisTick />}
            padding={{ left: 30, right: 30 }}
          />
          <YAxis
            tick={<CustomizedYAxisTick />}
            padding={{ top: 30, bottom: 30 }}
          />
          <Tooltip content={<CustomizedTooltip />} />
        </LineChart>
      </div>
      <div className="WalkingChart-footer">
        <Typography className="WalkingChart-footerTypo">{`Минимум: ${getMinimum(
          preparedData
        )}м`}</Typography>
        <Typography className="WalkingChart-footerTypo">{`Максимум: ${getMaximum(
          preparedData
        )}м`}</Typography>
        <div>
          <Typography className="WalkingChart-footerTypo">
            Суммарно за 7 дней:
          </Typography>
          <Typography className="WalkingChart-footerTypo">{`${getSum(
            preparedData
          )}м`}</Typography>
        </div>
      </div>
    </div>
  );
});

export default WalkingChart;
