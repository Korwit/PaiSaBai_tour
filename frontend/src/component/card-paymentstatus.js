import React, { useState, useEffect } from "react";
import { Card, CardImg, CardBody, CardTitle, CardText, Badge, Button } from "react-bootstrap";
import axios from "axios";
import '../css/PaymentStatuscard.css';

const PaymentStatusCard = () => {
  const [statuses, setStatuses] = useState([]);
  const [isCancelling, setIsCancelling] = useState(false);
  const jwt = localStorage.getItem('jwt');
  axios.defaults.headers.common = {
    Authorization: `Bearer ${jwt}`,
  };

  
  const fetchStatuses = async () => {
    if (jwt != null) {
      const response = await axios.get(
        "http://localhost:1337/api/users/me?populate[reservations][populate][tour][populate]=*"
      );
      console.log("API Response:", response.data);
      setStatuses(response.data.reservations);
      console.log("First: ", response.data);
    }
  };

  const formatstatusDate = (dateString) => {
    if (!dateString) return 'N/A'; 
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('th-TH', options);
    
  };

  const formatStatusTime = (timeString) => {
    if (!timeString) return 'N/A'; 
    
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], options);
  };

  const handleCancelReservation = async (reservationId) => {
    try {
      setIsCancelling(true);
      
      const response = await axios.delete(
        `http://localhost:1337/api/reservations/${reservationId}`
      );
      console.log("Cancellation response: ", response.data.reservations);
      
      fetchStatuses();
    } catch (error) {
      console.error("Cancellation error: ", error);
    } finally {
      setIsCancelling(false);
    }
  };

  useEffect(() => {
    fetchStatuses();
  }, []);

  return (
    <div className="paymentstatus-container">
      {statuses.map((e) => {
        const paymentStatusColor = e.tour?.reservations?.[0]?.payment_status ? "success" : "danger";
        const paymentStatusText = e.tour?.reservations?.[0]?.payment_status ? "ชำระแล้ว" : "ยังไม่ชำระ";
        console.log(e.tour?.reservations?.[0]?.payment_status)
        return (
          <Card key={e.id} className="paymentstatus-main">
            <CardImg
              variant="top"
              src={"http://localhost:1337" + e.tour?.image.url}
              className="img-ps"
            />
            <CardBody className="ps-body">
              <CardTitle className="ps-title">{e.name}</CardTitle>
              <CardText className="ps-text">
                สถานะ: <Badge bg={paymentStatusColor}>{paymentStatusText}</Badge>
                <br />
                วันที่ชำระเงิน: {formatstatusDate(e.tour?.reservations?.[0]?.payment_date)}
                <br />
                เวลาที่ชำระเงิน: {formatStatusTime(e.tour?.reservations?.[0]?.payment_time)} น.
                <br />
                {!e.tour?.reservations?.[0]?.payment_status && (
                  <Button
                    variant="danger"
                    disabled={isCancelling}
                    onClick={() => handleCancelReservation(e.id)}
                  >
                    {isCancelling ? "กำลังยกเลิก..." : "ยกเลิกการจอง"}
                  </Button>
                )}
              </CardText>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
};

export default PaymentStatusCard;
