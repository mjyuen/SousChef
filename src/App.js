import React, { Component } from 'react';
import './App.css';
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from './Homepage.js';
import RewritePage from './RewritePage.js';
import ParsePage from './ParsePage';
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
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
        <body className="homebody">


          <DragDropContainer targetKey="foo">
              <div>Drag Me!</div>
          </DragDropContainer>

          <DropTarget targetKey="foo" onHit={(e) => { console.log(e); alert("hello im dumb")}}>
              <p>I'm a valid drop target for the object above since we both have the same targetKey!</p>
          </DropTarget>


          <Card className="flow">
            <CardBody>
              <CardTitle>
                Drag Me!
              </CardTitle>
              <CardText>something</CardText>
            </CardBody>
          </Card>
          <Card className="flow">
            <CardBody>
              <CardTitle>
                Drag Me!
              </CardTitle>
              <CardText>something</CardText>
            </CardBody>
          </Card>
          <Card className="flow">
            <CardBody>
              <CardTitle>
                Drag Me!
              </CardTitle>
              <CardText>something</CardText>
            </CardBody>
          </Card>
          </body>

      </div>
    );
  }
}

export default App;
