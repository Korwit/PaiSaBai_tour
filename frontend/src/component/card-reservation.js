import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import { setDate } from 'rsuite/esm/utils/dateUtils';
import { useParams } from 'react-router-dom';


<<<<<<< HEAD
const ReservationCard = ({ data }) => {
=======
const ReservationCard = ({data}) => {
    const [name, setName] = useState('');
>>>>>>> 479bc31c5c9d6467986ea65f5d5a2cfb749cd4bf
    const { cardId } = useParams();
    const navigate = useNavigate();
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [submitEnabled, setSubmitEnabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false)
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState([]);
    const [price, setPrice] = useState(0);
<<<<<<< HEAD
    const [datas, setdata] = useState('');
    const [owners, setowners] = useState('');
    const jwt = localStorage.getItem('jwt')
    axios.defaults.headers.common = { 'Authorization': `bearer ${jwt}` }

=======

    const jwt = localStorage.getItem('jwt')
    axios.defaults.headers.common = { 'Authorization': `bearer ${jwt}` }
    console.log(cardId)
    
    console.log(data)
    //const { tourId } = useParams();
>>>>>>> 479bc31c5c9d6467986ea65f5d5a2cfb749cd4bf
    useEffect(() => {

        // ทำการดึงข้อมูลจาก Strapi
        //console.log(data.id)
        const fetchData = async () => {
            try {
                const userData = await axios.get(`/users/me`);
                setFirstname(userData.data.firstname);
                setLastname(userData.data.lastname);
                setPhone(userData.data.phone);
<<<<<<< HEAD
                setowners(userData.data.id);
                const tourData = await axios.get(`/tours/${cardId}?populate=*`);
                setdata(tourData.data.data)                
                const r = tourData.data.data.attributes.trip_dates.data?.map(item => ({
                    label: 'วันไป ' + item.attributes.go_date + ' วันกลับ ' + item.attributes.end_date,
                    value: item.id,

                })) || [];
                setOptions(r);
                setSelectedOption(r[0]);

            } catch (error) {
=======
                const tourData = await axios.get(`/tours/${cardId}?populate=*`);

                console.log(tourData)
                setName(tourData.data.name);
                setPrice(tourData.data.price);
                console.log(price)
                const formattedOptions = tourData.data.trip_date.map((item) => ({
                  label: item.label,
                  value: item.value,
                }));
                setOptions(formattedOptions);
              } catch (error) {
>>>>>>> 479bc31c5c9d6467986ea65f5d5a2cfb749cd4bf
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSelectChange = (selected) => {
        setSelectedOption(selected);
        console.log(selected)
        setPrice(selected?.price || 0);
    };

    const handleSubmit = async (e) => {
       console.log(datas.attributes.id)
        try {
<<<<<<< HEAD
           
            await axios.post('/reservations', {
                data:
                {
                    tour: [datas.id],
                    owner:owners,
                }
            });
            navigate("/payment")
=======
            // ทำ HTTP request ไปยัง Strapi API โดยใช้ axios
            setIsLoading(true)
            await axios.post('http://localhost:1337/api/auth/local/reservation', {
                
                selectedOption: selectedOption?.value || null, 
        });
        
>>>>>>> 479bc31c5c9d6467986ea65f5d5a2cfb749cd4bf
        } catch (error) {
            console.error('Error sending data to Strapi:', error);



        } finally {
            setSubmitEnabled(false);
          
        }
    };

    const handlePaymet = () => {

    }

    const handlemain = () => {
        navigate("/")
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>ข้อมูลผู้เข้าจอง</h2>
            <h4>กรุณากรอกข้อมูลและตรวจสอบการจอง</h4>
            <h3>โปรแกรมทัวร์</h3>{name}
            <Form.Label>วันที่เดินทาง :</Form.Label>
            <Select
                options={options}
                value={selectedOption}
                onChange={handleSelectChange}
                placeholder="เลือกวันที่เดินทาง"
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
            />
            <br />

            <React.Fragment>
                <strong>ชื่อ :</strong> {firstName} <strong>นามสกุล :</strong> {lastName}<br />
                <strong>เบอร์โทรศัพท์ :</strong> {phone} <br />
<<<<<<< HEAD
                <strong>ราคา:</strong> {datas.attributes?.price} ฿<br />
            </React.Fragment>
            <Button
                className='sm-cl1-pri'
                type="button"
                onClick={() => handleSubmit()}            >
=======
                <strong>ราคา:</strong> {price} ฿<br />
            </React.Fragment><br />
            <center><Button
                className='sm-cl1-pri' 
                type="submit"
                onClick={() => handleSubmit()}
            >
>>>>>>> 479bc31c5c9d6467986ea65f5d5a2cfb749cd4bf
                จอง
            </Button>&nbsp;&nbsp;&nbsp;&nbsp;
            <Button className='sm-cl-sec' type="button" onClick={() => handlemain()}>ยกเลิก</Button></center>
        </form>
    );
};

export default ReservationCard;