#!/bin/bash

# Базовый URL
BASE_URL="http://localhost:3000/api"

# Цвета для вывода
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# Функция для проверки статуса
check_status() {
    if [ $1 -eq $2 ]; then
        echo -e "${GREEN}✓ $3${NC}"
    else
        echo -e "${RED}✗ $3 (получен статус $1, ожидался $2)${NC}"
    fi
}

echo "🔒 Тестирование аутентификации..."

# Регистрация нового пользователя
echo "POST /auth/register"
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/register" \
    -H "Content-Type: application/json" \
    -d '{
        "email": "test@example.com",
        "password": "Test123!",
        "name": "Test User"
    }')
check_status $? 200 "Регистрация пользователя"

# Авторизация
echo "POST /auth/signin"
AUTH_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/signin" \
    -H "Content-Type: application/json" \
    -d '{
        "email": "test@example.com",
        "password": "Test123!"
    }')
check_status $? 200 "Авторизация пользователя"

# Сохраняем токен
TOKEN=$(echo $AUTH_RESPONSE | jq -r '.token')

echo "🏢 Тестирование API компаний..."

# Получение списка компаний
echo "GET /companies"
COMPANIES_RESPONSE=$(curl -s -X GET "$BASE_URL/companies" \
    -H "Authorization: Bearer $TOKEN")
check_status $? 200 "Получение списка компаний"

# Создание новой компании
echo "POST /companies"
COMPANY_RESPONSE=$(curl -s -X POST "$BASE_URL/companies" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "name": "Test Company",
        "description": "Test Description",
        "status": "active"
    }')
check_status $? 201 "Создание компании"

# Сохраняем ID компании
COMPANY_ID=$(echo $COMPANY_RESPONSE | jq -r '.id')

# Получение информации о компании
echo "GET /companies/$COMPANY_ID"
curl -s -X GET "$BASE_URL/companies/$COMPANY_ID" \
    -H "Authorization: Bearer $TOKEN"
check_status $? 200 "Получение информации о компании"

# Обновление компании
echo "PUT /companies/$COMPANY_ID"
curl -s -X PUT "$BASE_URL/companies/$COMPANY_ID" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "name": "Updated Company",
        "description": "Updated Description",
        "status": "active"
    }'
check_status $? 200 "Обновление компании"

# Получение транзакций компании
echo "GET /companies/$COMPANY_ID/transactions"
curl -s -X GET "$BASE_URL/companies/$COMPANY_ID/transactions" \
    -H "Authorization: Bearer $TOKEN"
check_status $? 200 "Получение транзакций компании"

# Создание транзакции
echo "POST /companies/$COMPANY_ID/transactions"
curl -s -X POST "$BASE_URL/companies/$COMPANY_ID/transactions" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "type": "deposit",
        "amount": 1000,
        "description": "Test Transaction"
    }'
check_status $? 201 "Создание транзакции"

echo "✉️ Тестирование уведомлений..."

# Получение уведомлений
echo "GET /admin/notifications"
curl -s -X GET "$BASE_URL/admin/notifications" \
    -H "Authorization: Bearer $TOKEN"
check_status $? 200 "Получение уведомлений"

echo "✅ Тестирование завершено"
