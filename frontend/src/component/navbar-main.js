import React from "react";
import {
  Navbar,
  Container,
  Nav,
  Button,
} from "react-bootstrap";
import "../css/nav.css";

function NavBar() {
  return (
    <Navbar className="bar-color" sticky="top">
      <Container>
        <Navbar.Brand className="text">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto">
            <Nav.Link className="text">ประวัติการจอง</Nav.Link>
            <Nav.Link className="text">สถานะการชำระเงิน</Nav.Link>
            <Nav.Link className="text">การตั้งค่า</Nav.Link>
          </Nav>
          <Nav>
            <Button className="custom-button">Login</Button>
            <Button className="custom-button">Sign Up</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavBar;
