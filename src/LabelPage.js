import React from 'react';
import './App.css';
import axios from 'axios';
import { Form, Field } from 'react-final-form';
import { Button } from 'reactstrap';


class LabelPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredient: {},
      quantity: '',
      unit: '',
      name: '',
      comment: '',
    }
  }

  async componentDidMount() {
    await this.getNextOriginalIngredient();
  }
  
  onSubmit = async values => {
    console.log(values)
    axios({
      method: 'post',
      url: 'http://localhost:5000/addlabel',
      data: {
        "text": this.state.ingredient.text,
        "quantity": this.state.quantity,
        "unit": this.state.unit,
        "name": this.state.name,
        "comment": this.state.comment
      }
    })
    .then(resp => {
      return this.getNextOriginalIngredient();
    })
  }

  render() {
    return (
      <div className="Pane" style={{backgroundColor: '#cceeff'}}>
        <h3 className="Title" style={{marginBottom: "20px"}}>Label an Ingredient</h3>
        <p className="Description">This time, try labeling the text provided into categories of quantity, unit, name, and comment. No need to fill every category!</p>
        <div className="ColumnContainer">
        <div className="Column" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <p style={{fontWeight:"500"}}>{this.state.ingredient.text}</p>
        </div>
        <div className="Column">
        <Form onSubmit={this.onSubmit} render={({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
          <label>Quantity:</label>
          <Field
            name="quantity"
          >
            {props => (
              <div>
                <input {...props.input}
                type="text"
                onChange={this.onChangeQuantity}
                value={this.state.quantity} />
              </div>
            )}
          </Field>
          <label>Unit:</label>
          <Field
            name="unit"
          >
            {props => (
              <div>
                <input {...props.input}
                type="text"
                onChange={this.onChangeUnit}
                value={this.state.unit} />
              </div>
            )}
          </Field>
          <label>Name:</label>
          <Field
            name="name"
          >
            {props => (
              <div>
                <input {...props.input}
                type="text"
                onChange={this.onChangeName}
                value={this.state.name} />
              </div>
            )}
          </Field>
          <label>Comment:</label>
          <Field
            name="comment"
          >
            {props => (
              <div>
                <input {...props.input}
                type="text"
                onChange={this.onChangeComment}
                value={this.state.comment} />
              </div>
            )}
          </Field>
          <Button color="primary" type="submit" style={{marginTop: "10px"}}>Submit</Button>
          </form>
        )}/>
        </div>
        </div>
      </div>
    );
  }

  onChangeQuantity = (event) => {
    this.setState({
      quantity: event.target.value
    });
  }
  onChangeUnit = (event) => {
    this.setState({
      unit: event.target.value
    });
  }
  onChangeName = (event) => {
    this.setState({
      name: event.target.value
    });
  }
  onChangeComment = (event) => {
    this.setState({
      comment: event.target.value
    });
  }

  async getNextOriginalIngredient() {
    const resp = await axios({
      method: 'get',
      url: 'http://localhost:5000/gettext',
      headers: {},
    });
    this.setState({ingredient: resp.data, quantity: '', unit: '', name: '', comment: '' });
    console.log(resp.data);
  }
}

export default LabelPage;