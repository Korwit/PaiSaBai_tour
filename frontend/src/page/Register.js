import React, { useState } from 'react';
import { Form, Button, Alert, Spinner, Row, Col, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FormGroup, FormControl } from "react-bootstrap";
import '../css/register.css';

const Register = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [phone, setPhone] = useState('');
    const [lastname, setLastname] = useState('');
    const [submitEnabled, setSubmitEnabled] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorMessages, setErrorMessages] = useState('');
    const [passMessage, setpassMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswords, setShowPasswords] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [show, setShow] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [con, setcon] = useState(true);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const handleClose = () => {
        setShow(false);
        navigate('/');
    }
    const handleShow = () => setShow(true);
    const handleCloseSuccess = () => setShowSuccess(false);


    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const Loginpage = (e) => {
        navigate('/')
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (e.target.value !== '') {
            setErrorMessages('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
        } else {
            setErrorMessages('');
        }

    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleFirstname = (e) => {
        setFirstname(e.target.value);
    };

    const handleLastname = (e) => {
        setLastname(e.target.value);
    };

    const handlePasswordChanges = (e) => {
        setPasswordConfirm(e.target.value);  
        setcon(false);  
        setcon(e.target.value === '');
    };
   
    const handlephone = (e) => {
        if (/^\d+$/.test(e.target.value) || e.target.value === '') {
            if (e.target.value.length <= 10) {
                setPhone(e.target.value);
            }
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
            }
            else {
                if (phone.length < 10)
                    toast("กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง");
                else {
                    if (password.length < 6) {
                        toast("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
                    }
                    else {
                        if (isChecked == false)
                            toast("กรุณายอมรับข้อตกลงตามเงื่อนไข");
                        else {
                            try {

                                setIsLoading(true)
                                let result = await axios.post('http://localhost:1337/api/auth/local/register', {
                                    email: email,
                                    username: firstname,
                                    password: password,
                                    lastname: lastname,
                                    firstname: firstname,
                                    phone: phone,
                                });

                            } catch (e) {
                                console.log(e);
                                setShow(true)


                            } finally {
                                setSubmitEnabled(true);
                                setIsLoading(false)
                                setShowSuccess(true)
                            }
                        }

                    }

                }

            }

        }
        else {
            toast("กรุณากรอกรหัสผ่านให้ตรงกัน");
        }
    };


    return (

        <div className="body">

            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
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
                <Modal.Header >
                    <Modal.Title>การสมัครสมาชิก</Modal.Title>
                </Modal.Header>
                <Modal.Body>สมัครสมาชิกเรียบร้อยแล้ว กรุณายืนยันอีเมลของคุณ</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseSuccess}>
                        OK
                    </Button>

                </Modal.Footer>
            </Modal>

            <h1>สมัครสมาชิก</h1>

            <Form onSubmit={handleSubmit} className="custom-form">
            <div className="password-inpu">
                <Row>
                    <Col>
                    
                        <Form.Control onChange={handleFirstname}
                            required value={firstname} style={{ height: '55px',backgroundColor: '#FFF48F' }} 
                            //placeholder="ชื่อ" 
                            />
                            <div className="textshowname" >
                            {con && <p>ชื่อ</p>}
                            </div>
                    </Col> 
                    <Col>
                        <Form.Control onChange={handleLastname}
                            required value={lastname} style={{ height: '55px',backgroundColor: '#FFF48F' }}
                            // placeholder="นามสกุล"
                              />
                            <div className="textshows" >
                            {con && <p>นามสกุล</p>}
                            </div>
                    </Col>
                    
                </Row>
          </div>
                <Row>

                <Form.Group>
                    <div className="password-input3">
                        <Form.Control onChange={handleEmail}
                            required value={email} style={{ width: '400px',height: '55px', backgroundColor: '#FFF48F' }} type="email" 
                           // placeholder="Email" 
                            />
                                                        <div className="textshow" >
                            {con && <p>Email</p>}
                            </div>
                    </div>
                    </Form.Group>


                </Row>

                <Row><Form.Group>
                    <div className="password-input">
                    
                        <Form.Control onChange={handlephone}
                            required value={phone} style={{  width: '400px',height: '55px',backgroundColor: '#FFF48F' }} 
                            //placeholder="เบอร์โทรศัพท์" 
                            />
                            <div className="textshow" >
                            {con && <p>เบอร์โทรศัพท์</p>}
                            </div>
                    </div>
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group>
                        <div className="password-input1">
                            <Form.Control
                                style={{ width: '400px',height: '55px', backgroundColor: '#FFF48F' }}
                                type={showPassword ? 'text' : 'password'}
                                //placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                            <div className="password-toggle" onClick={togglePasswordVisibility}>
                                {showPassword ? <img src="/show.png" alt="Show" /> : <img src="/hide.png" alt="Hide" />}
                            </div>
                            <div className="textshow" >
                            {con && <p>รหัสผ่าน</p>}
                            </div>
                        </div>
                    </Form.Group>


                </Row>

                <Row>
                    <Form.Group controlId="formBasicPasswords" >

                        <div className="password-input2">
                            <Form.Control
                                style={{ width: '400px',height: '55px', backgroundColor: '#FFF48F' }}
                                type={showPasswords ? 'text' : 'password'}
                                //placeholder="Confirm Password"
                                value={passwordConfirm}
                                onChange={handlePasswordChanges}
                                
                                required
                            />
                            <div className="password-toggle" onClick={togglePasswordVisibilitys}>
                                {showPasswords ? <img src="/show.png" alt="Show" /> : <img src="/hide.png" alt="Hide" />}
                            </div>
                            <div className="textshow" >
                            {con && <p>ยืนยันรหัสผ่าน</p>}
                            </div>
                        </div>

                    </Form.Group>
                </Row>

                {errorMessages && <p style={{ color: 'red' }}>{errorMessages}</p>}
                <Form.Check className="checkbox"
                    type="checkbox"
                    label={<span>คุณยอมรับ  <a href="#" onClick={handleShowModal} class="link" >ข้อตกลงตามเงื่อนไข</a></span>}
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />

                <Button variant="primary" type="submit" className="button">
                    {isLoading ? <Spinner animation="border" size="sm" /> : 'สมัครสมาชิก'}
                </Button>  {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}


            </Form>
            <ToastContainer />

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>ข้อตกลงตามเงื่อนไข</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ที่นี่คือเนื้อหาของข้อตกลงตามเงื่อนไข
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        ปิด
                    </Button>
                </Modal.Footer>
            </Modal>
            <span className='logintext'>มีบัญชีอยู่แล้ว?<a href="#" onClick={Loginpage} class="link" > เข้าสู่ระบบ</a></span>
        </div>



    );
};

export default Register;
