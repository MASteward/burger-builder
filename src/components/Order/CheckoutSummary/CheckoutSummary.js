import React from 'react';
import "./CheckoutSummary.css";
import Burger from "../../Burger";
import Button from "../../UI/Button";



const CheckoutSummary = (props) => {
  return (
    <div className="CheckoutSummary">
      <h1>Enjoy your burger!</h1>
      <div style={{width: '100%', margin: "auto"}}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
    </div>
  )
};

export default CheckoutSummary;