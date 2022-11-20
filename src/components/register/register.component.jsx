import { useContext, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import axios from "axios";

import { UserContext } from "../../contexts/user/user.context";
import Error from "../error/error.component";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useContext(UserContext);

  const nameHandler = (event) => {
    setName(event.target.value);
  };
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const secondPasswordHandler = (event) => {
    setSecondPassword(event.target.value);
  };

  const signupHandler = async (event) => {
    if (password !== secondPassword) {
      setError("Hasła nie są takie same");
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(
        `https://dividend-dashboard-backend.herokuapp.com/api/users/signup`,
        {
          name,
          email,
          password,
        }
      );
      setIsLoading(false);
      signup(response.data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <Container>
      <Card className="p-3">
        <h4 className="mb-3">Rejestracja</h4>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Imię i nazwisko</Form.Label>
            <Form.Control
              type="text"
              placeholder="Podaj imię i nazwisko"
              size="sm"
              onChange={nameHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Adres email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Podaj email"
              size="sm"
              onChange={emailHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Hasło</Form.Label>
            <Form.Control
              type="password"
              placeholder="Podaj hasło"
              size="sm"
              onChange={passwordHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Powtórz hasło</Form.Label>
            <Form.Control
              type="password"
              placeholder="Powtórz hasło"
              size="sm"
              onChange={secondPasswordHandler}
            />
          </Form.Group>
          <Button size="sm" variant="secondary" onClick={signupHandler}>
            {isLoading ? (
              <>
                <span
                  class="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Loading...</span>
              </>
            ) : (
              <span>Wyślij</span>
            )}
          </Button>
        </Form>
        {error && <Error className="alert-danger mt-3" msg={error} />}
      </Card>
    </Container>
  );
};

export default Register;
