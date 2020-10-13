import React from "react";
import styled from "styled-components";

const Input = styled.div`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 8px;
`;

const InputElement = styled.input`
  width: 100%;
  outline: none;
  border: solid
    ${(props) =>
      props.isValid && props.shouldValidate ? " 1px #ccc" : " 1px red"};

  background-color: white;
  font: inherit;
  padding: 6px 10px;
  box-sizing: border-box;
  &:focus {
    border-color: blue;
  }
`;

const input = (props) => {
  let inputElement = null;

  switch (props.inputType) {
    case "input":
      inputElement = (
        <InputElement
          shouldValidate={props.shouldValidate}
          isValid={props.isValid}
          {...props.inputConfig}
          onChange={props.changed}
          touched={props.isTouched}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <InputElement
          as="textarea"
          {...props.inputConfig}
          shouldValidate={props.shouldValidate}
          onChange={props.changed}
          touched={props.isTouched}
        />
      );
      break;
    case "select":
      inputElement = (
        <InputElement
          shouldValidate={!props.shouldValidate}
          isValid={props.isValid}
          as="select"
          onChange={props.changed}
          touched={props.isTouched}
        >
          {props.inputConfig.options.map((el) => (
            <InputElement
              //   selected={el.selected}
              key={el.displayValue}
              as="option"
              value={el.value}
            >
              {el.displayValue}
            </InputElement>
          ))}
        </InputElement>
      );
      break;
    default:
      inputElement = (
        <InputElement
          shouldValidate={props.shouldValidate}
          isValid={props.isValid}
          {...props.inputConfig}
          onChange={props.changed}
          touched={props.isTouched}
        />
      );
  }

  return (
    <Input>
      <Label>{props.label}</Label>
      {inputElement}
    </Input>
  );
};

export default input;
