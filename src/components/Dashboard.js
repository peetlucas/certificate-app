import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/certificates"
      );
      setCertificates(response.data);
    };

    fetchCertificates();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <Link to="/create">Create Certificate</Link>
      <ul>
        {certificates.map((certificate) => (
          <li key={certificate.id}>
            <Link to={`/certificates/${certificate.id}`}>
              {certificate.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
