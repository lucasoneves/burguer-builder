import React from "react";
import Burguer from "../Burguer/Burguer";
import Button from "../UI/Button/Button";
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h2>Bom apetite!</h2>
      <div style={{ width: "300px", margin: "auto" }}></div>
      <Burguer ingredients={props.ingredients}></Burguer>
      <Button btnType="Danger" clicked>
        Cancel
      </Button>
      <Button btnType="Success">Continue</Button>
    </div>
  );
};

export default checkoutSummary;
