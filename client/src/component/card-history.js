import React, { useState, useEffect } from "react";
import { Card, CardImg, CardBody, CardTitle, CardText } from "react-bootstrap";
import RatingCommentInput from "./RatingCommentInput";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import "../css/BookingHistoryCard.css";
import config from "../config";

const BookingHistoryCard = () => {
  const [bookings, setBookings] = useState([]);
  const [submittedRating, setSubmittedRating] = useState(0);
  const [submittedComment, setSubmittedComment] = useState("");
  const [isRatingInputVisible, setIsRatingInputVisible] = useState(true);

  const jwt = localStorage.getItem("jwt");
  axios.defaults.headers.common = {
    Authorization: `Bearer ${jwt}`,
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("th-TH", options);
  };

  const canRateAndComment = (tour) => {
    const endDate = new Date(tour.tour?.trip_dates?.[0]?.end_date);
    const today = new Date();
    const hasReservations = tour.tour?.reservations?.length > 0;

    if (
      today >= endDate &&
      hasReservations &&
      tour.payment_status == true
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
        `${config.serverAdminUrlPrefix}/api/reservations/${targetId}`,
        payload
      );

      //console.log("Rating and comment submitted successfully", response.data);

      setSubmittedRating(rating);
      setSubmittedComment(comment);
      setIsRatingInputVisible(false);

      fetchBookings();
    } catch (error) {
      //console.error("Error submitting rating and comment:", error);
      alert(
        "An error occurred while submitting your rating and comment. Please try again later."
      );
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `${config.serverAdminUrlPrefix}/api/users/me?populate[reservations][populate][tour][populate]=*`
      );

      const filteredBookings = response.data.reservations.filter((tour) => {
        return tour.payment_status === true;
      });

      setBookings(filteredBookings);
    } catch (error) {
      //console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ตรวจสอบว่ามีข้อมูลความคิดเห็นและดาวหรือไม่
  const hasCommentAndRating = (tour) => {
    return (
      tour.tour?.reservations?.[0]?.comment &&
      tour.tour?.reservations?.[0]?.star
    );
  };

  return (
    <div className="booking-history-container">
      {bookings.length === 0 ? (
        <h1>จองทัวร์กันเถอะ!</h1>
      ) : (
        bookings.map((tour) => (
          <Card key={tour.id} className="historycard">
            <CardImg
              variant="top"
              src={`${config.serverAdminUrlPrefix}${tour.tour?.image.url}`}
              className="img-hs"
            />
            <CardBody className="hs-body">
              <CardTitle className="hs-title">{tour.name}</CardTitle>
              <CardText className="hs-text">
                จองสำเร็จ: {formatDate(tour.tour?.reservations?.[0]?.updatedAt)}
                <br />
                เริ่มเดินทาง: {formatDate(tour.tour?.trip_dates?.[0]?.go_date)}
                <br />
                เดินทางกลับ: {formatDate(tour.tour?.trip_dates?.[0]?.end_date)}
                <br />
                รูปแบบการเดินทาง: {tour.tour?.travel_by}
                <br />
                {canRateAndComment(tour) && hasCommentAndRating(tour) && (
                  <div>
                    <p>ความคิดเห็น: {tour.tour?.reservations?.[0]?.comment}</p>
                    <ReactStars
                      count={5}
                      value={tour.tour?.reservations?.[0]?.star}
                      size={24}
                      activeColor="#ffd700"
                      edit={false}
                    />
                  </div>
                )}
                {canRateAndComment(tour) &&
                  !hasCommentAndRating(tour) &&
                  isRatingInputVisible && (
                    <RatingCommentInput
                      onSubmit={({ rating, comment }) => {
                        const reservationId = tour.tour?.reservations?.[0]?.id;
                        if (reservationId) {
                          submitRatingAndComment(
                            reservationId,
                            rating,
                            comment
                          );
                        } else {
                          //console.error("No reservation ID found.");
                        }
                      }}
                    />
                  )}
              </CardText>
            </CardBody>
          </Card>
        ))
      )}
    </div>
  );
};

export default BookingHistoryCard;