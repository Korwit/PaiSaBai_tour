import { Navbar, Container, Nav, Button, Row, Card } from "react-bootstrap";
import "../css/nav.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

function NavBar({ allData, closeFilter, closeTour, closePlace }) {
  const jwt = localStorage.getItem("jwt");
  axios.defaults.headers.common = { Authorization: `bearer ${jwt}` };
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
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="shape-profile">
            <img
              src={
                userInfo.profile != null
                  ? "http://localhost:1337" + userInfo.profile.url
                  : "/user.png"
              }
             className="user-profile"
            />
        </Navbar.Toggle>
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
              <div ref={profileRef} style={{ position: "relative" }}>
                <Button
                  className="shape-profile"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                  <img
                    src={
                      userInfo.profile != null
                        ? "http://localhost:1337" + userInfo.profile.url
                        : "/user.png"
                    }
                    className="user-profile"
                  />
                </Button>
                {showProfileMenu && (
                  <Card className="menu-profile">
                    <Row style={{marginLeft: "1%"}}>
                      <Nav.Link>@{userInfo.username}</Nav.Link>
                    </Row>
                    <Row style={{marginLeft: "1%"}}>
                      <Nav.Link href="/setting">โปรไฟล์</Nav.Link>
                    </Row>
                    <Row style={{marginLeft: "1%"}}>
                      <Nav.Link onClick={() => handlelogout()}>
                        ออกจากระบบ
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
