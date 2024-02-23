import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import "../css/tour.css";
import { Link } from "react-router-dom";

const Cards = ({ data, search }) => {
  const searchData = search.map((name) =>
    data.find((item) => item.attributes.name === name)
  );

  return (
    <div>
      <Row xs={1} md={3} >
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
                  จำนวนผู้จอง: {item.attributes.quantity}
                  <br />
                  เดินทางโดย: {item.attributes.travel_by}
                  <br />
                </Card.Text>
                <Row className="g-1 ">
                  <Col>
                    <Link to={`/detail/${item.attributes.name}`} data={item.attributes}>
                        <Button variant="primary">รายละเอียด</Button>
                    </Link>
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
