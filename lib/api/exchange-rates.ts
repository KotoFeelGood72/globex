import axios from 'axios';

// API клиент для Binance
export const binanceApi = {
  async getRates() {
    try {
      const responses = await Promise.all([
        axios.get('https://api.binance.com/api/v3/ticker/price?symbol=USDTRUB'),
        axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT'),
        axios.get('https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT'),
      ]);
      
      return {
        'USDT/RUB': parseFloat(responses[0].data.price),
        'BTC/USDT': parseFloat(responses[1].data.price),
        'ETH/USDT': parseFloat(responses[2].data.price),
      };
    } catch (error) {
      console.error('Ошибка получения курсов Binance:', error);
      return null;
    }
  }
};

interface CBRRate {
  Value: string;
  Previous: string;
}

interface CBRResponse {
  Date: string;
  PreviousDate: string;
  Valute: {
    USD: CBRRate;
    EUR: CBRRate;
    CNY: CBRRate;
  };
}

// API клиент для ЦБ РФ
export const cbrApi = {
  async getRates() {
    try {
      const response = await axios.get<CBRResponse>('https://www.cbr-xml-daily.ru/daily_json.js');
      const { Valute } = response.data;
      
      return {
        'USD/RUB': parseFloat(Valute.USD.Value),
        'EUR/RUB': parseFloat(Valute.EUR.Value),
        'CNY/RUB': parseFloat(Valute.CNY.Value),
      };
    } catch (error) {
      console.error('Ошибка получения курсов ЦБ РФ:', error);
      return null;
    }
  }
};

// API клиент для Investing.com
export const investingApi = {
  async getRates() {
    try {
      // Используем прокси-сервис для обхода CORS и ограничений API
      const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
      const rates = response.data.rates;
      
      return {
        'USD/RUB': rates.RUB,
        'EUR/RUB': (rates.RUB / rates.EUR),
        'CNY/RUB': (rates.RUB / rates.CNY),
      };
    } catch (error) {
      console.error('Ошибка получения курсов Investing:', error);
      return null;
    }
  }
};
