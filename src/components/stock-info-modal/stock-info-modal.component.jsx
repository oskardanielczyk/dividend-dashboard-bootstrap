import { useContext } from "react";
import { StocksContext } from "../../contexts/stocks/stocks.context";
import { Modal, Button, Table } from "react-bootstrap";

const StockInfoModal = ({ show, handleClose, stockName, stockTicker }) => {
  const { stocksArray } = useContext(StocksContext);
  const stocks = stocksArray;
  const oneStock = [];

  const createOneStockArray = () => {
    stocks.forEach((stock) => {
      if (stock.name === stockName) {
        oneStock.push({
          date: stock.date,
          name: stock.name,
          ticker: stock.ticker,
          price: stock.price,
          numberOfStocks: stock.numberOfStocks,
        });
      }
    });
  };

  createOneStockArray();

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title className="h5">{`${stockName} (${stockTicker}) - historia transakcji`}</Modal.Title>
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
              <tr className="align-middle" key={stock.price}>
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
        <Button variant="outline-secondary" onClick={handleClose}>
          Zamknij
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StockInfoModal;
