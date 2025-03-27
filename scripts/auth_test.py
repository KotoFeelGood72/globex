import requests
import json
import urllib.parse

def test_auth():
    session = requests.Session()
    base_url = "http://localhost:4000"
    
    try:
        # 1. Получаем страницу входа для установки всех необходимых cookies
        signin_page = session.get(f"{base_url}/auth/signin")
        print("\n=== Initial Page Request ===")
        print(f"Status Code: {signin_page.status_code}")
        
        # 2. Получаем CSRF токен
        csrf_response = session.get(f"{base_url}/api/auth/csrf")
        print("\n=== CSRF Request ===")
        print(f"Status Code: {csrf_response.status_code}")
        csrf_data = csrf_response.json()
        print(csrf_data)
        
        csrf_token = csrf_data.get("csrfToken")
        
        # Получаем cookie из первого запроса
        csrf_cookie = None
        for cookie in session.cookies:
            if cookie.name == "next-auth.csrf-token":
                csrf_cookie = cookie.value
                break
                
        print(f"\nCSRF Cookie: {csrf_cookie}")
        
        # 3. Выполняем вход через credentials provider
        auth_url = f"{base_url}/api/auth/callback/credentials"
        
        login_data = {
            "email": "admin@globexpay.com",
            "password": "Test123!",
            "csrfToken": csrf_token,
            "callbackUrl": f"{base_url}/admin/dashboard",
            "provider": "credentials"
        }
        
        headers = {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Origin": base_url,
            "Referer": f"{base_url}/auth/signin"
        }
        
        if csrf_cookie:
            headers["Cookie"] = f"next-auth.csrf-token={csrf_cookie}"
        
        # Преобразуем данные в формат x-www-form-urlencoded
        form_data = "&".join([f"{key}={urllib.parse.quote(str(value))}" for key, value in login_data.items()])
        
        print("\n=== Login Request Data ===")
        print("URL:", auth_url)
        print("Headers:", json.dumps(headers, indent=2))
        print("Form Data:", form_data)
        
        login_response = session.post(
            auth_url,
            data=form_data,
            headers=headers,
            allow_redirects=False
        )
        
        print("\n=== Login Response ===")
        print(f"Status Code: {login_response.status_code}")
        print("\nResponse Headers:")
        for key, value in login_response.headers.items():
            print(f"{key}: {value}")
            
        print("\nCookies after login:")
        for cookie in session.cookies:
            print(f"{cookie.name}: {cookie.value}")
            
        print("\nResponse Body:")
        try:
            print(json.dumps(login_response.json(), indent=2))
        except:
            print("Raw response:", login_response.text[:500])
        
        # Если есть редирект, следуем по нему
        if login_response.status_code in (301, 302):
            redirect_url = login_response.headers.get("Location")
            print(f"\nFollowing redirect to: {redirect_url}")
            
            redirect_response = session.get(
                redirect_url if redirect_url.startswith("http") else f"{base_url}{redirect_url}",
                headers={
                    "Accept": "application/json",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
                }
            )
            
            print("\n=== Redirect Response ===")
            print(f"Status Code: {redirect_response.status_code}")
            try:
                print(json.dumps(redirect_response.json(), indent=2))
            except:
                print("Raw response:", redirect_response.text[:500])
            print("\nCookies after redirect:")
            for cookie in session.cookies:
                print(f"{cookie.name}: {cookie.value}")
        
        # 4. Проверяем сессию
        session_response = session.get(
            f"{base_url}/api/auth/session",
            headers={
                "Accept": "application/json",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            }
        )
        print("\n=== Session Check ===")
        print(f"Status Code: {session_response.status_code}")
        try:
            print(json.dumps(session_response.json(), indent=2))
        except:
            print("Response text:", session_response.text)
            
    except requests.exceptions.RequestException as e:
        print(f"Error occurred: {e}")
    finally:
        session.close()

if __name__ == "__main__":
    test_auth()
