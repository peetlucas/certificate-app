require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const { connect, keyStores } = require("near-api-js"); // Correct import
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Correct keyStore setup
const keyStorePath = path.join(__dirname, "keystore");
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(keyStorePath);

const accountId = process.env.NEAR_ACCOUNT_ID;
const networkId = process.env.NEAR_NETWORK_ID;

const setupNear = async () => {
  const near = await connect({
    networkId: networkId,
    keyStore: keyStore,
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
  });

  const account = await near.account(accountId);
  return account;
};

setupNear()
  .then((account) => {
    console.log("Connected to NEAR:", account.accountId);
  })
  .catch((err) => {
    console.error("Error connecting to NEAR:", err);
  });

// User authentication and routes

app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(400).json({ error: "Username already exists" });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const token = jwt.sign({ userId: user.id }, "secret", { expiresIn: "1h" });
  res.json({ token });
});

// Certificates route

app.post("/api/certificates", async (req, res) => {
  const { title, description, recipient, dateIssued } = req.body;

  try {
    const certificate = await prisma.certificate.create({
      data: {
        title,
        description,
        recipient,
        dateIssued: new Date(dateIssued), // Ensure date is in the correct format
      },
    });
    res.status(201).json(certificate);
  } catch (error) {
    console.error("Error creating certificate:", error);
    res
      .status(500)
      .json({ error: "Certificate creation failed. Please try again." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
