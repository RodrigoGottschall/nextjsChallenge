import { useEffect, useState } from 'react';
import aws, { DynamoDB } from 'aws-sdk';

interface Transaction {
  idempotencyId: string;
  amount: number;
  type: string;
}

interface TransactionsPageProps {
  transactions: Transaction[];
}

const TransactionsPage: React.FC<TransactionsPageProps> = ({ transactions }) => {
  const [data, setData] = useState<Transaction[]>([]);

  useEffect(() => {
    setData(transactions);
  }, [transactions]);

  return (
    <div>
      <h1>Transações</h1>
      <ul>
        {data.map((transaction, index) => (
          <li key={index}>
            <p>ID: {transaction.idempotencyId}</p>
            <p>Valor: {transaction.amount}</p>
            <p>Tipo: {transaction.type}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export async function getServerSideProps(): Promise<{ props: TransactionsPageProps }> {
  try {
    const dynamoDB = new DynamoDB.DocumentClient({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      region: process.env.AWS_REGION || 'sa-east-1'
    });

    const params: DynamoDB.DocumentClient.ScanInput = {
      TableName: 'transactions'
    };

    const response = await dynamoDB.scan(params).promise();
    const transactions: Transaction[] = response.Items ? response.Items.map(item => item as Transaction) : [];

    return { props: { transactions } };
  } catch (error: any) {
    console.error('Erro ao obter transações:', error.message);
    return { props: { transactions: [] } };
  }
}

export default TransactionsPage;
