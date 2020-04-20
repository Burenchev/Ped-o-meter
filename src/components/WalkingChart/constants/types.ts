import PedometerStore from "../../../store/PedometerStore";

export type Props = {
    store: PedometerStore;
  };

  export type ChartItem = {
    id: number;
    distance: number;
    date: string
}