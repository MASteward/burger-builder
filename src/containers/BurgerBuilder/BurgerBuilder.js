import React, { Component } from 'react';
import axios from "../../axios-orders";
import { connect } from "react-redux";


import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls';
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from "../../components/UI/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler";
// import * as actionTypes from "../../store/actions/actionTypes";
import * as burgerBuilderActions from "../../store/actions/index";





class BurgerBuilder extends Component {
  state = {
    // ingredients changes after making an ingredients folder in firebase and storing the values in there...componentDidMount will populate ingredients
    purchasing: false,
    loading: false,
    error: null
  }

  componentDidMount() {
    // axios.get("https://react-burger-builder-32938.firebaseio.com/ingredients.json")
    //   .then(response => {
    //     this.setState({ ingredients: response.data })
    //   })
    //   .catch(error => {
    //     this.setState({ error: true })
    //   })
  }

//=========================== UPDATE PURCHASABLE ===============================
  // Object.keys(ingredients) will create an array with string values (names..e.g. salad, cheese...) from the object inside the ()
  // map is used to get the number value associated with the string.
  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey]
    }).reduce((sum, el) => {
      return sum + el;
    }, 0);
    return sum > 0;
  }

//============================ PURCHASE HANDLER ================================

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false});
  }

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  }

//================================= RENDER =====================================

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients Could Not Be Loaded!</p> : <Spinner />;

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            price={this.props.price}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = <OrderSummary
        price={this.props.price}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        ingredients={this.props.ings} />
    };

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return(
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>

    )
  }
}
const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
