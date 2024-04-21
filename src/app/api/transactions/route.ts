import prisma from '~/lib/database';

import { NextRequest, NextResponse } from 'next/server';
import { generateNumberUid } from '~/utils/uid';

import type { TTransactionDTO } from '~/services/transactions';

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const transactions = await prisma.transaction.findMany();
    const transactionsData = transactions.map((transaction) => {
      return {
        ...transaction,
        id: Number(transaction.id),
        date: transaction.date.toISOString(),
        amount: Number(transaction.amount),
      };
    });

    return NextResponse.json({ transactions: transactionsData });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const transactionDTO = body as TTransactionDTO;

  try {
    await prisma.transaction.create({
      data: {
        ...transactionDTO,
        date: new Date(transactionDTO.date),
        amount: Number(transactionDTO.amount),
        id: generateNumberUid(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error, success: false });
  }
}
