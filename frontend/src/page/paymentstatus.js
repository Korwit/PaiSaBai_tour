import React, { useState, useEffect } from "react";
import NavBar from "../component/navbar-main";
import PaymentStatusCard from "../component/card-paymentstatus";
import '../css/paymentstatus.css'

const PaymentStatus = () => {

  return (
    <div>
      <NavBar />
      <div className="status-main">
        <h1>สถานะการชำระเงิน</h1>
        <PaymentStatusCard/>
      </div>
    </div>
  );
};

export default PaymentStatus;