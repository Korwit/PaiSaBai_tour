import NavBar from "../component/navbar-main";
import PaymentStatusCard from "../component/card-paymentstatus";
import '../css/paymentstatus.css'
import { useNavigate } from 'react-router-dom';
import React, { useState,useEffect } from 'react';

const PaymentStatus = () => {
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");    
  useEffect(() => {    
      if (jwt == null) {
        window.location.reload();
        navigate('/')
      }
  }, [jwt]);
  return (
    <div>
      <NavBar />
      <div className="card-container">
        <h1>สถานะการชำระเงิน</h1>
          <PaymentStatusCard/>
      </div>
    </div>
  );
};

export default PaymentStatus;