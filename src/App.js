import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import CreateCertificate from "./components/CreateCertificate";
import CertificateDetails from "./components/CertificateDetails";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage setUser={setUser} />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <LoginPage setUser={setUser} />}
        />
        <Route
          path="/create"
          element={
            user ? <CreateCertificate /> : <LoginPage setUser={setUser} />
          }
        />
        <Route
          path="/certificates/:id"
          element={
            user ? <CertificateDetails /> : <LoginPage setUser={setUser} />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
