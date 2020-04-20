import {sortBy} from "lodash"

import {DBItem} from "../../../store/types"

export const getSortedRows = (rows: DBItem[], sortId: string) => {
    const sortedRows = sortBy(rows, sortId);
    return sortedRows;
  };
  
export const getCellValue = (content: number) => {
    const metersNumber = content % 1000;
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
    const kilometers = `${Math.floor(content / 1000)}`;
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