import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from './Homepage.js';
import RewritePage from './RewritePage.js';
import ParsePage from './ParsePage';
import LabelPage from './LabelPage.js';

import {
  Navbar,
  NavbarBrand,
 } from 'reactstrap';
class App extends Component {
  render() {
    return (
      <div className="home">
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
        <div>
          <RewritePage />
        </div>
        <div>
          <ParsePage />
        </div>
        <div>
          <LabelPage />
        </div>

      </div>
    );
  }
}

export default App;
