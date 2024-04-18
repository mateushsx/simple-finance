import prisma from '~/lib/database';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany();

    return NextResponse.json({ transactions });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
