import { Navbar, Container, Nav, Button, Row, Card } from "react-bootstrap";
import "../css/nav.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import config from "../config";

function NavBar({ allData, closeFilter, closeTour, closePlace }) {
  const jwt = localStorage.getItem("jwt");
  const [userInfo, setUserInfo] = useState([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const [screen, setScreen] = useState(window.innerWidth);

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
    navigate('/')
  };

  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setShowProfileMenu(false);
    }
  };

  useEffect(() => {
    const user = async () => {
      try {
        const response = await axios.get(
          `${config.serverUrlPrefix}/users/me?populate=*`,
          {
            headers: { Authorization: `Bearer ${jwt}` },
          }
        );
        setUserInfo(response.data);
      } catch (error) {
        console.log("You Are Public");
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

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screen]);

  return (
    <Navbar className="bar-color" sticky="top" collapseOnSelect expand="md">
      <Container>
        <Navbar.Brand onClick={() => toMain()} className="brand">
          <img src="/logoo.png" className="logo" alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="shape-profile"
        >
          <img
            src={
              userInfo.profile != null
                ? config.serverAdminUrlPrefix + userInfo.profile.url
                : "/user.png"
            }
            className="user-profile"
          />
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          {jwt !== null &&
          userInfo &&
          userInfo.role &&
          userInfo.role.name !== "Admin" ? (
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
              {screen < 770 && (
                <Nav>
                  <Nav.Link className="text" href="/setting">
                    โปรไฟล์
                  </Nav.Link>
                  <Button
                    className="custom-button-top"
                    onClick={() => handlelogout()}
                  >
                    ออกจากระบบ
                  </Button>
                </Nav>
              )}
            </Nav>
          ) : (
            userInfo &&
            userInfo.role &&
            userInfo.role.name === "Admin" && (
              <Nav className="nav-head">
                <Nav.Link className="text" href="/admin/addrecommend">
                  เพิ่มสถานที่แนะนำ
                </Nav.Link>
                <Nav.Link className="text" href="/admin/addtour">
                  เพิ่มโปรแกรมทัวร์
                </Nav.Link>
                <Nav.Link className="text" href="/admin/editpayment">
                  แก้ไขสถานะการชำระเงิน
                </Nav.Link>
                {screen < 770 && (
                  <Nav>
                    <Nav.Link className="text" href="/setting">
                      โปรไฟล์
                    </Nav.Link>
                    <Button
                      className="custom-button-top"
                      onClick={() => handlelogout()}
                    >
                      ออกจากระบบ
                    </Button>
                  </Nav>
                )}
              </Nav>
            )
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
            screen >= 770 && (
              <Nav>
                <div ref={profileRef} style={{ position: "relative" }}>
                  <Button
                    className="shape-profile"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                  >
                    <img
                      src={
                        userInfo.profile != null
                          ? config.serverAdminUrlPrefix + userInfo.profile.url
                          : "/user.png"
                      }
                      className="user-profile"
                    />
                  </Button>
                  {showProfileMenu && (
                    <Card className="menu-profile">
                      <Row style={{ marginLeft: "1%" }}>
                        <Nav.Link>@{userInfo.username}</Nav.Link>
                      </Row>
                      <Row style={{ marginLeft: "1%" }}>
                        <Nav.Link href="/setting">โปรไฟล์</Nav.Link>
                      </Row>
                      <Row style={{ marginLeft: "1%" }}>
                        <Nav.Link onClick={() => handlelogout()}>
                          ออกจากระบบ
                        </Nav.Link>
                      </Row>
                    </Card>
                  )}
                </div>
              </Nav>
            )
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
