Write-Host "Testing admin login"
curl -X POST http://localhost:4000/api/auth/signin -H "Content-Type: application/json" -d "{\"email\":\"admin@globexpay.com\",\"password\":\"password123\",\"redirect\":false,\"json\":true}"

Write-Host "`nTesting broker login"
curl -X POST http://localhost:4000/api/auth/signin -H "Content-Type: application/json" -d "{\"email\":\"broker@globexpay.com\",\"password\":\"password123\",\"redirect\":false,\"json\":true}"

Write-Host "`nTesting partner login"
curl -X POST http://localhost:4000/api/auth/signin -H "Content-Type: application/json" -d "{\"email\":\"partner@globexpay.com\",\"password\":\"password123\",\"redirect\":false,\"json\":true}"

Write-Host "`nTesting company login"
curl -X POST http://localhost:4000/api/auth/signin -H "Content-Type: application/json" -d "{\"email\":\"company@globexpay.com\",\"password\":\"password123\",\"redirect\":false,\"json\":true}"
