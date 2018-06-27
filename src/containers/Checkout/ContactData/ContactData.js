import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../../components/UI/Button";
import "./ContactData.css";
import Spinner from "../../../components/UI/Spinner";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input";


class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        entered: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Address"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        entered: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code"
        },
        value: "",
        validation: {
          required: true,
          reqLength: 5
        },
        valid: false,
        entered: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        entered: false
      },
      email: {
        elementType: "email",
        elementConfig: {
          type: "text",
          placeholder: "Email"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        entered: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            {value: "fastest", displayValue: "Fastest"},
            {value: "cheapest", displayValue: "Cheapest"}
          ]
        },
        value: "fastest",
        validation: {},
        valid: true
      }
    },
    formIsValid: false,
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formId in this.state.orderForm) {
      formData[formId] = this.state.orderForm[formId].value
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    };
    axios.post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false })
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ loading: false })
        console.log("error", error)
      });
  }

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.reqLength) {
      isValid = value.length === rules.reqLength && isValid;
    }
    return isValid;
  }

  inputChangeHandler = (event, id) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedFormElement = {
      ...updatedOrderForm[id]
    }
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.entered = true;
    updatedOrderForm[id] = updatedFormElement;
    let formIsValid = true;
    for (let id in updatedOrderForm) {
      formIsValid = updatedOrderForm[id].valid && formIsValid;
    }
    console.log("valid", formIsValid);
    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid
    })
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            entered={formElement.config.entered}
            changed={(event) => this.inputChangeHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className="ContactData">
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    price: state.totalPrice
  }
}

export default connect(mapStateToProps)(ContactData);
