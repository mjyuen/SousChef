import React, { Component } from 'react';
import './App.css';
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from './Homepage.js';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink, } from 'reactstrap';
class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
              <Switch>
              <Route path="/about" component={Homepage}/>
            </Switch>
          </div> 
          <div>
              <Navbar color="light" light expand="md">
                <NavbarBrand href="/">home</NavbarBrand>
                <NavbarBrand href="/about">about</NavbarBrand>
              </Navbar>
            </div>
        </BrowserRouter>
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
}

export default App;
