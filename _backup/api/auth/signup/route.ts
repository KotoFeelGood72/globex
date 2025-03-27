import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hash } from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { email, password, name, phone, role } = await request.json();

    // Проверяем уникальность email
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email уже используется' },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone,
        role,
        ...(role === 'broker' && {
          broker: {
            create: {
              commissionRate: 0.5
            }
          }
        }),
        ...(role === 'company' && {
          company: {
            create: {
              balance: 0
            }
          }
        }),
        ...(role === 'partner' && {
          partner: {
            create: {
              commissionRate: 0.3
            }
          }
        })
      }
    });

    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}
