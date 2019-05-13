import React from "react";
import Select from "../Select";
import PropTypes from "prop-types";

import { days, months, years } from "../../constants";
import "./SelectCurrencyDate.css";

const SelectCurrencyDate = ({ handleSelect, exchangeRates, currency, day, month, year }) => (
  <div className="selectWrap">
    <Select
      label="Currency"
      onClick={val => handleSelect("currency", val)}
      options={Object.keys(exchangeRates)}
      value={currency}
    />
    <Select
      label="Day"
      onClick={val => handleSelect("day", val)}
      options={days}
      value={day}
    />
    <Select
      label="Month"
      onClick={val => handleSelect("month", val)}
      options={months}
      value={month}
    />
    <Select
      label="Year"
      onClick={val => handleSelect("year", val)}
      options={years}
      value={year}
    />
  </div>
);

SelectCurrencyDate.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  exchangeRates: PropTypes.shape().isRequired,
  currency: PropTypes.string.isRequired,
  day: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired
};

export default SelectCurrencyDate;




