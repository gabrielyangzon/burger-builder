import * as actionTypes from "./actionTypes";

import axios from "../../axios-orders";

export const addIngredient = (type) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: { type: type },
  };
};

export const removeIngredient = (type) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload: { type: type },
  };
};

export const fetIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get("https://react-burger-builder-648b3.firebaseio.com/ingredients.json")
      .then((response) => {
        dispatch(setIngredients(response.data));
      })
      .catch((error) => {
        dispatch(fetIngredientsFailed());
      });
  };
};
