import {observable} from "mobx"
import axios from "axios"
import {BASE_URL} from "./constants"
import {DBItem} from "./types"
import { sortBy } from "lodash"

class PedometerStore {
    @observable private _chartData: DBItem[] = []
    @observable private _tableData: DBItem[]=[]

    public get chartData () {
        return this._chartData;
    }

    public get tableData () {
        return this._tableData
    } 

    constructor() {
        this._fetchData()
    }

    private _fetchData = () => {
        axios.get(`${BASE_URL}`).then(response => {
            const data: DBItem[] = response.data;
            data.forEach(item => {
                if (typeof item.distance === "string") {
                    item.distance = parseInt(item.distance)
                }
                item.date = new Date(item.date)
            })
            this._chartData = sortBy(data, "date")
            this._tableData = data
        } )
    }

    addItem = (date: Date, distance: number) => {
        axios.post(`${BASE_URL}`, {date: `${date}`, distance}).then(response => this._fetchData())
    }

    editItem = (item: DBItem) => {
        axios.put(`${BASE_URL}/${item.id}`, {date: `${item.date}`, distance: item.distance}).then(response => this._fetchData())
    }
    
    deleteItem = (id: number) => {
        axios.delete(`${BASE_URL}/${id}`).then(response => this._fetchData())
    }
}

export default PedometerStore