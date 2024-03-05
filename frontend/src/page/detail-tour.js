import { Card, Row, Col, Button, Container } from "react-bootstrap";
import Calendar from "rsuite/Calendar";
import "../css/tour.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Tour = ({ data }) => {
  const [comment, setComment] = useState([]);
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
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
    const goDates = trip.map((day) => new Date(day.attributes?.go_date));
    const endDates = trip.map((day) => new Date(day.attributes?.end_date));

    const hasGoDate = goDates.some((goDate) => isSameDate(goDate, date));

    const hasEndDate = endDates.some((endDate) => isSameDate(endDate, date));

    if (hasGoDate) {
      return <div className="dot-date" style={{ marginLeft: "40%" }} />;
    }
    if (hasEndDate) {
      return <div className="dot-end" style={{ marginLeft: "40%" }} />;
    }

    return null;
  };

  const isSameDate = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const genStar = (numStars) => {
    let stars = "";
    for (let i = 0; i < numStars; i++) {
      stars += "★";
    }
    return stars;
  };

  const GoToEnd = (time) => {
    const [YG, MG, DG] = time.go_date.split("-");
    const [YE, ME, DE] = time.end_date.split("-");
    const mg = MG[0] == "0" ? MG[1] : MG;
    const me = ME[0] == "0" ? ME[1] : ME;
    const trans = [
      "ม.ค.",
      "ก.พ.",
      "มี.ค.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
    ];
    const month =
      mg === me
        ? `${DG} ${trans[mg - 1]} - ${DE} ${trans[mg - 1]}`
        : `${DG} ${trans[mg - 1]} - ${DE} ${trans[me - 1]}`;
    const year = YG === YE ? YG : `${YG}-${YE}`;
    return (
      <Col>
        {month}
        {year}
      </Col>
    );
  };

  return (
    <div>
      <Card className="card-detail">
        <Row xs={1} md={2} lg={2}>
          <Col>
            <img
              className="img-detail"
              src={
                "http://localhost:1337" +
                data.attributes.image.data.attributes.url
              }
            />
          </Col>
          <Col>
            <h4 className="name-tour">{data.attributes.name}</h4>
            <hr />
            <h6 className="detail">{data.attributes.detail}</h6>
          </Col>
        </Row>
        <Row xs={1}>
          <Col>
            <Row>
              <Col xs={12}>
                <Calendar renderCell={DotEvent} />
              </Col>
            </Row>
            <Row xs={2} style={{ marginBottom: "30px" }}>
              <Col xs={6} lg={6}>
                <h5 className="dot-date">=วันออกเดินทาง</h5>
              </Col>
              <Col xs={6} lg={6}>
                <h5 className="dot-end" style={{ marginRight: "20%" }}>
                  =วันกลับ
                </h5>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row className="date-datail-tour">
              <Col>
                <Row>
                  <Col>ช่วงวันเดินทาง</Col>
                  <Col>ราคา</Col>
                  <Col>จอง</Col>
                  <hr />
                </Row>
              </Col>
              {trip.map((item, index) => (
                <Row key={index}>
                  {GoToEnd(item.attributes)}
                  <Col>{data.attributes.price}</Col>
                  <Col>
                    {jwt !== null ? (
                      <Button
                        className="bt-detail"
                        onClick={() => navigate(`/reservation/${data.id}`)}
                      >
                        จอง
                      </Button>
                    ) : (
                      <Button className="bt-detail">จอง</Button>
                    )}
                  </Col>
                  <hr />
                </Row>
              ))}
            </Row>
          </Col>
        </Row>
        <h4
          style={{
            justifyContent: "center",
            textAlign: "center",
            marginTop: "5%",
          }}
        >
          ความคิดเห็น
        </h4>
        <Container className="comment">
          <h6 className="detail">
            {comment.length === 0 ? (
              <h6 style={{ textAlign: "center" }}>
                คุณเป็นคนแรกหากคอมเม้นท์ตอนนี้ <br />{" "}
                <img src="/chat-left-text.svg" alt="Loading" style={{width: "40px", marginTop: "10px"}} />
              </h6>
            ) : (
              comment.map((item, index) => (
                <Row key={index} style={{ padding: "2%" }}>
                  <Row>@{item.attributes.owner.data.attributes.username}</Row>
                  <Row>{item.attributes.comment}</Row>
                  <Row>{genStar(item.attributes.star)}</Row>
                  <Row>
                    <br />
                  </Row>
                </Row>
              ))
            )}
          </h6>
        </Container>
      </Card>
    </div>
  );
};
export default Tour;
