import { minBy, maxBy, sumBy } from "lodash";

import {ChartItem} from "../constants/types"

export const getMinimum = (data: ChartItem[] ) => {
    const min: any = minBy(data, "distance");
    if (min) {
      return min.distance;
    }
    return 0;
  };

 export const getMaximum = (data: ChartItem[] ) => {
    const max: any = maxBy(data, "distance");
    if (max) {
      return max.distance;
    }
    return 0;
  };

export const getSum = (data: ChartItem[]) => {
    const sum = sumBy(data, "distance");
    if (sum) {
      return sum;
    }
    return 0;
  };