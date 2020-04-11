import React from 'react';
import PedometerStore from "./store/PedometerStore"

function App() {
  const store = new PedometerStore()
  return (
    <div>
      <h1>Here will be my app</h1>
      {store.data.map(item => {
        return (<p key={item}>{item}</p>)
      })}
    </div>
  );
}

export default App;
