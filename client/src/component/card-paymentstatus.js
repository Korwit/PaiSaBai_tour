import React, { useState, useEffect } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Badge,
  Button,
} from "react-bootstrap";
import axios from "axios";
import "../css/PaymentStatuscard.css";
import config from "../config";

const PaymentStatusCard = () => {
  const [statuses, setStatuses] = useState([]);
  const [isCancelling, setIsCancelling] = useState(false);
  const jwt = localStorage.getItem("jwt");
  axios.defaults.headers.common = {
    Authorization: `Bearer ${jwt}`,
  };

  const fetchStatuses = async () => {
    if (jwt != null) {
      const response = await axios.get(
        `${config.serverAdminUrlPrefix}/api/users/me?populate[reservations][populate][tour][populate]=*`
      );
      setStatuses(response.data.reservations);
    }
  };

  const formatstatusDate = (dateString) => {
    if (!dateString) return "N/A";

    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("th-TH", options);
  };

  const formatStatusTime = (timeString) => {
    if (!timeString) return "N/A";

    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], options);
  };

  const handleCancelReservation = async (reservationId) => {
    try {
      setIsCancelling(true);

      const response = await axios.delete(
        `${config.serverAdminUrlPrefix}/api/reservations/${reservationId}`
      );
      //console.log("Cancellation response: ", response.data.reservations);

      fetchStatuses();
    } catch (error) {
      //console.error("Cancellation error: ", error);
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
        const paymentStatusColor = e.payment_status ? "success" : "danger";
        const paymentStatusText = e.payment_status ? "ชำระแล้ว" : "ยังไม่ชำระ";
        return (
          <Card key={e} className="paymentstatus-main">
            <CardImg
              variant="top"
              src={config.serverAdminUrlPrefix + e.tour?.image.url}
              className="img-ps"
            />
            <CardBody className="ps-body">
              <CardTitle className="ps-title">{e.name}</CardTitle>
              <CardText className="ps-text">
                สถานะ:{" "}
                <Badge bg={paymentStatusColor}>{paymentStatusText}</Badge>
                {e.payment_status && (
                  <>
                    <br />
                    วันที่ชำระเงิน: {formatstatusDate(e.payment_date)}
                    <br />
                    เวลาที่ชำระเงิน: {formatStatusTime(e.payment_time)} น.
                  </>
                )}
                <br />
                {!e.payment_status && (
                  <Button
                    variant="danger"
                    disabled={isCancelling}
                    onClick={() => handleCancelReservation(e)}
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