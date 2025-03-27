import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:4000';

interface UserCredentials {
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'broker' | 'partner' | 'company';
}

interface AuthResponse {
  user: {
    email: string;
    name: string;
    role: string;
  };
}

interface ErrorResponse {
  error: string;
}

async function testRegister(userData: UserCredentials): Promise<AuthResponse> {
  try {
    const response = await axios.post(`${API_URL}/api/auth/register`, userData);
    console.log('✅ Registration successful');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      const errorData = error.response.data as ErrorResponse;
      console.error('❌ Registration failed:', errorData.error);
      throw new Error(errorData.error);
    }
    console.error('❌ Registration failed:', error);
    throw error;
  }
}

async function testLogin(credentials: { email: string; password: string }): Promise<AuthResponse> {
  try {
    const response = await axios.post(`${API_URL}/api/auth/signin`, credentials);
    console.log('✅ Login successful');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      const errorData = error.response.data as ErrorResponse;
      console.error('❌ Login failed:', errorData.error);
      throw new Error(errorData.error);
    }
    console.error('❌ Login failed:', error);
    throw error;
  }
}

async function runTests() {
  console.log('🚀 Starting API tests...\n');

  // Test data
  const testUser: UserCredentials = {
    email: `test${Date.now()}@example.com`,
    password: 'Test123!@#',
    name: 'Test User',
    role: 'company'
  };

  try {
    // 1. Test Registration
    console.log('📝 Testing registration...');
    const registeredUser = await testRegister(testUser);
    console.log(`✅ User registered with email: ${registeredUser.user.email}`);
    console.log(`✅ User role: ${registeredUser.user.role}`);
    console.log('');

    // 2. Test Login
    console.log('🔑 Testing login...');
    const loginResponse = await testLogin({
      email: testUser.email,
      password: testUser.password
    });
    console.log(`✅ User logged in successfully with email: ${loginResponse.user.email}`);
    console.log(`✅ User role: ${loginResponse.user.role}`);
    console.log('');

    // 3. Test Invalid Registration (existing user)
    console.log('🔄 Testing duplicate registration...');
    try {
      await testRegister(testUser);
      console.error('❌ Error: Duplicate registration should have failed');
    } catch (error) {
      if (error instanceof Error && error.message === 'User already exists') {
        console.log('✅ Duplicate registration properly rejected');
      } else {
        throw error;
      }
    }
    console.log('');

    // 4. Test Invalid Login
    console.log('🔒 Testing invalid login...');
    try {
      await testLogin({
        email: testUser.email,
        password: 'wrongpassword'
      });
      console.error('❌ Error: Invalid login should have failed');
    } catch (error) {
      if (error instanceof Error && error.message === 'Invalid credentials') {
        console.log('✅ Invalid login properly rejected');
      } else {
        throw error;
      }
    }
    console.log('');

    console.log('✨ All tests completed successfully!\n');
  } catch (error) {
    console.error('❌ Test suite failed:', error);
    process.exit(1);
  }
}

// Run the tests
runTests();
