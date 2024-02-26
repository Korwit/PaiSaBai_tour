import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import "../css/tour.css";
import { Link } from "react-router-dom";

const Cards = ({ data, search, detailClick }) => {
  const searchData = search.map((name) =>
    data.find((item) => item.attributes.name === name)
  );

  const Translate = (travel) => {
    switch (travel) {
      case "Bus":
        return "รถบัส";
      case "Van":
        return "รถตู้";
      case "Airplane":
        return "เครื่องบิน";
      case "Teleporter":
        return "เครื่องเคลื่อนย้ายมวลสาร";
    }
  };

  return (
    <div>
      <Row xs={1} md={3}>
        {searchData.map((item, index) => (
          <Col key={index}>
            <Card className="each-card">
              <Card.Img
                variant="top"
                src={
                  "http://localhost:1337" +
                  item.attributes.image.data.attributes.url
                }
                className="img-card"
              />
              <Card.Body>
                <Card.Title>{item.attributes.name}</Card.Title>
                <Card.Text>
                  ราคา: {item.attributes.price}
                  <br />
                  จำนวนผู้จอง: {item.attributes.owners.data.length}/
                  {item.attributes.quantity}
                  <br />
                  เดินทางโดย: {Translate(item.attributes.travel_by)}
                  <br />
                </Card.Text>
                <Row className="g-1 ">
                  <Col>
                    <Button variant="primary" onClick={() => detailClick(item)}>
                      รายละเอียด
                    </Button>
                  </Col>
                  <Col>
                    <Link>
                      <Button>จองเลย</Button>
                    </Link>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Cards;
