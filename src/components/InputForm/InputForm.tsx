import * as React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, TextField, Typography } from "@material-ui/core";

import { Props } from "./constants/types";
import ".styles.css";

const InputForm: React.FC<Props> = (props: Props) => {
  const initialDate = props.itemToEdit ? props.itemToEdit.date : new Date();
  const initialDistance = props.itemToEdit ? props.itemToEdit.distance : 0;

  const [date, setDate] = React.useState<Date>(initialDate);
  const [distance, setDistance] = React.useState<number>(initialDistance);

  const handleApply = () => {
    if (props.itemToEdit) {
      props.store.editItem({ id: props.itemToEdit.id, date, distance });
    } else {
      props.store.addItem(date, distance);
    }
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
          value={distance}
        />
      </div>
      <div className="InputForm-buttonBase">
        <Button color="primary" variant="contained" onClick={handleApply}>
          Применить
        </Button>
        <Button color="secondary" variant="contained" onClick={props.onClose}>
          Отменить
        </Button>
      </div>
    </div>
  );
};

export default InputForm;
