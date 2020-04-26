import React from 'react';
import './App.css';
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';
import axios from 'axios';
import { Form, Field } from 'react-final-form';
import Nav from './Nav.js';

class ParsePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        ingredientsInputText: '',
        resultText: '',
    }
  }

  render() {
    return (
      <div className="App">
        <div>
            <form onSubmit={this.handleSubmit}>
                <textarea onChange={this.handleTextareaInput}></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
        <div>
            <pre>{this.state.resultText}</pre>
        </div>
      </div>
    );
  }

  handleTextareaInput = (e) => {
      this.setState({ingredientsInputText: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
      const ingredients = this.state.ingredientsInputText.split(/\n/);
      console.log(ingredients);
      axios({
        method: 'post',
        url: 'http://localhost:5000/parsetext',
        data: {text: ingredients}
      })
      .then(resp => {
        console.log(resp.data);
        this.setState({resultText: JSON.stringify(resp.data, null, 2)})
      })
  }
}

export default ParsePage;