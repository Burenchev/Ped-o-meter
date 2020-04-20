import PedometerStore from "../../../store/PedometerStore";

export type Props = {
    store: PedometerStore;
  };

  export type ChartItem = {
    id: number;
    distance: number;
    date: string
}

export type LabelProps = {
  x: number;
  y: number;
  value: string
}

export type TooltipProps = {
  active: boolean;
  payload: any[]
}

export type XAxisTickProps = {
  x: number;
  payload: any
}

export type YAxisTickProps = {
  y: number;
  payload: any
}