# O Seguinte desafio consistia em:

1. Fazer uma API POST em NodeJS que receba um payload de uma transação (idempotencyId, amount, type: credit /debit).
2. Essa rota deve executar uma função que coloca a transação em uma AWS SQS (fila), usando SDK da AWS.
3. Suba também uma função AWS Lambda conectada nessa SQS que pegue cada mensagem e salve num banco de dados AWS DynamoDB.
4. Crie um script de teste para criar 100 transações diferentes e fazer a requisição POST.
5. Crie uma tela simples usando Next.JS que exiba essas transações salvas no DynamoDB, a partir de uma rota GET.

Todas as etapas foram executadas e sua funcionalidade pode ser verificada através do link:

https://youtu.be/QwvHx4u6pRA
