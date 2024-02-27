import { Card, Row, Col, Button, Container } from "react-bootstrap";
import Calendar from "rsuite/Calendar";
import "../css/tour.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Tour = ({ data }) => {
  const [comment, setComment] = useState([]);

  useEffect(() => {
    const FetchData = async () => {
      const Data = await axios.get(
        `/reservations?populate=*&filters[tour][id]=${data.id}`
      );
      setComment(Data.data.data);
    };
    FetchData();
  }, []);
  const trip = data.attributes.trip_dates.data;
  const DotEvent = (date) => {
    const goDates = trip.map((day) => new Date(day.attributes.go_date));

    if (
      goDates.some(
        (goDate) =>
          goDate.getDate() === date.getDate() &&
          goDate.getMonth() === date.getMonth() &&
          goDate.getFullYear() === date.getFullYear()
      )
    ) {
      return <div className="dot-date" style={{ marginLeft: "35%" }} />;
    }
  };

  const genStar = (numStars) => {
    let stars = "";
    for (let i = 0; i < numStars; i++) {
      stars += "★";
    }
    return stars;
  };
  
  return (
    <div>
      <Card className="card-detail">
        <Row>
          <Col md={6}>
            <Row>
              <img
                className="img-detail"
                src={
                  "http://localhost:1337" +
                  data.attributes.image.data.attributes.url
                }
              />
            </Row>
            <Row style={{ marginTop: "10%" }}>
              <Calendar renderCell={DotEvent} />
              <div className="dot-date" />= วันออกเดินทาง
            </Row>
          </Col>
          <Col md={6}>
            <Row>
              <h4 className="name-tour">{data.attributes.name}</h4>
              <hr />
              <div className="detail">
                <p>{data.attributes.detail}</p>
              </div>
            </Row>
            <Row style={{ marginTop: "10%" }}>
              <Row>
                <Col>ช่วงวันเดินทาง</Col>
                <Col>ราคา</Col>
                <Col>จอง</Col>
                <hr />
              </Row>
              {trip.map((item, index) => (
                <Row key={index}>
                  <Col>
                    {item.attributes.go_date.slice(8, 10)}-
                    {item.attributes.end_date.slice(8, 10)}/
                    {item.attributes.end_date.slice(5, 7)}/
                    {item.attributes.end_date.slice(0, 4)}
                  </Col>
                  <Col>{data.attributes.price}</Col>
                  <Col>
                    <Button
                      variant="primary"
                      style={{
                        marginBottom: "5%",
                        marginTop: "-5%",
                        width: "100px",
                      }}
                    >
                      จอง
                    </Button>
                  </Col>
                  <hr />
                </Row>
              ))}
              <h4 style={{marginTop: "5%"}}>ความคิดเห็น</h4>
              <Container className="comment">
                {comment.map((item, index) => (
                  <Row key={index} style={{padding: "2%"}}>
                    <Row>@{item.attributes.owner.data.attributes.username}</Row>
                    <Row>{item.attributes.comment}</Row>
                    <Row>{genStar(item.attributes.star)}</Row>
                    <Row><br /></Row>                    
                  </Row>
                ))}
              </Container>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
};
export default Tour;
