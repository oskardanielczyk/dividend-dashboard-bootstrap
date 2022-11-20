import { useState, useContext, useEffect } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import axios from "axios";

import { UserContext } from "../../contexts/user/user.context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(UserContext);

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        `https://dividend-dashboard-backend.herokuapp.com/api/users/login`,
        {
          email,
          password,
        }
      );
      setIsLoading(false);
      login(response.data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <Container>
      <Card className="p-3">
        <h4 className="mb-3">Logowanie</h4>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Adres email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Podaj email"
              size="sm"
              onChange={emailHandler}
              value={email}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Hasło</Form.Label>
            <Form.Control
              type="password"
              placeholder="Podaj hasło"
              size="sm"
              onChange={passwordHandler}
              value={password}
            />
          </Form.Group>
          <Button size="sm" variant="secondary" onClick={loginHandler}>
            {isLoading ? (
              <>
                <span
                  className="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Loading...</span>
              </>
            ) : (
              <span>Wyślij</span>
            )}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
