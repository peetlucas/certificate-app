const { KeyPair, keyStores } = require("near-api-js");
const { NodeKeyStore } = require("@near-js/keystores-node");
const path = require("path");
const fs = require("fs");

const keyStorePath = path.join(__dirname, "keystore");
const keyStore = new NodeKeyStore(keyStorePath);

const accountId = "peetlucas.testnet"; // Replace with your NEAR account ID
const networkId = "testnet"; // Replace with your NEAR network ID

async function generateKeyPair() {
  const keyPair = KeyPair.fromRandom("ed25519");
  await keyStore.setKey(networkId, accountId, keyPair);

  console.log(
    `Key pair generated and stored for account ${accountId} on network ${networkId}`
  );
}

generateKeyPair().catch(console.error);
