import { useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useContext } from "react";
import { StocksContext } from "../../contexts/stocks/stocks.context";
import StockTableRow from "../../components/stock-table-row/stock-table-row.component";
import StockInfoModal from "../stock-info-modal/stock-info-modal.component";

const StockTable = () => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedStockName, setSelectedStockName] = useState(null);
  const [selectedStockTicker, setSelectedStockTicker] = useState(null);
  const { allStocks } = useContext(StocksContext);

  const allStocksData = allStocks;

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
                key={stock.averagePrice}
                modalShow={handleShow}
                handleButton={handleButton}
              />
            ))}
          </tbody>
        </Table>
      </Container>

      {
        // Komponent stock info modal wyświetlany tylko w momencie naciśnięcia
        // przycisku
      }
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
