import { useContext, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";

import { UserContext } from "../../contexts/user/user.context";
import { loginSchema } from "../../utils/yup/schemas";
import Error from "../error/error.component";

const Login = () => {
  const [error, setError] = useState(null);
  const { login } = useContext(UserContext);

  const onSubmit = async (values, actions) => {
    try {
      const response = await axios.post(
        `https://dividend-dashboard-backend.herokuapp.com/api/users/login`,
        {
          email: values.email,
          password: values.password,
        }
      );
      login(response.data);
      actions.resetForm();
    } catch (error) {
      setError(
        error.response.data.message ||
          "Bład podczas logowania, spróbuj ponownie."
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
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  return (
    <Container>
      <Card className="p-3">
        <h4 className="mb-3">Logowanie</h4>
        <Form onSubmit={handleSubmit} autoComplete="off">
          <Form.Group className="mb-3">
            <Form.Label>Adres email</Form.Label>
            <Form.Control
              id="email"
              type="email"
              placeholder="Podaj email"
              size="sm"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              isInvalid={!!errors.email && touched.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Hasło</Form.Label>
            <Form.Control
              id="password"
              type="password"
              placeholder="Podaj hasło"
              size="sm"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              isInvalid={!!errors.password && touched.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Button size="sm" variant="secondary" type="submit">
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
              <span>Zaloguj</span>
            )}
          </Button>
        </Form>
        {error && <Error className="alert-danger mt-3" msg={error} />}
      </Card>
    </Container>
  );
};

export default Login;
