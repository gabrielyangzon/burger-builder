import React, { useState, useEffect } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

import axios from "../../axios-orders";
import Spinner from "../../components/UI/spinners/spinners";
import WithErrorHandler from "../../hoc/withErrrorHandler/withErrorHandler";

const INGREDIENTS_PRICELIST = {
  salad: 0.4,
  bacon: 0.5,
  cheese: 0.6,
  meat: 0.7
};

const BurgerBuilder = props => {
  const [burger, setBurger] = useState({
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    errorState: false
  });

  useEffect(() => {
    axios
      .get("https://react-burger-builder-648b3.firebaseio.com/ingredients.json")
      .then(response => {
        setBurger(current => {
          return { ...current, ingredients: response.data };
        });
      })
      .catch(error => {
        setBurger(current => {
          return { ...current, errorState: true };
        });
      });
  }, []);

  const updatePurchasingStateHandler = () => {
    setBurger(current => {
      return { ...current, purchasing: true };
    });
  };

  const cancelOrderHandler = () => {
    setBurger(current => {
      return { ...current, purchasing: false };
    });
  };

  const continuePurchaseHandler = () => {
    const queryParams = [];
    for (let i in burger.ingredients) {
      queryParams.push(
        encodeURIComponent(i) + "=" + encodeURIComponent(burger.ingredients[i])
      );
    }
    queryParams.push("price=" + burger.totalPrice);
    const queryString = queryParams.join("&");
    props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
  };

  const updatePurchaseState = ingre => {
    const sum = Object.values(ingre).reduce((a, b) => {
      return a + b;
    });

    setBurger(prevState => {
      return { ...prevState, purchasable: sum > 0 };
    });
  };

  const addIngredientHandler = type => {
    const oldCount = burger.ingredients[type];
    const updatedCount = oldCount + 1;

    const updatedIngredients = { ...burger.ingredients };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENTS_PRICELIST[type];
    const oldPrice = burger.totalPrice;
    const newPrice = priceAddition + oldPrice;

    setBurger({ ingredients: updatedIngredients, totalPrice: newPrice });
    updatePurchaseState(updatedIngredients);
  };

  const removeIngredientHander = type => {
    if (burger.ingredients[type] !== 0) {
      const oldCount = burger.ingredients[type];
      const updatedCount = oldCount - 1;

      const updatedIngredients = { ...burger.ingredients };
      updatedIngredients[type] = updatedCount;
      const priceLess = INGREDIENTS_PRICELIST[type];
      const oldPrice = burger.totalPrice;
      const newPrice = oldPrice - priceLess;

      setBurger({ ingredients: updatedIngredients, totalPrice: newPrice });
      updatePurchaseState(updatedIngredients);
    }
  };

  const disabledInfo = {
    ...burger.ingredients
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;

  let burgerComp = <Spinner />;

  if (burger.ingredients) {
    burgerComp = (
      <Aux>
        <Burger ingredients={burger.ingredients} />
        <BuildControls
          addIngredients={addIngredientHandler}
          removeIngredients={removeIngredientHander}
          disabledInfo={disabledInfo}
          price={burger.totalPrice}
          purchase={burger.purchasable}
          orderNow={updatePurchasingStateHandler}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        ingredients={burger.ingredients}
        cancelOrder={cancelOrderHandler}
        continueOrder={continuePurchaseHandler}
        totalPrice={burger.totalPrice}
      />
    );
  }
  if (burger.loading) {
    orderSummary = <Spinner />;
  }

  return (
    <Aux>
      <Modal show={burger.purchasing} modalClosed={cancelOrderHandler}>
        {orderSummary}
      </Modal>
      {burgerComp}
    </Aux>
  );
};

export default WithErrorHandler(BurgerBuilder, axios);
