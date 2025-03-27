import { NextResponse } from 'next/server';
import { compare } from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { hashedPassword, password } = await request.json();

    if (!hashedPassword || !password) {
      return NextResponse.json(
        { error: 'Необходимо указать оба пароля' },
        { status: 400 }
      );
    }

    const isPasswordValid = await compare(password, hashedPassword);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Неверный пароль' },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error verifying password:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}
