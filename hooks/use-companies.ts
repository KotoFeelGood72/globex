import { useState, useCallback } from 'react';

interface Company {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'pending' | 'blocked';
  transactions: number;
}

interface CreateCompanyData {
  name: string;
  email: string;
  phone: string;
}

// Моковые данные для примера
const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'ООО "Альфа"',
    email: 'info@alpha.com',
    phone: '+7 (999) 123-45-67',
    status: 'active',
    transactions: 15,
  },
  {
    id: '2',
    name: 'ООО "Бета"',
    email: 'info@beta.com',
    phone: '+7 (999) 234-56-78',
    status: 'pending',
    transactions: 5,
  },
];

export function useCompanies() {
  const [isLoading, setIsLoading] = useState(false);
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);

  const getCompanies = useCallback(async () => {
    setIsLoading(true);
    try {
      // TODO: Реализовать API запрос
      return companies;
    } catch (error) {
      console.error('Error fetching companies:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [companies]);

  const createCompany = useCallback(async (data: CreateCompanyData) => {
    setIsLoading(true);
    try {
      // TODO: Реализовать API запрос
      const newCompany: Company = {
        id: (companies.length + 1).toString(),
        ...data,
        status: 'pending',
        transactions: 0,
      };
      
      setCompanies((prev) => [...prev, newCompany]);
      return newCompany;
    } catch (error) {
      console.error('Error creating company:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [companies]);

  const updateCompanyStatus = useCallback(async (id: string, status: Company['status']) => {
    setIsLoading(true);
    try {
      // TODO: Реализовать API запрос
      setCompanies((prev) =>
        prev.map((company) =>
          company.id === id ? { ...company, status } : company
        )
      );
    } catch (error) {
      console.error('Error updating company status:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    companies,
    getCompanies,
    createCompany,
    updateCompanyStatus,
    isLoading,
  };
}
