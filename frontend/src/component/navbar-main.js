import { Navbar, Container, Nav, Button } from "react-bootstrap";
import "../css/nav.css";
import { useNavigate } from "react-router-dom";

function NavBar({ allData, closeFilter, closeTour, closePlace }) {
  const jwt = localStorage.getItem("jwt");
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
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavBar;
