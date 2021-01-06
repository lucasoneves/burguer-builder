import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burguer from "../../components/Burguer/Burguer";
import BuildControls from "../../components/Burguer/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burguer/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.4,
  cheese: 0.3,
  meat: 0.4,
  bacon: 1,
};

class BurguerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get(
        "https://burguer-builder-9c311-default-rtdb.firebaseio.com/ingredients.json"
      )
      .then((response) => {
        this.setState({
          ingredients: response.data,
        });
      })
      .catch((err) => {
        this.setState({ error: true });
      });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({
      purchasable: sum > 0,
    });
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  purchasaHandler = () => {
    this.setState({
      purchasing: true,
    });
  };

  purchaseCancelHandler = () => {
    if (!this.state.loading) {
      this.setState({
        purchasing: false,
      });
    }
  };

  purchaseContinueHandler = () => {
    // alert('you continue')
    this.setState({
      loading: true,
    });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Lucas Neves",
        address: {
          street: "Rua Retiro",
          zipCode: "000000000",
          country: "Brasil",
        },
        email: "lneves@gmail.com",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then(() => {
        console.log(this.state.loading);
      })
      .catch((error) => {})
      .finally(() => {
        this.setState({ loading: false, purchasing: false });
      });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = (
      <Modal show={this.state.purchasing} closed={this.purchaseCancelHandler}>
        <OrderSummary
          totalPrice={this.state.totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          ingredients={this.state.ingredients}
        />
      </Modal>
    );

    if (this.state.loading) {
      orderSummary = (
        <Modal show={this.state.loading}>
          <Spinner />
        </Modal>
      );
    }

    let burguer = this.state.error ? (
      <p>Não foi possível trazer os dados</p>
    ) : (
      <Spinner></Spinner>
    );

    if (this.state.ingredients) {
      burguer = (
        <Aux>
          <Burguer ingredients={this.state.ingredients} />
          <BuildControls
            ordered={this.purchasaHandler}
            disabled={disabledInfo}
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
          />
        </Aux>
      );
    }
    return (
      <Aux>
        {orderSummary}
        {burguer}
      </Aux>
    );
  }
}

export default withErrorHandler(BurguerBuilder, axios);
