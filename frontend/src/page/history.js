import React, { useState, useEffect } from "react";
import NavBar from "../component/navbar-main";
import BookingHistoryCard from "../component/card-history";
import '../css/history.css'
import { useNavigate } from 'react-router-dom';

const BookingHistory = () => {
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
      <div className="history-main">
        <h1>ประวัติการจอง</h1>
        <BookingHistoryCard/>
      </div>
    </div>
  );
};

export default BookingHistory;