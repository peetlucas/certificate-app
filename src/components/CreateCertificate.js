import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateCertificate = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [recipient, setRecipient] = useState("");
  const [dateIssued, setDateIssued] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateCertificate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/certificates",
        {
          title,
          description,
          recipient,
          dateIssued,
        }
      );
      console.log(response.data);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Certificate creation failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Create Certificate</h2>
      <form onSubmit={handleCreateCertificate}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Date Issued"
          value={dateIssued}
          onChange={(e) => setDateIssued(e.target.value)}
          required
        />
        <button type="submit">Create</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CreateCertificate;
