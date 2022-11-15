import { Container } from "react-bootstrap";
import {
  PieChart,
  Pie,
  Legend,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useContext } from "react";
import { StocksContext } from "../../contexts/stocks/stocks.context";

const TestChart = () => {
  const { stocksArray } = useContext(StocksContext);
  const stocks = stocksArray;
  const allStocks = [];

  const createAllStocksArray = (stocks) => {
    const map = new Map(stocks.map((i) => [i.name, i.ticker]));
    Array.from(map).forEach(([key, value]) => {
      let numberOfStocks = 0,
        price = 164.95;
      stocks.forEach((stock) => {
        if (stock.name === key) {
          numberOfStocks += stock.numberOfStocks;
        }
      });
      allStocks.push({
        name: key,
        value: Number((price * numberOfStocks).toFixed(2)),
      });
    });
  };
  createAllStocksArray(stocks);

  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
    { name: "Group E", value: 278 },
    { name: "Group F", value: 1900 },
  ];

  const COLORS = [
    "#0d6efd",
    "#6610f2",
    "#6f42c1",
    "#d63384",
    "#dc3545",
    "#fd7e14",
    "#ffc107",
    "#198754",
    "#20c997",
    "#0dcaf0",
    "#adb5bd",
  ];

  return (
    <Container className="d-flex justify-content-between">
      <div style={{ width: "30%", height: 350 }}>
        <p className="text-center lead mt-3">Struktura portfela</p>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={allStocks}
              cx="50%"
              cy="50%"
              fill="#333"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend verticalAlign="top" />
            <Tooltip payload={data} separator=": " />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Container>
  );
};

export default TestChart;
