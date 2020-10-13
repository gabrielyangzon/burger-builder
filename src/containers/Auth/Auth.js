import React, { useState, useEffect } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actionCreator from "../../store/actions/index";
import Spinner from "../../components/UI/spinners/spinners";
const Auth = (props) => {
  const [authData, setAuthData] = useState({
    form: {
      username: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Email Address",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Your password",
        },
        value: "",
        validation: {
          required: true,
          isEmail: false,
          minLength: 7,
        },
      },
    },
    signUp: true,
  });

  useEffect(() => {
    if (!props.buildingBurger && props.authRedirectPath !== "/") {
      props.onSetAuthRedirectPath();
    }
  }, []);

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

  const onChangeInputHandler = (event, id) => {
    const currentAuthData = { ...authData.form };

    const currentAuthDataElement = currentAuthData[id];

    currentAuthDataElement.value = event.target.value;
    currentAuthDataElement.touched = true;
    currentAuthDataElement.valid = checkValidity(
      currentAuthDataElement.value,
      currentAuthDataElement.validation
    );
    currentAuthData[id] = currentAuthDataElement;

    setAuthData((curr) => {
      return {
        ...curr,
        form: currentAuthData,
      };
    });
  };

  const onSwitchToSignInHandler = () => {
    setAuthData((current) => {
      return { ...current, signUp: !current.signUp };
    });
  };

  let form = (
    <form>
      {Object.entries(authData.form)
        .map((data) => {
          return {
            id: data[0],
            config: data[1],
          };
        })
        .map((x) => (
          <Input
            key={x.id}
            inputType={x.config.elementType}
            inputConfig={x.config.elementConfig}
            name={x.id}
            value={x.config.value}
            changed={(evt) => onChangeInputHandler(evt, x.id)}
            isValid={x.config.valid}
            shouldValidate={x.config.validation}
            isTouched={x.config.touched}
          />
        ))}
    </form>
  );

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;

  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }
  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }
  return (
    <div style={styles.container}>
      {authRedirect}
      <h4>{authData.signUp ? "Sign-up" : "Login"}</h4>
      {form}
      <Button
        buttonType="Success"
        clicked={() =>
          props.onSubmitHandler(
            authData.form.username.value,
            authData.form.password.value,
            authData.signUp
          )
        }
      >
        {authData.signUp ? "Sign-up" : "Sign-in"}
      </Button>
      {errorMessage}
      <Button buttonType="Danger" clicked={onSwitchToSignInHandler}>
        Switch to {authData.signUp ? "Sign-in" : "Sign up"}
      </Button>
    </div>
  );
};

const styles = {
  container: {
    width: "80%",
    margin: "20px auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 2px 3px #ccc",
    border: "1px solid #eee",
    padding: "10px",
    boxSizing: "border-box",
  },
};

const mapStateToProps = (state) => {
  return {
    isAthenticated: state.auth.authenticate,
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token ? true : false,
    buildingBurger: state.burger.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitHandler: (email, password, isSignUp) => {
      dispatch(actionCreator.authenticateUser(email, password, isSignUp));
    },
    onSetAuthRedirectPath: () =>
      dispatch(actionCreator.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
