const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connect, Contract, WalletConnection } = require("near-api-js");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database setup
mongoose.connect("mongodb://localhost:27017/certificate-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  username: String,
  passwordHash: String,
});

const CertificateSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  details: String,
});

const User = mongoose.model("User", UserSchema);
const Certificate = mongoose.model("Certificate", CertificateSchema);

// Routes
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  // Implement authentication logic here
});

app.get("/api/certificates", async (req, res) => {
  const certificates = await Certificate.find();
  res.json(certificates);
});

app.post("/api/createCertificate", async (req, res) => {
  const { title, details } = req.body;
  const newCertificate = new Certificate({ title, details });
  await newCertificate.save();
  res.json(newCertificate);
});

app.get("/api/certificates/:id", async (req, res) => {
  const certificate = await Certificate.findById(req.params.id);
  res.json(certificate);
});

// NEAR setup
const nearConfig = {
  /* Your NEAR configuration */
};
const near = await connect(nearConfig);
const wallet = new WalletConnection(near);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
