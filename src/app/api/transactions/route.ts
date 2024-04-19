import prisma from '~/lib/database';
import { NextResponse } from 'next/server';

import type { TTransactionDTO } from '~/services/transactions';
import { generateNumberUid } from '~/utils/uid';

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany();

    return NextResponse.json({ transactions });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function POST(transactionDTO: TTransactionDTO) {
  try {
    await prisma.transaction.create({
      data: {
        ...transactionDTO,
        id: generateNumberUid(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error, success: false });
  }
}
