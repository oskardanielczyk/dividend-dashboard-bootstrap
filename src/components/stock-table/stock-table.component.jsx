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
  const { stocksData } = useContext(StocksContext);
  const stocks = stocksData;
  const allStocks = [];

  // Funkcja zmieniająca tablicę wszystkich tranaskcji na tablicę sumujcą wielkości pozycji z podziałem na aktywa
  const createAllStocksArray = (stocks) => {
    const map = new Map(stocks.map((i) => [i.name, i.ticker]));
    Array.from(map).forEach(([key, value]) => {
      let ticker,
        averagePrice = 0,
        numberOfStocks = 0,
        price = 164.95;
      stocks.forEach((stock) => {
        if (stock.name === key) {
          ticker = stock.ticker;
          averagePrice === 0
            ? (averagePrice = stock.price)
            : (averagePrice = (averagePrice + stock.price) / 2);
          numberOfStocks += stock.numberOfStocks;
        }
      });
      allStocks.push({
        name: key,
        ticker: ticker,
        averagePrice: averagePrice,
        price: price,
        return: ((price - averagePrice) / averagePrice) * 100,
        numberOfStocks: numberOfStocks,
      });
    });
  };
  createAllStocksArray(stocks);

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
            {allStocks.map((stock) => (
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
