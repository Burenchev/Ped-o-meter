import React from 'react';
import PedometerStore from "./store/PedometerStore"
import Table from "./Table/Table"

function App() {
  const store = new PedometerStore()
  return (
    <div>
      <h1>Here will be my app</h1>
      <Table store={store}/>
    </div>
  );
}

export default App;
