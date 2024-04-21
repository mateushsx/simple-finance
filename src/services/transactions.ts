export type TTransactionDTO = {
  description: string;
  amount: number;
  category: string;
  type: 'input' | 'output';
  date: string;
};

export type TTransaction = {
  id: number;
} & TTransactionDTO;

const BASE_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

export const getTransactions = async (): Promise<{
  transactions: TTransaction[];
}> => {
  const response = await fetch(`${BASE_URL}/api/transactions/`);
  const transactions = await response.json();

  return transactions;
};

export const createTransaction = async (transaction: TTransactionDTO) => {
  await fetch(`${BASE_URL}/api/transactions/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transaction),
  });
};
