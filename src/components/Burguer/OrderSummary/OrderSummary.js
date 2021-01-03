import React, { Component } from 'react'
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  componentDidUpdate() {
    console.log('order summary will updated')
  }
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
    .map(igKey => {
      return (
        <li key={igKey}>
          <span
            style={{textTransform: 'capitalize'}}>
              {igKey}: {this.props.ingredients[igKey]}
          </span></li>
      )
    })
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>Ingredientes:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p>Total Price: <strong>{ this.props.totalPrice.toFixed(2) }</strong></p>
        <p>Continuar</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>
          Cancelar
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinue}>
          Continuar
        </Button>
      </Aux>
    )
  }
}
  
export default OrderSummary;
