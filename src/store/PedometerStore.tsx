import {observable} from "mobx"

class PedometerStore {
    @observable private _data: any[] = []

    public get data () {
        return this._data;
    }

    constructor() {
        this._data = [1, 2, 3]
    }
}

export default PedometerStore