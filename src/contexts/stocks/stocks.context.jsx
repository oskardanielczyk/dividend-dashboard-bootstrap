import { createContext, useReducer, useEffect, useContext } from "react";
import axios from "axios";

import { UserContext } from "../../contexts/user/user.context";
import { useState } from "react";

export const StocksContext = createContext({
  stocksArray: [],
  allStocksData: [],
  isStocksLoading: false,
});

const stocksReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "UPDATE_STOCKS":
      return {
        ...state,
        stocksArray: payload,
      };
    case "UPDATE_ALL_STOCKS":
      return {
        ...state,
        allStocksData: payload,
      };
    case "TURN_ON_LOADING":
      return {
        ...state,
        isStocksLoading: true,
      };
    case "TURN_OFF_LOADING":
      return {
        ...state,
        isStocksLoading: false,
      };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

const INITIAL_STATE = {
  stocksArray: [],
  allStocksData: [],
  isStocksLoading: false,
};

export const StocksProvider = ({ children }) => {
  const { isLoggedIn, userLoginData } = useContext(UserContext);
  const [state, dispatch] = useReducer(stocksReducer, INITIAL_STATE);
  const [reloadData, setReloadData] = useState(false);

  const allStocks = [];
  let transactions;

  useEffect(() => {
    const downloadTransactions = async () => {
      dispatch({ type: "TURN_ON_LOADING" });
      try {
        transactions = await axios.get(
          `https://dividend-dashboard-backend.herokuapp.com/api/stocks/user/${userLoginData.userId}`
        );
        if (transactions)
          dispatch({
            type: "UPDATE_STOCKS",
            payload: transactions.data.transactions,
          });
        dispatch({ type: "TURN_OFF_LOADING" });
      } catch (error) {
        console.log(error);
        dispatch({ type: "TURN_OFF_LOADING" });
      }
    };
    if (isLoggedIn) downloadTransactions();
    setReloadData(false);
  }, [isLoggedIn, reloadData]);

  useEffect(() => {
    createAllStocksArray(state.stocksArray);
  }, [state.stocksArray]);

  // Funkcja zmieniająca tablicę wszystkich tranaskcji na tablicę sumujcą wielkości pozycji z podziałem na aktywa
  const createAllStocksArray = (stocks) => {
    const map = new Map(stocks.map((i) => [i.name, i.ticker]));
    Array.from(map).forEach(([key, value]) => {
      let id,
        ticker,
        averagePrice = 0,
        numberOfStocks = 0,
        price = 164.76;
      stocks.forEach((stock) => {
        if (stock.name === key) {
          id = stock.id;
          ticker = stock.ticker;
          averagePrice === 0
            ? (averagePrice = stock.price)
            : (averagePrice = (averagePrice + stock.price) / 2);
          numberOfStocks += stock.numberOfStocks;
        }
      });
      allStocks.push({
        id,
        name: key,
        ticker,
        averagePrice,
        price,
        return: ((price - averagePrice) / averagePrice) * 100,
        numberOfStocks,
      });
    });
    dispatch({
      type: "UPDATE_ALL_STOCKS",
      payload: allStocks,
    });
  };

  return (
    <StocksContext.Provider value={{ state, setReloadData }}>
      {children}
    </StocksContext.Provider>
  );
};
