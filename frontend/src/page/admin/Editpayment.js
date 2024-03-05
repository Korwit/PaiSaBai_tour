import React, { useState, useEffect } from "react";
import { Card, Form, CardImg, CardBody, CardTitle, CardText, Badge, Button } from "react-bootstrap";
import axios from "axios";
import '../../css/PaymentStatuscard.css'
import '../../css/editpayment.css'
import NavBar from "../../component/navbar-main";

const Editpayment = () => {
    const [statuses, setStatuses] = useState([]);
    const jwt = localStorage.getItem('jwt')
    const [paymentStatus, setPaymentStatus] = useState([]);
    axios.defaults.headers.common = {
        Authorization: `Bearer ${jwt}`,
    };

    const fetchStatuses = async () => {
        if (jwt != null) {
            const response = await axios.get(
                "/reservations?populate=*&filters[payment_time][$null]=false"
            );
            setStatuses(response.data.data);
            setPaymentStatus(response.data.data.map(item => item.attributes.payment_status));
        }
    };
    const handleChange = async (index,e) => {        
        try {
            const newPaymentStatus = [...paymentStatus];
            newPaymentStatus[index] = !newPaymentStatus[index];
            setPaymentStatus(newPaymentStatus);
            const response = await axios.put(`/reservations/${statuses[index].id}`, {
                data: {
                    payment_status: newPaymentStatus[index]
                }
            });
         
        }
        catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        fetchStatuses();
    }, []);

    return (
        <div>
            <NavBar />
            <div className="card-container">
            <h1>ตรวจสอบการชำระเงิน</h1>
            {statuses.map((e, index) => {
                //console.log(e)
                return (
                    <Card key={e.id} className="paymentstatus-main">
                        <CardImg
                            variant="top"
                            src={"http://localhost:1337" + e.attributes?.payment?.data?.attributes?.url}
                            className="img-ps"
                        />
                        <CardBody className="B4">
                            <CardTitle className="B5" style={{"fontSize": "20px"}}>{e.attributes.tour.data.attributes.name}</CardTitle>
                            <CardText className="B6">
                                ผู้จอง : <Badge>{e.attributes.owner.data.attributes.firstname} {e.attributes.owner.data.attributes.lastname}</Badge>
                                <br />
                                วันที่ชำระเงิน: {e.attributes.payment_date && new Date(e.attributes.payment_date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).split('/').join('-')}
                                <br />
                                เวลาชำระเงิน: {e.attributes.payment_time && e.attributes.payment_time.slice(0, 5).replace(':', '.')}
                                <br />
                                ราคา: {e.attributes.tour.data.attributes.price.toLocaleString()} บาท
                                <Form>
                                    <Form.Check
                                        type="switch"
                                        id={`custom-switch-${e.id}`}
                                        label={paymentStatus[index] ? "ชำระเงินเรียบร้อย" : "รอตรวจสอบการชำระเงิน"}
                                        checked={paymentStatus[index]}
                                        onChange={() => handleChange(index,e)}
                                    />

                                </Form>

                            </CardText>
                        </CardBody>
                    </Card>
                );
            })}
            </div>
        </div>
    );
};


export default Editpayment;

