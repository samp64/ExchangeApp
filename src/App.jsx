import React from "react";
import ReactDOM from "react-dom";

import SelectCurrencyDate from "./components/SelectCurrencyDate";
import Table from "./components/Table";
import Graph from "./components/Graph";
import ErrorMessage from "./components/ErrorMessage";
import Spinner from "./components/Spinner";

import api from "./services/api";

import "./app.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    const date = new Date();
    this.state = {
      exchangeRates: {},
      currency: "GBP",
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      error: null,
      historicalRates: []
    };
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  fetchCurrencies =  async () => {
    this.setState({ isLoading: true });
    const { currency, year, month, day } = this.state;
    try {
      const [exchangeRatesResult, historicalRatesResult] = await Promise.all([
        api.getExchangeRates({ day, month, year, currency }),
        api.getRatesForPastYear({ day, month, year, currency: "EUR" })
      ]);

      this.setState({
        exchangeRates: exchangeRatesResult.data.rates,
        historicalRates: historicalRatesResult.data.rates,
        isLoading: false,
        error: null
      });
    } catch (e) {
      let error;
      if(e.response) {
        error = e.response.data.error;
      } else {
        error = `Unable to load exchange rates for ${year}/${month}/${day} in ${currency}`;
      }
      this.setState({ error, isLoading: false });
    }
  }
  
  handleSelect = (name, value) => this.setState({ [name]: value  }, () => this.fetchCurrencies());
  
  render() {
    const { exchangeRates, currency, day, month, year, error, historicalRates, isLoading } = this.state;

    return (
      <div className="app">
        <span className="title">Exchange Rates App</span>
        <SelectCurrencyDate
          handleSelect={this.handleSelect}
          year={year}
          month={month}
          day={day}
          currency={currency}
          exchangeRates={exchangeRates}
        />
        {error && <ErrorMessage error={error} />}
        <div className="contentWrap">
          {!isLoading &&
            <React.Fragment>
              <Table dataObj={exchangeRates} />
              <Graph
                data={Object.values(historicalRates)}
                dataKey={currency}
                title={`${currency} against EUR for the past 12 months`}
              />
            </React.Fragment>}
          {isLoading && <Spinner />}
        </div>
      </div>
    );
  }
}

const mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
