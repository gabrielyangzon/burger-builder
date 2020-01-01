import React from "react";

import LogoImage from "../../assets/images/burger-logo.png";

const Logo = props => {
  return (
    <div style={{ height: props.height, marginBottom: props.marginBottom }}>
      <img style={{ width: 60, height: 30 }} src={LogoImage} alt="Logo" />
    </div>
  );
};

export default Logo;
