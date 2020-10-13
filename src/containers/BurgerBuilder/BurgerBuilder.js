import React, { useState, useEffect } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

import axios from "../../axios-orders";
import Spinner from "../../components/UI/spinners/spinners";
import WithErrorHandler from "../../hoc/withErrrorHandler/withErrorHandler";

import { connect } from "react-redux";

import * as actionCreators from "../../store/actions/index";

const BurgerBuilder = (props) => {
  const [burger, setBurger] = useState({
    purchasing: false,
  });

  useEffect(() => {
    props.onInitIngredientsHandler();
  }, []);

  const updatePurchasingStateHandler = () => {
    if (props.isAuthenticated) {
      setBurger((current) => {
        return { ...current, purchasing: true };
      });
    } else {
      props.onSetRedirectPath("/checkout");
      props.history.push("/login");
    }
  };

  const cancelOrderHandler = () => {
    setBurger((current) => {
      return { ...current, purchasing: false };
    });
  };

  const continuePurchaseHandler = () => {
    props.onInitPurchase();
    props.history.push("/checkout");
  };

  const updatePurchaseState = (ingre) => {
    const sum = Object.values(ingre).reduce((a, b) => {
      return a + b;
    });

    return sum > 0;
  };

  const disabledInfo = {
    ...props.ingredients,
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;

  let burgerComp = props.error ? <p>Ingredients can't be loaded</p> : null;

  if (props.ingredients) {
    burgerComp = (
      <Aux>
        <Burger ingredients={props.ingredients} />
        <BuildControls
          addIngredients={props.onAddIngredientClickHandler}
          removeIngredients={props.onRemoveIngredientClickHandler}
          disabledInfo={disabledInfo}
          price={props.totalPrice}
          purchase={updatePurchaseState(props.ingredients)}
          orderNow={updatePurchasingStateHandler}
          isAuth={props.isAuthenticated}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        ingredients={props.ingredients}
        cancelOrder={cancelOrderHandler}
        continueOrder={continuePurchaseHandler}
        totalPrice={props.totalPrice}
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

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    error: state.burger.error,
    isAuthenticated: state.auth.token ? true : false,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredientClickHandler: (ingredientName) =>
      dispatch(actionCreators.addIngredient(ingredientName)),
    onRemoveIngredientClickHandler: (ingredientName) =>
      dispatch(actionCreators.removeIngredient(ingredientName)),
    onInitIngredientsHandler: () => dispatch(actionCreators.initIngredients()),
    onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
    onSetRedirectPath: (path) =>
      dispatch(actionCreators.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
