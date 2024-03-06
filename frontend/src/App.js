import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./page/Main";
import Login from "./page/Login";
import Forgotpass from "./page/Forgotpass";
import Emailsend from "./page/Emailsend";
import Register from "./page/Register";
import BookingHistory from "./page/History";
import PaymentStatus from "./page/Paymentstatus";
import Setting from "./page/Setting";
import Payment from "./page/Payment";
import Reservation from "./page/Reservation";
import History from "./page/History";
import axios from "axios";
import Addrecommend from "./page/admin/Addrecommend";
import Addtour from "./page/admin/Addtour";
import Editpayment from "./page/admin/Editpayment";
import EditTour from "./page/admin/Edittour";
import EditPlace from "./page/admin/Editplace";

axios.defaults.baseURL =
  process.env.React_APP_BASE_URL || "http://localhost:1337/api";
/*const result = localStorage.getItem('jwt');
  axios.defaults.headers.common = { 'Authorization': `bearer ${result}` };*/
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/forgot" element={<Forgotpass />} />
        <Route path="/email" element={<Emailsend />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/paymentstatus" element={<PaymentStatus />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/reservation/:cardId" element={<Reservation />} />
        <Route path="/history" element={<History />} />
        <Route path="/admin/addrecommend" element={<Addrecommend />} />
        <Route path="/admin/addtour" element={<Addtour />} />
        <Route path="/admin/editpayment" element={<Editpayment />} />
        <Route path="/admin/edittour/:id" element={<EditTour />} />
        <Route path="/admin/editplace/:id" element={<EditPlace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
