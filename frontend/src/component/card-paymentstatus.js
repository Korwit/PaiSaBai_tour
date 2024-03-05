import React, { useState, useEffect } from "react";
import { Card, CardImg, CardBody, CardTitle, CardText, Badge, Button } from "react-bootstrap";
import axios from "axios";
import '../css/PaymentStatuscard.css'

const PaymentStatusCard = () => {
  const navigate = useNavigate();
  const [statuses, setStatuses] = useState([]);
  const [isCancelling, setIsCancelling] = useState(false);
  const jwt = localStorage.getItem('jwt');
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
