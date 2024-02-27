import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./page/Main";
import Login from "./page/Login";
import Forgotpass from "./page/Forgotpass";
import Emailsend from "./page/Emailsend";
import Register from "./page/Register";
import axios from "axios";

axios.defaults.baseURL =
  process.env.React_APP_BASE_URL || "http://localhost:1337/api";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot" element={<Forgotpass />} />
        <Route path="/email" element={<Emailsend />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/main" element={<Main />} /> 
      </Routes>
    </BrowserRouter>
  );
};

export default App;
