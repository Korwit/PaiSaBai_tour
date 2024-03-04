import React, { useState, useEffect } from "react";
import { Card, CardImg, CardBody, CardTitle, CardText, Badge, Button } from "react-bootstrap";
import axios from "axios";
import '../css/PaymentStatuscard.css'

const PaymentStatusCard = () => {
  const [statuses, setStatuses] = useState([]);
  const [isCancelling, setIsCancelling] = useState(false);
  const jwt = localStorage.getItem('jwt')
  axios.defaults.headers.common = {
    Authorization: `Bearer ${jwt}`,
  };

  const fetchStatuses = async () => {
    if (jwt != null){
    const response = await axios.get(
      "http://localhost:1337/api/users/me?populate[tours][populate]=*"
    );
    setStatuses(response.data.tours);
    console.log("First: ", response.data);}
  };

  useEffect(() => {
    fetchStatuses();
  }, []);

  return (
    <div>
      {statuses.map((e) => {
        /*console.log("Go date:", e.reservations?.[0].comment); */
        const paymentStatusColor = e.reservations?.[0]?.payment_status ? "success" : "danger";
        const paymentStatusText = e.reservations?.[0]?.payment_status ? "ชำระแล้ว" : "ยังไม่ชำระ";
        return (
          <Card key={e.id} className="paymentstatus-main">
            <CardImg 
              variant="top" 
              src={"http://localhost:1337" + e.image.url}
              className="img-ps"
            />
            <CardBody className="B4">
              <CardTitle className="B5">{e.name}</CardTitle>
              <CardText className="B6">
                สถานะ: <Badge bg={paymentStatusColor}>{paymentStatusText}</Badge>
                <br />
                วันที่ชำระเงิน: {e.reservations?.[0]?.payment_date}
                <br />
                ความคิดเห็น: {e.reservations?.[0]?.comment}
                <br />
              </CardText>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
};


export default PaymentStatusCard;