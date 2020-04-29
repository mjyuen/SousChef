import React from 'react';
import './App.css';
import axios from 'axios';
import { Form, Field } from 'react-final-form';
import { Button } from 'reactstrap';


class RewritePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredient: {},
      rewritten: '',
      attempts: 0,
      resultText: '',
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
        "attempts": this.state.attempts
      }
    })
    .then(resp => {
      return this.getNextOriginalIngredient();
    })
  }

  render() {
    return (
      <div className="Pane" style={{backgroundColor: '#b3d9ff'}}>
        <h3 className="Title" style={{marginBottom: "30px"}}>Fix an Ingredient</h3>
        <p className="Description">Some ingredient texts don't play well with our parser. There's an example below; try rewriting it in a new way that our parser might understand.</p>
        <div className="ColumnContainer">
        <div className="Column" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <label style={{fontWeight:"500"}}>{this.state.ingredient.text}</label>
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
          <Button color="success" type="submit" style={{marginTop: "10px"}}>Submit</Button>
          </form>
        )}/>
          <Button color="primary" type="parse" onClick={this.onParseClick} style={{marginTop: "10px"}}>Parse</Button>

        </div>

        <div className="Column" style={{background: '#6c757d', borderRadius: '8px', padding: '10px'}}>
          <pre style={{color: 'white'}}>{this.state.resultText}</pre>
        </div>


        </div>
      </div>
    );
  }
  
  onParseClick = (event) => {
    this.setState({
      attempts: this.state.attempts + 1
    });
    console.log(this.state.attempts)
    const ingredient = this.state.rewritten.split(/\n/);
    axios({
      method: 'post',
      url: 'http://localhost:5000/parsetext',
      data: {text: ingredient}
    })
    .then(resp => {
      console.log(resp.data);
      this.setState({resultText: JSON.stringify(resp.data, null, 2)})
    })
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
    this.setState({ingredient: resp.data, rewritten:'', attempts: 0, resultText: '' });
    console.log(resp.data);
  }
}

export default RewritePage;