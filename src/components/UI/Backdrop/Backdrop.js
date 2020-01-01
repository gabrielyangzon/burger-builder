import React from "react";

const BackDrop = props =>
  props.show ? (
    <div onClick={props.clicked} style={styles.backdrop}></div>
  ) : null;

const styles = {
  backdrop: {
    width: "100%",
    height: "100%",
    position: "fixed",
    zIndex: "100",
    left: 0,
    top: 0,
    backgroundColor: "rgba(0,0,0 , 0.5)"
  }
};

export default BackDrop;
