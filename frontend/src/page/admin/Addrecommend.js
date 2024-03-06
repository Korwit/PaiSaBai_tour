import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Spinner, Row, Col, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../css/addrecommend.css";
import NavBar from "../../component/navbar-main";

const Addrecommend = () => {
    const navigate = useNavigate();
    const [detail, setDetail] = useState('');
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
    axios.defaults.headers.common = { 'Authorization': `bearer ${jwt}` }
    useEffect(() => {    
        if (jwt == null) {
          window.location.reload();
          navigate('/admin')
        }
    }, [jwt]);

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handletopic = (e) => {
    setTopic(e.target.value);
  };

  const handledetail = (e) => {
    setDetail(e.target.value);
  };

  const handleCheckboxChange = (e, id) => {
    const updatedCheckboxData = checkboxData.map((item) => {
      if (item.id === id) {
        return { ...item, checked: e.target.checked };
      }
      return item;
    });
    setCheckboxData(updatedCheckboxData);
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedCheckboxes((prevState) => [...prevState, id]);
    } else {
      setSelectedCheckboxes((prevState) =>
        prevState.filter((item) => item !== id)
      );
    }
  };

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('/tours');
                setdata(response.data.data);
                //console.log(response.data.data)
                if (Array.isArray(response.data.data)) {

                    setCheckboxData(response.data.data.map(item => ({
                        id: item.id,
                        label: item.attributes.name,
                        checked: false
                    })));
                }
                const result = await axios.get('/users/me?populate=role');                
                if (result.data.role) {
                    if (result.data.role.name === 'Member') {
                        navigate('/');
                    }  
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getData();
    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();
        setSubmitEnabled(false);
        try {
            
            setIsLoading(true)
            const result = await axios.post('/recommend-places', {
                data:
                {
                    name: topic,
                    description: detail,
                    tours: selectedCheckboxes,
                }
            });
            const formData = new FormData()
            formData.append('files', files[0])
            formData.append('refId', result.data.data.id)
            formData.append('field', 'payment')
            formData.append('ref', 'api::recommend-place.recommend-place')
            axios.post("/upload", formData)
            setTimeout(() => {
                navigate('/admin');
            }, 1000);
            toast("บันทึกข้อมูลเรียบร้อย");

        } catch (e) {
            console.log(e);
       
        } finally {
            setSubmitEnabled(true);
            setIsLoading(false)

        }
    };


  return (
    <div className="body">
      <NavBar />

      <h1 className="h1add">เพิ่มสถานที่ท่องเที่ยวที่แนะนำ</h1>

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
            <div className="adddetailre">
              <Form.Label>รายละเอียด</Form.Label>
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
        <span className="logintext">
          ต้องการเชื่อมโยงไปยังโปรแกรมทัวร์?
          <a href="#" onClick={handleShowModal} class="link">
            โปรแกรมทัวร์
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
          {checkboxData.map((checkboxItem, index) => (
            <Form.Check
              key={index}
              type="checkbox"
              label={checkboxItem.label}
              checked={checkboxItem.checked}
              onChange={(e) => handleCheckboxChange(e, checkboxItem.id)}
            />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            บันทึก
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Addrecommend;
