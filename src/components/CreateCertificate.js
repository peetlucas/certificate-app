import React, { useState } from "react";
import axios from "axios";

const CreateCertificate = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const handleCreate = async () => {
    try {
      await axios.post("/api/createCertificate", { title, details });
      // Redirect to dashboard or other page
    } catch (error) {
      console.error("Failed to create certificate", error);
    }
  };

  return (
    <div>
      <h2>Create Certificate</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />
      <button onClick={handleCreate}>Create</button>
    </div>
  );
};

export default CreateCertificate;
