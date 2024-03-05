import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import qrcode from '../img/qrpayment.png';
import '../css/payment.css'

const ReservationForm = () => {
    const navigate = useNavigate();

    const [datetimepayment, setDatetime] = useState(new Date());
    const [submitEnabled, setSubmit] = useState('true');
    const [imageFile, setImageFile] = useState(null);
    const [price, setPrice] = useState(0);

    const jwt = localStorage.getItem("jwt");

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
          } catch (error) {
            console.error('Error fetching data from Strapi:', error);
          }
        };

        fetchData();
    }, []); // ให้ useEffect ทำงานเฉพาะครั้งแรก


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
     };

    const handleDateChange = (date) => {
        setDatetime(date);
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('imgfile', imageFile);
            formData.append('datetimepayment', formData.datetimepayment);
            
            // ทำ HTTP request ไปยัง Strapi API โดยใช้ axios
            const response = await axios.post('URL_TO_STRAPI_API', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
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
            <h2>รวมทั้งสิ้น {price}</h2>
            <h4>รายละเอียดการชำระเงิน</h4>
            <h5>ชื่อบัญชี ไปสบาย จำกัด<br/>
                ธนาคาร ธนบัตรทอง<br/>
                เลขบัญชี xxxxxxxx
                <br/>หรือแสกนพร้อมเพย์<br/>
            </h5>
            <img src={qrcode} alt="QR Code" /><br/>
            <h4>หลักฐานการชำระเงิน</h4>
            <Form.Group controlId="imgfile">
                <Form.Label>แนบหลักฐานการชำระเงิน :</Form.Label>
                <Form.Control
                    type="file"
                    name="imgfile"
                    onChange={handleFileChange}
                />
                {imageFile && <img src={URL.createObjectURL(imageFile)} width={"100px"} alt="Selected" />}
            </Form.Group>
            <Form.Group controlId="datetimepayment">
                <Form.Label>วันและเวลาที่ชำระเงิน :</Form.Label>
                <DatePicker
                    selected={datetimepayment}
                    onChange={handleDateChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="เวลา"
                    dateFormat="yyyy-MM-dd HH:mm"
                />
            </Form.Group>
            {/* เพิ่ม input fields อื่น ๆ ตามต้องการ */}<br/>
            <Button className='sm-cl1' type="submit">บันทึก</Button>
            <Button className='sm-cl1' type="button">สถานะการชำระเงิน</Button>

        </form>
  );
};

export default ReservationForm;
