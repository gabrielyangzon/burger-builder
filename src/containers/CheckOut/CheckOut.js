import React from "react";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { connect } from "react-redux";

const CheckOut = (props) => {
  const checkOutCancelHandler = () => {
    props.history.goBack();
  };

  const checkOutContinueHandler = () => {
    props.history.push("/checkout/contact-data");
  };

  let summary = <Redirect to="/" />;
  console.log(props.purchased);
  if (props.ingredients) {
    const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;

    summary = (
      <React.Fragment>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={props.ingredients}
          checkOutCancel={checkOutCancelHandler}
          checkOutContinue={checkOutContinueHandler}
        />
        <Route
          exact
          path={props.match.path + "/contact-data"}
          render={(props) => (
            <ContactData
              ingredients={props.ingredients}
              totalPrice={props.totalPrice}
              {...props}
            />
          )}
        />
      </React.Fragment>
    );
  }
  return summary;
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    purchased: state.order.purchased,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);
