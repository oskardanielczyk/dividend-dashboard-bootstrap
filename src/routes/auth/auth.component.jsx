import { useContext } from "react";
import { Container } from "react-bootstrap";

import Login from "../../components/login/login.component";
import Register from "../../components/register/register.component";
import { UserContext } from "../../contexts/user/user.context";
import Home from "../home/home.component";

const Auth = () => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <Container>
      {!isLoggedIn ? (
        <div className="d-flex flex-column flex-lg-row gap-3 justify-content-between">
          <Login />
          <Register />
        </div>
      ) : (
        <Home />
      )}
    </Container>
  );
};

export default Auth;
