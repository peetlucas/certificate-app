import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CertificateList = () => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/certificates",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCertificates(response.data);
    };

    fetchCertificates();
  }, []);

  return (
    <div>
      <h2>Certificates</h2>
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

export default CertificateList;
