import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { hash } from 'bcrypt';

// GET /api/brokers/[id]
export async function GET(
  _req: any,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: params.id },
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

    if (!user) {
      return NextResponse.json(
        { error: 'Broker not found' },
        { status: 404 }
      );
    }

    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Error fetching broker:', error);
    return NextResponse.json(
      { error: 'Failed to fetch broker' },
      { status: 500 }
    );
  }
}

// PATCH /api/brokers/[id]
export async function PATCH(
  req: any,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await req.json();

    if (data.password) {
      data.password = await hash(data.password, 10);
    }

    const user = await prisma.user.update({
      where: { id: params.id },
      data: {
        ...data,
        broker: data.broker && {
          update: data.broker
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
    console.error('Error updating broker:', error);
    return NextResponse.json(
      { error: 'Failed to update broker' },
      { status: 500 }
    );
  }
}

// DELETE /api/brokers/[id]
export async function DELETE(
  _req: any,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await prisma.user.delete({
      where: { id: params.id }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting broker:', error);
    return NextResponse.json(
      { error: 'Failed to delete broker' },
      { status: 500 }
    );
  }
}
