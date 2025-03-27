'use client';

import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { Partner, CreatePartnerDTO, UpdatePartnerDTO } from '@/types/partner';

// Моковые данные для демонстрации
const mockPartners: Partner[] = [
  {
    id: '1',
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    phone: '+7 (999) 123-45-67',
    company: 'ООО "Первая Компания"',
    status: 'active',
    commissionRate: 0.5,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Петр Петров',
    email: 'petr@example.com',
    phone: '+7 (999) 765-43-21',
    company: 'ИП Петров',
    status: 'pending',
    commissionRate: 0.3,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
];

export function usePartners(searchQuery: string = '') {
  const [partners, setPartners] = useState<Partner[]>(mockPartners);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Получение списка партнеров
  const getPartners = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      
      // TODO: Заменить на реальный API-запрос
      const filteredPartners = mockPartners.filter(partner =>
        partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        partner.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        partner.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setPartners(filteredPartners);
    } catch (error) {
      console.error('Error fetching partners:', error);
      setIsError(true);
      toast.error('Ошибка при загрузке партнеров');
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  // Создание нового партнера
  const createPartner = async (data: CreatePartnerDTO) => {
    try {
      setIsLoading(true);
      
      // TODO: Заменить на реальный API-запрос
      const newPartner: Partner = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setPartners(prev => [...prev, newPartner]);
      toast.success('Партнер успешно добавлен');
    } catch (error) {
      console.error('Error creating partner:', error);
      toast.error('Ошибка при создании партнера');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Обновление партнера
  const updatePartner = async (id: string, data: UpdatePartnerDTO) => {
    try {
      setIsLoading(true);
      
      // TODO: Заменить на реальный API-запрос
      setPartners(prev =>
        prev.map(partner =>
          partner.id === id
            ? {
                ...partner,
                ...data,
                updatedAt: new Date().toISOString(),
              }
            : partner
        )
      );
      
      toast.success('Партнер успешно обновлен');
    } catch (error) {
      console.error('Error updating partner:', error);
      toast.error('Ошибка при обновлении партнера');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Удаление партнера
  const deletePartner = async (id: string) => {
    try {
      setIsLoading(true);
      
      // TODO: Заменить на реальный API-запрос
      setPartners(prev => prev.filter(partner => partner.id !== id));
      
      toast.success('Партнер успешно удален');
    } catch (error) {
      console.error('Error deleting partner:', error);
      toast.error('Ошибка при удалении партнера');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    partners,
    isLoading,
    isError,
    getPartners,
    createPartner,
    updatePartner,
    deletePartner,
  };
}
