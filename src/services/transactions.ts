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

const BASE_URL = process.env.NEXT_API_URL;

export const getTransactions = async (): Promise<{
  transactions: TTransaction[];
}> => {
  const response = await fetch(`${BASE_URL}/api/transactions/`);
  const transactions = await response.json();

  return transactions;
};
