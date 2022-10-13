import { Col, Container, Row } from "react-bootstrap";
import StockCard from "../../components/stock-card/stock-card.component";

import "./home.styles.scss";

const Home = () => {
  const stocks = [
    {
      name: "Apple",
      ticker: "AAPL",
      price: 136.65,
      numberOfStocks: 11,
    },
    {
      name: "Apple",
      ticker: "AAPL",
      price: 136.65,
      numberOfStocks: 11,
    },
    {
      name: "Apple",
      ticker: "AAPL",
      price: 136.65,
      numberOfStocks: 11,
    },
    {
      name: "Apple",
      ticker: "AAPL",
      price: 136.65,
      numberOfStocks: 11,
    },
    {
      name: "Apple",
      ticker: "AAPL",
      price: 136.65,
      numberOfStocks: 11,
    },
  ];
  return (
    <div>
      <Container>
        <Row>
          {stocks.map((stock) => (
            <Col>
              <StockCard stock={stock} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
