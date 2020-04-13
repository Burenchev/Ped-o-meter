import * as React from "react";
import DatePicker from "react-datepicker";
import PedometerStore from "../../store/PedometerStore";

import "react-datepicker/dist/react-datepicker.css";
import "./constants/styles.css";
import { Button, TextField, Typography } from "@material-ui/core";

type Props = {
  store: PedometerStore;
  onClose: () => void;
  id?: number;
};

const InputForm: React.FC<Props> = (props: Props) => {
  const [date, setDate] = React.useState<Date>(new Date());
  const [distance, setDistance] = React.useState<number>(0);

  const handleApply = () => {
    props.store.addItem(date, distance);
    props.onClose();
  };

  return (
    <div className="InputForm-root">
      <div className="InputForm-inputRoot">
        <Typography>Дата: </Typography>
        <DatePicker
          selected={date}
          onChange={(newDate: Date) => setDate(newDate)}
        />
      </div>
      <div className="InputForm-inputRoot">
        <Typography>Дистанция:</Typography>
        <TextField
          type="number"
          onChange={(event: any) => setDistance(event.target.value)}
        />
      </div>
      <div className="InputForm-buttonBase">
        <Button color="primary" variant="contained" onClick={handleApply}>Применить</Button>
        <Button color="secondary" variant="contained" onClick={props.onClose}>Отменить</Button>
      </div>
    </div>
  );
};

export default InputForm;
