# Функция для тестирования авторизации
function Test-Auth {
    param (
        [string]$Email,
        [string]$Password,
        [string]$Role
    )
    
    Write-Host "`nТестирование авторизации для роли: $Role"
    Write-Host "Email: $Email"
    
    $body = @{
        email = $Email
        password = $Password
        redirect = $false
        callbackUrl = "http://localhost:4000/dashboard"
        json = $true
    } | ConvertTo-Json
    
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:4000/api/auth/signin" `
            -Method Post `
            -Body $body `
            -ContentType "application/json" `
            -Headers @{
                "Accept" = "application/json"
            }
        
        Write-Host "Статус: Успешно"
        Write-Host "Ответ: $($response | ConvertTo-Json)"

        # Пробуем получить сессию
        $session = Invoke-RestMethod -Uri "http://localhost:4000/api/auth/session" `
            -Method Get `
            -Headers @{
                "Accept" = "application/json"
            }
        
        Write-Host "Сессия: $($session | ConvertTo-Json)"
    }
    catch {
        Write-Host "Ошибка: $_"
        Write-Host "Детали ошибки: $($_.ErrorDetails.Message)"
    }
    Write-Host "----------------------------------------"
}

Write-Host "Запускаем тесты авторизации..."
Write-Host "Убедитесь, что сервер запущен на http://localhost:4000"

Start-Sleep -Seconds 5 # Даем время серверу запуститься

# Тестируем каждого пользователя
Test-Auth -Email "admin@globexpay.com" -Password "password123" -Role "admin"
Test-Auth -Email "broker@globexpay.com" -Password "password123" -Role "broker"
Test-Auth -Email "partner@globexpay.com" -Password "password123" -Role "partner"
Test-Auth -Email "company@globexpay.com" -Password "password123" -Role "company"
