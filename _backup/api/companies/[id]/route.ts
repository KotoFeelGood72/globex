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
    const company = await prisma.company.findUnique({
      where: { id },
      include: {
        transactions: {
          include: {
            broker: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!company) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(company);
  } catch (error) {
    console.error('Error fetching company:', error);
    return NextResponse.json(
      { error: 'Failed to fetch company' },
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

    const company = await prisma.company.findUnique({
      where: { id },
    });

    if (!company) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      );
    }

    const updatedCompany = await prisma.company.update({
      where: { id },
      data,
      include: {
        transactions: {
          include: {
            broker: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    return NextResponse.json(updatedCompany);
  } catch (error) {
    console.error('Error updating company:', error);
    return NextResponse.json(
      { error: 'Failed to update company' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const auth = await checkAuth(request);
    if (auth !== true) {
      return auth;
    }

    const id = request.nextUrl.pathname.split('/').pop();

    const company = await prisma.company.findUnique({
      where: { id },
    });

    if (!company) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      );
    }

    await prisma.company.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Company deleted successfully' });
  } catch (error) {
    console.error('Error deleting company:', error);
    return NextResponse.json(
      { error: 'Failed to delete company' },
      { status: 500 }
    );
  }
}
