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
  Menu,
  MenuItem,
} from "@material-ui/core";
import { ArrowUpward } from "@material-ui/icons";
import { sortBy } from "lodash";
import { Scrollbars } from "react-custom-scrollbars";

import DateRenderer from "../DateRenderer/DateRenderer";
import InputForm from "../InputForm/InputForm";
import { tableCols } from "./constants/constants";
import { getSortedRows, getCellValue } from "./utils/utils";
import { DBItem } from "../../store/types";
import { Props } from "./constants/types";
import "./styles.css";

const WalkingTable: React.FC<Props> = observer((props: Props) => {
  const [sortId, setSortId] = React.useState<string>("date");
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<any>(null);
  const [itemToEdit, setItemToEdit] = React.useState<DBItem | null>(null);

  const data = props.store.tableData;

  const handleClick = (id: string) => () => {
    setSortId(id);
  };

  const renderCell = (content: number | Date, id: string) => {
    if (id === "date") {
      return <DateRenderer date={`${content}`} />;
    } else {
      return getCellValue(content as number);
    }
  };

  const contextMenu = (index: number) => (e: any) => {
    setItemToEdit(rows[index]);
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };

  const closeModal = () => {
    setItemToEdit(null);
    setModalOpen(false);
  };

  const editItem = () => {
    setModalOpen(true);
    setAnchorEl(null);
  };

  const deleteItem = () => {
    props.store.deleteItem(itemToEdit!.id);
    setAnchorEl(null);
  };

  const rows = getSortedRows(data, sortId);
  const key = `${sortId}`;

  return (
    <div className="WalkingTable-root">
      <TableContainer className={"WalkingTable-tableContainer"} key={key}>
        <Scrollbars autoHeight autoHeightMin={435} hideTracksWhenNotNeeded>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                {tableCols.map((col) => (
                  <TableCell key={col.id}>
                    <div className={"WalkingTable-headerCell"}>
                      <Typography className={"WalkingTable-headerCellTypo"}>
                        {col.name}
                      </Typography>
                      <IconButton
                        className={
                          sortId === col.id
                            ? "WalkingTable-buttonDisabled"
                            : "WalkingTable-button"
                        }
                        disabled={sortId === col.id}
                        onClick={handleClick(col.id)}
                        size={"small"}
                      >
                        <ArrowUpward
                          className={"WalkingTable-icon"}
                          fontSize={"small"}
                        />
                      </IconButton>
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={row["id"]}
                  className={
                    index % 2 ? "WalkingTable-rowOdd" : "WalkingTable-rowEven"
                  }
                  onContextMenu={contextMenu(index)}
                >
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                  >
                    <MenuItem onClick={editItem}>Редактировать запись</MenuItem>
                    <MenuItem onClick={deleteItem}>Удалить запись</MenuItem>
                  </Menu>
                  {tableCols.map((col, index) => (
                    <TableCell key={`${col.id}${index}`}>
                      {renderCell(row[col.id as keyof DBItem], col.id)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Scrollbars>
      </TableContainer>
      <Button
        className="WalkingTable-addButton"
        onClick={() => setModalOpen(true)}
      >
        Добавить запись
      </Button>
      <Modal open={modalOpen} onClose={closeModal}>
        <InputForm
          store={props.store}
          onClose={closeModal}
          itemToEdit={itemToEdit}
        />
      </Modal>
    </div>
  );
});

export default WalkingTable;
