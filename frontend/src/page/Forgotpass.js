import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
//import axiosConfig from './axios-interceptor';
import { useNavigate } from 'react-router-dom';
//import { useAuth } from './AuthContext';
import { useParams, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/email.css';

const Forgotpass = () => {
    const navigate = useNavigate();

    //const { code } = useParams();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    console.log(code)
    // const { setAuth } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [submitEnabled, setSubmitEnabled] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswords, setShowPasswords] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handlePasswordChanges = (e) => {
        setPasswordConfirm(e.target.value);
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

        try {
            setIsLoading(true)
            if (password == passwordConfirm) {
                if (password.length < 6) {
                    toast("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
                }
                else
                {
                    let result = await axios.post('http://localhost:1337/api/auth/reset-password', {
                    code: code,
                    password: password,
                    passwordConfirmation: passwordConfirm
                });
                navigate('/');
                }

            }
            else {
                //setShowAlert(true);
                toast("กรุณากรอกรหัสผ่านให้ตรงกัน");
                console.log("กรุณากรอกรหัสผ่านให้ตรงกัน")

            }

        } catch (e) {
            console.log(e);


        } finally {
            setSubmitEnabled(true);
            setIsLoading(false)
        }
    };


    return (

        <div className="body">
             <ToastContainer />
             <h1>ตั้งรหัสผ่านใหม่</h1>
            <Form onSubmit={handleSubmit} className="custom-form" >



                <br />
                <Form.Group controlId="formBasicPassword" >

                    <div className="password-input">
                        <Form.Control
                            style={{ width: '400px' }}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                        <div className="password-toggle" onClick={togglePasswordVisibility}>
                            {showPassword ? <img src="/show.png" alt="Show" /> : <img src="/hide.png" alt="Hide" />}
                        </div>
                    </div>

                </Form.Group>
         
                <Form.Group controlId="formBasicPasswords" >

                    <div className="password-input">
                        <Form.Control
                            style={{ width: '400px' }}
                            type={showPasswords ? 'text' : 'password'}
                            placeholder="Confirm Password"
                            value={passwordConfirm}
                            onChange={handlePasswordChanges}
                            required
                        />
                        <div className="password-toggle" onClick={togglePasswordVisibilitys}>
                            {showPasswords ? <img src="/show.png" alt="Show" /> : <img src="/hide.png" alt="Hide" />}
                        </div>
                    </div>

                </Form.Group>

                <div style={{ marginTop: '50px' }}>

                    <Button variant="primary" type="submit" disabled={!submitEnabled} className="buttonsendmail" >
                        {isLoading ? <Spinner animation="border" size="sm" /> : 'ยืนยัน'}
                    </Button>  {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                </div>
            </Form>
            {showAlert && (
                <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                    รหัสผ่านทั้งสองช่องไม่ตรงกัน กรุณาพิมพ์ใหม่
                </Alert>
            )}

        </div>



    );
};

export default Forgotpass;

