import { useContext } from "react";
import { Modal, Button, Table } from "react-bootstrap";

import { StocksContext } from "../../contexts/stocks/stocks.context";

const StockHistoryModal = (props) => {
  const {
    state: { stocksArray },
  } = useContext(StocksContext);

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      backdrop="static"
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title className="h5">Historia transakcji</Modal.Title>
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
            {stocksArray.map((stock) => (
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

export default StockHistoryModal;
