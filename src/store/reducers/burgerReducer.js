import * as actionTypes from "../actions/actionTypes";

import { updateObject } from "../utility";

const INGREDIENTS_PRICELIST = {
  salad: 0.4,
  bacon: 0.5,
  cheese: 0.6,
  meat: 0.7,
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      const priceAddition = INGREDIENTS_PRICELIST[action.payload.type];
      const oldPrice = state.totalPrice;

      return updateObject(state, {
        ingredients: {
          ...state.ingredients,
          [action.payload.type]: state.ingredients[action.payload.type] + 1,
        },
        totalPrice: priceAddition + oldPrice,
        building: true,
      });

    case actionTypes.REMOVE_INGREDIENT:
      const priceLess = INGREDIENTS_PRICELIST[action.payload.type];
      const oldPriceLess = state.totalPrice;

      return updateObject(state, {
        ingredients: {
          ...state.ingredients,
          [action.payload.type]: state.ingredients[action.payload.type] - 1,
        },
        totalPrice: oldPriceLess - priceLess,
        building: true,
      });

    case actionTypes.SET_INGREDIENTS:
      return updateObject(state, {
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        totalPrice: 4,
        error: false,
        building: false,
      });

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true });

    default:
      return state;
  }
};

export default reducer;
