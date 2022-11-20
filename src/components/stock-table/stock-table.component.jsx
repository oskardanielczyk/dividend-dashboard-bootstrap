import { useState, useContext } from "react";
import { Container, Table } from "react-bootstrap";

import { StocksContext } from "../../contexts/stocks/stocks.context";
import StockTableRow from "../../components/stock-table-row/stock-table-row.component";
import StockInfoModal from "../stock-info-modal/stock-info-modal.component";
import Error from "../../components/error/error.component";

const StockTable = () => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedStockName, setSelectedStockName] = useState(null);
  const [selectedStockTicker, setSelectedStockTicker] = useState(null);
  const { allStocksData, isStocksLoading } = useContext(StocksContext);

  // Funkcje otwierające oraz zamykające modala
  const handleShow = () => setModalShow(true);
  const handleClose = () => setModalShow(false);

  // Funkcja reagująca na przycisk "Historia transakcji"
  const handleButton = (stockName, stockTicker) => {
    setSelectedStockName(stockName);
    setSelectedStockTicker(stockTicker);
  };

  return (
    <div>
      {isStocksLoading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : allStocksData.length > 0 ? (
        <Container>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Nazwa waloru</th>
                <th>Ticker</th>
                <th>Aktualny kurs</th>
                <th>Średnia cena zakupu</th>
                <th>Zwrot</th>
                <th>Ilość akcji</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {allStocksData.map((stock) => (
                <StockTableRow
                  stock={stock}
                  key={stock.id}
                  modalShow={handleShow}
                  handleButton={handleButton}
                />
              ))}
            </tbody>
          </Table>
        </Container>
      ) : (
        <Container>
          <Error className="alert-warning" msg="Brak walorów" />
        </Container>
      )}

      <StockInfoModal
        show={modalShow}
        handleClose={handleClose}
        stockName={selectedStockName}
        stockTicker={selectedStockTicker}
      />
    </div>
  );
};

export default StockTable;
