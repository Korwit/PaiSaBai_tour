import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import "../css/nav.css";

function NavBar({ allData, closeFilter, closeTour, closePlace }) {
  const toMain = () => {
    const data = allData.map((item) => item.attributes.name);
    closeFilter(data)
    closeTour([]);
    closePlace([]);
  };
  return (
    <Navbar className="bar-color" sticky="top">
      <Container>
        <Navbar.Brand onClick={() => toMain()} className="brand">
          <img src="/logoo.png" className="logo" />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link className="text">ประวัติการจอง</Nav.Link>
          <Nav.Link className="text">สถานะการชำระเงิน</Nav.Link>
          <Nav.Link className="text">การตั้งค่า</Nav.Link>
        </Nav>
        <Nav>
          <Button className="custom-button">เข้าสู่ระบบ</Button>
          <Button className="custom-button">สมัครสมาชิก</Button>
        </Nav>
      </Container>
    </Navbar>
  );
}
export default NavBar;
