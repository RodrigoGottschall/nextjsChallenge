const express = require("express");
const AWS = require("aws-sdk");
require('dotenv').config();

const app = express();
app.use(express.json());

const sqs = new AWS.SQS({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

app.post("/transacao", async (req, res) => {
  const { idempotencyId, amount, type } = req.body;
  const message = { idempotencyId, amount, type };
  const params = {
    QueueUrl: process.env.QUEUE_URL,
    MessageBody: JSON.stringify(message),
  };  

  await sqs.sendMessage(params).promise();

  res.json({ message: "Transação enviada para fila SQS" });
});

app.listen(3000, () => {
  console.log("API rodando na porta 3000");
});
