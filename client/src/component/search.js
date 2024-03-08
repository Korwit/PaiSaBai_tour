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
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (data) {
      const Data = data.map((item) => item.attributes.name);
      onFilter(Data);
    }
    handleSearch();
  }, [data]);

  const handleSearch = () => {
    closeTour([]);
    closePlace([]);
    const filteredData = data
      .filter((item) => {
        const nameMatches = item.attributes.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const priceMatches = item.attributes.price <= maxPrice || !maxPrice;
        const travelMethodMatches =
          !travelMethod || item.attributes.travel_by === travelMethod;
        const quantityMax =
          item.attributes.quantity > item.attributes.owners.data.length;
        const idMatches = !id || item.id == id;
        const goDate = item.attributes.trip_dates.data.map(
          (item) => item.attributes.go_date
        );
        const endDate = item.attributes.trip_dates.data.map(
          (item) => item.attributes.end_date
        );
        const dateMatches =
          day && month
            ? isDateInRange(`2024-${month}-${day}`, goDate, endDate)
            : true;
        return (
          nameMatches &&
          priceMatches &&
          travelMethodMatches &&
          quantityMax &&
          idMatches &&
          dateMatches
        );
      })
      .sort((a, b) => {
        if (sortByPrice === "Max_First") {
          return b.attributes.price - a.attributes.price;
        } else if (sortByPrice === "Min_First") {
          return a.attributes.price - b.attributes.price;
        } else {
          return 0;
        }
      })
      .map((item) => item.attributes.name);
    onFilter(filteredData);
  };

  const monthsThai = [
    { value: 1, label: "ม.ค." },
    { value: 2, label: "ก.พ." },
    { value: 3, label: "มี.ค." },
    { value: 4, label: "เม.ย." },
    { value: 5, label: "พ.ค." },
    { value: 6, label: "มิ.ย." },
    { value: 7, label: "ก.ค." },
    { value: 8, label: "ส.ค." },
    { value: 9, label: "ก.ย." },
    { value: 10, label: "ต.ค." },
    { value: 11, label: "พ.ย." },
    { value: 12, label: "ธ.ค." },
  ];

  const isDateInRange = (input, start, end) => {
    const inputDate = new Date(input);
    inputDate.setHours(7, 0, 0, 0);
    const startDate = start.map((date) => new Date(date));
    const endDate = end.map((date) => new Date(date));

    for (let i = 0; i < startDate.length; i++) {
      if (inputDate >= startDate[i] && inputDate <= endDate[i]) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="margin">
      <Form className="background-color">
        <Row>
          <h5 style={{ fontWeight: "bold" }}>ค้นหาทัวร์ / แพ็คเกจ :</h5>
        </Row>
        <Row>
          <Col xs={6} md={6} lg={3}>
            <FormControl
              type="text"
              placeholder="ชื่อทัวร์"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-search"
            />
          </Col>
          <Col xs={6} md={6} lg={3}>
            <FormControl
              type="number"
              placeholder="ราคาไม่เกิน"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="form-search"
            />
          </Col>
          <Col xs={5} md={6} lg={2}>
            <FormControl
              type="number"
              placeholder="ไอดีทัวร์"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="form-search"
            />
          </Col>
          <Col xs={3} md={6} lg={2}>
            <FormControl
              type="number"
              placeholder="วันที่เดินทาง"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="form-search"
            />
          </Col>
          <Col xs={3} md={4} lg={1}>
            <DropdownButton
              title={
                month
                  ? monthsThai.map((item) => month === item.value && item.label)
                  : "เดือน"
              }
              variant="warning"
            >
              <Dropdown.Item onClick={() => setMonth("")}>เดือน</Dropdown.Item>
              {monthsThai.map((item) => (
                <Dropdown.Item
                  key={item.value}
                  onClick={() => setMonth(item.value)}
                >
                  {item.label}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={6} lg={2}>
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
              variant="warning"
              className="dropdown"
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
          <Col xs={6} md={6} lg={2}>
            <DropdownButton
              title={
                sortByPrice === "Max_First"
                  ? "สูงไปต่ำ"
                  : sortByPrice === "Min_First"
                  ? "ต่ำไปสูง"
                  : "ลำดับราคา"
              }
              variant="warning"
              className="dropdown"
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
          <Col xs={12} md={6} lg={2}>
            <Button variant="success" onClick={handleSearch} className="button">
              ค้นหา
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Search;
