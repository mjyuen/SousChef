import React from 'react';
import './App.css';
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';
import axios from 'axios';
import { Form, Field } from 'react-final-form';

class RewritePage extends React.Component {
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

      </header>
      <div>
      <Form onSubmit={this.onSubmit} render={({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
        <label>{this.state.ingredient.text}</label>
        <Field
          name="rewrite"
          component="input"
          type="text"
        />
        <button type="submit">Submit</button>
        </form>
      )}/>
      </div>
    </div>
  );
}
}

export default RewritePage;