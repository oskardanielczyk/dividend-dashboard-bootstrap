const StockTableRow = (props) => {
  return (
    <tr className="align-middle">
      <td>{props.stock.name}</td>
      <td>{props.stock.ticker}</td>
      <td>{`$${props.stock.price.toFixed(2)}`}</td>
      <td>{`$${props.stock.averagePrice.toFixed(2)}`}</td>
      <td>{`${props.stock.return.toFixed(2)}%`}</td>
      <td>{props.stock.numberOfStocks}</td>
    </tr>
  );
};

export default StockTableRow;
