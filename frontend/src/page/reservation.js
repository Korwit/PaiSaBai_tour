import React, { useState, useEffect } from "react";
import NavBar from "../component/navbar-main";
import '../css/reservation.css'
import ReservationCard from "../component/card-reservation";
import { useParams } from 'react-router-dom';

const ReservationPage = () => {
  const { tourId } = useParams();
  return (
    <div>
      <NavBar />
      <div className="frame-large">
        <center><h1>การจอง</h1></center>
        <ReservationCard />
      </div>
    </div>
  );
};

export default ReservationPage;
