import {
  Container,
  Card,
  Button,
  Table,
  ButtonGroup,
  Modal,
  Form,
} from "react-bootstrap";
import { useState } from "react";

const StockCard = ({ stock }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Header>Apple</Card.Header>
        <Card.Body>
          <Card.Title>{`Wartość: $${
            stock.price * stock.numberOfStocks
          }`}</Card.Title>
          <Table striped bordered hover size="sm" className="mt-4">
            <thead>
              <tr>
                <th>Ilość akcji</th>
                <th>Cena akcji</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{stock.numberOfStocks}</td>
                <td>{stock.price}</td>
              </tr>
            </tbody>
          </Table>
          <Container>
            <ButtonGroup
              aria-label="Basic example"
              className="d-flex justify-content-center mt-4"
            >
              <Button variant="outline-success" onClick={handleShow}>
                Dodaj akcje
              </Button>
              <Button variant="outline-danger">Usuń akcje</Button>
            </ButtonGroup>
          </Container>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj akcje:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Ile akcji dodać?</Form.Label>
            <Form.Control type="text" autoFocus />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Zamknij
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Zapisz zmiany
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default StockCard;
