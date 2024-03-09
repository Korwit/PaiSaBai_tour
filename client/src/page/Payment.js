import React, { useState,useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/payment.css';
import axios from 'axios';
import NavBar from '../component/navbar-main';
import PaymentCard from '../component/card-payment';
import { useNavigate } from 'react-router-dom';
import Footer from '../component/footer';

const PaymentPage = () => {
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");    
  useEffect(() => {    
      if (jwt == null) {
        window.location.reload();
        navigate('/')
      }
  }, []);
  return (
    <div >
    <NavBar />
    <div className="frame-large1">
      <center><h2>ชำระเงิน</h2></center>
      <PaymentCard />
    </div>
    </div>
  );
};

export default PaymentPage;
