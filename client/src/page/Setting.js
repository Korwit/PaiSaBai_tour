import React, { useEffect, useState } from "react";
import { Form, Button, Alert, Spinner, Col } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosConfig from "../axios-interceptor";
import { useNavigate } from "react-router-dom";
//import { useAuth } from './AuthContext';
import "../css/setting.css";
import NavBar from "../component/navbar-main";
import config from "../config";

const Setting = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitEnabled, setSubmitEnabled] = useState(true);
  const [lastname, setLastname] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [setdata, setData] = useState();
  const jwt = localStorage.getItem("jwt");
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");
  const [files, setFiles] = useState();
  const [profile, setProfile] = useState();
  const [isEditings, setIsEditings] = useState(false);
  const [isEditingpass, setIsEditingpass] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [passwordCur, setPasswordCur] = useState("");
  const [showPasswordcur, setShowPasswordcur] = useState(false);

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleLastname = (e) => {
    setLastname(e.target.value);
  };

  const handlePasswordChanges = (e) => {
    setPasswordConfirm(e.target.value);
  };
  const handlePasswordCurrent = (e) => {
    setPasswordCur(e.target.value);
  };

  const togglePasswordVisibilitys = () => {
    setShowPasswords(!showPasswords);
  };

  const togglePasswordVisibilitycur = () => {
    setShowPasswordcur(!showPasswordcur);
  };

  const handlepass = async (e) => {
    e.preventDefault();
    setSubmitEnabled(false);

    try {
      setIsLoading(true);
      if (password == passwordConfirm) {
        if (password.length < 6) {
          toast("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
        } else if (passwordCur == password) {
          toast("กรุณาตั้งรหัสผ่านที่ไม่ซ้ำกับรหัสผ่านปัจจุบัน");
        } else {
          axios.defaults.headers.common = { Authorization: `bearer ${jwt}` };
          let result = await axios.post("/auth/change-password", {
            currentPassword: passwordCur,
            password: password,
            passwordConfirmation: passwordConfirm,
          });
          toast("เปลี่ยนรหัสผ่านเรียบร้อย");
          console.log(result);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      } else {
        //setShowAlert(true);
        toast("กรุณากรอกรหัสผ่านให้ตรงกัน");
        console.log("กรุณากรอกรหัสผ่านให้ตรงกัน");
      }
    } catch (e) {
      console.log(e);
      if (
        e.response.data.error.message ==
        "The provided current password is invalid"
      ) {
        toast("กรอกรหัสผ่านปัจจุบันผิด");
      }
    } finally {
      setSubmitEnabled(true);
      setIsLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlephone = (e) => {
    if (/^\d+$/.test(e.target.value) || e.target.value === "") {
      if (e.target.value.length <= 10) {
        setPhone(e.target.value);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async () => {
    setIsEditing(true);
  };
  const handlechangepassword = async () => {
    setIsEditingpass(true);
  };

  const handlemain = async () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.headers.common = { Authorization: `bearer ${jwt}` };
        const result = await axios.get("/users/me?populate=*");
        setData(result.data);
        console.log(result.data);
        setGender(result.data.gender);
        setUsername(result.data.username);
        setLastname(result.data.lastname);
        if (result.data?.profile?.url)
          setProfile(config.serverAdminUrlPrefix + result.data.profile.url);

        setPhone(result.data.phone);
      } catch (error) {
        axios.defaults.headers.common = "";
        navigate("/");
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitEnabled(false);

    try {
      setIsLoading(true);
      if (username.length != "" && username.length < 3) {
        toast("กรุณาตั้งชื่ออย่างน้อย 3 ตัวอักษร");
      } else if (phone.length != "" && phone.length < 10)
        toast("กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง");
      else {
        const data = setdata.id;

        const results = await axios.put(`users/${data}`, {
          username: username,
          lastname: lastname,
          firstname: username,
          phone: phone,
          gender: gender,
        });

        console.log(results.data.id);
        if (files != null) {
          const formData = new FormData();
          formData.append("files", files[0]);
          formData.append("refId", results.data.id);
          formData.append("field", "profile");
          formData.append("ref", "plugin::users-permissions.user");
          axios.post("/upload", formData);
        }
        if (isEditings) {
          const data = setdata.profile.id;
          await axios.delete(`/upload/files/${data}`);
        }
      }

      toast("บันทึกข้อมูลเรียบร้อย");
      setTimeout(() => {
        navigate("/");
      }, 1000);

      // axiosConfig.jwt = result.data.jwt;
      // axios.defaults.headers.common = { 'Authorization': `bearer ${result.data.jwt}` };
    } catch (e) {
      console.log(e);
      let message = e.response.data.error.message;

      console.log(e.response.data.error.message);
    } finally {
      setSubmitEnabled(true);
      setIsLoading(false);
    }
  };

  const previewImage = (event) => {
    setFiles(event.target.files);
    console.log(event.target.files);
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleResetImage = async () => {
    setImage("/user.png");
    setIsEditings(true);
  };

  return (
    <div className="body ">
      <NavBar />
      <h1>ตั้งค่า</h1>
      <div className="login-container">
        <img
          src={image ? image : profile ? profile : "/user.png"}
          alt="Header Image"
          className="header-image"
          style={{ width: "100px", height: "100px" }}
        />
      </div>
      <div style={{ textAlign: "center", fontSize: "20px", color: "white" }}>
        {!isEditing && !isEditingpass && setdata && (
          <React.Fragment>
            <strong>ชื่อ :</strong> {setdata.username}{" "}
            <strong style={{ marginLeft: "9px" }}>นามสกุล:</strong>{" "}
            {setdata.lastname}
            <br />
            <strong>อีเมล :</strong> {setdata.email}
            <br />
            <strong>เบอร์โทรศัพท์ :</strong> {setdata.phone}
            <br />
            <strong>เพศ :</strong>{" "}
            {setdata.gender
              ? setdata.gender === "Female"
                ? "หญิง"
                : "ชาย"
              : "ยังไม่ระบุ"}
            <br />
          </React.Fragment>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {isEditing && profile && (
          <Button variant="danger" onClick={handleResetImage}>
            ลบรูปภาพ
          </Button>
        )}
      </div>
      {isEditingpass && (
        <Form onSubmit={handlepass} className="custom-form">
          <br />
          <Form.Group controlId="formBasicPassword">
            <div className="password-input">
              <Form.Control
                style={{ width: "400px" }}
                type={showPasswordcur ? "text" : "password"}
                placeholder="รหัสผ่านปัจจุบัน"
                value={passwordCur}
                onChange={handlePasswordCurrent}
                required
              />
              <div
                className="password-toggle"
                onClick={togglePasswordVisibilitycur}
              >
                {showPasswordcur ? (
                  <img src="/show.png" alt="Show" />
                ) : (
                  <img src="/hide.png" alt="Hide" />
                )}
              </div>
            </div>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <div className="password-input">
              <Form.Control
                style={{ width: "400px" }}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <div
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <img src="/show.png" alt="Show" />
                ) : (
                  <img src="/hide.png" alt="Hide" />
                )}
              </div>
            </div>
          </Form.Group>

          <Form.Group controlId="formBasicPasswords">
            <div className="password-input">
              <Form.Control
                style={{ width: "400px" }}
                type={showPasswords ? "text" : "password"}
                placeholder="Confirm Password"
                value={passwordConfirm}
                onChange={handlePasswordChanges}
                required
              />
              <div
                className="password-toggle"
                onClick={togglePasswordVisibilitys}
              >
                {showPasswords ? (
                  <img src="/show.png" alt="Show" />
                ) : (
                  <img src="/hide.png" alt="Hide" />
                )}
              </div>
            </div>
          </Form.Group>

          <div style={{ marginTop: "50px" }}>
            <Button
              variant="primary"
              type="submit"
              disabled={!submitEnabled}
              className="buttonsendmail"
            >
              {isLoading ? <Spinner animation="border" size="sm" /> : "ยืนยัน"}
            </Button>{" "}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          </div>
        </Form>
      )}
      ;
      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          รหัสผ่านทั้งสองช่องไม่ตรงกัน กรุณาพิมพ์ใหม่
        </Alert>
      )}
      {isEditing && (
        <Form onSubmit={handleSubmit} className="custom-form">
          <label htmlFor="fileInput">เลือกรูปภาพ</label>
          <input
            className="password-input"
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={previewImage}
          />

          <Form.Group controlId="formBasicPassword">
            <div className="password-input">
              <Form.Control
                className="settingform"
                style={{ width: "400px" }}
                required
                placeholder="ชื่อ"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <div className="password-input">
              <Form.Control
                className="settingform"
                style={{ width: "400px" }}
                required
                placeholder="นามสกุล"
                value={lastname}
                onChange={handleLastname}
              />
            </div>
          </Form.Group>

          <Form.Group>
            <div className="password-input">
              <Form.Control
                className="settingform"
                onChange={handlephone}
                value={phone}
                required
                style={{ width: "400px" }}
                placeholder="เบอร์โทรศัพท์"
              />
            </div>
          </Form.Group>

          <Form.Check
            type="radio"
            label="ชาย"
            name="gender"
            id="Male"
            value="Male"
            checked={gender === "Male"}
            onChange={handleGenderChange}
          />
          <Form.Check
            type="radio"
            label="หญิง"
            name="gender"
            id="Female"
            value="Female"
            checked={gender === "Female"}
            onChange={handleGenderChange}
          />

          <div style={{ marginTop: "7px" }}>
            <Button variant="primary" type="submit" className="buttonsign">
              {isLoading ? <Spinner animation="border" size="sm" /> : "save"}
            </Button>{" "}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          </div>
        </Form>
      )}
      {(isEditing || isEditingpass) && (
        <Button
          variant="primary"
          type="submit"
          className="buttonsign"
          onClick={handlemain}
        >
          {isLoading ? <Spinner animation="border" size="sm" /> : "ยกเลิก"}
        </Button>
      )}
      {!isEditing && !isEditingpass && (
        <Button
          variant="primary"
          type="submit"
          onClick={handleSignup}
          className="buttonsign"
        >
          {isLoading ? <Spinner animation="border" size="sm" /> : "Edit"}
        </Button>
      )}
      {!isEditing && !isEditingpass && (
        <Button
          variant="primary"
          type="submit"
          onClick={handlechangepassword}
          className="buttonsign"
        >
          {isLoading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "เปลี่ยนรหัสผ่าน"
          )}
        </Button>
      )}
      <ToastContainer />
    </div>
  );
};

export default Setting;
