import React from 'react';
import './App.css';
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';
import axios from 'axios';
import Nav from './Nav.js';

class LabelPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredient: {}
    }
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'http://localhost:5000/gettricky',
      headers: {},
    })
    .then(resp => {
      this.setState({ingredient: resp.data});
      console.log(resp.data);
    })
  }
  
  onSubmit = values => {
    console.log(values)
    axios({
      method: 'post',
      url: 'http://localhost:5000/fixed',
      data: {
        "original": this.state.ingredient.text,
        "rewritten": values.rewrite
      }
    })
    .then(resp => {
      window.location.reload()
    })
  }
  render() {
  return (
    <div className="App">
      <header className="App-header">
        <Nav />
      </header>
      <div>
          <DragDropContainer targetKey="foo">
            <div>dog</div>
          </DragDropContainer>

          <DropTarget targetKey="foo" onHit={(e) => { console.log(e); alert("hello im dumb")}}>
              <p>I'm a valid drop target for the object above since we both have the same targetKey!</p>
          </DropTarget>
      </div>
    </div>
  );
}
}

export default LabelPage;