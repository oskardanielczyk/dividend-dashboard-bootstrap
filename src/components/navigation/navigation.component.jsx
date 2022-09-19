import { Outlet, Link } from "react-router-dom";

import { ReactComponent as DashboardLogo } from "../../assets/ballot.svg";
import { ReactComponent as CalculatorLogo } from "../../assets/pulse.svg";
import { ReactComponent as GraphsLogo } from "../../assets/trophy.svg";
import { ReactComponent as GiftsLogo } from "../../assets/gift.svg";

import "./navigation.styles.scss";

const Navigation = () => {
  return (
    <div className="main-container">
      <div className="navigation-container">
        <Link className="logo-container" to="/">
          <span className="logo">dividash</span>
        </Link>
        <div className="nav-link-container">
          <Link className="nav-link" to="/">
            <DashboardLogo className="nav-link-logo" />
            Dashboard
          </Link>
          <Link className="nav-link" to="/calculator">
            <CalculatorLogo className="nav-link-logo" />
            Calculator
          </Link>
          <Link className="nav-link" to="/graphs">
            <GraphsLogo className="nav-link-logo" />
            Graphs
          </Link>
          <Link className="nav-link" to="/gifts">
            <GiftsLogo className="nav-link-logo" />
            Gifts
          </Link>
        </div>
      </div>
      <div className="content-container">
        <Outlet />
      </div>
    </div>
  );
};

export default Navigation;
