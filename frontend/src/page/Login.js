import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import axiosConfig from "../axios-interceptor";
import { useNavigate } from "react-router-dom";
//import { useAuth } from './AuthContext';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/login.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitEnabled, setSubmitEnabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt != null) {
      navigate("/");
    }
  }, [jwt]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async () => {
    setIsLoading2(true);
    navigate("/register");
  };

  const handlemain = async () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitEnabled(false);

    try {
      setIsLoading(true);
      //axiosConfig.jwt = {};
      let result = await axios.post("/auth/local", {
        identifier: username,
        password: password,
      });

      //setAuth(result.data.jwt);
      localStorage.setItem("jwt", result.data.jwt);

      axiosConfig.jwt = result.data.jwt;
      console.log(result.data.jwt);
      axios.defaults.headers.common = {
        Authorization: `bearer ${result.data.jwt}`,
      };
      result = await axios.get("/users/me?populate=role");
      if (result.data.role) {
        if (result.data.role.name === "Member") {
          navigate("/");
        }
        if (result.data.role.name === "Admin") {
          navigate("/admin");
        }
      }
    } catch (e) {
      console.log(e);
      let message = e.response.data.error.message;
      if (message == "Your account email is not confirmed")
        toast("กรุณายืนยันอีเมลของคุณก่อนเข้าสู่ระบบ");
      else toast("อีเมลหรือรหัสผ่านของคุณผิด");

      console.log(e.response.data.error.message);
    } finally {
      setSubmitEnabled(true);
      setIsLoading(false);
    }
  };

  return (
    <div className="body ">
      <div className="login-container">
        <img
          src="/user.png"
          alt="Header Image"
          className="header-image"
          style={{ width: "100px", height: "100px" }}
        />
      </div>
      <Form onSubmit={handleSubmit} className="custom-form">
        <Form.Group controlId="formBasicUsername">
          <div className="password-input">
            <div className="password-lock">
              <img src="/userForm.png" alt="Show" />
            </div>
            <Form.Control
              className="custom-form1"
              style={{ width: "400px", backgroundImage: "url(show.jpg)" }}
              type="email"
              placeholder="Email"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <div className="password-input">
            <div className="password-lock">
              <img src="/lock.png" alt="Show" />
            </div>
            <Form.Control
              className="custom-form1"
              style={{ width: "400px" }}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <div className="password-toggle" onClick={togglePasswordVisibility}>
              {showPassword ? (
                <img src="/show.png" alt="Show" />
              ) : (
                <img src="/hide.png" alt="Hide" />
              )}
            </div>
          </div>
        </Form.Group>

        <div style={{ marginTop: "7px" }}>
          <h6>
            <a href="http://localhost:3000/email" class="forgot-password-link">
              Forgot password?
            </a>
          </h6>
          <Button
            variant="primary"
            type="submit"
            disabled={!submitEnabled}
            className="buttonlog"
          >
            {isLoading ? <Spinner animation="border" size="sm" /> : "Log in"}
          </Button>{" "}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        </div>
      </Form>
      <Button
        variant="primary"
        type="submit"
        onClick={handleSignup}
        disabled={!submitEnabled}
        className="buttonsign"
      >
        {isLoading2 ? <Spinner animation="border" size="sm" /> : "Sign up"}
      </Button>
      <Button
        variant="primary"
        type="submit"
        onClick={handlemain}
        disabled={!submitEnabled}
        className="buttonsign"
      >
        {isLoading2 ? (
          <Spinner animation="border" size="sm" />
        ) : (
          "กลับสู่หน้าหลัก"
        )}
      </Button>
      <ToastContainer />
    </div>
  );
};

export default Login;
