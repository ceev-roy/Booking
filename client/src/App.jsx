// import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SarasvatiPooja from "./pages/SarasvatiPooja";
import Confirmation from "./pages/Confirmation";
import Subscription from "./pages/Subscription";

export default function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/pooja/sarasvati"
          element={<SarasvatiPooja />}
        />
        <Route path="/confirmation/:id" element={<Confirmation />} />
        <Route path="/subscription" element={<Subscription />} />
      </Routes>
    </Router>
  );
}
