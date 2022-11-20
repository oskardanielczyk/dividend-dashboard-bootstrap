import { useContext, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";

import { UserContext } from "../../contexts/user/user.context";
import Error from "../error/error.component";
import { signupSchema } from "../../utils/yup/schemas";

const Register = () => {
  const onSubmit = async (event) => {
    try {
      const response = await axios.post(
        `https://dividend-dashboard-backend.herokuapp.com/api/users/signup`,
        {
          name: values.nameSubmit,
          email: values.emailSubmit,
          password: values.passwordSubmit,
        }
      );
      signup(response.data);
    } catch (error) {
      setError(
        error.response.data.message || "Wystąpił błąd podczas rejestracji"
      );
      console.log(error);
    }
  };

  const [error, setError] = useState(null);
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    touched,
  } = useFormik({
    initialValues: {
      nameSubmit: "",
      emailSubmit: "",
      passwordSubmit: "",
      confirmPasswordSubmit: "",
    },
    validationSchema: signupSchema,
    onSubmit,
  });
  const { signup } = useContext(UserContext);

  return (
    <Container>
      <Card className="p-3">
        <h4 className="mb-3">Rejestracja</h4>
        <Form onSubmit={handleSubmit} autoComplete="off">
          <Form.Group className="mb-3">
            <Form.Label>Imię i nazwisko</Form.Label>
            <Form.Control
              id="nameSubmit"
              type="text"
              placeholder="Podaj imię i nazwisko"
              size="sm"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.nameSubmit}
              isInvalid={!!errors.nameSubmit && touched.nameSubmit}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nameSubmit}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Adres email</Form.Label>
            <Form.Control
              id="emailSubmit"
              type="email"
              placeholder="Podaj email"
              size="sm"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.emailSubmit}
              isInvalid={!!errors.emailSubmit && touched.emailSubmit}
            />
            <Form.Control.Feedback type="invalid">
              {errors.emailSubmit}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Hasło</Form.Label>
            <Form.Control
              id="passwordSubmit"
              type="password"
              placeholder="Podaj hasło"
              size="sm"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.passwordSubmit}
              isInvalid={!!errors.passwordSubmit && touched.passwordSubmit}
            />
            <Form.Control.Feedback type="invalid">
              {errors.passwordSubmit}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Powtórz hasło</Form.Label>
            <Form.Control
              id="confirmPasswordSubmit"
              type="password"
              placeholder="Powtórz hasło"
              size="sm"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPasswordSubmit}
              isInvalid={
                !!errors.confirmPasswordSubmit && touched.confirmPasswordSubmit
              }
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPasswordSubmit}
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
              <span>Rejestruj</span>
            )}
          </Button>
        </Form>
        {error && <Error className="alert-danger mt-3" msg={error} />}
      </Card>
    </Container>
  );
};

export default Register;
