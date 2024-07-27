import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CertificateDetails = () => {
  const { id } = useParams();
  const [certificate, setCertificate] = useState(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/certificates/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCertificate(response.data);
    };

    fetchCertificate();
  }, [id]);

  if (!certificate) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{certificate.title}</h2>
      <p>{certificate.details}</p>
    </div>
  );
};

export default CertificateDetails;
