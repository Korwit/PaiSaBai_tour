import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Spinner, Row, Col, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/register.css";
import config from "../config";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [phone, setPhone] = useState("");
  const [lastname, setLastname] = useState("");
  const [submitEnabled, setSubmitEnabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessages, setErrorMessages] = useState("");
  const [passMessage, setpassMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [conphone, setconphone] = useState(true);
  const [conpass, setconpass] = useState(true);
  const [conpasscon, setconpasscon] = useState(true);
  const [confirst, setconfirst] = useState(true);
  const [conlast, setconlast] = useState(true);
  const [conmail, setconmail] = useState(true);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt != null) {
      navigate("/");
    }
  }, [jwt]);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleCloseSuccess = () => setShowSuccess(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const Loginpage = (e) => {
    navigate("/login");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value == "") {
      setErrorMessages("");
    } else if (e.target.value.length < 6) {
      setErrorMessages("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
    } else {
      setErrorMessages("");
    }
    setconpass(false);
    setconpass(e.target.value === "");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setconmail(false);
    setconmail(e.target.value === "");
  };

  const handleFirstname = (e) => {
    setFirstname(e.target.value);
    setconfirst(false);
    setconfirst(e.target.value === "");
  };

  const handleLastname = (e) => {
    setLastname(e.target.value);
    setconlast(false);
    setconlast(e.target.value === "");
  };

  const handlePasswordChanges = (e) => {
    setPasswordConfirm(e.target.value);
    setconpasscon(false);
    setconpasscon(e.target.value === "");
  };

  const handlephone = (e) => {
    if (/^\d+$/.test(e.target.value) || e.target.value === "") {
      if (e.target.value.length <= 10) {
        setPhone(e.target.value);
      }
      setconphone(false);
      setconphone(e.target.value === "");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibilitys = () => {
    setShowPasswords(!showPasswords);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitEnabled(false);
    //if(password.length < 6)
    //setErrorMessage('Invalid username or password');

    if (password == passwordConfirm) {
      if (firstname.length < 3) {
        toast("กรุณาตั้งชื่ออย่างน้อย 3 ตัวอักษร");
      } else {
        if (phone.length < 10) toast("กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง");
        else {
          if (password.length < 6) {
            toast("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
          } else {
            if (isChecked == false) toast("กรุณายอมรับข้อตกลงตามเงื่อนไข");
            else {
              try {
                setIsLoading(true);
                let result = await axios.post(
                  `${config.serverUrlPrefix}/auth/local/register`,
                  {
                    email: email,
                    username: firstname,
                    password: password,
                    lastname: lastname,
                    firstname: firstname,
                    phone: phone,
                  }
                );
                setShowSuccess(true);
                setTimeout(() => {
                  navigate("/login");
                }, 3000);
              } catch (e) {
                console.log(e);
                setShow(true);
              } finally {
                setSubmitEnabled(true);
                setIsLoading(false);
              }
            }
          }
        }
      }
    } else {
      toast("กรุณากรอกรหัสผ่านให้ตรงกัน");
    }
  };

  return (
    <div className="body">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>การสมัครสมาชิก</Modal.Title>
        </Modal.Header>
        <Modal.Body>Email นี้มีการใช้งานแล้ว</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showSuccess} onHide={handleCloseSuccess}>
        <Modal.Header>
          <Modal.Title>การสมัครสมาชิก</Modal.Title>
        </Modal.Header>
        <Modal.Body>สมัครสมาชิกเรียบร้อยแล้ว กรุณายืนยันอีเมลของคุณ</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseSuccess}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      <h1 className="custom-h1">สมัครสมาชิก</h1>
      <Form onSubmit={handleSubmit} className="custom-form">
        <div className="password-inpu">
          <Row>
            <Col>
              <Form.Control
                onChange={handleFirstname}
                required
                value={firstname}
                style={{ height: "55px", backgroundColor: "#FFF48F" }}
                //placeholder="ชื่อ"
              />
              <div className="register-textshowname">
                {confirst && <h6>ชื่อ</h6>}
              </div>
            </Col>
            <Col>
              <Form.Control
                onChange={handleLastname}
                required
                value={lastname}
                style={{ height: "55px", backgroundColor: "#FFF48F" }}
                // placeholder="นามสกุล"
              />
              <div className="register-textshows">
                {conlast && <h6>นามสกุล</h6>}
              </div>
            </Col>
          </Row>
        </div>
        <Row>
          <Form.Group>
            <div className="register-input3">
              <Form.Control
                onChange={handleEmail}
                required
                value={email}
                style={{
                  width: "400px",
                  height: "55px",
                  backgroundColor: "#FFF48F",
                }}
                type="email"
                // placeholder="Email"
              />
              <div className="register-textshow">
                {conmail && <h6>Email</h6>}
              </div>
            </div>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group>
            <div className="register-input">
              <Form.Control
                onChange={handlephone}
                required
                value={phone}
                style={{
                  width: "400px",
                  height: "55px",
                  backgroundColor: "#FFF48F",
                }}
                //placeholder="เบอร์โทรศัพท์"
              />
              <div className="register-textshow">
                {conphone && <h6>เบอร์โทรศัพท์</h6>}
              </div>
            </div>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group>
            <div className="register-input1">
              <Form.Control
                style={{
                  width: "400px",
                  height: "55px",
                  backgroundColor: "#FFF48F",
                }}
                type={showPassword ? "text" : "password"}
                //placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <div
                className="register-toggle"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <img src="/show.png" alt="Show" />
                ) : (
                  <img src="/hide.png" alt="Hide" />
                )}
              </div>
              <div className="register-textshow">
                {conpass && <h6>รหัสผ่าน</h6>}
              </div>
            </div>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group controlId="formBasicPasswords">
            <div className="register-input2">
              <Form.Control
                style={{
                  width: "400px",
                  height: "55px",
                  backgroundColor: "#FFF48F",
                }}
                type={showPasswords ? "text" : "password"}
                //placeholder="Confirm Password"
                value={passwordConfirm}
                onChange={handlePasswordChanges}
                required
              />
              <div
                className="register-toggle"
                onClick={togglePasswordVisibilitys}
              >
                {showPasswords ? (
                  <img src="/show.png" alt="Show" />
                ) : (
                  <img src="/hide.png" alt="Hide" />
                )}
              </div>
              <div className="register-textshow">
                {conpasscon && <h6>ยืนยันรหัสผ่าน</h6>}
              </div>
            </div>
          </Form.Group>
        </Row>
        {errorMessages && <h6 style={{ color: "red" }}>{errorMessages}</h6>}
        <Form.Check
          className="checkbox"
          type="checkbox"
          label={
            <span>
              คุณยอมรับ{" "}
              <a href="#" onClick={handleShowModal} class="link">
                ข้อตกลงตามเงื่อนไข
              </a>
            </span>
          }
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <Button variant="primary" type="submit" className="buttonregister">
          {isLoading ? <Spinner animation="border" size="sm" /> : "สมัครสมาชิก"}
        </Button>{" "}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      </Form>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>ข้อตกลงตามเงื่อนไข</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          คุณได้ยอมรับการส่งอีเมลไปให้คุณ
          เพื่อยืนยันการลงทะเบียนสมัครสมาชิกและตั้งค่ารหัสผ่านใหม่
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            ปิด
          </Button>
        </Modal.Footer>
      </Modal>
      <span className="register-logintext">
        มีบัญชีอยู่แล้ว?
        <a href="#" onClick={Loginpage} class="link">
          {" "}
          เข้าสู่ระบบ
        </a>
      </span>{" "}
      .
      <ToastContainer />
    </div>
  );
};

export default Register;
