import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import qrcode from '../img/qrpayment.png';
import '../css/payment.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReservationForm = () => {
    const navigate = useNavigate();

    const [datetimepayment, setDatetime] = useState(new Date());
    const [submitEnabled, setSubmit] = useState('true');
    const [imageFile, setImageFile] = useState(null);
    const [price, setPrice] = useState(false);
    const [data, setdata] = useState(0);
    const [checkboxData, setCheckboxData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [files, setFiles] = useState()
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [tourData, setTourData] = useState([]);
    const [ID, setID] = useState();
    const [ID2, setID2] = useState();
    const [prices, setPrices] = useState(false);
    const jwt = localStorage.getItem("jwt");
    axios.defaults.headers.common = {
        Authorization: `Bearer ${jwt}`,
    };

    useEffect(() => {
        // ทำการดึงข้อมูลจาก Strapi
        const fetchData = async () => {
            try {
                const result = await axios.get('/users/me')
                //console.log(result)

                const response = await axios.get(`/reservations?populate=*&filters[owner][username][$eq]=${result.data.username}`);
                // นำข้อมูลมาแปลงเป็นรูปแบบที่ react-select รับ
                console.log(response.data.data?.[0]?.attributes.tour.data.attributes.name)
                console.log(response.data.data)
                const tours = response.data.data?.map(item => item.attributes.tour.data.attributes.name) || [];
                setTourData(tours.map(tour => ({ label: tour, checked: false })));
                const IDs = response.data.data?.map(item => item.id) || [];
                setdata(response.data.data);
                setID(IDs)
                const pc = response.data.data?.map(item => item.attributes.tour.data.attributes.price) || [];
                setPrice(pc);
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
    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleFileChange = (e) => {
        const file = e.target.files;
        setImageFile(file);
    };
    const handleTourChange = (selectedTour, i) => {
        const updatedTourData = tourData.map(tour => {
            return {
                label: tour.label,
                checked: tour.label === selectedTour
            };
        });
        setTourData(updatedTourData);
        setID2(i)
        setPrices(price[i])
        console.log(i)

    };
    const handleShowModal = () => setShowModal(true);
    const handleDateChange = (date) => {
        setDatetime(date);
        console.log(date)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            axios.defaults.headers.common = {
                Authorization: `Bearer ${jwt}`,
            };
            const formData = new FormData()
            formData.append('files', imageFile[0])
            formData.append('refId', ID[ID2])
            formData.append('field', 'payment')
            formData.append('ref', 'api::reservation.reservation')
            axios.post("/upload", formData)
            const dateObject = new Date(datetimepayment)
            // รับวันที่เป็นสตริง เช่น "3/14/2024"
            const time = dateObject.toTimeString().split(' ')[0];
            const year = dateObject.getFullYear();
            const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // เพิ่มเลข 0 ถ้าเดือนเป็นเลขเดียว
            const day = String(dateObject.getDate()).padStart(2, '0'); // เพิ่มเลข 0 ถ้าวันเป็นเลขเดียว
            const date = `${year}-${month}-${day}`;

            console.log(date)
            console.log(time)
            console.log(dateObject)
            const response = await axios.put(`/reservations/${ID[ID2]}`, {
                data: {
                    "payment_time": time,
                    "payment_date": date
                },
            });
            console.log('Data sent to Strapi:', response.data);
            toast("บันทึกข้อมูลเรียบร้อย");
            setTimeout(() => {
                navigate('/');
            }, 1000);
            // ทำการจัดการ response ตามที่ต้องการ
        } catch (error) {
            console.error('Error sending data to Strapi:', error);
            // ทำการจัดการ error ตามที่ต้องการ
        }
    };

    return (
        <div>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>โปรแกรมทัวร์ท่องเที่ยว
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {tourData.map((tour, index) => (
                        <Form.Check
                            key={index}
                            type="radio"
                            label={tour.label}
                            checked={tour.checked}
                            onChange={() => handleTourChange(tour.label, index)}
                        />
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        บันทึก
                    </Button>
                </Modal.Footer>
            </Modal>
            <span className='logintext'>เลือกทัวร์ของคุณ<a href="#" onClick={handleShowModal} class="link" style={{ "color": "blue" }}>โปรแกรมทัวร์</a></span>
            <form onSubmit={handleSubmit}>
                <h2>รวมทั้งสิ้น {prices}</h2>
                <h4>รายละเอียดการชำระเงิน</h4>
                <h5>ชื่อบัญชี ไปสบาย จำกัด<br />
                    ธนาคาร ธนบัตรทอง<br />
                    เลขบัญชี xxxxxxxx
                    <br />หรือแสกนพร้อมเพย์<br />
                </h5>
                <img src={qrcode} alt="QR Code" /><br />
                <h4>หลักฐานการชำระเงิน</h4>
                <Form.Group controlId="imgfile">
                    <Form.Label>แนบหลักฐานการชำระเงิน :</Form.Label>
                    <Form.Control
                        type="file"
                        name="imgfile"
                        onChange={handleFileChange}
                    />

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
                {/* เพิ่ม input fields อื่น ๆ ตามต้องการ */}<br />
                <Button className='sm-cl1' type="submit">บันทึก</Button>


            </form>
            <ToastContainer />
        </div>
    );
};

export default ReservationForm;
