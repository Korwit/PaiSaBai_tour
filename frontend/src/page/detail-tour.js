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
    const goDates = trip.map((day) => new Date(day.attributes.go_date));
    const endDates = trip.map((day) => new Date(day.attributes.end_date));

    const hasGoDate = goDates.some((goDate) => isSameDate(goDate, date));

    const hasEndDate = endDates.some((endDate) => isSameDate(endDate, date));

    if (hasGoDate) {
      return <div className="dot-date" style={{ marginLeft: "30%" }} />;
    }
    if (hasEndDate) {
      return <div className="dot-end" style={{ marginLeft: "30%" }} />;
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

  const handlereservation = () => {
    navigate("/reservation");
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
              <Col>
                <div className="dot-date" style={{textIndent: "60%", whiteSpace: "nowrap"}}>=วันออกเดินทาง</div>
              </Col>
              <Col>
                <div className="dot-end" style={{textIndent: "70%", whiteSpace: "nowrap"}}>=วันกลับ</div>
              </Col>
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
                  {GoToEnd(item.attributes)}

                  <Col>{data.attributes.price}</Col>
                  <Col>
                    {jwt !== null ? (
                      <Button
                        style={{
                          marginBottom: "5%",
                          marginTop: "-5%",
                          width: "100px",
                          color: "white",
                          backgroundColor: "rgb(43, 157, 45)",
                          border: "none",
                        }}
                        onClick={() => handlereservation()}
                      >
                        จอง
                      </Button>
                    ) : (
                      <Button
                        style={{
                          marginBottom: "5%",
                          marginTop: "-5%",
                          width: "100px",
                          color: "white",
                          backgroundColor: "rgb(43, 157, 45)",
                          border: "none",
                        }}
                      >
                        จอง
                      </Button>
                    )}
                  </Col>
                  <hr />
                </Row>
              ))}
              <h4 style={{ marginTop: "5%" }}>ความคิดเห็น</h4>
              <Container className="comment">
                {comment.map((item, index) => (
                  <Row key={index} style={{ padding: "2%" }}>
                    <Row>@{item.attributes.owner.data.attributes.username}</Row>
                    <Row>{item.attributes.comment}</Row>
                    <Row>{genStar(item.attributes.star)}</Row>
                    <Row>
                      <br />
                    </Row>
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
