import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Spinner, Row, Col, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../css/addrecommend.css";
import NavBar from "../../component/navbar-main";

const Addtour = () => {
    const navigate = useNavigate();
    const [detail, setDetail] = useState('');
    const [count, setCount] = useState('');
    const [price, setPrice] = useState('');
    const [topic, setTopic] = useState('');
    const [submitEnabled, setSubmitEnabled] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [data, setdata] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [files, setFiles] = useState()
    const [showModal, setShowModal] = useState(false);
    const [checkboxData, setCheckboxData] = useState([]);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const jwt = localStorage.getItem("jwt");
    const [eff, setEff] = useState(null);
    const [daydata, setdaydata] = useState([]);
    const [daydataId, setdaydataId] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedOptions, setSelectedOptions] = useState('');
    axios.defaults.headers.common = { 'Authorization': `bearer ${jwt}` }  
    useEffect(() => {    
        if (jwt == null) {
          window.location.reload();
          navigate('/admin')
        }
    }, [jwt]);


  const handleShowModal = async () => {
    const result = await axios.get(
      "/trip-dates?populate[0]=tour&filters[tour][name][$null]=*"
    );
    setdaydata(result.data.data);
    //console.log(daydata)
    setdaydataId([]);
    for (let i = 0; i < result.data.data.length; i++) {
      setdaydataId((prevState) => [...prevState, result.data.data[i].id]);
    }
    //console.log(result.data.data.length)//.data?.[0]
    /*result.data.data.attributes.forEach(item => {
            setdaydata(prevState => [...prevState, item]);         
        });
        **/
    setShowModal(true);
  };

  const handleDelete = async (e) => {
    console.log(e);
    const result = await axios.delete(`/trip-dates/${e}`);
    setShowModal(false);
    handleShowModal();
  };

  const DayGo = () => {
    let x = document.getElementById("date").value;
    const today = new Date().toISOString();

    setEff(null);
    const dateObject = new Date(x);
    if (dateObject < new Date()) {
      setEff("กรุณาตั้งวันให้ถูกต้อง");
      x = document.getElementById("date").defaultValue = "";
    }
  };

  const DayReturn = () => {
    let x = document.getElementById("dates").value;
    const today = new Date().toISOString();

    setEff(null);
    const dateObject = new Date(x);
    if (dateObject < new Date()) {
      setEff("กรุณาตั้งวันให้ถูกต้อง");
      x = document.getElementById("dates").defaultValue = "";
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    console.log(daydataId);
    setEff(null);
  };

  const handleSaveModal = async () => {
    //console.log(document.getElementById("dates").value)
    const go = document.getElementById("date").value;
    const Return = document.getElementById("dates").value;
    try {
      await axios.post("/trip-dates", {
        data: {
          go_date: go,
          end_date: Return,
        },
      });
    } catch (error) {}

    setShowModal(false);
  };

  const handletopic = (e) => {
    setTopic(e.target.value);
  };

  const handledetail = (e) => {
    setDetail(e.target.value);
  };

  const handlecount = (e) => {
    setCount(e.target.value);
  };

  const handleprice = (e) => {
    setPrice(e.target.value);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("/tours");
        const responsetrip = await axios.get("/trip-dates");

        setdata(response.data.data);
        //console.log(response.data.data)
        if (Array.isArray(response.data.data)) {
          setCheckboxData(
            response.data.data.map((item) => ({
              id: item.id,
              label: item.attributes.name,
              checked: false,
            }))
          );
        }
        const result = await axios.get("/users/me?populate=role");
        if (result.data.role) {
          if (result.data.role.name === "Member") {
            navigate("/");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitEnabled(false);

    try {
      axios.defaults.headers.common = { Authorization: `bearer ${jwt}` };
      setIsLoading(true);
      const result = await axios.post("/tours", {
        data: {
          name: topic,
          detail: detail,
          tours: selectedCheckboxes,
          price: price,
          quantity: count,
          travel_by: selectedOption,
          country: selectedOptions,
          trip_dates: daydataId,
        },
      });

      const formData = new FormData();
      formData.append("files", files[0]);
      formData.append("refId", result.data.data.id);
      formData.append("field", "image");
      formData.append("ref", "api::tour.tour");
      axios.post("/upload", formData);

      setTimeout(() => {
        navigate("/");
      }, 1000);
      toast("บันทึกข้อมูลเรียบร้อย");
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitEnabled(true);
      setIsLoading(false);
    }
  };

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value);
  };

  const handleRadioChanges = (event) => {
    setSelectedOptions(event.target.value);
    //console.log(event.target.value)
  };

  return (
    <div className="body">
      <NavBar />

      <h1 className="h1add">เพิ่มโปรแกรมทัวร์</h1>

      <Form onSubmit={handleSubmit} className="custom-Form">
        <Row>
          <Form.Group>
            <div className="password-input3">
              <Form.Label>หัวเรื่อง</Form.Label>
              <Form.Control
                onChange={handletopic}
                required
                value={topic}
                style={{ width: "400px" }}
                placeholder="ใส่ชื่อหัวเรื่อง"
              />
              <div className="textshow"></div>
            </div>
          </Form.Group>
        </Row>
        <Form.Group controlId="imgfile">
          <Form.Label>โปสเตอร์</Form.Label>
          <Form.Control
            type="file"
            name="imgfile"
            accept="image/*"
            onChange={(e) => setFiles(e.target.files)}
          />
          {files && files.length > 0 && (
            <img
              src={URL.createObjectURL(files[0])}
              width={"100px"}
              alt="Selected"
            />
          )}
        </Form.Group>
        <Row>
          <Form.Group>
            <div className="password-input">
              <Form.Label>รายละเอียดทัวร์</Form.Label>
              <Form.Control
                onChange={handledetail}
                required
                value={detail}
                as="textarea"
                rows={7}
                placeholder="รายละเอียด"
              />
            </div>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>ราคา</Form.Label>
            <Form.Control
              onChange={handleprice}
              required
              value={price}
              placeholder="ราคาโปรแกรมทัวร์"
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>จำนวนคน</Form.Label>
            <Form.Control
              onChange={handlecount}
              required
              value={count}
              placeholder="จำนวนคน"
            />
          </Form.Group>
        </Row>
        <Form.Group>
          <Row>
            <Col>
              <Form.Label>ยานพาหนะ</Form.Label>
              <Form.Check
                required
                type="radio"
                label="Bus"
                name="radioOption"
                id="busRadio"
                value="Bus"
                checked={selectedOption === "Bus"}
                onChange={handleRadioChange}
              />
              <Form.Check
                type="radio"
                label="Van"
                name="radioOption"
                id="tourRadio"
                value="Van"
                checked={selectedOption === "Van"}
                onChange={handleRadioChange}
              />
              <Form.Check
                type="radio"
                label="Airplane"
                name="radioOption"
                id="airplaneRadio"
                value="Airplane"
                checked={selectedOption === "Airplane"}
                onChange={handleRadioChange}
              />
              <Form.Check
                type="radio"
                label="Teleporter"
                name="radioOption"
                id="teleporterRadio"
                value="Teleporter"
                checked={selectedOption === "Teleporter"}
                onChange={handleRadioChange}
              />
            </Col>

            <Col>
              <Form.Label>ประเทศ</Form.Label>
              <Form.Check
                type="radio"
                label="Thailand"
                name="radioOptions"
                id="thailandRadios"
                value="Thailand"
                checked={selectedOptions === "Thailand"}
                onChange={handleRadioChanges}
              />
              <Form.Check
                type="radio"
                label="Foreign"
                name="radioOptions"
                id="teleporterRadios"
                value="Foreign"
                checked={selectedOptions === "Foreign"}
                onChange={handleRadioChanges}
              />
            </Col>
          </Row>
        </Form.Group>
        <span className="logintext">
          วันไปและวันกลับ
          <a href="#" onClick={handleShowModal} class="link">
            เพิ่มหรือแก้ไข
          </a>
        </span>
        <Button
          variant="primary"
          type="submit"
          disabled={!submitEnabled}
          className="buttonlog"
        >
          {isLoading ? <Spinner animation="border" size="sm" /> : "Save"}
        </Button>{" "}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      </Form>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>โปรแกรมทัวร์ท่องเที่ยว</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <form>
                <label for="date">วันไป: </label>
                <input type="date" id="date" name="date" onChange={DayGo} />
                {eff && (
                  <div className="alert alert-danger" role="alert">
                    {eff}
                  </div>
                )}
              </form>
            </Col>
            <Col>
              <form>
                <label for="date">วันกลับ: </label>
                <input
                  type="date"
                  id="dates"
                  name="dates"
                  onChange={DayReturn}
                />
                {eff && (
                  <div className="alert alert-danger" role="alert">
                    {eff}
                  </div>
                )}
              </form>
            </Col>
          </Row>

          {daydata.map((item, index) => (
            <div key={index}>
              <h6>
                วันไป: {item?.attributes?.go_date} วันกลับ:{" "}
                {item?.attributes?.end_date}
              </h6>
              <Button
                variant="secondary"
                onClick={() => handleDelete(item?.id)}
              >
                ลบ
              </Button>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSaveModal}>
            บันทึก
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Addtour;
