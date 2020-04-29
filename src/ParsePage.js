import React from 'react';
import './App.css';
import axios from 'axios';
import { Button } from 'reactstrap';

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
      <div className="Pane">
        <h3 className="Title" style={{marginBottom: "30px"}}>Parse an Ingredient</h3>
        <p className="Description">Enter an ingredient or list of ingredients into the box below. Then, hit the button to see how the parser performs! Not sure what to write? Try typing "1 tbsp lemon juice".</p>
        <div className="ColumnContainer">
            <div className="Column">
                <form onSubmit={this.handleSubmit} style={{flexDirection: 'column', display: 'flex'}}>
                    <textarea onChange={this.handleTextareaInput}></textarea>
                    <Button color="primary" type="submit" style={{marginTop: '10px'}}>Parse This</Button>
                </form>
            </div>
            <div className="Column" style={{background: '#6c757d', borderRadius: '8px', padding: '10px'}}>
                <pre style={{color: 'white'}}>{this.state.resultText}</pre>
            </div>
        </div>
      </div>
    );
  }

  handleTextareaInput = (e) => {
      this.setState({ingredientsInputText: e.target.value.trim()});
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