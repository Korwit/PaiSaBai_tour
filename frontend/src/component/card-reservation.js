import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import { setDate } from 'rsuite/esm/utils/dateUtils';
import { useParams } from 'react-router-dom';


const ReservationCard = ({data}) => {
    const { cardId } = useParams();
    const navigate = useNavigate();
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [submitEnabled, setSubmitEnabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false)
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [price, setPrice] = useState(0);
    const jwt = localStorage.getItem('jwt')
    axios.defaults.headers.common = { 'Authorization': `bearer ${jwt}` }
    console.log(cardId)
    console.log(data)
    //const { tourId } = useParams();
    useEffect(() => {
        
        // ทำการดึงข้อมูลจาก Strapi
        //console.log(data.id)
        const fetchData = async () => {
            try {
                const userData = await axios.get(`/users/me`);
                console.log(userData)
                setFirstname(userData.data.firstname);
                setLastname(userData.data.lastname);
                setPhone(userData.data.phone);
        
                const tourData = await axios.get(`/tours/${data.tour.id}`);
                const formattedOptions = tourData.data.map((item) => ({
                  label: item.label,
                  value: item.value,
                  price: item.price,
                }));
                setOptions(formattedOptions);
              } catch (error) {
                console.error('Error fetching data:', error);
              }
            };
        
            fetchData();
          }, []);

    const handleSelectChange = (selected) => {
        setSelectedOption(selected);
        setPrice(selected?.price || 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(false);
        try {
            // ทำ HTTP request ไปยัง Strapi API โดยใช้ axios
            setIsLoading(true)
            await axios.post('http://localhost:1337/api/auth/local/reservation', {
                firstName: firstName,
                lastName: lastName,
                phone:phone,
                selectedOption: selectedOption?.value || null, 
        });
        
        } catch (error) {
            console.error('Error sending data to Strapi:', error);
  
        // Handle error as needed
  
        } finally {
            setSubmitEnabled(false);
            setIsLoading(false);
        }
    };

    const handlePaymet = () => {
        navigate("/Payment")
    }

    const handlemain = () => {
        navigate("/")
    }

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
            
            <React.Fragment>
                <strong>ชื่อ :</strong> {firstName} <strong>นามสกุล :</strong> {lastName}<br />
                <strong>เบอร์โทรศัพท์ :</strong> {phone} <br />
                <strong>ราคา:</strong> {selectedOption?.price} ฿<br />
            </React.Fragment>
            <Button
                className='sm-cl1-pri' 
                type="submit"
                onClick={() => handlePaymet()}
            >
                จอง
            </Button>&nbsp;&nbsp;<p />
            <Button className='sm-cl-sec' type="button" onClick={() => handlemain()}>ยกเลิก</Button>
        </form>
  );
};

export default ReservationCard;
