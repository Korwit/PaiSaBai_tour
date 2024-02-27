import React, { useState, useEffect } from "react";
import { Card, CardImg, CardBody, CardTitle, CardText } from "react-bootstrap";
import axios from "axios";

const BookingHistoryCard = () => {
  const [bookings, setBookings] = useState([]);
  const jwt = localStorage.getItem('jwt');
  axios.defaults.headers.common = {
    Authorization: `Bearer ${jwt}`,
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1337/api/users/me?populate[tours][populate]=*"
      );
      /*console.log("First: ", response.data);*/
      /*console.log(response.data.tours?.[0].image.url)*/
      setBookings(response.data.tours);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);


  return (
    <div>
      {bookings.map((tour) => {
        //console.log("Go date:", tour.trip_dates?.[0].go_date); 
        return (
          <Card key={tour.id}>
            <CardImg 
              variant="top" 
              src={"http://localhost:1337" + tour.image.url}
              className="img-card"
            />
            <CardBody>
              <CardTitle>{tour.name}</CardTitle>
              <CardText>
                จองสำเร็จ: {tour.created_at}
                <br />
                เริ่มเดินทาง: {tour.trip_dates?.[0].go_date}
                <br />
                กลับ: {tour.trip_dates?.[0].end_date}
                <br />
                รูปแบบการเดินทาง: {tour.travel_by}
                <br />
              </CardText>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
};

export default BookingHistoryCard;