import { createContext, useState } from "react";

export const StocksContext = createContext({
  stocksData: [],
});

export const StocksProvider = ({ children }) => {
  const stocks = [
    {
      date: "12-08-2022",
      name: "Apple",
      ticker: "AAPL",
      price: 136.65,
      numberOfStocks: 11,
    },
    {
      date: "06-09-2022",
      name: "Bank of America",
      ticker: "BAC",
      price: 36.45,
      numberOfStocks: 78,
    },
    {
      date: "04-09-2022",
      name: "Apple",
      ticker: "AAPL",
      price: 154.34,
      numberOfStocks: 9,
    },
    {
      date: "26-07-2022",
      name: "Microsoft",
      ticker: "MSFT",
      price: 124.67,
      numberOfStocks: 5,
    },
    {
      date: "14-09-2022",
      name: "Microsoft",
      ticker: "MSFT",
      price: 112.45,
      numberOfStocks: 17,
    },
  ];

  const [stocksData] = useState(stocks);
  const value = { stocksData };

  return (
    <StocksContext.Provider value={value}>{children}</StocksContext.Provider>
  );
};
