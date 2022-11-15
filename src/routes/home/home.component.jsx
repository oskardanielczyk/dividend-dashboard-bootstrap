import StockTable from "../../components/stock-table/stock-table.component";
import TestChart from "../../components/test-chart/test-chart.component";
import UserInfo from "../../components/user-info/user-info.component";

const Home = () => {
  return (
    <>
      <UserInfo />
      <StockTable />
      <TestChart />
    </>
  );
};

export default Home;
