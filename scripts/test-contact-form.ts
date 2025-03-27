import axios from 'axios';

async function testContactForm() {
  const testData = {
    name: 'Тестовый Клиент',
    email: 'test@example.com',
    phone: '+7 (999) 123-45-67',
    message: 'Тестовое сообщение для проверки интеграции с AmoCRM'
  };

  try {
    console.log('Отправка тестовых данных...');
    const response = await axios.post('http://localhost:4000/api/contact', testData);
    
    console.log('Ответ сервера:', response.data);
    
    if (response.data.success) {
      console.log('✅ Тест успешно пройден!');
    } else {
      console.log('❌ Тест не пройден:', response.data.error);
    }
  } catch (error: any) {
    console.error('❌ Ошибка при выполнении теста:', error.response?.data || error.message);
  }
}

// Запускаем тест
testContactForm();
