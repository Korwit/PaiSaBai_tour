import { Container, Carousel } from "react-bootstrap";
import "../css/slice.css"

const Slice = (list) => {
    return (
        <Container>
            <Carousel>
                {list.data.map((item, index) => (
                    <Carousel.Item key={index}>
                        <img
                            className="carousel-img"
                            src={"http://localhost:1337"+item.attributes.image.data.attributes.url}
                            alt="Loading"
                        />
                        <Carousel.Caption>
                            <h3>{item.attributes.name}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </Container>
    );
};

export default Slice;
