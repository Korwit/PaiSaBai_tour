import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import "../css/tour.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cards = ({ data, search, detailClick }) => {
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  {jwt && (axios.defaults.headers.common = {
    Authorization: `bearer ${jwt}`,
  })}
  const searchData = search.map((name) =>
    data.find((item) => item.attributes.name === name)
  );
  const [userRole, setUserRole] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const role = await axios.get("/users/me?populate=role");
        setUserRole(role.data.role.name);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userRole]);

  const Date = (time, current, max) => {
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
      <Row className="time-tour">
        <Col xs={12} style={{ justifyContent: "center", textAlign: "center" }}>
          {month}
          {year}
        </Col>
        <Col style={{ justifyContent: "center", textAlign: "center" }}>
          {current}/{max}คน
        </Col>
      </Row>
    );
  };
  const handlereservation = (id) => {
    navigate(`/reservation/${id}`);
  };

  const travel = (by) => {
    switch (by) {
      case "Bus":
        return <img src="bus.png" style={{ maxWidth: "45px" }} />;
      case "Van":
        return <img src="van.png" style={{ maxWidth: "90px" }} />;
      case "Airplane":
        return <img src="plane.png" style={{ maxWidth: "50px" }} />;
      case "Teleporter":
        return <img src="teleporter.png" style={{ maxWidth: "37px" }} />;
    }
  };
  return (
    <div>
      <Row xs={2} md={3} xl={4}>
        {searchData.map((item, index) => (
          <Col key={index}>
            <Card className="each-card" onClick={() => detailClick(item)}>
              <Card.Img
                variant="top"
                src={
                  "http://localhost:1337" +
                  item.attributes.image.data.attributes.url
                }
                className="img-card"
              />
              <Card.Body>
                <Card.Title style={{ color: "red", fontSize: "18px" }}>
                  #{item.id} {item.attributes.name}
                </Card.Title>
                <Card.Text>
                  <Row>
                    <Col>
                      {Date(
                        item.attributes?.trip_dates.data[0]?.attributes,
                        item.attributes?.owners.data.length,
                        item.attributes.quantity
                      )}
                    </Col>
                  </Row>
                  <Col className="mini-detail">{item.attributes.detail}</Col>
                  <Row>
                    <Col>{travel(item.attributes.travel_by)}</Col>
                    <Col>
                      <Row
                        style={{
                          color: "red",
                          fontSize: "16px",
                          textAlign: "right",
                          justifyContent: "right",
                          marginRight: "1%",
                        }}
                      >
                        เริ่ม
                      </Row>
                      <Row
                        style={{
                          color: "red",
                          fontSize: "24px",
                          fontWeight: "bold",
                          textAlign: "right",
                          justifyContent: "right",
                          marginRight: "1%",
                        }}
                      >
                        ฿{item.attributes.price}
                      </Row>
                    </Col>
                  </Row>
                </Card.Text>
                <Row className="g-1 ">
                  <Col>
                    <Button
                      className="detail-button"
                      onClick={() => detailClick(item)}
                    >
                      รายละเอียด
                    </Button>
                  </Col>
                  <Col>
                    {(jwt !== null) & (userRole != "Admin") ? (
                      <Button
                        className="reserve-button"
                        onClick={() => handlereservation(item.id)}
                      >
                        จองเลย
                      </Button>
                    ) : userRole != "Admin" ? (
                      <Button className="reserve-button" onClick={() => navigate('/login')}>จองเลย</Button>
                    ) : (
                      <Button
                        variant="danger"
                        onClick={() => navigate(`/admin/edittour/${item.id}`)}
                      >
                        แก้ไข
                      </Button>
                    )}
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
