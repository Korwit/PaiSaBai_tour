import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
//import axiosConfig from './axios-interceptor';
import { useNavigate } from 'react-router-dom';
//import { useAuth } from './AuthContext';
import '../css/email.css';

const Emailsend = () => {
    const navigate = useNavigate();

   // const { setAuth } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [submitEnabled, setSubmitEnabled] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };


    const handleSubmit = async (e) => {

        e.preventDefault();
        setSubmitEnabled(false);

        try {
            setIsLoading(true)
            //axiosConfig.jwt = {};
            let result = await axios.post('http://localhost:1337/api/auth/forgot-password', {
                email: username,
               
            });

            
        } catch (e) {
            console.log(e);
            console.log('wrong Email');
            setErrorMessage('Invalid username or password');
        } finally {
            setSubmitEnabled(true);
            setIsLoading(false)
        }
    };


    return (
        
        <div className="body">
          <h1>อีเมลที่ต้องการรีเซ็ทรหัสผ่าน</h1>
        <Form onSubmit={handleSubmit} className="formmail" >          

            <Form.Group controlId="formBasicUsername">     
          
                <Form.Control
                    style={{width:'400px'}}                 
                    type="email" 
                    placeholder="Email"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                />
            </Form.Group>
            <br/>
            
            <div style={{ marginTop: '5px' }}>
        
            <Button variant="primary" type="submit" disabled={!submitEnabled} className="buttonsendmail" >
                {isLoading ? <Spinner animation="border" size="sm" /> : 'ส่งลิงค์'}
            </Button>  {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            </div>
        </Form>
      
        </div>
        


    );
};

export default Emailsend;

       /* <div className="login-container">
        <img src="/user.png" alt="Header Image" className="header-image" />
        </div>*/