import { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import { UserContext } from "../../contexts/user/user.context";
import "./navigation.styles.scss";

const Navigation = () => {
  const { isLoggedIn, logout } = useContext(UserContext);

  return (
    <>
      <Stack gap={3}>
        <Navbar bg="dark" expand="lg" variant="dark">
          <Container>
            <Navbar.Brand href="/">Dividend-dashboard</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Strona domowa</Nav.Link>
                <Nav.Link href="/calc">Kalkulator</Nav.Link>
                {!isLoggedIn ? (
                  <Nav.Link href="/auth">Logowanie/Rejestracja</Nav.Link>
                ) : (
                  <Nav.Link onClick={logout}>Wyloguj</Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Outlet />
      </Stack>
      {/* <Navbar bg="light" expand="lg" variant="light" fixed="bottom">
        <Container>
          <Navbar.Text>
            stworzone przez oskar.danielczyk@gmail.com @2022
          </Navbar.Text>
        </Container>
      </Navbar> */}
    </>
  );
};

export default Navigation;
