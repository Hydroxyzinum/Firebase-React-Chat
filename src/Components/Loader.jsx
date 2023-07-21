import React from "react";

export const Loader = () => {
  return (
    <div className="login-container">
      <div className="login-btn_container">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
