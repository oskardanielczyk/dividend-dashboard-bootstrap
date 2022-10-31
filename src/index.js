import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StocksProvider } from "./contexts/stocks/stocks.context";

import "react-datepicker/dist/react-datepicker.css";
import { UserInfoProvider } from "./contexts/user-info/user-info.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <UserInfoProvider>
      <StocksProvider>
        <App />
      </StocksProvider>
    </UserInfoProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
