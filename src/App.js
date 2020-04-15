import React from 'react';
import './App.css';
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';


function App() {
  return (
    <div className="App">
      <header className="App-header">

        <DragDropContainer targetKey="foo">
            <div>Drag Me!</div>
        </DragDropContainer>

        <DropTarget targetKey="foo" onHit={(e) => { console.log(e); alert("hello im dumb")}}>
            <p>I'm a valid drop target for the object above since we both have the same targetKey!</p>
        </DropTarget>
      </header>
    </div>
  );
}

export default App;
