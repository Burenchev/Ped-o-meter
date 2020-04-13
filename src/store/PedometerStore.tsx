import {observable} from "mobx"
import axios from "axios"
import {BASE_URL} from "./constants"
import {DBItem} from "./types"

class PedometerStore {
    @observable private _data: DBItem[] = []

    public get data () {
        return this._data;
    }

    constructor() {
        this._fetchData()
    }

    private _fetchData = () => {
        axios.get(`${BASE_URL}`).then(response => {
            this._data = response.data;
            this._data.forEach(item => {
                if (typeof item.distance === "string") {
                    item.distance = parseInt(item.distance)
                }
            })  
        } )
    }

    addItem = (date: Date, distance: number) => {
        axios.post(`${BASE_URL}`, {date, distance}).then(response => this._fetchData())
    }
}

export default PedometerStore