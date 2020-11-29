/**
 * A function that takes current cryptoCurrencyData,
 * new single currency data from web socket
 * and list of all the currencies that we subscribed to.
 * It takes all that and process/formats it
 * in a way so we can show all that data neatly in a table.
 */
export const prepareCryptoCurrencyData = (
  currentData,
  newData,
  listOfCurrencies
) => {
  let finalData = [];
  if (currentData.length === 0) {
    finalData = [createCurrencyObject(newData, listOfCurrencies)];
  } else {
    let foundElement = currentData.findIndex(
      element => element.id === newData[0]
    );
    if (foundElement === -1) {
      finalData = [
        ...currentData,
        createCurrencyObject(newData, listOfCurrencies)
      ];
    } else {
      finalData = currentData.map(element => {
        if (element.id !== newData[0]) {
          return element;
        } else {
          return createCurrencyObject(newData, listOfCurrencies);
        }
      });
    }
  }

  return finalData;
};

/**
 * A function that takes the currency that we got from the web socket after subscribing
 * and just formats it the way that we need it.
 */
export const prepareCurrencyPair = data => {
  let pairID = data.chanId;
  let pairName = data.pair;

  return {
    pairID,
    pairName
  };
};

/**
 * A function that takes currency id that we got from the web socket,
 * list of current currencies and just returns that currency's name.
 * Basicaly just a simple mapper for currencies.
 */
export const getCurrencySymbol = (currencyID, listOfCurrencies) => {
  let symbol = null;

  listOfCurrencies.forEach(currency => {
    if (currency.pairID === currencyID) {
      symbol = currency.pairName;
    }
  });
  return symbol;
};

/**
 * A function that takes the crypto currency data that we got from the web socket,
 * list of currencies we're tracking and creates one object with the data we need for the table,
 * it basicaly represents one row in the table.
 */
export const createCurrencyObject = (currencySockedData, listOfCurrencies) => {
  let id = currencySockedData[0];
  let symbol = getCurrencySymbol(currencySockedData[0], listOfCurrencies);
  let dailyChange = "Currently unavailable";
  let volume = "Currently unavailable";
  let lastPrice = "Currently unavailable";

  if (currencySockedData[1] != null) {
    if (currencySockedData[1][4] != null) {
      dailyChange = currencySockedData[1][4].toFixed(2);
    }
    if (currencySockedData[1][7] != null) {
      volume = currencySockedData[1][7].toFixed(2);
    }
    if (currencySockedData[1][6] != null) {
      lastPrice = currencySockedData[1][6].toFixed(2);
    }
  }

  return { id, symbol, dailyChange, volume, lastPrice };
};
