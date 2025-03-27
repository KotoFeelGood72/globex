import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const API_URL = 'https://33v0uqeb5m.execute-api.eu-central-1.amazonaws.com/api/v1/exchange/rate';

// Валютные пары, которые мы хотим получить
const CURRENCY_PAIRS = [
  { leftCurrency: 'USD', rightCurrency: 'RUB' },
  { leftCurrency: 'EUR', rightCurrency: 'RUB' },
  { leftCurrency: 'CNY', rightCurrency: 'RUB' },
];

export async function GET() {
  try {
    const pairs = encodeURIComponent(JSON.stringify(CURRENCY_PAIRS));
    const url = `${API_URL}?pairs=${pairs}`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Origin': 'https://www.royal.inc',
        'Referer': 'https://www.royal.inc/',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch rates');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching rates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch rates' },
      { status: 500 }
    );
  }
}
