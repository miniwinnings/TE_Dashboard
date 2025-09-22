import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/pages/Home";
import Fixture from "./components/pages/Fixture";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fixtures/:id" element={<Fixture />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;