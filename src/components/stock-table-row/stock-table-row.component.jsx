import { Button, ButtonGroup, Badge } from "react-bootstrap";

const StockTableRow = ({ stock, modalShow, handleButton }) => {
  const handleButtonClick = (event) => {
    handleButton(
      event.target.getAttribute("stockname"),
      event.target.getAttribute("stockticker")
    );
    modalShow();
  };

  return (
    <tr className="align-middle">
      <td>{stock.name}</td>
      <td>{stock.ticker}</td>
      <td>{`$${stock.price.toFixed(2)}`}</td>
      <td>{`$${stock.averagePrice.toFixed(2)}`}</td>
      <td>
        <Badge
          bg={stock.return < 0 ? "danger" : "success"}
          className="w-100"
        >{`${stock.return.toFixed(2)}%`}</Badge>
      </td>
      <td>{stock.numberOfStocks}</td>
      <td>
        <ButtonGroup aria-label="Basic example">
          <Button
            variant="outline-success"
            size="sm"
            stockname={stock.name}
            stockticker={stock.ticker}
          >
            Dodaj
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            stockname={stock.name}
            stockticker={stock.ticker}
          >
            Usuń
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={handleButtonClick}
            stockname={stock.name}
            stockticker={stock.ticker}
          >
            Historia transakcji
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  );
};

export default StockTableRow;
