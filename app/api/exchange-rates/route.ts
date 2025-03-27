import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const defaultRates = [
  { leftCurrency: 'USD', rightCurrency: 'RUB', rate: '100.69' },
  { leftCurrency: 'EUR', rightCurrency: 'RUB', rate: '105.65' },
  { leftCurrency: 'CNY', rightCurrency: 'RUB', rate: '13.89' }
];

export async function GET() {
  try {
    const response = await fetch('https://api.royalpay.com/v1/rates', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      console.error('API returned status:', response.status);
      return NextResponse.json(defaultRates);
    }

    const data = await response.json();
    console.log('API response:', data);
    
    if (!Array.isArray(data)) {
      console.error('Invalid API response format');
      return NextResponse.json(defaultRates);
    }

    // Фильтруем только нужные нам валютные пары
    const rates = data.filter((rate) => 
      rate.rightCurrency === 'RUB' && 
      ['USD', 'EUR', 'CNY'].includes(rate.leftCurrency)
    );

    if (rates.length === 0) {
      console.error('No valid rates found');
      return NextResponse.json(defaultRates);
    }

    return NextResponse.json(rates);

  } catch (error) {
    console.error('Error fetching rates:', error);
    return NextResponse.json(defaultRates);
  }
}
