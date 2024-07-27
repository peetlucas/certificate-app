import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import CertificateList from "./components/CertificateList";
import CreateCertificate from "./components/CreateCertificate";
import CertificateDetails from "./components/CertificateDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<CertificateList />} />
          <Route path="/create" element={<CreateCertificate />} />
          <Route path="/certificates/:id" element={<CertificateDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
