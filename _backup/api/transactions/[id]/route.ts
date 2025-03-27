import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';

// Вспомогательная функция для проверки авторизации
async function checkAuth(req: NextRequest): Promise<NextResponse | true> {
  const token = await getToken({ req });
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return true;
}

export async function GET(request: NextRequest) {
  try {
    const auth = await checkAuth(request);
    if (auth !== true) {
      return auth;
    }

    const id = request.nextUrl.pathname.split('/').pop();
    const transaction = await prisma.transaction.findUnique({
      where: { id },
      include: {
        company: true,
        broker: true,
      },
    });

    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(transaction);
  } catch (error) {
    console.error('Error fetching transaction:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transaction' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const auth = await checkAuth(request);
    if (auth !== true) {
      return auth;
    }

    const id = request.nextUrl.pathname.split('/').pop();
    const data = await request.json();

    const transaction = await prisma.transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }

    const updatedTransaction = await prisma.transaction.update({
      where: { id },
      data,
      include: {
        company: true,
        broker: true,
      },
    });

    return NextResponse.json(updatedTransaction);
  } catch (error) {
    console.error('Error updating transaction:', error);
    return NextResponse.json(
      { error: 'Failed to update transaction' },
      { status: 500 }
    );
  }
}
