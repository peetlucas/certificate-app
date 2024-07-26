import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get("/api/certificates");
        setCertificates(response.data);
      } catch (error) {
        console.error("Failed to fetch certificates", error);
      }
    };

    fetchCertificates();
  }, []);

  return (
    <div>
      <h2>Your Certificates</h2>
      <ul>
        {certificates.map((cert) => (
          <li key={cert.id}>
            <a href={`/certificates/${cert.id}`}>{cert.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
