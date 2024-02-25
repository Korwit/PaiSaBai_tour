import { Card, Col, Row } from "react-bootstrap";
import "../css/place.css";
import Cards from "../component/card-tour";
import { useEffect, useState } from "react";
import axios from "axios";

const Place = ({ data, detailClick }) => {
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
  }, []);

  return (
    <div>
      <Card className="card-detail">
        <Row>
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
            <div className="detail">
              <p>{data.attributes.description}</p>
            </div>
          </Col>
        </Row>
        <hr />
        {Tour && <Cards data={Tour} search={NameTour} detailClick={detailClick}/>}
      </Card>
    </div>
  );
};
export default Place;
