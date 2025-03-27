import { NextResponse } from 'next/server';
import { AmoCRMService } from '@/services/amocrm';

const amoCRMService = new AmoCRMService();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const result = await amoCRMService.createOrUpdateLead(data);
    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error('AmoCRM API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Произошла ошибка при обработке запроса'
      },
      { status: 500 }
    );
  }
}
