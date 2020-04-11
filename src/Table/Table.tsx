import * as React from "react"
import {observer} from "mobx-react"
import PedometerStore from "../store/PedometerStore"

type Props = {
    store: PedometerStore
}

@observer
class Table extends React.Component<Props> {
    render() {
        const {store} = this.props
        return (
            <div>
                <h1>Here will be my table</h1>
{store.data.map(item => {
    return <p key={item.id}>{item.distance}</p>
})}
            </div>
        )
    }
}

export default Table