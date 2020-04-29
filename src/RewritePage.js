import React from 'react';
import './App.css';
import axios from 'axios';
import { Form, Field } from 'react-final-form';

class RewritePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredient: {},
      rewritten: '',
    }
  }

  async componentDidMount() {
    await this.getNextOriginalIngredient();
  }
  
  onSubmit = async values => {
    console.log(values)
    axios({
      method: 'post',
      url: 'http://localhost:5000/fixed',
      data: {
        "original": this.state.ingredient.text,
        "rewritten": this.state.rewritten,
      }
    })
    .then(resp => {
      return this.getNextOriginalIngredient();
    })
  }

  render() {
    return (
      <div className="Pane" style={{backgroundColor: '#b3d9ff'}}>
        <h3 className="Title">Fix an Ingredient</h3>
        <p className="Description">Some ingredient texts don't play well with our parser. There's an example below; try rewriting it in a new way that our parser might understand.</p>
        <div className="ColumnContainer">
        <div className="Column" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <label>{this.state.ingredient.text}</label>
        </div>
        <div className="Column">
        <Form onSubmit={this.onSubmit} render={({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
          <Field
            name="rewrite"
          >
            {props => (
              <div>
                <input {...props.input}
                type="text"
                onChange={this.onChangeRewrite}
                value={this.state.rewritten} />
              </div>
            )}
          </Field>
          <button type="submit">Submit</button>
          </form>
        )}/>
        </div>
        </div>
      </div>
    );
  }

  onChangeRewrite = (event) => {
    this.setState({
      rewritten: event.target.value
    });
  }

  async getNextOriginalIngredient() {
    const resp = await axios({
      method: 'get',
      url: 'http://localhost:5000/gettricky',
      headers: {},
    });
    this.setState({ingredient: resp.data, rewritten:'' });
    console.log(resp.data);
  }
}

export default RewritePage;