import { Container, Carousel, Button } from "react-bootstrap";
import "../css/slice.css";

const Slice = ({data,detailClick}) => {
  return (
    <Container>
      <Carousel className="carousel">
        {data.map((item, index) => (
          <Carousel.Item key={index}>
            <Button className="carousel-button" onClick={() => detailClick(item)}>
              <img
                className="carousel-img"
                src={
                  "http://localhost:1337" +
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
