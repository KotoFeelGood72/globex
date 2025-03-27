import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // В будущем здесь будет реальная логика отправки сообщения
    console.log('Contact form submission:', data);

    return NextResponse.json({ 
      success: true, 
      message: 'Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.' 
    }, { status: 500 });
  }
}
