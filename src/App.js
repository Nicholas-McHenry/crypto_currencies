import React, { Fragment } from "react";

import Header from "./components/Header";
import MainContent from "./components/MainContent";
import {
  prepareCryptoCurrencyData,
  prepareCurrencyPair
} from "./util/currencyProcessing";

const currenciesToTrack = [
  {
    event: "subscribe",
    channel: "ticker",
    symbol: "tBTCUSD"
  },
  {
    event: "subscribe",
    channel: "ticker",
    symbol: "tBTCEUR"
  },
  {
    event: "subscribe",
    channel: "ticker",
    symbol: "tETHUSD"
  },
  {
    event: "subscribe",
    channel: "ticker",
    symbol: "tETHEUR"
  },
  {
    event: "subscribe",
    channel: "ticker",
    symbol: "tEOSUSD"
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.logIn = this.logIn.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.state = {
      loggedIn: false,
      activeTab: 0,
      currencyPairs: [],
      cryptoCurrenciesData: []
    };
  }

  componentDidMount() {
    const ws = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
    ws.onopen = () => {
      currenciesToTrack.forEach(currency => {
        ws.send(JSON.stringify(currency));
      });
    };

    ws.onmessage = response => {
      const data = JSON.parse(response.data);

      if (data.event !== "info" && data.event !== "subscribed") {
        this.setState({
          cryptoCurrenciesData: prepareCryptoCurrencyData(
            this.state.cryptoCurrenciesData,
            data,
            this.state.currencyPairs
          )
        });
      } else if (data.event === "subscribed") {
        this.setState({
          currencyPairs: [
            ...this.state.currencyPairs,
            prepareCurrencyPair(data)
          ]
        });
      }
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };
  }

  logIn() {
    this.setState({
      loggedIn: true
    });
  }

  handleTabChange(event, newValue) {
    this.setState({
      activeTab: newValue
    });
  }

  render() {
    const { loggedIn, activeTab, cryptoCurrenciesData } = this.state;
    return (
      <Fragment>
        <Header
          passedProps={{
            isLoggedIn: loggedIn,
            activeTab,
            handleTabChange: this.handleTabChange,
            logInCallback: this.logIn
          }}
        />
        <MainContent passedProps={{ activeTab, data: cryptoCurrenciesData }} />
      </Fragment>
    );
  }
}

export default App;
