import React from "react";
import PropTypes from "prop-types";
import "./Table.css";

const Table = ({ dataObj }) => (
  <div className="table">
    {Object.keys(dataObj).map(key => {
      return (
        <div className="row" key={key}>
          <span className="col">{key}:</span>
          <span>{dataObj[key]}</span>
        </div>
      );
    })}
  </div>
);

Table.propTypes = {
  dataObj: PropTypes.shape().isRequired
};

export default Table;