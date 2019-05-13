import React, { useState } from "react";
import "./ErrorMessage.css";

const ErrorMessage = ({ error }) => {
  const [dismissed, setDismissed] = useState(false);

  return (
    error && !dismissed
      ? <div className="error">{error} <span onClick={setDismissed}>X</span></div>
      : null
  );
};

export default ErrorMessage;