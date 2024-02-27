import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';

const ReservationForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstname:'',
        lastname:'',
        phone:'',
        submitEnabled:'true',

    })
    
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        // ทำการดึงข้อมูลจาก Strapi
        const fetchData = async () => {
          try {
            const response = await axios.get('URL_TO_STRAPI_ENDPOINT');
            // นำข้อมูลมาแปลงเป็นรูปแบบที่ react-select รับ
            const formattedOptions = response.data.map((item) => ({
                label: item.label,  // ตามข้อมูลจริงใน Strapi
                value: item.value,  // ตามข้อมูลจริงใน Strapi
                price: item.price,
            }));
            setOptions(formattedOptions);
          } catch (error) {
            console.error('Error fetching data from Strapi:', error);
          }
        };

        fetchData();
    }, []); // ให้ useEffect ทำงานเฉพาะครั้งแรก

    const handleSelectChange = (selected) => {
        setSelectedOption(selected);
        setPrice(selected?.price || 0);
    };

    const handleChange = (e) => {
    // อัปเดต state เมื่อมีการเปลี่ยนแปลงใน input fields
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        // ทำ HTTP request ไปยัง Strapi API โดยใช้ axios
        const response = await axios.post('URL_TO_STRAPI_API', {formData,
            selectedOption: selectedOption?.value || null,
            
        });
        console.log('Data sent to Strapi:', response.data);
        // ทำการจัดการ response ตามที่ต้องการ
        } catch (error) {
        console.error('Error sending data to Strapi:', error);
        // ทำการจัดการ error ตามที่ต้องการ
    }
  };

  return (
        <form onSubmit={handleSubmit}>
            <h2>ข้อมูลผู้เข้าจอง</h2>
            <h4>กรุณากรอกข้อมูลและตรวจสอบการจอง</h4>
            <Form.Label>วันที่เดินทาง :</Form.Label>
            <Select
                options={options}
                value={selectedOption}
                onChange={handleSelectChange}
                placeholder="เลือกวันที่เดินทาง"
            /><br/>
            
            <Form.Group controlId="firstName">
                <Form.Label>ชื่อ :</Form.Label>
                <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group controlId="lastName">
                <Form.Label>นามสกุล :</Form.Label>
                <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group controlId="lastName">
                <Form.Label>เบอร์โทรศัพท์ :</Form.Label>
                <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.phone}
                    onChange={handleChange}
                />
            </Form.Group>
            {/* เพิ่ม input fields อื่น ๆ ตามต้องการ */}<br/>
            <p>ราคา: {price}</p>
            <Button className='sm-cl1' type="submit">
                จอง
            </Button>
        </form>
  );
};

export default ReservationForm;
