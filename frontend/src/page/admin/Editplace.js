import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Form, Button, Container } from "react-bootstrap";

const EditPlace = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [place, setPlace] = useState({
    image: { data: { attributes: { url: "" } } },
    name: "",
    description: "",
  });
  const [files, setFiles] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getPlace = await axios.get(`/recommend-places/${id}?populate=*`);
        setPlace(getPlace.data.data.attributes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`/recommend-places/${id}`, {
        data: {
          name: place.name,
          description: place.description,
        },
      });

      const formData = new FormData();
      formData.append("files", files);
      formData.append("refId", id);
      formData.append("field", "image");
      formData.append("ref", "api::recommend-place.recommend-place");
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
      setPlace((prevPlace) => ({
        ...prevPlace,
        image: { data: { attributes: { url: reader.result } } },
      }));
    };
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setPlace((prevPlace) => ({
      ...prevPlace,
      name: newName,
    }));
  };

  const PlaceImg = "http://localhost:1337" + place.image.data.attributes.url;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Container>
        <Card style={{ width: "40rem" }}>
          <Card.Body>
            <Card.Title>Edit Recommend-Place</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="image">
                <Form.Label>รูปปัจจุบัน:</Form.Label>
                <br />
                {place.image.data.attributes.url && (
                  <img
                    src={PlaceImg}
                    alt="Place"
                    style={{ width: "100%", margin: "10px", maxWidth: "200px" }}
                  />
                )}
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Form.Group>

              <Form.Group controlId="name">
                <Form.Label>ชื่อสถานที่:</Form.Label>
                <Form.Control
                  type="text"
                  value={place.name}
                  onChange={handleNameChange}
                />
              </Form.Group>

              <Form.Group controlId="details">
                <Form.Label>รายละเอียด:</Form.Label>
                <Form.Control
                  style={{ height: "150px" }}
                  as="textarea"
                  value={place.description}
                  onChange={(e) =>
                    setPlace((prevPlace) => ({
                      ...prevPlace,
                      detail: e.target.value,
                    }))
                  }
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
export default EditPlace;
