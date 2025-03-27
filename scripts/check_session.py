import requests
import json

def check_session():
    session = requests.Session()
    base_url = "http://localhost:4000"
    
    # Устанавливаем все необходимые куки
    cookies = {
        "next-auth.csrf-token": "97e2c8265d1dd9e56a9198bca1084a140d315067177c730926eaab57eb3e888a%7C493aa162a8949111581cf06f8d350379ddb8c2f056a7283ffdea754c131f8706",
        "next-auth.callback-url": "http%3A%2F%2Flocalhost%3A4000%2Fadmin%2Fdashboard",
        "next-auth.session-token": "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..i1pydzpaW_P4Mz8r.p1Jx80FNctgnACSb42jUDjY2lxhTCO3CsIHKnxz-JuGQ4uRk-kxOyEGB3VcBlet4MTKGfBGLUGBfkTGenR9VL_R_-sK4o3XzZ_QTZ4ze9LBRrRLrB2MOMAL8MELQEIcgdDMXb0FZDa7_leZF01Xp8QeeerWSNkH58BCA1uESgaDI0UifheJ9VFqkazW1E5MUVjzH7mn13EYhum8mfMAIXgBwRumzIAGmrApg9eUscaqZ5RpLQgedwLMMtI2J7TMttaOtkNNZh9wzNUe3IHRYge4ARX50-3TMEUZfnlhSBbEvL_fZt3fhBcjC.Ow0Qhiy_n31p7brSYUqczw"
    }
    
    for name, value in cookies.items():
        session.cookies.set(name, value, domain="localhost", path="/")
    
    # Получаем сессию
    session_response = session.get(
        f"{base_url}/api/auth/session",
        headers={
            "Accept": "application/json",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Cookie": "; ".join([f"{name}={value}" for name, value in cookies.items()])
        }
    )
    print("\n=== Session Check ===")
    print(f"Status Code: {session_response.status_code}")
    print("\nRequest Headers:")
    for key, value in session_response.request.headers.items():
        print(f"{key}: {value}")
    print("\nResponse Headers:")
    for key, value in session_response.headers.items():
        print(f"{key}: {value}")
    try:
        print("\nResponse Body:")
        print(json.dumps(session_response.json(), indent=2))
    except:
        print("Response text:", session_response.text)

if __name__ == "__main__":
    check_session()
