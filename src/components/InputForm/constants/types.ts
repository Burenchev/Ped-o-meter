import PedometerStore from "../../../store/PedometerStore";
import {DBItem} from "../../../store/types"

export type Props = {
    store: PedometerStore;
    onClose: () => void;
    itemToEdit: DBItem | null;
  };