import { Table } from "react-bootstrap";
import { DateTime } from "luxon";

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
          <td>
            {DateTime.fromISO(startDate.toISOString()).toFormat("dd.MM.yyyy")}
          </td>
          <td>{currency.label || currency}</td>
          <td>{`${rate} PLN`}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default RateTable;
