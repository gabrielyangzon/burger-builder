import React, { useState } from "react";
import Button from "../../../components/UI/Button/Button";
import styles from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/spinners/spinners";
import Input from "../../../components/UI/Input/Input";

const ContactData = props => {
  const [contactData, setContactData] = useState({
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Name"
        },
        value: "",
        validation: {
          required: true,
          lettersOnly: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Email"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest", selected: true }
          ],
          value: ""
        },
        valid: true,
        touched: false
      }
    },
    isFormValid: false,
    loading: false
  });

  const onOrderHandler = event => {
    let date = new Date();
    event.preventDefault();

    if (!contactData.isFormValid) {
      alert("form invalid");
      return;
    }

    setContactData(current => {
      return { ...current, loading: true };
    });

    const formData = {};

    for (let identifier in contactData.orderForm) {
      formData[identifier] = contactData.orderForm[identifier].value;
    }

    const order = {
      ingredients: props.ingredients,
      totalPrice: props.totalPrice,
      orderDetails: formData,
      orderDate: date.toLocaleDateString() + " " + date.toLocaleTimeString()
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        console.log(response.status);
        setContactData(current => {
          return { ...current, loading: false };
        });

        response.status === 200
          ? props.history.push("/")
          : console.log("error");
      })
      .catch(error =>
        setContactData(current => {
          return { ...current, loading: false };
        })
      );
  };

  const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules) {
      if (rules.required) {
        isValid = value.trim() !== "" && isValid;
      }

      if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
      }

      if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
      }

      if (rules.lettersOnly) {
        isValid = isNaN(value) && isValid;
      }
    }

    return isValid;
  };

  const onChangeInputhandler = (event, identifier) => {
    const currentForm = { ...contactData.orderForm };

    const currentFormElement = { ...currentForm[identifier] };

    currentFormElement.value = event.target.value;
    currentFormElement.valid = checkValidity(
      currentFormElement.value,
      currentFormElement.validation
    );
    currentFormElement.touched = true;

    let isValid = true;

    for (let inputIdentifier in currentFormElement) {
      isValid = currentFormElement[inputIdentifier].valid && isValid;
    }

    console.log(isValid);
    currentForm[identifier] = currentFormElement;

    setContactData({ orderForm: currentForm, isFormValid: isValid });
  };

  let form = (
    <form onSubmit={onOrderHandler}>
      {Object.entries(contactData.orderForm)
        .map(data => {
          return {
            id: data[0],
            config: data[1]
          };
        })
        .map(x => (
          <Input
            key={x.id}
            inputType={x.config.elementType}
            inputConfig={x.config.elementConfig}
            name={x.id}
            value={x.config.value}
            changed={evt => onChangeInputhandler(evt, x.id)}
            isValid={x.config.valid}
            shouldValidate={x.config.validation}
            isTouched={x.config.touched}
          />
        ))}
      <Button buttonType="Success" disabled={!contactData.isFormValid}>
        Submit
      </Button>
    </form>
  );

  if (contactData.loading) {
    form = <Spinner />;
  }

  return (
    <div className={styles.ContactData}>
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  );
};

export default ContactData;
