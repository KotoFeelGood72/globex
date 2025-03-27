import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { UserRole } from '@prisma/client';
import { hash } from 'bcrypt';

// Вспомогательная функция для проверки авторизации
async function checkAuth(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return null;
    }

    return { role: 'admin' }; // Временно для тестов
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
}

// GET /api/brokers
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const search = url.searchParams.get('search');

    const where: any = {
      role: 'broker'
    };

    if (status) {
      where.broker = {
        status
      };
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ];
    }

    const users = await prisma.user.findMany({
      where,
      include: {
        broker: {
          include: {
            transactions: {
              include: {
                company: true
              },
              orderBy: {
                createdAt: 'desc'
              }
            }
          }
        }
      }
    });

    const usersWithoutPasswords = users.map(user => {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    return NextResponse.json(usersWithoutPasswords);
  } catch (error) {
    console.error('Error fetching brokers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch brokers' },
      { status: 500 }
    );
  }
}

// POST /api/brokers
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== UserRole.admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { email, password, name, commissionRate } = await request.json();

    // Проверяем обязательные поля
    if (!email || !password || !name || !commissionRate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Проверяем уникальность email
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'broker',
        broker: {
          create: {
            commissionRate
          }
        }
      },
      include: {
        broker: {
          include: {
            transactions: {
              include: {
                company: true
              },
              orderBy: {
                createdAt: 'desc'
              }
            }
          }
        }
      }
    });

    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Error creating broker:', error);
    return NextResponse.json(
      { error: 'Failed to create broker' },
      { status: 500 }
    );
  }
}
