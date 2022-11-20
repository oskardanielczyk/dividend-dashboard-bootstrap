import { useContext } from "react";
import { Modal, Button, Table } from "react-bootstrap";

import { StocksContext } from "../../contexts/stocks/stocks.context";

const StockInfoModal = (props) => {
  const { stocksArray } = useContext(StocksContext);
  const oneStock = [];

  const createOneStockArray = (stocks) => {
    if (!stocksArray) return;
    stocks.forEach((stock) => {
      if (stock.name === props.stockName) {
        oneStock.push({
          id: stock.id,
          date: stock.date,
          name: stock.name,
          ticker: stock.ticker,
          price: stock.price,
          numberOfStocks: stock.numberOfStocks,
        });
      }
    });
  };
  createOneStockArray(stocksArray);

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      backdrop="static"
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title className="h5">{`${props.stockName} (${props.stockTicker}) - historia transakcji`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Nazwa waloru</th>
              <th>Ticker</th>
              <th>Cena zakupu</th>
              <th>Ilość akcji</th>
            </tr>
          </thead>
          <tbody>
            {oneStock.map((stock) => (
              <tr className="align-middle" key={stock.id}>
                <td>{stock.name}</td>
                <td>{stock.ticker}</td>
                <td>{stock.price}</td>
                <td>{stock.numberOfStocks}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={props.handleClose}>
          Zamknij
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StockInfoModal;
