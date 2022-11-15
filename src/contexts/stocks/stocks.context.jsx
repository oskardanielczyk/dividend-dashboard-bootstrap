import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

export const StocksContext = createContext({
  stocksData: [],
  allStocksData: [],
});

const stocksReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "UPDATE_STOCKS":
      return {
        stocksArray: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

const INITIAL_STATE = {
  stocksArray: [
    {
      date: "13-11-2022",
      name: "Apple",
      ticker: "AAPL",
      price: 134.5,
      numberOfStocks: 14,
    },
  ],
};

export const StocksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stocksReducer, INITIAL_STATE);

  useEffect(() => {
    let transactions;
    const downloadTransactions = async () => {
      transactions = await axios.get(
        `https://dividend-dashboard-backend.herokuapp.com/api/stocks/user/6368f3e1a030b0eda0998b43`
      );
      dispatch({
        type: "UPDATE_STOCKS",
        payload: transactions.data.transactions,
      });
    };
    downloadTransactions();
  }, []);

  const allStocks = [];

  // Funkcja zmieniająca tablicę wszystkich tranaskcji na tablicę sumujcą wielkości pozycji z podziałem na aktywa
  const createAllStocksArray = (stocks) => {
    const map = new Map(stocks.map((i) => [i.name, i.ticker]));
    Array.from(map).forEach(([key, value]) => {
      let ticker,
        averagePrice = 0,
        numberOfStocks = 0,
        price = 164.76;
      stocks.forEach((stock) => {
        if (stock.name === key) {
          ticker = stock.ticker;
          averagePrice === 0
            ? (averagePrice = stock.price)
            : (averagePrice = (averagePrice + stock.price) / 2);
          numberOfStocks += stock.numberOfStocks;
        }
      });
      allStocks.push({
        name: key,
        ticker: ticker,
        averagePrice: averagePrice,
        price: price,
        return: ((price - averagePrice) / averagePrice) * 100,
        numberOfStocks: numberOfStocks,
      });
    });
  };
  createAllStocksArray(state.stocksArray);

  const { stocksArray } = state;
  console.log(stocksArray);

  const value = { stocksArray, allStocks };

  return (
    <StocksContext.Provider value={value}>{children}</StocksContext.Provider>
  );
};
