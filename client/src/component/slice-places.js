import { Container, Carousel, Button } from "react-bootstrap";
import "../css/slice.css";
import config from "../config";

const Slice = ({ data, detailClick }) => {
  return (
    <Container>
      <Carousel className="carousel">
        {data.map((item, index) => (
          <Carousel.Item key={index}>
            <Button
              className="carousel-button"
              onClick={() => detailClick(item)}
            >
              <img
                className="carousel-img"
                src={
                  config.serverAdminUrlPrefix +
                  item.attributes.image.data.attributes.url
                }
                alt="Loading"
              />
            </Button>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default Slice;
