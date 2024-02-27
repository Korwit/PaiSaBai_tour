import React, { useEffect, useState } from 'react';
import { Form, Button, Alert, Spinner, Col } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosConfig from '../axios-interceptor';
import { useNavigate } from 'react-router-dom';
//import { useAuth } from './AuthContext';
import '../css/setting.css';
import NavBar from "../component/navbar-main";

const Setting = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [submitEnabled, setSubmitEnabled] = useState(true);
    const [lastname, setLastname] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [setdata, setData] = useState();
    const jwt = localStorage.getItem('jwt')
    const [isEditing, setIsEditing] = useState(false);

    const [phone, setPhone] = useState('');

    const [gender, setGender] = useState('');

    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleLastname = (e) => {
        setLastname(e.target.value);

    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
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

    const handleSignup = async () => {
        setIsEditing(true)
    }

    const handlemain = async () => {
        navigate("/")
    }


    useEffect(() => {
        const fetchData = async () => {
            try {

                axios.defaults.headers.common = { 'Authorization': `bearer ${jwt}` }
                const result = await axios.get('/users/me');
                setData(result.data)
                console.log(result.data.id)
                setGender(result.data.gender)
                setUsername(result.data.username)
                setLastname(result.data.lastname)
                setPhone(result.data.phone)


            } catch (error) {
                axios.defaults.headers.common = ""
                navigate('/')
            }
        };

        fetchData();

    }, []);
    const handleSubmit = async (e) => {

        e.preventDefault();
        setSubmitEnabled(false);

        try {
            setIsLoading(true)
            if (username.length != "" && username.length < 3) {
                toast("กรุณาตั้งชื่ออย่างน้อย 3 ตัวอักษร");
            }
            else if (phone.length != "" && phone.length < 10)
                toast("กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง");
            else {
                const data = setdata.id;

                const results = await axios.put(`users/${data}`, {
                    username: username,
                    lastname: lastname,
                    firstname: username,
                    phone: phone,
                    gender: gender
                });
            }

            toast("บันทึกข้อมูลเรียบร้อย");
            setTimeout(() => {
                navigate('/');
            }, 1500);


            // axiosConfig.jwt = result.data.jwt;
            // axios.defaults.headers.common = { 'Authorization': `bearer ${result.data.jwt}` };



        } catch (e) {

            console.log(e);
            let message = e.response.data.error.message;

            console.log(e.response.data.error.message);
        } finally {
            setSubmitEnabled(true);
            setIsLoading(false)
        }
    };


    return (

        <div className="body ">
            <NavBar />
            <h1>ตั้งค่า</h1>
            <div className="login-container">
                <img src="/user.png" alt="Header Image" className="header-image" style={{ width: '100px', height: '100px' }} />
            </div>
            <div style={{ textAlign: 'center', fontSize: '20px', color: 'white' }}>
                <p>{!isEditing && setdata && (

                    <React.Fragment>
                        <strong>ชื่อ :</strong> {setdata.username} <strong style={{ marginLeft: '9px' }}>นามสกุล:</strong> {setdata.lastname}<br />
                        <strong>อีเมล :</strong> {setdata.email}<br />
                        <strong>เบอร์โทรศัพท์ :</strong> {setdata.phone}<br />
                        <strong>เพศ :</strong> {setdata.gender ? (setdata.gender === 'Female' ? 'หญิง' : 'ชาย') : 'ยังไม่ระบุ'}<br />
                        <strong>รหัสผ่าน :</strong> { }<br />
                    </React.Fragment>

                )}</p>
            </div>
            {isEditing && (
                <Form onSubmit={handleSubmit} className="custom-form" >




                    <Form.Group controlId="formBasicPassword" >
                        <div className="password-input">

                            <Form.Control className="settingform"
                                style={{ width: '400px' }}
                                required
                                placeholder="ชื่อ"
                                value={username}
                                onChange={handleUsernameChange}

                            />

                        </div>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" >
                        <div className="password-input">

                            <Form.Control className="settingform"
                                style={{ width: '400px' }}
                                required
                                placeholder="นามสกุล"
                                value={lastname}
                                onChange={handleLastname}

                            />

                        </div>
                    </Form.Group>

                    <Form.Group>
                        <div className="password-input">
                            <Form.Control className="settingform"
                                onChange={handlephone}
                                value={phone}
                                required
                                style={{ width: '400px' }}
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
                        checked={gender === 'Male'}
                        onChange={handleGenderChange}
                    />
                    <Form.Check
                        type="radio"
                        label="หญิง"
                        name="gender"
                        id="Female"
                        value="Female"
                        checked={gender === 'Female'}
                        onChange={handleGenderChange}
                    />

                    <div style={{ marginTop: '7px' }}>

                        <Button variant="primary" type="submit" className="buttonsign">
                            {isLoading ? <Spinner animation="border" size="sm" /> : 'save'}
                        </Button>  {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}




                    </div>
                </Form>
            )}
            {isEditing && (
                <Button variant="primary" type="submit" className="buttonsign" onClick={handlemain}>
                    {isLoading ? <Spinner animation="border" size="sm" /> : 'ยกเลิก'}
                </Button>
            )}
            {!isEditing && (
                <Button variant="primary" type="submit" onClick={handleSignup} className="buttonsign">
                    {isLoading ? <Spinner animation="border" size="sm" /> : 'Edit'}
                </Button>
            )}

            <ToastContainer />
        </div>



    );
};

export default Setting;


