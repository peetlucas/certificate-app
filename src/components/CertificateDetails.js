import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CertificateDetails = () => {
  const { id } = useParams();
  const [certificate, setCertificate] = useState(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await axios.get(`/api/certificates/${id}`);
        setCertificate(response.data);
      } catch (error) {
        console.error("Failed to fetch certificate", error);
      }
    };

    fetchCertificate();
  }, [id]);

  if (!certificate) return <div>Loading...</div>;

  return (
    <div>
      <h2>{certificate.title}</h2>
      <p>{certificate.details}</p>
    </div>
  );
};

export default CertificateDetails;
