$headers = @{
    "Content-Type" = "application/json"
    "Accept" = "application/json"
}

$users = @(
    @{
        email = "admin@globexpay.com"
        role = "admin"
    },
    @{
        email = "broker@globexpay.com"
        role = "broker"
    },
    @{
        email = "partner@globexpay.com"
        role = "partner"
    },
    @{
        email = "company@globexpay.com"
        role = "company"
    }
)

foreach ($user in $users) {
    Write-Host "`nТестирование входа для роли: $($user.role)"
    Write-Host "Email: $($user.email)"
    
    $body = @{
        email = $user.email
        password = "password123"
        redirect = $false
        json = $true
    } | ConvertTo-Json
    
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:4000/api/auth/signin" `
            -Method Post `
            -Headers $headers `
            -Body $body
            
        Write-Host "Статус: $($response.StatusCode)"
        Write-Host "Ответ: $($response.Content)"
    }
    catch {
        Write-Host "Ошибка: $_"
    }
    Write-Host "----------------------------------------"
}
