import { Button, Card, Col, Row } from "react-bootstrap";
import "../css/place.css";
import Cards from "../component/card-tour";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Place = ({ data, detailClick }) => {
  const [userRole, setUserRole] = useState('')
  const navigate = useNavigate()
  const NameTour = data.attributes.tours.data.map(
    (item) => item.attributes.name
  );
  const api = "&filters[name]=" + NameTour.join("&filters[name]=");
  const [Tour, setTour] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/tours?populate=*${api}`);
      setTour(response.data.data);
    };
    fetchData();
    Rerole();
  }, []);

  const Rerole = async () => {
    try {
      const response = await axios.get(`/users/me?populate=role`);
      setUserRole(response.data.role.name)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card className="card-detail">
        <Row>
          <Col xs={12} md={6} lg={6}>
            <img
              className="img-detail"
              src={
                "http://localhost:1337" +
                data?.attributes?.image?.data.attributes.url
              }
            />
          </Col>
          <Col xs={12} md={6} lg={6}>
            <h4 style={{ marginTop: "2%", color: "red" }}>
              {data.attributes.name}
            </h4>
            <hr />
            <h6 className="detail">{data.attributes.description}</h6>
          </Col>
        </Row>
        <Button variant="danger" onClick={() => navigate(`/admin/editplace/${data.id}`)}>แก้ไข</Button>
        <hr />
        {Tour && (
          <Cards data={Tour} search={NameTour} detailClick={detailClick} />
        )}
      </Card>
    </div>
  );
};
export default Place;
