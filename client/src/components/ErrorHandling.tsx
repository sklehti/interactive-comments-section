import React from "react";
import errorIcon from "./images/icon-error.svg";

const ErrorHandling = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <div className="error-modal">
      <div className="error-content">
        <div className="error-img">
          <img src={errorIcon} alt="error image" />
        </div>
        <h2>{errorMessage}</h2>
      </div>
    </div>
  );
};
export default ErrorHandling;
