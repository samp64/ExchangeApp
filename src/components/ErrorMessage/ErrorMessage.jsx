import React, { useState } from "react";
import PropTypes from "prop-types";

import "./ErrorMessage.css";

const ErrorMessage = ({ error }) => {
  const [dismissed, setDismissed] = useState(false);

  return (
    !dismissed
      ? <div className="error">{error} <span onClick={setDismissed}>X</span></div>
      : null
  );
};

ErrorMessage.propTypes = {
  error: PropTypes.string
};

export default ErrorMessage;