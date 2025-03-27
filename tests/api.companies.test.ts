import axios, { AxiosError } from 'axios';
import { sign } from 'jsonwebtoken';

const API_URL = 'http://localhost:4000';
let authToken: string;
let testCompanyId: string;

interface CompanyData {
  name: string;
  partnerId: string;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
}

interface CompanyResponse {
  id: string;
  name: string;
  partnerId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
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
      email: 'partner@test.com',
      name: 'Test Partner'
    },
    process.env.NEXTAUTH_SECRET || 'test-secret',
    { expiresIn: '1h' }
  );
  return token;
}

async function createCompany(data: CompanyData): Promise<CompanyResponse> {
  try {
    const response = await axios.post(`${API_URL}/api/companies`, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ Company created successfully');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      const errorData = error.response.data as ErrorResponse;
      console.error('❌ Create company failed:', errorData.error);
      throw new Error(errorData.error);
    }
    throw error;
  }
}

async function getCompany(id: string): Promise<CompanyResponse> {
  try {
    const response = await axios.get(`${API_URL}/api/companies/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ Company retrieved successfully');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      const errorData = error.response.data as ErrorResponse;
      console.error('❌ Get company failed:', errorData.error);
      throw new Error(errorData.error);
    }
    throw error;
  }
}

async function updateCompany(id: string, data: Partial<CompanyData>): Promise<CompanyResponse> {
  try {
    const response = await axios.patch(`${API_URL}/api/companies/${id}`, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ Company updated successfully');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      const errorData = error.response.data as ErrorResponse;
      console.error('❌ Update company failed:', errorData.error);
      throw new Error(errorData.error);
    }
    throw error;
  }
}

async function listCompanies(): Promise<CompanyResponse[]> {
  try {
    const response = await axios.get(`${API_URL}/api/companies`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ Companies listed successfully');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      const errorData = error.response.data as ErrorResponse;
      console.error('❌ List companies failed:', errorData.error);
      throw new Error(errorData.error);
    }
    throw error;
  }
}

async function runTests() {
  console.log('🚀 Starting Company API tests...\n');

  try {
    // Создаем тестовый токен
    console.log('🔑 Creating test token...');
    authToken = createTestToken('12fb8484-6706-4e5b-80d4-17655cf3abe5', 'partner');
    console.log('✅ Test token created\n');

    // Создание компании
    console.log('📝 Testing company creation...');
    const newCompany = await createCompany({
      name: `Test Company ${Date.now()}`,
      partnerId: 'test-partner-id',
      status: 'ACTIVE'
    });
    testCompanyId = newCompany.id;
    console.log(`✅ Created company with ID: ${newCompany.id}\n`);

    // Получение информации о компании
    console.log('🔍 Testing company retrieval...');
    const company = await getCompany(testCompanyId);
    console.log(`✅ Retrieved company: ${company.name}\n`);

    // Обновление компании
    console.log('📝 Testing company update...');
    const updatedCompany = await updateCompany(testCompanyId, {
      name: `Updated Company ${Date.now()}`
    });
    console.log(`✅ Updated company name to: ${updatedCompany.name}\n`);

    // Список компаний
    console.log('📋 Testing companies list...');
    const companies = await listCompanies();
    console.log(`✅ Retrieved ${companies.length} companies\n`);

    // Тест на ошибки доступа
    console.log('🔒 Testing access control...');
    try {
      await createCompany({
        name: 'Unauthorized Company',
        partnerId: 'invalid-id',
        status: 'ACTIVE'
      });
      console.error('❌ Error: Should not allow creating company with invalid partner ID');
    } catch (error) {
      if (error instanceof Error && error.message === 'Partner not found') {
        console.log('✅ Access control working properly');
      } else {
        throw error;
      }
    }
    console.log('');

    console.log('✨ All company tests completed successfully!\n');
  } catch (error) {
    console.error('❌ Test suite failed:', error);
    process.exit(1);
  }
}

// Запуск тестов
runTests();
