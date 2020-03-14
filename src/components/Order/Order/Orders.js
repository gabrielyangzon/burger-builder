import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 10px auto;
  width: 80%;
  height: 300;
  border: 1px solid #ccc;
  box-shadow: 0 2px 3px #ccc;
  padding: 10px;
  box-sizing: border-box;
`;

const Span = styled.span`
  text-transform: capitalize;
  display: inline-block;
  margin: 0 8px;
  border: 1px solid #ccc;
  padding: 5px;
`;

const Orders = props => {
  return (
    <Wrapper key={props.id}>
      <p>Your Orders</p>
      {props.date}
      <p>Ingredients:</p>{" "}
      {Object.entries(props.ingredients).map(x => (
        <Span key={x[0]}>{" " + x[0] + " : " + x[1]}</Span>
      ))}
      <p>
        Price: $ <strong>{props.price}</strong>
      </p>
    </Wrapper>
  );
};

export default Orders;
