require('dotenv').config({ path: '../.env.local' });
const { amoCRMService } = require('../dist/utils/amocrm');

async function testAmoCRM() {
  try {
    const testData = {
      name: 'Тестовая сделка',
      price: 1000,
      contact: {
        name: 'Тестовый Клиент',
        email: 'test@example.com',
        phone: '+7 (999) 123-45-67'
      },
      message: 'Тестовое сообщение с сайта'
    };

    console.log('Создаем тестовую сделку...');
    const result = await amoCRMService.createLead(testData);
    console.log('Сделка успешно создана:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Ошибка при тестировании:', error.message);
    if (error.response) {
      console.error('Данные ответа:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

testAmoCRM();
