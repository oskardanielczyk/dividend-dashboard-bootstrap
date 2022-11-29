import { createContext, useReducer, useEffect, useContext } from "react";
import axios from "axios";

import { UserContext } from "../../contexts/user/user.context";
import { useState } from "react";

export const StocksContext = createContext({
  stocksArray: [],
  portfolioValue: 0,
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
    case "UPDATE_PORTFOLIO_VALUE":
      return {
        ...state,
        portfolioValue: payload,
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
  let portfolioValue = 0;
  let transactions;

  useEffect(() => {
    const downloadTransactions = async () => {
      dispatch({ type: "TURN_ON_LOADING" });
      try {
        transactions = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/stocks/user/${userLoginData.userId}`,
          {
            headers: {
              authorization: `Bearer: ${userLoginData.token}`,
            },
          }
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

      // try {
      //   const response = await axios.get(
      //     `https://eodhistoricaldata.com/api/real-time/AAPL.US?api_token=63846ed0c02bb2.60812969&fmt=json&s=MSFT,BAC`
      //   );
      //   // response.data.map((el) => console.log(el.close, el.code, el.change_p));
      //   console.log(response);
      // } catch (error) {
      //   console.log(error);
      // }
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
        price = 0,
        dayChange = 0;

      stocks.forEach((stock) => {
        if (stock.name === key) {
          id = stock.id;
          ticker = stock.ticker;
          averagePrice === 0
            ? (averagePrice = stock.price)
            : (averagePrice = (averagePrice + stock.price) / 2);
          numberOfStocks += stock.numberOfStocks;
          price = stock.closePrice;
          dayChange = stock.dayChange;
          portfolioValue += price * numberOfStocks;
        }
      });
      allStocks.push({
        id,
        name: key,
        ticker,
        averagePrice,
        price,
        dayChange,
        return: ((price - averagePrice) / averagePrice) * 100,
        numberOfStocks,
      });
    });
    dispatch({
      type: "UPDATE_ALL_STOCKS",
      payload: allStocks,
    });
    dispatch({
      type: "UPDATE_PORTFOLIO_VALUE",
      payload: portfolioValue,
    });
  };

  return (
    <StocksContext.Provider value={{ state, setReloadData }}>
      {children}
    </StocksContext.Provider>
  );
};
