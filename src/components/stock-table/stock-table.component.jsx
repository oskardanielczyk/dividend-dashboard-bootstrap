import { useContext } from "react";
import { Container, Table } from "react-bootstrap";

import { StocksContext } from "../../contexts/stocks/stocks.context";
import StockTableRow from "../../components/stock-table-row/stock-table-row.component";
import Error from "../../components/error/error.component";

const StockTable = () => {
  const {
    state: { allStocksData },
    state: { isStocksLoading },
  } = useContext(StocksContext);

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
          <p className="lead">Portfolio</p>
          <Table striped bordered size="sm" className="small" responsive>
            <thead>
              <tr>
                <th className="d-none d-sm-table-cell">Nazwa</th>
                <th>Ticker</th>
                <th>Cena</th>
                <th>Śr. cena</th>
                <th>Zwrot</th>
                <th>Ilość</th>
              </tr>
            </thead>
            <tbody>
              {allStocksData.map((stock) => (
                <StockTableRow stock={stock} key={stock.id} />
              ))}
            </tbody>
          </Table>
        </Container>
      ) : (
        <Container>
          <Error className="alert-warning" msg="Brak walorów" />
        </Container>
      )}
    </div>
  );
};

export default StockTable;
