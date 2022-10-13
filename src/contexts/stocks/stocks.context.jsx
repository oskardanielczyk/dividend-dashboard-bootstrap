import { createContext, useState, useEffect } from "react";

import { getUserStocks } from "../../utils/firebase/firebase.utils";

export const StocksContext = createContext({
  stocksData: [],
});

export const StocksProvider = ({ children }) => {
  const [stocksData, setStocksData] = useState([]);

  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("user"))) {
      const getStocks = async () => {
        const response = await getUserStocks(
          JSON.parse(sessionStorage.getItem("user"))
        );
        setStocksData(response);
      };
      getStocks();
    }
  }, []);

  const value = { stocksData };
  return (
    <StocksContext.Provider value={value}>{children}</StocksContext.Provider>
  );
};
