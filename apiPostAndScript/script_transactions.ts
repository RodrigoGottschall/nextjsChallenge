const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

// Função para gerar um ID de transação único
function generateIdempotencyId() {
    return uuidv4();
}

// Função para gerar uma transação aleatória
function generateRandomTransaction() {
  const types = ['credit', 'debit'];
  const type = types[Math.floor(Math.random() * types.length)];
  const amount = Math.floor(Math.random() * 1000) + 1;
  const idempotencyId = generateIdempotencyId(); 
  return {
      idempotencyId: idempotencyId,
      amount: amount,
      type: type
  };
}

// Função para enviar uma transação para a função Lambda
async function sendTransactionToLambda(transaction) {
    try {
        const response = await axios.post('https://2nrkk2vv7yvaeltqoysj4srt6y0lxbbn.lambda-url.sa-east-1.on.aws/', transaction);
        console.log(`Transação enviada com sucesso: ${JSON.stringify(transaction)}`);
        console.log(`Resposta da função Lambda: ${response.data}`);
    } catch (error) {
        console.error(`Erro ao enviar transação: ${error.message}`);
    }
}

// Gerar e enviar 100 transações
async function main() {
    for (let i = 0; i < 100; i++) {
        const transaction = generateRandomTransaction();
        await sendTransactionToLambda(transaction);
    }
}

main();
