import React, { useState } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENTS_PRICELIST = {
  salad: 0.4,
  bacon: 0.5,
  cheese: 0.6,
  meat: 0.7
};

const BurgerBuilder = () => {
  const [burger, setBurger] = useState({
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  });

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
    alert("You continue!");
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

  return (
    <Aux>
      <Modal show={burger.purchasing} modalClosed={cancelOrderHandler}>
        <OrderSummary
          ingredients={burger.ingredients}
          cancelOrder={cancelOrderHandler}
          continueOrder={continuePurchaseHandler}
          totalPrice={burger.totalPrice}
        />
      </Modal>
      {/* <div>
        {Object.entries(burger.ingredients).map(x => (
          <p key={x[0]}>
            {x[0]} : {x[1]}
          </p>
        ))}
      </div> */}
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
};

export default BurgerBuilder;
