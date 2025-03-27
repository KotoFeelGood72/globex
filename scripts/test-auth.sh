#!/bin/bash

# Функция для тестирования авторизации
test_auth() {
  local email=$1
  local password=$2
  local role=$3
  
  echo "Тестирование авторизации для роли: $role"
  echo "Email: $email"
  
  response=$(curl -s -X POST http://localhost:4000/api/auth/callback/credentials \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"$email\",\"password\":\"$password\"}")
  
  echo "Ответ: $response"
  echo "----------------------------------------"
}

# Тестируем каждого пользователя
test_auth "admin@globexpay.com" "password123" "admin"
test_auth "broker@globexpay.com" "password123" "broker"
test_auth "partner@globexpay.com" "password123" "partner"
test_auth "company@globexpay.com" "password123" "company"
