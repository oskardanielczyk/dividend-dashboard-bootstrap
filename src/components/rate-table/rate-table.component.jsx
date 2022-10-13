import { Table } from "react-bootstrap";

const RateTable = ({ startDate, currency, rate }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Data</th>
          <th>Waluta</th>
          <th>Kurs NBP</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{startDate.toLocaleDateString("en-us")}</td>
          <td>{currency.label || currency}</td>
          <td>{`${rate} PLN`}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default RateTable;
