import { Button, Badge } from "react-bootstrap";

const StockTableRow = (props) => {
  const handleButtonClick = (event) => {
    props.handleButton(
      event.target.getAttribute("stockname"),
      event.target.getAttribute("stockticker")
    );
    props.modalShow();
  };

  return (
    <tr className="align-middle">
      <td>{props.stock.name}</td>
      <td>{props.stock.ticker}</td>
      <td>{`$${props.stock.price.toFixed(2)}`}</td>
      <td>{`$${props.stock.averagePrice.toFixed(2)}`}</td>
      <td>
        <Badge
          bg={props.stock.return < 0 ? "danger" : "success"}
          className="w-100"
        >{`${props.stock.return.toFixed(2)}%`}</Badge>
      </td>
      <td>{props.stock.numberOfStocks}</td>
      <td>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={handleButtonClick}
          stockname={props.stock.name}
          stockticker={props.stock.ticker}
        >
          Historia transakcji
        </Button>
      </td>
    </tr>
  );
};

export default StockTableRow;
