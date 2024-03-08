import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Form, Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import config from "../../config";

const EditTour = () => {
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  axios.defaults.headers.common = {
    Authorization: `bearer ${jwt}`,
  };
  const { id } = useParams();
  const [tour, setTour] = useState({
    image: { data: { attributes: { url: "" } } },
    name: "",
    price: 0,
    quantity: 0,
    detail: "",
    travel_by: "",
  });
  const [files, setFiles] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getTour = await axios.get(`/tours/${id}?populate=*`);
        setTour(getTour.data.data.attributes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`/tours/${id}`, {
        data: {
          name: tour.name,
          detail: tour.detail,
          price: tour.price,
          travel_by: tour.travel_by,
        },
      });

      const formData = new FormData();
      formData.append("files", files);
      formData.append("refId", id);
      formData.append("field", "image");
      formData.append("ref", "api::tour.tour");
      if (formData) {
        axios
          .post("/upload", formData)
          .then((response) => {})
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFiles(file);
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onloadend = () => {
      setTour((prevTour) => ({
        ...prevTour,
        image: { data: { attributes: { url: reader.result } } },
      }));
    };
  };

  const handleTravelMethodChange = (event) => {
    const selectedMethod = event.target.value;
    setTour((prevTour) => ({
      ...prevTour,
      travel_by: selectedMethod,
    }));
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setTour((prevTour) => ({
      ...prevTour,
      name: newName,
    }));
  };

  const TourImg = config.serverAdminUrlPrefix + tour.image.data.attributes.url;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Container style={{ marginTop: "10%" }}>
        <Card style={{ width: "40rem" }}>
          <Card.Body>
            <Card.Title>Edit Tour</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="image">
                <Form.Label>รูปปัจจุบัน:</Form.Label>
                <br />
                {tour.image.data.attributes.url && (
                  <img
                    src={TourImg}
                    alt="Tour"
                    style={{ width: "100%", margin: "10px", maxWidth: "100px" }}
                  />
                )}
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Form.Group>

              <Form.Group controlId="name">
                <Form.Label>ชื่อทัวร์:</Form.Label>
                <Form.Control
                  type="text"
                  value={tour.name}
                  onChange={handleNameChange}
                />
              </Form.Group>

              <Form.Group controlId="price">
                <Form.Label>ราคาโปรแกรมทัวร์:</Form.Label>
                <Form.Control
                  type="number"
                  value={tour.price}
                  onChange={(e) =>
                    setTour((prevTour) => ({
                      ...prevTour,
                      price: e.target.value,
                    }))
                  }
                />
              </Form.Group>

              <Form.Group controlId="quantity">
                <Form.Label>จำนวนคน:</Form.Label>
                <Form.Control
                  type="number"
                  value={tour.quantity}
                  onChange={(e) =>
                    setTour((prevTour) => ({
                      ...prevTour,
                      quantity: e.target.value,
                    }))
                  }
                />
              </Form.Group>

              <Form.Group controlId="details">
                <Form.Label>รายละเอียด:</Form.Label>
                <Form.Control
                  as="textarea"
                  value={tour.detail}
                  onChange={(e) =>
                    setTour((prevTour) => ({
                      ...prevTour,
                      detail: e.target.value,
                    }))
                  }
                />
              </Form.Group>

              <Form.Group controlId="travelMethod">
                <Form.Label>Travel Method:</Form.Label>
                <Form.Check
                  type="radio"
                  label="รถตู้"
                  value="Van"
                  checked={tour.travel_by === "Van"}
                  onChange={handleTravelMethodChange}
                />
                <Form.Check
                  type="radio"
                  label="รถทัวร์"
                  value="Bus"
                  checked={tour.travel_by === "Bus"}
                  onChange={handleTravelMethodChange}
                />
                <Form.Check
                  type="radio"
                  label="เครื่องบิน"
                  value="Airplane"
                  checked={tour.travel_by === "Airplane"}
                  onChange={handleTravelMethodChange}
                />
                <Form.Check
                  type="radio"
                  label="เครื่องเคลื่อนย้ายมวลสาร"
                  value="Teleporter"
                  checked={tour.travel_by === "Teleporter"}
                  onChange={handleTravelMethodChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={() => navigate("/")}
              >
                Save
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default EditTour;
