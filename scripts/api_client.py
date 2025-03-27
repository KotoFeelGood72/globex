import requests
import json
import urllib.parse
from typing import Optional, Dict, Any
import time

class ApiClient:
    def __init__(self, base_url="http://localhost:4000"):
        self.session = requests.Session()
        self.base_url = base_url
        self.session.headers.update({
            "Accept": "application/json",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        })
    
    def register(self, email: str, password: str, role: str, name: str) -> bool:
        print(f"\n=== Регистрация пользователя: {email} ({role}) ===")
        
        register_url = f"{self.base_url}/api/auth/register"
        register_data = {
            "email": email,
            "password": password,
            "name": name,
            "role": role
        }
        
        headers = {
            "Content-Type": "application/json",
            "Origin": self.base_url
        }
        
        try:
            response = self.session.post(register_url, json=register_data, headers=headers)
            print(f"Код ответа: {response.status_code}")
            
            try:
                data = response.json()
                if response.status_code == 200:
                    print("Регистрация успешна")
                    print("Данные пользователя:", json.dumps(data["user"], indent=2, ensure_ascii=False))
                    return True
                else:
                    error = data.get("error", "Неизвестная ошибка")
                    print("Ошибка регистрации:", error)
                    return False
            except json.JSONDecodeError:
                print("Ошибка при разборе ответа:", response.text)
                return False
                
        except Exception as e:
            print("Ошибка при регистрации:", str(e))
            return False
    
    def follow_redirects(self, url: str, max_redirects: int = 5) -> Optional[str]:
        """Следуем по редиректам до финальной страницы"""
        redirects = 0
        current_url = url
        
        while redirects < max_redirects:
            try:
                response = self.session.get(current_url, allow_redirects=False)
                if response.status_code in (301, 302, 303, 307, 308):
                    current_url = response.headers.get("location")
                    if current_url.startswith("/"):
                        current_url = f"{self.base_url}{current_url}"
                    redirects += 1
                    print(f"Редирект на: {current_url}")
                else:
                    return current_url
            except Exception as e:
                print(f"Ошибка при следовании по редиректу: {str(e)}")
                return None
        
        print("Достигнуто максимальное количество редиректов")
        return None
    
    def login(self, email: str, password: str) -> Optional[Dict[str, Any]]:
        print(f"\n=== Вход пользователя: {email} ===")
        
        try:
            # 1. Получаем CSRF токен
            csrf_response = self.session.get(f"{self.base_url}/api/auth/csrf")
            print(f"CSRF Status Code: {csrf_response.status_code}")
            print("CSRF Response:", csrf_response.text)
            
            csrf_data = csrf_response.json()
            csrf_token = csrf_data.get("csrfToken")
            print("CSRF Token:", csrf_token)
            
            # 2. Выполняем вход через credentials provider
            auth_url = f"{self.base_url}/api/auth/callback/credentials"
            login_data = {
                "email": email,
                "password": password,
                "csrfToken": csrf_token,
                "callbackUrl": f"{self.base_url}/admin/dashboard",
                "provider": "credentials",
                "redirect": "false"
            }
            
            # Преобразуем данные в формат x-www-form-urlencoded
            form_data = "&".join([f"{key}={urllib.parse.quote(str(value))}" for key, value in login_data.items()])
            
            headers = {
                "Content-Type": "application/x-www-form-urlencoded",
                "Origin": self.base_url,
                "Referer": f"{self.base_url}/auth/signin"
            }
            
            print("\nSending login request...")
            print("URL:", auth_url)
            print("Headers:", headers)
            print("Form data:", form_data)
            
            login_response = self.session.post(
                auth_url,
                data=form_data,
                headers=headers,
                allow_redirects=False
            )
            print(f"\nLogin Status Code: {login_response.status_code}")
            print("Login Response Headers:", dict(login_response.headers))
            print("Login Response Body:", login_response.text)
            
            if login_response.status_code == 302:
                redirect_url = login_response.headers.get("location")
                print(f"Initial redirect URL: {redirect_url}")
                
                # Следуем по редиректам
                final_url = self.follow_redirects(redirect_url)
                if final_url:
                    print(f"Final URL: {final_url}")
                
                # Даем время на установку куки
                time.sleep(1)
                
                # Проверяем сессию
                session = self.get_session()
                if session and session.get("user"):
                    print("Вход выполнен успешно")
                    return session
            
            print("Ошибка входа")
            return None
            
        except Exception as e:
            print("Ошибка при входе:", str(e))
            return None
    
    def get_session(self) -> Optional[Dict[str, Any]]:
        try:
            response = self.session.get(f"{self.base_url}/api/auth/session")
            return response.json()
        except:
            return None
    
    def logout(self) -> bool:
        try:
            response = self.session.post(f"{self.base_url}/api/auth/signout")
            return response.status_code == 200
        except:
            return False

def test_roles():
    client = ApiClient()
    
    # Тестовые пользователи для каждой роли
    test_users = [
        {
            "email": "admin@globexpay.com",
            "password": "Test123!",
            "name": "Администратор",
            "role": "admin"
        },
        {
            "email": "broker@globexpay.com",
            "password": "Test123!",
            "name": "Брокер",
            "role": "broker"
        },
        {
            "email": "partner@globexpay.com",
            "password": "Test123!",
            "name": "Партнер",
            "role": "partner"
        },
        {
            "email": "company@globexpay.com",
            "password": "Test123!",
            "name": "Компания",
            "role": "company"
        }
    ]
    
    for user in test_users:
        print("\n" + "="*50)
        print(f"Тестирование роли {user['role'].upper()}")
        print("="*50)
        
        # Пробуем войти
        session = client.login(user["email"], user["password"])
        if session:
            print("\nДанные сессии:", json.dumps(session, indent=2, ensure_ascii=False))
            print("\nВыполняем выход...")
            client.logout()
        
        print("\n")

if __name__ == "__main__":
    test_roles()
