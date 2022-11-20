import { useContext } from "react";

import StockTable from "../../components/stock-table/stock-table.component";
import TestChart from "../../components/test-chart/test-chart.component";
import UserInfo from "../../components/user-info/user-info.component";
import { UserContext } from "../../contexts/user/user.context";
import Auth from "../../routes/auth/auth.component";

const Home = () => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <>
      {isLoggedIn ? (
        <>
          <UserInfo />
          <StockTable />
          <TestChart />
        </>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default Home;
