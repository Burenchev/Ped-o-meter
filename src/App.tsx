import React from 'react';
import PedometerStore from "./store/PedometerStore"
import WalkingTable from "./WalkingTable/WalkingTable"
import {Typography} from '@material-ui/core';
import "./App.css"

function App() {
  const store = new PedometerStore()
  return (
    <div>
      <div className="header">
        <Typography className="headerTypo" variant="h5">
          Шагомер на тестовое задание
        </Typography>
      </div>
      <WalkingTable store={store}/>
    </div>
  );
}

export default App;
