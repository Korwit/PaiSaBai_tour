import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/main.css";
import { Card } from "react-bootstrap";
import Slice from "../component/slice-places";
import Cards from "../component/card-tour";
import NavBar from "../component/navbar-main";
import Search from "../component/search";

const Main = () => {
  const [data, setData] = useState(null);
  const [cards, setCards] = useState(null);
  const [filter, setFilter] = useState([]);

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
      {data && <Slice data={data} />}
      <Card className="main-card">
        {cards && <Search data={cards} onFilter={HandleFilter} />}
        {cards && <Cards data={cards} search={filter} />}
      </Card>
    </div>
  );
};

export default Main;
