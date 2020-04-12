import * as React from "react";
import DatePicker from "react-datepicker";
import PedometerStore from "../../store/PedometerStore"

import "react-datepicker/dist/react-datepicker.css";
import "./constants/styles.css";
import { Button, TextField } from "@material-ui/core";

type Props = {
    store: PedometerStore;
  id?: number;
};

const InputForm: React.FC<Props> = (props: Props) => {
  const [date, setDate] = React.useState<Date>(new Date());
  const [distance, setDistance] = React.useState<number>(0)

  const handleApply = () => {
      props.store.addItem(date, distance)
  }

  return (
    <div className="InputForm-root">
      <DatePicker
        selected={date}
        onChange={(newDate: Date) => setDate(newDate)}
      />
      <TextField type="number" onChange={(event: any) => setDistance(event.target.value)}/>
      <Button onClick={handleApply}>Применить</Button>
      <Button>Отменить</Button>
    </div>
  );
};

export default InputForm;
