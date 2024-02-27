import React, { useState, useEffect } from "react";
import { Card, CardImg, CardBody, CardTitle, CardText } from "react-bootstrap";
import axios from "axios";


const PaymentStatusCard = () => {
  const [statuses, setStatuses] = useState([]);
  const jwt = localStorage.getItem('jwt')
axios.defaults.headers.common = {
    Authorization: `Bearer ${jwt}`,
  };

  const fetchStatuses = async () => {
    const response = await axios.get(
      "http://localhost:1337/api/users/me?populate[tours][populate]=*"
    );
    console.log("First: ", response.data);
    setStatuses(response.data.tours);
  };

  useEffect(() => {
    fetchStatuses();
  }, []);

  
  return (
    <div>
      {statuses.map((e) => (
        <Card key={e.id}>
          <CardImg variant="top" 
          src= {"http://localhost:1337"+ e.image.url}
          className="img-card"
          />
          <CardBody>
            <CardTitle>{e.name}</CardTitle>
            <CardText>
              สถานะ: {e.created_at}
              <br />
              วันที่และเวลาที่ชำระเงิน: {e.go_date}
              <br />
            </CardText>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default PaymentStatusCard;