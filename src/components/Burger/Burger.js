import React from "react";
import styles from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredients";

const Burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return i.length === 0 ? (
          <div>Please start adding ingredients</div>
        ) : (
          <BurgerIngredient key={igKey + i} type={igKey} />
        );
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please create a burger</p>;
  }

  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
