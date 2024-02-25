import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/main.css";
import { Card } from "react-bootstrap";
import Slice from "../component/slice-places";
import Cards from "../component/card-tour";
import NavBar from "../component/navbar-main";
import Search from "../component/search";
import Tour from "./detail-tour";
import Place from "./detail-place";

const Main = () => {
  const [data, setData] = useState(null);
  const [cards, setCards] = useState(null);
  const [filter, setFilter] = useState([]);
  const [detail, setDetail] = useState([]);
  const [place, setPlace] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/recommend-places?populate=*`);
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    getTour();
  }, []);

  const getTour = async () => {
    try {
      const response = await axios.get("/tours?populate=*");
      setCards(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const HandleFilter = (data) => {
    setFilter(data);
  };

  const HandleDetail = (data) => {
    setDetail(data);
  };

  const HandlePlace = (data) => {
    setPlace(data);
  };

  return (
    <div>
      <div>
        <img
          src="https://i.ibb.co/sPKxm3F/image-main.png"
          alt="Loading"
          className="main-img"
        />
      </div>
      <NavBar />
      {data && detail.length === 0 && place.length === 0 && (
        <Slice data={data} detailClick={HandlePlace} />
      )}
      <Card className="main-card">
        {cards && (
          <Search
            data={cards}
            onFilter={HandleFilter}
            closeTour={HandleDetail}
            closePlace={HandlePlace}
          />
        )}
        {cards && detail.length === 0 && place.length === 0 ? (
          <Cards data={cards} search={filter} detailClick={HandleDetail} />
        ) : (
          (detail.length !== 0 && <Tour data={detail} />) ||
          (place.length !== 0 && <Place data={place} detailClick={HandleDetail} />)
        )}
      </Card>
    </div>
  );
};

export default Main;
