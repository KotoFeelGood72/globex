# Базовый URL
$BASE_URL = "http://localhost:3000/api"

# Функция для проверки статуса
function Check-Status {
    param (
        [int]$Status,
        [int]$Expected,
        [string]$Message
    )
    if ($Status -eq $Expected) {
        Write-Host "✓ $Message" -ForegroundColor Green
    } else {
        Write-Host "✗ $Message (получен статус $Status, ожидался $Expected)" -ForegroundColor Red
    }
}

Write-Host "🔒 Тестирование аутентификации..."

# Регистрация нового пользователя
Write-Host "POST /auth/register"
$registerBody = @{
    email = "test@example.com"
    password = "Test123!"
    name = "Test User"
} | ConvertTo-Json

$registerResponse = Invoke-RestMethod -Uri "$BASE_URL/auth/register" `
    -Method Post `
    -ContentType "application/json" `
    -Body $registerBody
Check-Status $LASTEXITCODE 200 "Регистрация пользователя"

# Авторизация
Write-Host "POST /auth/signin"
$authBody = @{
    email = "test@example.com"
    password = "Test123!"
} | ConvertTo-Json

$authResponse = Invoke-RestMethod -Uri "$BASE_URL/auth/signin" `
    -Method Post `
    -ContentType "application/json" `
    -Body $authBody
Check-Status $LASTEXITCODE 200 "Авторизация пользователя"

# Сохраняем токен
$token = $authResponse.token

Write-Host "🏢 Тестирование API компаний..."

# Получение списка компаний
Write-Host "GET /companies"
$headers = @{
    "Authorization" = "Bearer $token"
}

$companiesResponse = Invoke-RestMethod -Uri "$BASE_URL/companies" `
    -Method Get `
    -Headers $headers
Check-Status $LASTEXITCODE 200 "Получение списка компаний"

# Создание новой компании
Write-Host "POST /companies"
$companyBody = @{
    name = "Test Company"
    description = "Test Description"
    status = "active"
} | ConvertTo-Json

$companyResponse = Invoke-RestMethod -Uri "$BASE_URL/companies" `
    -Method Post `
    -ContentType "application/json" `
    -Headers $headers `
    -Body $companyBody
Check-Status $LASTEXITCODE 201 "Создание компании"

# Сохраняем ID компании
$companyId = $companyResponse.id

# Получение информации о компании
Write-Host "GET /companies/$companyId"
$companyInfo = Invoke-RestMethod -Uri "$BASE_URL/companies/$companyId" `
    -Method Get `
    -Headers $headers
Check-Status $LASTEXITCODE 200 "Получение информации о компании"

# Обновление компании
Write-Host "PUT /companies/$companyId"
$updateBody = @{
    name = "Updated Company"
    description = "Updated Description"
    status = "active"
} | ConvertTo-Json

$updateResponse = Invoke-RestMethod -Uri "$BASE_URL/companies/$companyId" `
    -Method Put `
    -ContentType "application/json" `
    -Headers $headers `
    -Body $updateBody
Check-Status $LASTEXITCODE 200 "Обновление компании"

# Получение транзакций компании
Write-Host "GET /companies/$companyId/transactions"
$transactionsResponse = Invoke-RestMethod -Uri "$BASE_URL/companies/$companyId/transactions" `
    -Method Get `
    -Headers $headers
Check-Status $LASTEXITCODE 200 "Получение транзакций компании"

# Создание транзакции
Write-Host "POST /companies/$companyId/transactions"
$transactionBody = @{
    type = "deposit"
    amount = 1000
    description = "Test Transaction"
} | ConvertTo-Json

$transactionResponse = Invoke-RestMethod -Uri "$BASE_URL/companies/$companyId/transactions" `
    -Method Post `
    -ContentType "application/json" `
    -Headers $headers `
    -Body $transactionBody
Check-Status $LASTEXITCODE 201 "Создание транзакции"

Write-Host "✉️ Тестирование уведомлений..."

# Получение уведомлений
Write-Host "GET /admin/notifications"
$notificationsResponse = Invoke-RestMethod -Uri "$BASE_URL/admin/notifications" `
    -Method Get `
    -Headers $headers
Check-Status $LASTEXITCODE 200 "Получение уведомлений"

Write-Host "✅ Тестирование завершено"
