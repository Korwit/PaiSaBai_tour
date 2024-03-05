// BookingHistoryCard.js
import React, { useState, useEffect } from "react";
import { Card, CardImg, CardBody, CardTitle, CardText } from "react-bootstrap";
import RatingCommentInput from "./RatingCommentInput";
import axios from "axios";
import "../css/BookingHistoryCard.css";

const BookingHistoryCard = () => {
  const [bookings, setBookings] = useState([]);

  const jwt = localStorage.getItem("jwt");
  axios.defaults.headers.common = {
    Authorization: `Bearer ${jwt}`,
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("th-TH", options);
  };

  const canRateAndComment = (tour) => {
    const endDate = new Date(tour.trip_dates?.[0]?.end_date);
    const today = new Date();
    const hasReservations = tour.reservations?.length > 0;

    if (
      today >= endDate &&
      hasReservations &&
      tour.reservations[0].payment_status == true
    ) {
      return true;
    } else {
      return false;
    }
  };

  const submitRatingAndComment = async (targetId, rating, comment) => {
    const payload = {
      data: {
        star: rating,
        comment: comment,
      },
    };

    try {
      const response = await axios.put(
        `http://localhost:1337/api/reservations/${targetId}`,
        payload
      );

      console.log("Rating and comment submitted successfully", response.data);

      fetchBookings();
    } catch (error) {
      console.error("Error submitting rating and comment:", error);
      alert(
        "An error occurred while submitting your rating and comment. Please try again later."
      );
    }
  };


const fetchBookings = async () => {
  try {
    const response = await axios.get(
      "http://localhost:1337/api/users/me?populate[tours][populate]=*"
    );

    const filteredBookings = response.data.tours.filter((tour) => {
      return tour.reservations?.[0]?.payment_status === true;
    });

    setBookings(filteredBookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
  }
};


  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="booking-history-container">
      {bookings.map((tour) => (
        <Card key={tour.id} className="historycard">
          <CardImg
            variant="top"
            src={`http://localhost:1337${tour.image.url}`}
            className="img-hs"
          />
          <CardBody className="hs-body">
            <CardTitle className="hs-title">{tour.name}</CardTitle>
            <CardText className="hs-text">
              จองสำเร็จ: {tour.created_at}
              <br />
              เริ่มเดินทาง: {formatDate(tour.trip_dates?.[0]?.go_date)}
              <br />
              เดินทางกลับ: {formatDate(tour.trip_dates?.[0]?.end_date)}
              <br />
              รูปแบบการเดินทาง: {tour.travel_by}
              <br />
              {canRateAndComment(tour) && (
                <RatingCommentInput
                  onSubmit={({ rating, comment }) => {
                    const reservationId = tour.reservations?.[0]?.id;
                    if (reservationId) {
                      submitRatingAndComment(reservationId, rating, comment);
                    } else {
                      console.error("No reservation ID found.");
                    }
                  }}
                />
              )}
            </CardText>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default BookingHistoryCard;
