import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import ContactData from "./ContactData";



class Checkout extends Component {

  checkoutCancelled = () => {
    this.props.history.goBack();
  }

  checkoutContinued = () => {
    this.props.history.replace("/checkout/contact-data");
  }


  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ings}
          checkoutCancelled={this.checkoutCancelled}
          checkoutContinued={this.checkoutContinued}
        />
        <Route path={this.props.match.path + "/contact-data"}
        component={ContactData} />
      </div>
    );
  };
}

// ings can be named anything, does not have to match burgerbuilder...but state.ingredients does need to match reducer.
const mapStateToProps = state => {
  return {
    ings: state.ingredients
  }
}

export default connect(mapStateToProps)(Checkout);
