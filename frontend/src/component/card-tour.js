import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import "../css/tour.css";

const Cards = ({ data }) => {
  return (
    <div>
      <Row xs={1} md={3} >
        {data.map((item, index) => (
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
                  Price: {item.attributes.price}
                  <br />
                  Quantity: {item.attributes.quantity}
                  <br />
                </Card.Text>
                <Button variant="primary">รายละเอียด</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Cards;
