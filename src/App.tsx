import React from 'react';
import {Typography} from '@material-ui/core';
import PedometerStore from "./store/PedometerStore"
import WalkingTable from "./components/WalkingTable/WalkingTable"
import WalkingChart from "./components/WalkingChart/WalkingChart"
import "./App.css"

function App() {
  const store = new PedometerStore()
  return (
    <div>
      <div className="App-header">
        <Typography className="App-headerTypo" variant="h5">
          Шагомер на тестовое задание
        </Typography>
      </div>
      <div className="App-container">
      <WalkingTable store={store}/>
      <WalkingChart store={store}/>
      </div>
    </div>
  );
}

export default App;
