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
import InputForm from "../InputForm/InputForm";
import { tableCols } from "./constants/constants";
import { sortBy } from "lodash";
import { Scrollbars } from "react-custom-scrollbars";
import { DBItem } from "../../store/types";
import "./constants/styles.css";
import DateRenderer from "../DateRenderer/DateRenderer";

type Props = {
  store: PedometerStore;
};

const WalkingTable: React.FC<Props> = observer((props: Props) => {
  const [sortId, setSortId] = React.useState<string>("date");
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<any>(null);
  const [itemToEdit, setItemToEdit] = React.useState<DBItem | null>(null);

  const getSortedRows = () => {
    const rows: any[] = props.store.tableData;
    const sortedRows = sortBy(rows, sortId);
    return sortedRows;
  };

  const handleClick = (id: string) => () => {
    setSortId(id);
  };

  const renderCell = (content: number | Date, id: string) => {
    if (id === "date") {
      return <DateRenderer date={`${content}`} />;
    } else {
      const metersNumber = (content as number) % 1000;
      const meters = metersNumber ? `${metersNumber}` : "";
      const metersLastSymbol = !meters ? "" : meters[meters.length - 1];
      const metersMessage = !metersLastSymbol
        ? ""
        : metersLastSymbol === "1"
        ? "метр"
        : metersLastSymbol === "2" ||
          metersLastSymbol === "3" ||
          metersLastSymbol === "4"
        ? "метра"
        : "метров";
      const kilometers = `${Math.floor((content as number) / 1000)}`;
      const kilometersLastSymbol = kilometers[kilometers.length - 1];
      const kilometersMessage =
        kilometersLastSymbol === "1"
          ? "километр"
          : kilometersLastSymbol === "2" ||
            kilometersLastSymbol === "3" ||
            kilometersLastSymbol === "4"
          ? "километра"
          : "километров";
      return `${kilometers} ${kilometersMessage} ${meters} ${metersMessage}`;
    }
  };

  const contextMenu = (index: number) => (e: any) => {
    setItemToEdit(rows[index])
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
    props.store.deleteItem(itemToEdit!.id)
    setAnchorEl(null)
  }

  const rows = getSortedRows();
  const key = `${sortId}`;
  return (
    <div className="WalkingTable-root">
      <TableContainer className={"WalkingTable-tableContainer"} key={key}>
        <Scrollbars
          autoHeight
          autoHeightMin={435}
          hideTracksWhenNotNeeded
          renderTrackVertical={({ style, ...props }) => (
            <div
              {...props}
              style={{
                ...style,
                backgroundColor: "#1C2025",
                width: "3px",
                height: "100%",
                right: "0px",
                bottom: "0px",
              }}
            />
          )}
          renderThumbVertical={({ style, ...props }) => (
            <div
              {...props}
              style={{
                ...style,
                backgroundColor: "#EC174F",
                width: "3px",
                borderRadius: "50%",
              }}
            />
          )}
        >
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
                    <MenuItem onClick={editItem}>
                      Редактировать запись
                    </MenuItem>
                    <MenuItem onClick={deleteItem}>Удалить запись</MenuItem>
                  </Menu>
                  {tableCols.map((col) => (
                    <TableCell key={row[col.id]}>
                      {renderCell(row[col.id], col.id)}
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
