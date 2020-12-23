import React from 'react'
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
      return (
        <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}: {props.ingredients[igKey]}</span></li>
      )
    })
  
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>Ingredientes:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Total Price: <strong>{ props.totalPrice.toFixed(2) }</strong></p>
      <p>Continuar</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>
        Cancelar
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinue}>
        Continuar
      </Button>
    </Aux>
  )
}

export default orderSummary;