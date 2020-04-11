import * as React from "react";
import { observer } from "mobx-react";
import PedometerStore from "../store/PedometerStore";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  IconButton,
} from "@material-ui/core";
import {ArrowUpward} from "@material-ui/icons"
import { PAGINATION_SIZE, tableCols } from "./constants/constants";
import { sortBy } from "lodash";
import "./constants/styles.css";

type Props = {
  store: PedometerStore;
};

type State = {
  sortId: string;
  paginationOffset: number;
};

@observer
class WalkingTable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      sortId: "date",
      paginationOffset: 0,
    };
  }

  private _getSortedRows = () => {
    const rows: any[] = this.props.store.data.slice();
    const sortedRows = sortBy(rows, this.state.sortId);
    return sortedRows;
  };

  private _getPaginatedRows = (rows: any[]) => {
    const startIndex = this.state.paginationOffset;
    let endIndex = this.state.paginationOffset + PAGINATION_SIZE;
    if (rows.length - 1 < endIndex) {
      endIndex = rows.length - 1;
    }
    return rows.slice(startIndex, endIndex);
  };

  private _handleClick = (id: string) => () => {
    this.setState({ sortId: id, paginationOffset: 0 });
  };

  private _pageForward = () => {
    this.setState((state) => {
      return {
        paginationOffset: state.paginationOffset + PAGINATION_SIZE,
      };
    });
  };

  private _pageBack = () => {
    this.setState((state) => {
      return {
        paginationOffset: state.paginationOffset - PAGINATION_SIZE,
      };
    });
  };

  private _renderCell = (content: number | string, id: string) => {
    if (id === "date") {
      const parsedDate = new Date(content);
      return parsedDate.toLocaleDateString("ru");
    } else {
      return content;
    }
  };

  render() {
    const rows = this._getSortedRows();
    const rowsToShow =
      rows.length > PAGINATION_SIZE ? this._getPaginatedRows(rows) : rows;
    const totalPageCount =
      rows.length > 0 ? Math.ceil(rows.length / PAGINATION_SIZE) : 0;
    const currentPageNumber = this.state.paginationOffset / PAGINATION_SIZE + 1;
    const key = `${this.state.sortId}-${rows.length}-${this.state.paginationOffset}`;
    return (
      <>
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
                        className={this.state.sortId === col.id? "WalkingTable-buttonDisabled" : "WalkingTable-button"}
                        disabled={this.state.sortId === col.id}
                        onClick={this._handleClick(col.id)}
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
              {rowsToShow.map((row) => (
                <TableRow key={row["id"]}>
                  {tableCols.map((col) => (
                    <TableCell key={row[col.id]}>
                      {this._renderCell(row[col.id], col.id)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {rows.length > 15 && (
          <div className={"WalkingTable-paginagion"}>
            <Button
              onClick={this._pageBack}
              variant={"outlined"}
              disabled={this.state.paginationOffset === 0}
            >
              Назад
            </Button>
            <Typography className={"WalkingTable-typo"}>
              {`Страница ${currentPageNumber} из ${totalPageCount}`}
            </Typography>
            <Button
              onClick={this._pageForward}
              variant={"outlined"}
              disabled={
                this.state.paginationOffset + PAGINATION_SIZE > rows.length
              }
            >
              Вперед
            </Button>
          </div>
        )}
      </>
    );
  }
}

export default WalkingTable;
