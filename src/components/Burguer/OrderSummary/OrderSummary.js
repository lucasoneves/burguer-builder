import React from 'react'
import Aux from '../../../hoc/Aux';

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
      <p>Continuar</p>
    </Aux>
  )
}

export default orderSummary;