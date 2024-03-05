import { Navbar, Container, Nav, Button, Card, Row } from "react-bootstrap";
import "../css/nav.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

function NavBar({ allData, closeFilter, closeTour, closePlace }) {
  const jwt = localStorage.getItem("jwt");
  
  const [userInfo, setUserInfo] = useState([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const toMain = () => {
    try {
      const data = allData.map((item) => item.attributes.name);
      closeFilter(data);
      closeTour([]);
      closePlace([]);
    } catch (error) {
      navigate("/");
    }
  };

  const handlelogout = () => {
    localStorage.removeItem("jwt");
    window.location.reload();
  };

  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setShowProfileMenu(false);
    }
  };

  useEffect(() => {
    const user = async () => {
      try {
        const response = await axios.get("/users/me?populate=*");
        setUserInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    user();
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Navbar className="bar-color" sticky="top" collapseOnSelect expand="md">
      <Container>
        <Navbar.Brand onClick={() => toMain()} className="brand">
          <img src="/logoo.png" className="logo" alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" variant="light" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {jwt !== null && (
            <Nav className="nav-head">
              <Nav.Link className="text" href="/history">
                ประวัติการจอง
              </Nav.Link>
              <Nav.Link className="text" href="/paymentstatus">
                สถานะการชำระเงิน
              </Nav.Link>
              <Nav.Link className="text" href="/payment">
                ชำระเงิน
              </Nav.Link>
              <Nav.Link className="text" href="/setting">
                การตั้งค่า
              </Nav.Link>
            </Nav>
          )}
          {jwt === null ? (
            <Nav className="ms-auto">
              <Button
                className="custom-button-top"
                onClick={() => navigate("/login")}
              >
                เข้าสู่ระบบ
              </Button>
              <Button
                className="custom-button-bottom"
                onClick={() => navigate("/register")}
              >
                สมัครสมาชิก
              </Button>
            </Nav>
          ) : (
            <Nav>
              <Button
                className="custom-button-bottom"
                onClick={() => handlelogout()}
              >
                ออกจากระบบ
              </Button>
              <div ref={profileRef} style={{ position: "relative" }}>
                <Button
                  style={{
                    borderRadius: "50%",
                    marginLeft: "5%",
                    width: "50px",
                    height: "50px",
                    backgroundColor: "white",
                    border: "none",
                  }}
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                  <img
                    src={
                      userInfo.profile != null
                        ? "http://localhost:1337" + userInfo.profile.url
                        : "/user.png"
                    }
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Button>
                {showProfileMenu && (
                  <Card
                    style={{
                      position: "absolute",
                      top: "100%",
                      right: 0,
                      backgroundColor: "white",
                      border: "none",
                      width: "150px",
                      height: "auto",
                      display: "flex",
                      justifyContent: "left",
                      alignItems: "left",
                      padding: "20%"
                    }}
                  >
                    <Row>@{userInfo.username}<hr /></Row>
                    <Row>
                      <Nav.Link href="/setting">
                        โปรไฟล์
                      </Nav.Link>
                    </Row>
                  </Card>
                )}
              </div>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
