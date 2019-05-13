import axios from "axios";

const getExchangeRates = ({ day, month, year, currency }) => 
  axios.get(`https://api.exchangeratesapi.io/${year}-${month}-${day}?base=${currency}`);

const getRatesForPastYear = ({ day, month, year, currency }) => 
  axios.get(`https://api.exchangeratesapi.io/history?start_at=${year - 1}-${month}-${day}&end_at=${year}-${month}-${day}&base=${currency}`);

export default { getExchangeRates, getRatesForPastYear };