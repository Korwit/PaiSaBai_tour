import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./page/Main";
import Tour from "./page/detail-tour";
import axios from "axios";

axios.defaults.baseURL =
  process.env.React_APP_BASE_URL || "http://localhost:1337/api";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail/:name" element={<Tour />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
