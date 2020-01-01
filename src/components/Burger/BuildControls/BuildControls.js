import React from "react";
import styles from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const BuildControls = props => {
  return (
    <div className={styles.BuildControls}>
      <p>
        Current Price $ <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map(ctrl => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          add={() => props.addIngredients(ctrl.type)}
          less={() => props.removeIngredients(ctrl.type)}
          isDisable={props.disabledInfo[ctrl.type]}
        />
      ))}

      <button
        onClick={props.orderNow}
        disabled={!props.purchase}
        className={styles.OrderButton}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default BuildControls;
