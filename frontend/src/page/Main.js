import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/main.css";
import { Card } from "react-bootstrap";
import Slice from "../component/slice-places";
import Cards from "../component/card-tour";
import Search from "../component/search";

const Main = () => {
  const [data, setData] = useState(null);
  const [cards, setCards] = useState(null);

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

  return (
    <div>
      <img
        src="https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.15752-9/413380961_1743108222851183_5382249115591343770_n.png?_nc_cat=107&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeE4U0y421bnIEx5dwgDKyYIuis41w9p69O6KzjXD2nr0_7wJCASF3Lk2acmcxq83XwolC_DG1XPxgPOdVtrkWrk&_nc_ohc=vNvOntpwTjkAX_IJan0&_nc_ht=scontent.fbkk10-1.fna&oh=03_AdTS8Lp2_AjKgSfI1-qGiFyKgBu6P42q8LzXBQ3WVs5bpQ&oe=65F7E0AD"
        alt="Loading"
        className="main-img"
      />
      <h1 className="main-place-text">สถานที่ท่องเที่ยวแนะนำ</h1>
      {data && <Slice data={data} />}
      <Card className="main-card">
        <Search />
        {cards && <Cards data={cards} />}</Card>
    </div>
  );
};

export default Main;
