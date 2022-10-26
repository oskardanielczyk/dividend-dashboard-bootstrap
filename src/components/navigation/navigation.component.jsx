import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import "./navigation.styles.scss";

const Navigation = () => {
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
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Outlet />
      </Stack>
      <Navbar bg="light" expand="lg" variant="light" fixed="bottom">
        <Container>
          <Navbar.Text>
            stworzone przez oskar.danielczyk@gmail.com @2022
          </Navbar.Text>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
