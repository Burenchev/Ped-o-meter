import * as React from "react";
import { observer } from "mobx-react-lite";
import PedometerStore from "../../store/PedometerStore";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Button,
  Modal,
} from "@material-ui/core";
import {ArrowUpward} from "@material-ui/icons"
import InputForm from "../InputForm/InputForm"
import { tableCols } from "./constants/constants";
import { sortBy } from "lodash";
import "./constants/styles.css";

type Props = {
  store: PedometerStore;
};

type State = {
  sortId: string;
};

const WalkingTable: React.FC<Props> = observer((props: Props) => {
  const [sortId, setSortId] = React.useState<string>("date")
  const [modalOpen, setModalOpen] = React.useState<boolean>(false)

  const getSortedRows = () => {
    const rows: any[] = props.store.data.slice();
    const sortedRows = sortBy(rows, sortId);
    return sortedRows;
  };

  const handleClick = (id: string) => () => {
    setSortId(id);
  };

  const renderCell = (content: number | string, id: string) => {
    if (id === "date") {
      const parsedDate = new Date(content);
      return parsedDate.toLocaleDateString("ru");
    } else {
      return content;
    }
  };
    const rows = getSortedRows();
    const key = `${sortId}`;
    return (
      <div className="WalkingTable-root">
        <TableContainer
          className={"WalkingTable-tableContainer"}
          key={key}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                {tableCols.map((col) => (
                  <TableCell key={col.id}>
                    <div className={"WalkingTable-headerCell"}>
                      <Typography className={"WalkingTable-headerCellTypo"}>{col.name}</Typography>
                      <IconButton
                        className={sortId === col.id? "WalkingTable-buttonDisabled" : "WalkingTable-button"}
                        disabled={sortId === col.id}
                        onClick={handleClick(col.id)}
                        size={"small"}
                      >
                        <ArrowUpward className={"WalkingTable-icon"} fontSize={"small"}/>
                      </IconButton>
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row["id"]}>
                  {tableCols.map((col) => (
                    <TableCell key={row[col.id]}>
                      {renderCell(row[col.id], col.id)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button className="WalkingTable-addButton" onClick={() => setModalOpen(true)}>Добавить запись</Button>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <InputForm store={props.store}/>
        </Modal>
      </div>
    );
})

export default WalkingTable;
