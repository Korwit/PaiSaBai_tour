import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import "../css/nav.css";
import { useNavigate } from 'react-router-dom';

function NavBar({ allData, closeFilter, closeTour, closePlace }) {
  const jwt = localStorage.getItem('jwt')
  const navigate = useNavigate();
  const toMain = () => {
    const data = allData.map((item) => item.attributes.name);
    closeFilter(data)
    closeTour([]);
    closePlace([]);


  };
  const handlelogin = () => {
    navigate('/login')
  }

  const handleregister = () => {
    navigate('/register')
  }

  const handlelogout = () => {
    localStorage.removeItem('jwt')
    window.location.reload()
    }

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
          {jwt === null ? (
            <Nav>
              <Button className="custom-button" onClick={() => handlelogin()}>เข้าสู่ระบบ</Button>
              <Button className="custom-button" onClick={() => handleregister()}>สมัครสมาชิก</Button>
            </Nav>
            ) : (
            <Button className="custom-button" onClick={() => handlelogout()}>ออกจากระบบ</Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
export default NavBar;
