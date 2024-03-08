import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import { setDate } from "rsuite/esm/utils/dateUtils";
import { useParams } from "react-router-dom";
import "../css/reservation.css";

const ReservationCard = ({ data }) => {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [submitEnabled, setSubmitEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [price, setPrice] = useState(0);
  const [datas, setdata] = useState("");
  const [owners, setowners] = useState("");
  const jwt = localStorage.getItem("jwt");
  axios.defaults.headers.common = { Authorization: `bearer ${jwt}` };

  useEffect(() => {
    // ทำการดึงข้อมูลจาก Strapi
    //console.log(data.id)
    const fetchData = async () => {
      try {
        const userData = await axios.get(`/users/me`);
        setFirstname(userData.data.firstname);
        setLastname(userData.data.lastname);
        setPhone(userData.data.phone);
        setowners(userData.data.id);
        const tourData = await axios.get(`/tours/${cardId}?populate=*`);
        setdata(tourData.data.data);
        const r =
          tourData.data.data.attributes.trip_dates.data?.map((item) => ({
            label:
              "วันไป " +
              item.attributes.go_date +
              " วันกลับ " +
              item.attributes.end_date,
            value: item.id,
          })) || [];
        setOptions(r);
        setSelectedOption(r[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (selected) => {
    setSelectedOption(selected);
    console.log(selected);
    setPrice(selected?.price || 0);
  };

  const handleSubmit = async (e) => {
    console.log(datas.attributes.id);
    try {
      await axios.post("/reservations", {
        data: {
          tour: [datas.id],
          owner: owners,
        },
      });
      navigate("/payment");
    } catch (error) {
      console.error("Error sending data to Strapi:", error);
    } finally {
      setSubmitEnabled(false);
    }
  };

  const handlemain = () => {
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>ข้อมูลผู้เข้าจอง</h2>
        <h4>กรุณากรอกข้อมูลและตรวจสอบการจอง</h4>
        <h3>โปรแกรมทัวร์</h3>
        <Form.Label>วันที่เดินทาง :</Form.Label>
        <Select
          options={options}
          value={selectedOption}
          onChange={handleSelectChange}
          placeholder="เลือกวันที่เดินทาง"
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.value}
        />
        <br />
        <React.Fragment>
          <strong>ชื่อ :</strong> {firstName} <strong>นามสกุล :</strong>{" "}
          {lastName}
          <br />
          <strong>เบอร์โทรศัพท์ :</strong> {phone} <br />
          <strong>ราคา:</strong> {datas.attributes?.price} ฿<br />
        </React.Fragment>
        <Button
          className="sm-cl1-pri"
          type="button"
          onClick={() => handleSubmit()}
        >
          จอง
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          className="sm-cl-sec"
          type="button"
          onClick={() => handlemain()}
        >
          ยกเลิก
        </Button>
      </form>
    </div>
  );
};

export default ReservationCard;
