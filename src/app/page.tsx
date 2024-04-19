import {
  FolderDown,
  FolderUp,
  DollarSign,
  BadgeDollarSign,
} from 'lucide-react';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from '~/components/ui/card';
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from '~/components/ui/table';
import { cn } from '~/lib/utils';
import { formatCurrency } from '~/utils/currency';
import { getTransactions } from '~/services/transactions';

import type { TTransaction } from '~/services/transactions';

export default async function Home() {
  const { transactions } = await getTransactions();

  const parseType = (type: TTransaction['type']) => {
    switch (type) {
      case 'input':
        return 'Entrada';
      case 'output':
        return 'Saida';
    }
  };

  const totalInput = transactions
    .filter((transaction) => transaction.type === 'input')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalOutput = transactions
    .filter((transaction) => transaction.type === 'output')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const total = totalInput - totalOutput;

  return (
    <main className="flex container flex-col items-center justify-between gap-12 p-24">
      <header className="flex itens-center justify-between w-full">
        <div className="flex items-center gap-1">
          <BadgeDollarSign className="text-primary" size={46} />
          <h1 className="text-2xl font-bold">Simple Finance</h1>
        </div>

        <Button>Nova Transação</Button>
      </header>

      <section className="flex w-full items-center justify-center gap-10">
        <Card className="w-80">
          <CardHeader className="flex flex-row items-center justify-between ">
            <CardTitle className="font-medium text-xl">Entrada</CardTitle>

            <FolderUp className="text-green-700" size={32} />
          </CardHeader>

          <CardContent>
            <CardDescription className="text-2xl font-semibold text-green-700">
              {formatCurrency(totalInput, 'BRL')}
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="w-80">
          <CardHeader className="flex flex-row items-center justify-between ">
            <CardTitle className="font-medium text-xl">Saída</CardTitle>

            <FolderDown className="text-red-700" size={32} />
          </CardHeader>

          <CardContent>
            <CardDescription className="text-2xl font-semibold text-red-700">
              {formatCurrency(totalOutput, 'BRL')}
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="w-80 ">
          <CardHeader className="flex flex-row items-center justify-between ">
            <CardTitle className="font-medium text-xl">Total</CardTitle>

            <DollarSign className="text-blue-700" size={32} />
          </CardHeader>

          <CardContent>
            <CardDescription className="text-2xl font-semibold text-blue-700">
              {formatCurrency(total, 'BRL')}
            </CardDescription>
          </CardContent>
        </Card>
      </section>

      <section className="flex w-full items-center justify-center gap-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Descricão</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Tipo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.description}</TableCell>
                <TableCell
                  className={cn(
                    transaction.type === 'input'
                      ? 'text-green-700'
                      : 'text-red-700'
                  )}
                >
                  {formatCurrency(transaction.amount, 'BRL')}
                </TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{parseType(transaction.type)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
