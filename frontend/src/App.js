import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./page/Main";
import Login from "./page/Login";
import Forgotpass from "./page/Forgotpass";
import Emailsend from "./page/Emailsend";
import Register from "./page/Register";
import Setting from "./page/Setting";
import Payment from "./page/Payment";
import Reservation from "./page/Reservation";
import axios from "axios";

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
        <Route path="/setting" element={<Setting />} /> 
        <Route path="/payment" element={<Payment />} /> 
        <Route path="/reserva" element={<Reservation />} /> 
      </Routes>
    </BrowserRouter>
  );
};

export default App;
