import { useState } from "react";
import { Container, Row, Col, Form, Table } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import Select from "react-select";
import axios from "axios";
import "./calculator.styles.scss";
import { useEffect } from "react";
import Error from "../../components/error/error.component";
import RateTable from "../../components/rate-table/rate-table.component";

const Calculator = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [currency, setCurrency] = useState("USD");
  const [allowedCurrencies, setAllowedCurrencies] = useState([]);
  const [rate, setRate] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  useEffect(() => {
    const getRates = async () => {
      const fetchDate =
        startDate.getFullYear() +
        "-" +
        (startDate.getMonth() < 9 ? "0" : "") +
        (startDate.getMonth() + 1) +
        "-" +
        (startDate.getDate() < 10 ? "0" : "") +
        startDate.getDate();
      try {
        setLoading(true);

        // get allowed currencies
        const helper_array = [];
        const response_currency = await axios.get(
          "https://api.nbp.pl/api/exchangerates/tables/a/"
        );
        const [temp_currency] = response_currency.data;
        const currency_array = temp_currency.rates;
        currency_array.map((rate) => {
          helper_array.push({
            value: rate.code.toLowerCase(),
            label: rate.code + " - " + rate.currency,
          });
        });
        setAllowedCurrencies(helper_array);

        // get rates
        const response = await axios.get(
          `https://api.nbp.pl/api/exchangerates/rates/a/${
            currency.value || currency
          }/${fetchDate}/`
        );
        const [temp] = response.data.rates;

        setRate(temp.mid);
        setError(null);
        setLoading(false);
      } catch (error) {
        setError(error.response.data);
        setLoading(false);
      }
    };
    getRates();
  }, [currency, startDate]);

  return (
    <Container>
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicDate">
              <Form.Label>Data dywidendy</Form.Label>
              <ReactDatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                filterDate={isWeekday}
                className="form-control text-muted"
              />
              <Form.Text className="text-muted">
                Podaj datę dywidendy w formacie D-1
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCurrency">
              <Form.Label>Waluta</Form.Label>
              <Select
                options={allowedCurrencies}
                placeholder={currency}
                onChange={(e) => setCurrency(e)}
                className="text-muted"
              />
              <Form.Text className="text-muted">
                Wybierz walutę z dostępnych
              </Form.Text>
            </Form.Group>
          </Form>

          {loading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <Error msg={error} />
          ) : (
            <RateTable startDate={startDate} currency={currency} rate={rate} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Calculator;
