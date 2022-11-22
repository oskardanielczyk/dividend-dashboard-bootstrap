import { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import axios from "axios";
import ReactDatePicker from "react-datepicker";

import { transactionSchema } from "../../utils/yup/schemas";
import Error from "../error/error.component";
import { UserContext } from "../../contexts/user/user.context";
import { StocksContext } from "../../contexts/stocks/stocks.context";

const AddStockModal = (props) => {
  const [error, setError] = useState(null);
  const { userLoginData } = useContext(UserContext);
  const { setReloadData } = useContext(StocksContext);

  const onSubmit = async (values, actions) => {
    try {
      await axios.post(
        `https://dividend-dashboard-backend.herokuapp.com/api/stocks`,
        {
          creator: userLoginData.userId,
          date: values.date,
          ticker: values.ticker,
          name: values.name,
          price: values.price,
          numberOfStocks: values.quantity,
        },
        {
          headers: {
            authorization: `Bearer: ${userLoginData.token}`,
          },
        }
      );
      actions.resetForm();
      props.handleClose();
      setReloadData(true);
    } catch (error) {
      setError(
        error.response.data.message ||
          "Błąd podczas dodawania nowej transakcji, spróbuj ponownie"
      );
      console.log(error);
    }
  };

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      date: new Date(),
      ticker: "",
      name: "",
      price: "",
      quantity: "",
    },
    validationSchema: transactionSchema,
    onSubmit,
  });

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      backdrop="static"
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title className="h5">Dodaj nową transakcję</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} autoComplete="off">
          <Form.Group className="mb-3">
            <Form.Label>Data</Form.Label>
            <ReactDatePicker
              id="date"
              selected={values.date}
              placeholderText={values.date}
              className="form-control text-muted"
              dateFormat="dd.MM.yyyy"
              onChange={(value) => {
                setFieldValue("date", value);
              }}
              onBlur={handleBlur}
              isInvalid={!!errors.date && touched.date}
            />
            <Form.Control.Feedback type="invalid">
              {errors.date}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ticker</Form.Label>
            <Form.Control
              id="ticker"
              type="text"
              placeholder="Podaj ticker akcji"
              size="sm"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.ticker}
              isInvalid={!!errors.ticker && touched.ticker}
            />
            <Form.Control.Feedback type="invalid">
              {errors.ticker}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nazwa</Form.Label>
            <Form.Control
              id="name"
              type="text"
              placeholder="Podaj nazwę akcji"
              size="sm"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              isInvalid={!!errors.name && touched.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cena</Form.Label>
            <Form.Control
              id="price"
              type="text"
              placeholder="Cena kupna"
              size="sm"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.price}
              isInvalid={!!errors.price && touched.price}
            />
            <Form.Control.Feedback type="invalid">
              {errors.price}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ilość akcji</Form.Label>
            <Form.Control
              id="quantity"
              type="text"
              placeholder="Ilość akcji"
              size="sm"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.quantity}
              isInvalid={!!errors.quantity && touched.quantity}
            />
            <Form.Control.Feedback type="invalid">
              {errors.quantity}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="success" type="submit">
            {isSubmitting ? (
              <>
                <span
                  className="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Loading...</span>
              </>
            ) : (
              <span>Dodaj transakcję</span>
            )}
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={props.handleClose}>
          Anuluj
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddStockModal;
