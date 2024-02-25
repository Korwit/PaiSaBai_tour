import React, { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  Button,
  DropdownButton,
  Dropdown,
  Col,
  Row,
} from "react-bootstrap";
import "../css/search.css";

const Search = ({ data, onFilter, closeTour, closePlace }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [travelMethod, setTravelMethod] = useState("");
  const [sortByPrice, setSortByPrice] = useState("");

  useEffect(() => {
    if (data) {
      const Data = data.map((item) => item.attributes.name);
      onFilter(Data);
    }
  }, [data]);

  const handleSearch = () => {
    closeTour([])
    closePlace([])
    const filteredData = data
      .filter((item) => {
        const nameMatches = item.attributes.name.includes(searchTerm);
        const priceMatches = item.attributes.price <= maxPrice || !maxPrice;
        const travelMethodMatches =
          !travelMethod || item.attributes.travel_by === travelMethod;
        return nameMatches && priceMatches && travelMethodMatches;
      })
      .sort((a,b) => {
        if (sortByPrice === "Max_First") {
          return b.attributes.price - a.attributes.price
        } else if (sortByPrice === "Min_First") {
          return a.attributes.price - b.attributes.price
        } else {
          return 0
        }
      })
      .map((item) => item.attributes.name);
    onFilter(filteredData);
  };

  return (
    <div>
      <Form className="background-color">
        <Row className="align-items-end">
          <Col xs={12} md={6} lg={3} className="mb-2">
            <FormControl
              type="text"
              placeholder="ค้นหาชื่อทัวร์"
              value={searchTerm}
              className="each-col"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col xs={12} md={6} lg={3} className="mb-2">
            <FormControl
              type="number"
              placeholder="ค้นหาราคาไม่เกิน"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </Col>
          <Col xs={12} md={6} lg={2} className="mb-2">
            <DropdownButton
              title={
                travelMethod === "Van"
                  ? "รถตู้" 
                  : travelMethod === "Bus"
                  ? "รถทัวร์"
                  : travelMethod === "Airplane"
                  ? "เครื่องบิน"
                  : travelMethod === "Teleporter"
                  ? "เครื่องเคลื่อนย้ายมวลสาร"
                  : "การเดินทางโดย"
              }
            >
              <Dropdown.Item onClick={() => setTravelMethod("")}>
                การเดินทางโดย
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setTravelMethod("Van")}>
                รถตู้
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setTravelMethod("Bus")}>
                รถทัวร์
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setTravelMethod("Airplane")}>
                เครื่องบิน
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setTravelMethod("Teleporter")}>
                เครื่องเคลื่อนย้ายมวลสาร
              </Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col xs={12} md={6} lg={2} className="mb-2">
            <DropdownButton
              title={
                sortByPrice === "Max_First"
                  ? "สูงไปต่ำ"
                  : sortByPrice === "Min_First"
                  ? "ต่ำไปสูง"
                  : "ลำดับราคา"
              }
            >
              <Dropdown.Item onClick={() => setSortByPrice("")}>
                ลำดับราคา
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSortByPrice("Max_First")}>
                สูงไปต่ำ
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSortByPrice("Min_First")}>
                ต่ำไปสูง
              </Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col xs={12} md={6} lg={1} className="mb-2">
            <Button variant="outline-success" onClick={handleSearch}>
              ค้นหา
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Search;
