import { NextResponse } from 'next/server';
import { amoCRMService } from '@/utils/amocrm';

export async function POST(req: Request) {
  console.log('=== Starting contact form submission ===');
  
  try {
    const data = await req.json();
    console.log('Received form data:', JSON.stringify(data, null, 2));

    if (!data.name || !data.email || !data.phone) {
      console.log('Validation failed:', { name: !!data.name, email: !!data.email, phone: !!data.phone });
      return NextResponse.json(
        { success: false, error: 'Не заполнены обязательные поля' },
        { status: 400 }
      );
    }

    // Проверяем конфигурацию AmoCRM
    console.log('AmoCRM configuration:', {
      baseUrl: process.env.AMOCRM_BASE_URL,
      hasAccessToken: !!process.env.AMOCRM_ACCESS_TOKEN,
      pipelineId: process.env.AMOCRM_PIPELINE_ID,
      statusId: process.env.AMOCRM_STATUS_ID
    });

    // Создаем сделку в AmoCRM
    console.log('Creating lead in AmoCRM...');
    try {
      const leadData = {
        name: `Заявка с сайта от ${data.name}`,
        price: 0,
        pipelineId: Number(process.env.AMOCRM_PIPELINE_ID),
        statusId: Number(process.env.AMOCRM_STATUS_ID),
        contact: {
          name: data.name,
          email: data.email,
          phone: data.phone
        },
        message: data.message || ''
      };

      console.log('Lead data:', JSON.stringify(leadData, null, 2));
      
      const result = await amoCRMService.createLead(leadData);
      console.log('AmoCRM response:', JSON.stringify(result, null, 2));
      
      return NextResponse.json({
        success: true,
        message: 'Заявка успешно отправлена'
      });
    } catch (amoError: any) {
      console.error('AmoCRM API Error:', {
        message: amoError.message,
        response: amoError.response?.data,
        status: amoError.response?.status
      });
      
      return NextResponse.json(
        {
          success: false,
          error: 'Ошибка при создании заявки в CRM. Пожалуйста, попробуйте позже.',
          details: process.env.NODE_ENV === 'development' ? amoError.message : undefined
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('General error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Произошла ошибка при обработке запроса',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}
