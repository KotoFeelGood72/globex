import axios, { AxiosError } from 'axios';
import { sign } from 'jsonwebtoken';

const API_URL = 'http://localhost:4000';
let authToken: string;
let testBrokerId: string;

interface BrokerData {
  email: string;
  password: string;
  name: string;
  phone?: string;
  commissionRate?: number;
  status?: 'ACTIVE' | 'INACTIVE';
}

interface BrokerResponse {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  role: string;
  broker: {
    id: string;
    userId: string;
    commissionRate: number;
    status: string;
    transactions: Array<{
      id: string;
      amountUsd: number;
      transactionDate: string;
    }>;
  };
}

interface ErrorResponse {
  error: string;
}

// Создаем JWT токен для тестов
function createTestToken(userId: string, role: string) {
  const token = sign(
    {
      sub: userId,
      role,
      email: 'admin@test.com',
      name: 'Test Admin'
    },
    process.env.NEXTAUTH_SECRET || 'test-secret',
    { expiresIn: '1h' }
  );
  return token;
}

async function createBroker(data: BrokerData): Promise<BrokerResponse> {
  try {
    const response = await axios.post(`${API_URL}/api/brokers`, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ Broker created successfully');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      const errorData = error.response.data as ErrorResponse;
      console.error('❌ Create broker failed:', errorData.error);
      throw new Error(errorData.error);
    }
    throw error;
  }
}

async function getBroker(id: string): Promise<BrokerResponse> {
  try {
    const response = await axios.get(`${API_URL}/api/brokers/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ Broker retrieved successfully');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      const errorData = error.response.data as ErrorResponse;
      console.error('❌ Get broker failed:', errorData.error);
      throw new Error(errorData.error);
    }
    throw error;
  }
}

async function updateBroker(id: string, data: Partial<BrokerData>): Promise<BrokerResponse> {
  try {
    const response = await axios.patch(`${API_URL}/api/brokers/${id}`, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ Broker updated successfully');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      const errorData = error.response.data as ErrorResponse;
      console.error('❌ Update broker failed:', errorData.error);
      throw new Error(errorData.error);
    }
    throw error;
  }
}

async function listBrokers(params?: { status?: string; search?: string }): Promise<BrokerResponse[]> {
  try {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.set('status', params.status);
    if (params?.search) queryParams.set('search', params.search);

    const url = `${API_URL}/api/brokers${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ Brokers listed successfully');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      const errorData = error.response.data as ErrorResponse;
      console.error('❌ List brokers failed:', errorData.error);
      throw new Error(errorData.error);
    }
    throw error;
  }
}

async function deleteBroker(id: string): Promise<void> {
  try {
    await axios.delete(`${API_URL}/api/brokers/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ Broker deleted successfully');
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      const errorData = error.response.data as ErrorResponse;
      console.error('❌ Delete broker failed:', errorData.error);
      throw new Error(errorData.error);
    }
    throw error;
  }
}

async function runTests() {
  console.log('🚀 Starting Broker API tests...\n');

  try {
    // Создаем тестовый токен админа
    console.log('🔑 Creating admin test token...');
    authToken = createTestToken('12fb8484-6706-4e5b-80d4-17655cf3abe5', 'admin');
    console.log('✅ Admin test token created\n');

    // Создание брокера
    console.log('👨‍💼 Testing broker creation...');
    const newBroker = await createBroker({
      email: `broker${Date.now()}@test.com`,
      password: 'Test123!@#',
      name: 'Test Broker',
      phone: '+1234567890',
      commissionRate: 0.5,
      status: 'ACTIVE'
    });
    testBrokerId = newBroker.id;
    console.log(`✅ Created broker with ID: ${newBroker.id}\n`);

    // Получение информации о брокере
    console.log('🔍 Testing broker retrieval...');
    const broker = await getBroker(testBrokerId);
    console.log(`✅ Retrieved broker: ${broker.name}\n`);

    // Обновление брокера
    console.log('📝 Testing broker update...');
    const updatedBroker = await updateBroker(testBrokerId, {
      name: 'Updated Broker Name',
      commissionRate: 0.75
    });
    console.log(`✅ Updated broker name to: ${updatedBroker.name}\n`);

    // Список брокеров
    console.log('📋 Testing brokers list...');
    const brokers = await listBrokers();
    console.log(`✅ Retrieved ${brokers.length} brokers\n`);

    // Фильтрация брокеров по статусу
    console.log('🏃 Testing brokers filtering by status...');
    const activeBrokers = await listBrokers({ status: 'ACTIVE' });
    console.log(`✅ Retrieved ${activeBrokers.length} active brokers\n`);

    // Поиск брокеров
    console.log('🔎 Testing brokers search...');
    const searchedBrokers = await listBrokers({ search: 'Updated' });
    console.log(`✅ Found ${searchedBrokers.length} brokers matching search\n`);

    // Тест на ошибки доступа
    console.log('🔒 Testing access control...');
    const regularToken = createTestToken('regular-user-id', 'user');
    try {
      const originalToken = authToken;
      authToken = regularToken;
      await createBroker({
        email: 'unauthorized@test.com',
        password: 'Test123!@#',
        name: 'Unauthorized Test'
      });
      console.error('❌ Error: Should not allow non-admin to create broker');
    } catch (error) {
      if (error instanceof Error && error.message === 'Unauthorized. Admin access required.') {
        console.log('✅ Access control working properly');
      } else {
        throw error;
      }
    } finally {
      authToken = regularToken;
    }
    console.log('');

    // Удаление брокера
    console.log('🗑️ Testing broker deletion...');
    await deleteBroker(testBrokerId);
    console.log('✅ Broker deleted successfully\n');

    console.log('✨ All broker tests completed successfully!\n');
  } catch (error) {
    console.error('❌ Test suite failed:', error);
    process.exit(1);
  }
}

// Запуск тестов
runTests();
