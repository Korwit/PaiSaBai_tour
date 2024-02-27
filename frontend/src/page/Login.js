import React, { useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import axiosConfig from "../axios-interceptor";
import { useNavigate } from "react-router-dom";
//import { useAuth } from './AuthContext';
import "../css/login.css";

const Login = () => {
  const navigate = useNavigate();

  // const { setAuth } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitEnabled, setSubmitEnabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  //localStorage.removeItem('jwt');
  const [showPasswords, setShowPasswords] = useState(false);

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
    navigate("/register");
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
      axios.defaults.headers.common = {
        Authorization: `bearer ${result.data.jwt}`,
      };
      result = await axios.get("/users/me?populate=role");
      localStorage.setItem("username",result.data.username)
      
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
        setErrorMessage("กรุณายืนยันอีเมลของคุณก่อนเข้าสู่ระบบ");
      else setErrorMessage("อีเมลหรือรหัสผ่านของคุณผิด");
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
          <p>
            <a href="http://localhost:3000/email" class="forgot-password-link">
              Forgot password?
            </a>
          </p>
          <Button
            variant="primary"
            type="submit"
            disabled={!submitEnabled}
            className="custom-buttons"
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
        className="custom-buttons"
      >
        {isLoading ? <Spinner animation="border" size="sm" /> : "Sign up"}
      </Button>
    </div>
  );
};

export default Login;
