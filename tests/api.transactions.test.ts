import axios, { AxiosError } from 'axios';
import { sign } from 'jsonwebtoken';

const API_URL = 'http://localhost:4000';
let authToken: string;
let testCompanyId: string;
let testTransactionId: string;

interface TransactionData {
  companyId: string;
  amountUsd: number;
  conversionRate?: number;
  commissionAmount?: number;
  vatAmount?: number;
  agentCommission?: number;
  netAmount?: number;
}

interface TransactionResponse {
  id: string;
  companyId: string;
  amountUsd: number;
  conversionRate: number;
  commissionAmount: number;
  vatAmount: number;
  agentCommission: number;
  netAmount: number;
  transactionDate: string;
  createdAt: string;
  updatedAt: string;
  company: {
    id: string;
    name: string;
    status: string;
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
      email: 'broker@test.com',
      name: 'Test Broker'
    },
    process.env.NEXTAUTH_SECRET || 'test-secret',
    { expiresIn: '1h' }
  );
  return token;
}

async function createTransaction(data: TransactionData): Promise<TransactionResponse> {
  try {
    const response = await axios.post(`${API_URL}/api/transactions`, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ Transaction created successfully');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      const errorData = error.response.data as ErrorResponse;
      console.error('❌ Create transaction failed:', errorData.error);
      throw new Error(errorData.error);
    }
    throw error;
  }
}

async function getTransaction(id: string): Promise<TransactionResponse> {
  try {
    const response = await axios.get(`${API_URL}/api/transactions/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ Transaction retrieved successfully');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      const errorData = error.response.data as ErrorResponse;
      console.error('❌ Get transaction failed:', errorData.error);
      throw new Error(errorData.error);
    }
    throw error;
  }
}

async function updateTransaction(id: string, data: Partial<TransactionData>): Promise<TransactionResponse> {
  try {
    const response = await axios.patch(`${API_URL}/api/transactions/${id}`, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ Transaction updated successfully');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      const errorData = error.response.data as ErrorResponse;
      console.error('❌ Update transaction failed:', errorData.error);
      throw new Error(errorData.error);
    }
    throw error;
  }
}

async function listTransactions(params?: { companyId?: string; startDate?: string; endDate?: string }): Promise<TransactionResponse[]> {
  try {
    const queryParams = new URLSearchParams();
    if (params?.companyId) queryParams.set('companyId', params.companyId);
    if (params?.startDate) queryParams.set('startDate', params.startDate);
    if (params?.endDate) queryParams.set('endDate', params.endDate);

    const url = `${API_URL}/api/transactions${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ Transactions listed successfully');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      const errorData = error.response.data as ErrorResponse;
      console.error('❌ List transactions failed:', errorData.error);
      throw new Error(errorData.error);
    }
    throw error;
  }
}

async function getCompanyForTest(): Promise<string> {
  try {
    const response = await axios.get(`${API_URL}/api/companies`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    const companies = response.data;
    if (companies.length === 0) {
      throw new Error('No companies found for testing');
    }
    return companies[0].id;
  } catch (error) {
    console.error('Failed to get company for test:', error);
    throw error;
  }
}

async function runTests() {
  console.log('🚀 Starting Transaction API tests...\n');

  try {
    // Создаем тестовый токен
    console.log('🔑 Creating test token...');
    authToken = createTestToken('12fb8484-6706-4e5b-80d4-17655cf3abe5', 'broker');
    console.log('✅ Test token created\n');

    // Получаем тестовую компанию
    console.log('🏢 Getting test company...');
    testCompanyId = await getCompanyForTest();
    console.log(`✅ Got test company ID: ${testCompanyId}\n`);

    // Создание транзакции
    console.log('💰 Testing transaction creation...');
    const newTransaction = await createTransaction({
      companyId: testCompanyId,
      amountUsd: 1000.00,
      conversionRate: 89.5,
      commissionAmount: 10.00,
      vatAmount: 2.00,
      agentCommission: 5.00,
      netAmount: 983.00
    });
    testTransactionId = newTransaction.id;
    console.log(`✅ Created transaction with ID: ${newTransaction.id}\n`);

    // Получение информации о транзакции
    console.log('🔍 Testing transaction retrieval...');
    const transaction = await getTransaction(testTransactionId);
    console.log(`✅ Retrieved transaction for amount: $${transaction.amountUsd}\n`);

    // Обновление транзакции
    console.log('📝 Testing transaction update...');
    const updatedTransaction = await updateTransaction(testTransactionId, {
      amountUsd: 1500.00,
      netAmount: 1473.00
    });
    console.log(`✅ Updated transaction amount to: $${updatedTransaction.amountUsd}\n`);

    // Список транзакций
    console.log('📋 Testing transactions list...');
    const transactions = await listTransactions();
    console.log(`✅ Retrieved ${transactions.length} transactions\n`);

    // Фильтрация транзакций по компании
    console.log('🏢 Testing transactions filtering by company...');
    const companyTransactions = await listTransactions({ companyId: testCompanyId });
    console.log(`✅ Retrieved ${companyTransactions.length} transactions for company\n`);

    // Фильтрация транзакций по дате
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    const endDate = new Date();

    console.log('📅 Testing transactions filtering by date range...');
    const dateFilteredTransactions = await listTransactions({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    });
    console.log(`✅ Retrieved ${dateFilteredTransactions.length} transactions for date range\n`);

    // Тест на ошибки доступа
    console.log('🔒 Testing access control...');
    try {
      await createTransaction({
        companyId: 'invalid-id',
        amountUsd: 1000.00
      });
      console.error('❌ Error: Should not allow creating transaction with invalid company ID');
    } catch (error) {
      if (error instanceof Error && error.message === 'Company not found') {
        console.log('✅ Access control working properly');
      } else {
        throw error;
      }
    }
    console.log('');

    console.log('✨ All transaction tests completed successfully!\n');
  } catch (error) {
    console.error('❌ Test suite failed:', error);
    process.exit(1);
  }
}

// Запуск тестов
runTests();
