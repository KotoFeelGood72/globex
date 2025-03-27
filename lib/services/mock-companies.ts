export enum CompanyStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE"
}

export interface Company {
  id: string
  name: string
  partnerId: string
  partnerName: string
  email: string
  phone: string
  country: string
  status: CompanyStatus
  description?: string
  transactions: number
  revenue: number
  createdAt: string
  updatedAt: string
}

export interface CompaniesResponse {
  companies: Company[]
  pagination: {
    total: number
    page: number
    pages: number
  }
}

interface GetTransactionsParams {
  page?: number
  limit?: number
  search?: string
  type?: string
  status?: string
  startDate?: string
  endDate?: string
}

// Тестовая компания
const testCompany: Company = {
  id: "test-company-1",
  name: "ТОО 'Тестовая Компания'",
  partnerId: "partner-1",
  partnerName: "Главный Партнер",
  email: "test@testcompany.kz",
  phone: "+7 (777) 777-7777",
  country: "Казахстан",
  status: CompanyStatus.ACTIVE,
  description: "Крупная компания в сфере международной торговли",
  transactions: 1250,
  revenue: 15750000,
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2025-01-18T13:54:45.000Z"
}

// Моковые данные для компаний
const mockCompanies: Company[] = [
  testCompany,
  ...Array.from({ length: 50 }, (_, index) => ({
    id: `company-${index + 1}`,
    name: `Компания ${index + 1}`,
    partnerId: `partner-${Math.floor(index / 5) + 1}`,
    partnerName: `Партнер ${Math.floor(index / 5) + 1}`,
    email: `company${index + 1}@example.com`,
    phone: `+7 (999) ${String(index + 1).padStart(3, '0')}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
    country: ['Россия', 'Казахстан', 'Беларусь', 'Узбекистан', 'Кыргызстан'][Math.floor(Math.random() * 5)],
    status: Math.random() > 0.2 ? CompanyStatus.ACTIVE : CompanyStatus.INACTIVE,
    description: `Описание компании ${index + 1}`,
    transactions: Math.floor(Math.random() * 1000),
    revenue: Math.floor(Math.random() * 1000000),
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
    updatedAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString()
  }))
]

class MockCompaniesService {
  private companies: Company[] = mockCompanies

  async getCompanies(params?: {
    page?: number
    limit?: number
    search?: string
  }): Promise<CompaniesResponse> {
    let filteredCompanies = [...this.companies]
    
    // Поиск
    if (params?.search) {
      const search = params.search.toLowerCase()
      filteredCompanies = filteredCompanies.filter(company => 
        company.name.toLowerCase().includes(search) ||
        company.email.toLowerCase().includes(search) ||
        company.phone.toLowerCase().includes(search)
      )
    }

    // Пагинация
    const page = params?.page || 1
    const limit = params?.limit || 10
    const total = filteredCompanies.length
    const pages = Math.ceil(total / limit)
    const start = (page - 1) * limit
    const end = start + limit

    return {
      companies: filteredCompanies.slice(start, end),
      pagination: {
        total,
        page,
        pages
      }
    }
  }

  async getCompany(id: string): Promise<Company | null> {
    const company = this.companies.find(c => c.id === id)
    return company || null
  }

  async createCompany(data: Omit<Company, "id" | "transactions" | "revenue" | "createdAt" | "updatedAt">): Promise<Company> {
    const newCompany: Company = {
      ...data,
      id: `company-${this.companies.length + 1}`,
      transactions: 0,
      revenue: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    this.companies.push(newCompany)
    return newCompany
  }

  async updateCompany(id: string, data: Partial<Company>): Promise<Company | null> {
    const index = this.companies.findIndex(c => c.id === id)
    if (index === -1) return null

    const updatedCompany: Company = {
      ...this.companies[index],
      ...data,
      updatedAt: new Date().toISOString()
    }

    this.companies[index] = updatedCompany
    return updatedCompany
  }

  async deleteCompany(id: string): Promise<boolean> {
    const index = this.companies.findIndex(c => c.id === id)
    if (index === -1) return false

    this.companies.splice(index, 1)
    return true
  }

  // Дополнительные методы для статистики
  async getCompanyStatistics(id: string) {
    const company = await this.getCompany(id)
    if (!company) return null

    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
      date: new Date(2024, i, 1).toISOString(),
      transactions: Math.floor(Math.random() * 100),
      revenue: Math.floor(Math.random() * 100000)
    }))

    return {
      summary: {
        totalTransactions: company.transactions,
        totalRevenue: company.revenue,
        avgTransactionValue: company.revenue / company.transactions
      },
      monthly: monthlyData
    }
  }

  // Метод для получения транзакций компании
  async getCompanyTransactions(
    companyId: string,
    params?: GetTransactionsParams
  ) {
    const company = await this.getCompany(companyId)
    if (!company) return null

    const transactions = Array.from({ length: 50 }, (_, index) => ({
      id: `transaction-${index + 1}`,
      companyId,
      amount: Math.floor(Math.random() * 10000),
      type: Math.random() > 0.5 ? "deposit" : "withdrawal",
      status: Math.random() > 0.2 ? "completed" : "pending",
      date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString()
    }))

    // Пагинация
    const page = params?.page || 1
    const limit = params?.limit || 10
    const total = transactions.length
    const pages = Math.ceil(total / limit)
    const start = (page - 1) * limit
    const end = start + limit

    return {
      transactions: transactions.slice(start, end),
      pagination: {
        total,
        page,
        pages
      }
    }
  }
}

export const mockCompaniesService = new MockCompaniesService()
