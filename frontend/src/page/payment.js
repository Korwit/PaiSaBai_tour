import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/payment.css';
import axios from 'axios';
import NavBar from '../component/navbar-main';
import PaymentCard from '../component/card-payment';


const PaymentPage = () => {
  return (
    <div>
    <NavBar />
    <div className="frame-large">
      <center><h2>ชำระเงิน</h2></center>
      <PaymentCard />
    </div>
    </div>
  );
};

export default PaymentPage;
