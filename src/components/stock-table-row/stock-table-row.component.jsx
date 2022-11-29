import {
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
} from "react-icons/bs";

const StockTableRow = (props) => {
  return (
    <tr className="align-middle">
      <td className="d-none d-lg-table-cell">{props.stock.name}</td>
      <td>{props.stock.ticker}</td>
      <td>{`$${props.stock.price.toFixed(2)}`}</td>
      <td>
        {props.stock.dayChange >= 0 ? (
          <BsFillArrowUpSquareFill color="#198754" />
        ) : (
          <BsFillArrowDownSquareFill color="#dc3545" />
        )}
        {` ${props.stock.dayChange.toFixed(2)}%`}
      </td>
      <td>{` $${props.stock.averagePrice.toFixed(2)}`}</td>
      <td>
        {props.stock.return >= 0 ? (
          <BsFillArrowUpSquareFill color="#198754" />
        ) : (
          <BsFillArrowDownSquareFill color="#dc3545" />
        )}
        {` ${props.stock.return.toFixed(2)}%`}
      </td>
      <td>{props.stock.numberOfStocks}</td>
    </tr>
  );
};

export default StockTableRow;
