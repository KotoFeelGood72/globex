"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
async function testContactForm() {
    const testData = {
        name: 'Тестовый Клиент',
        email: 'test@example.com',
        phone: '+7 (999) 123-45-67',
        message: 'Тестовое сообщение для проверки интеграции с AmoCRM'
    };
    try {
        console.log('Отправка тестовых данных...');
        const response = await axios_1.default.post('http://localhost:4000/api/contact', testData);
        console.log('Ответ сервера:', response.data);
        if (response.data.success) {
            console.log('✅ Тест успешно пройден!');
        }
        else {
            console.log('❌ Тест не пройден:', response.data.error);
        }
    }
    catch (error) {
        console.error('❌ Ошибка при выполнении теста:', error.response?.data || error.message);
    }
}
// Запускаем тест
testContactForm();
