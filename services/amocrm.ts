import axios from 'axios';
import { AMOCRM_CONFIG } from '@/config/amocrm';

interface LeadData {
  amount: number;
  currencyFrom: string;
  currencyTo: string;
  exchangeRate: number;
  isEscrow: boolean;
  isUrgent: boolean;
  commission: number;
  phone: string;
  name?: string;
  email?: string;
  message?: string;
}

export class AmoCRMService {
  private baseURL: string;
  private headers: Record<string, string>;

  constructor() {
    console.log('Initializing AmoCRM service with environment variables:', {
      hasAccessToken: !!process.env.AMOCRM_ACCESS_TOKEN,
      baseUrl: process.env.AMOCRM_BASE_URL,
      hasCustomFields: {
        phone: !!AMOCRM_CONFIG.CUSTOM_FIELDS.PHONE,
        email: !!AMOCRM_CONFIG.CUSTOM_FIELDS.EMAIL,
        message: !!AMOCRM_CONFIG.CUSTOM_FIELDS.MESSAGE
      }
    });

    const requiredEnvVars = {
      AMOCRM_ACCESS_TOKEN: process.env.AMOCRM_ACCESS_TOKEN,
      AMOCRM_BASE_URL: process.env.AMOCRM_BASE_URL,
      AMOCRM_PHONE_FIELD_ID: process.env.AMOCRM_PHONE_FIELD_ID,
      AMOCRM_EMAIL_FIELD_ID: process.env.AMOCRM_EMAIL_FIELD_ID,
      AMOCRM_MESSAGE_FIELD_ID: process.env.AMOCRM_MESSAGE_FIELD_ID,
      AMOCRM_PIPELINE_ID: process.env.AMOCRM_PIPELINE_ID,
      AMOCRM_LEAD_STATUS_ID: process.env.AMOCRM_LEAD_STATUS_ID
    };

    const missingVars = Object.entries(requiredEnvVars)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingVars.length > 0) {
      console.error('Missing required environment variables:', missingVars);
      throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }

    const baseUrl = new URL(process.env.AMOCRM_BASE_URL!);
    this.baseURL = `${baseUrl.protocol}//${baseUrl.hostname}/api/v4`;
    
    this.headers = {
      'Authorization': `Bearer ${process.env.AMOCRM_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    };

    console.log('AmoCRM Service initialized with:', {
      baseURL: this.baseURL,
      customFields: {
        phone: AMOCRM_CONFIG.CUSTOM_FIELDS.PHONE,
        email: AMOCRM_CONFIG.CUSTOM_FIELDS.EMAIL,
        message: AMOCRM_CONFIG.CUSTOM_FIELDS.MESSAGE
      }
    });
  }

  private async request<T>(
    method: 'GET' | 'POST' | 'PATCH',
    endpoint: string,
    data?: any
  ): Promise<T> {
    try {
      console.log(`Making ${method} request to ${endpoint}`, {
        hasData: !!data,
        headers: {
          ...this.headers,
          'Authorization': '[HIDDEN]'
        }
      });

      const response = await axios({
        method,
        url: `${this.baseURL}${endpoint}`,
        headers: this.headers,
        data,
        timeout: AMOCRM_CONFIG.REQUEST_TIMEOUT || 30000,
      });

      console.log(`Response from ${endpoint}:`, {
        status: response.status,
        statusText: response.statusText,
        data: response.data
      });

      return response.data;
    } catch (error) {
      console.error(`Error in AmoCRM request to ${endpoint}:`, {
        message: error instanceof Error ? error.message : 'Unknown error',
        response: axios.isAxiosError(error) ? {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data
        } : undefined,
        config: axios.isAxiosError(error) ? {
          url: error.config?.url,
          method: error.config?.method,
          headers: {
            ...error.config?.headers,
            'Authorization': '[HIDDEN]'
          }
        } : undefined
      });
      throw error;
    }
  }

  public async findContactByPhone(phone: string) {
    try {
      console.log('Searching for contact by phone:', phone);
      const query = encodeURIComponent(phone);
      const response = await this.request<any>('GET', `/contacts?query=${query}&limit=${AMOCRM_CONFIG.CONTACTS_SEARCH_LIMIT}`);
      console.log('Contact search result:', {
        found: !!response._embedded?.contacts?.[0],
        contactId: response._embedded?.contacts?.[0]?.id
      });
      return response._embedded?.contacts?.[0] || null;
    } catch (error) {
      console.error('Error searching contact:', error);
      return null;
    }
  }

  public async findLeadsByContact(contactId: number) {
    try {
      console.log('Searching leads for contact:', contactId);
      const response = await this.request<any>('GET', `/leads?filter[contacts][0][id]=${contactId}`);
      console.log('Leads search result:', {
        count: response._embedded?.leads?.length || 0,
        hasActiveLeads: response._embedded?.leads?.some((lead: any) => lead.status_id !== 142 && lead.status_id !== 143)
      });
      return response._embedded?.leads || [];
    } catch (error) {
      console.error('Error searching leads:', error);
      return [];
    }
  }

  public async createOrUpdateLead(data: LeadData) {
    try {
      console.log('Starting createOrUpdateLead with data:', {
        ...data,
        phone: data.phone ? '******' + data.phone.slice(-4) : undefined,
        email: data.email ? '******' + data.email.slice(data.email.indexOf('@')) : undefined
      });
      
      // Поиск контакта по телефону
      const contact = await this.findContactByPhone(data.phone);
      console.log('Contact search result:', { found: !!contact, contactId: contact?.id });
      
      if (contact) {
        // Если контакт найден, ищем его активные сделки
        const leads = await this.findLeadsByContact(contact.id);
        const activeLead = leads.find((lead: any) => lead.status_id !== 142 && lead.status_id !== 143);
        console.log('Active lead search result:', { 
          totalLeads: leads.length,
          hasActiveLead: !!activeLead,
          activeLeadId: activeLead?.id
        });
        
        if (activeLead) {
          // Если есть активная сделка, обновляем её
          console.log('Updating existing lead:', activeLead.id);
          return this.updateLead(activeLead.id, data);
        }
      }
      
      // Если контакт не найден или нет активных сделок, создаем новую сделку
      console.log('Creating new lead');
      const leadData = {
        name: data.name 
          ? `Заявка от ${data.name}`
          : `Заявка на обмен ${data.amount} ${data.currencyFrom} → ${data.currencyTo}`,
        custom_fields_values: [
          {
            field_id: AMOCRM_CONFIG.CUSTOM_FIELDS.AMOUNT,
            values: [{ value: data.amount }]
          },
          {
            field_id: AMOCRM_CONFIG.CUSTOM_FIELDS.CURRENCY_FROM,
            values: [{ value: data.currencyFrom }]
          },
          {
            field_id: AMOCRM_CONFIG.CUSTOM_FIELDS.CURRENCY_TO,
            values: [{ value: data.currencyTo }]
          },
          {
            field_id: AMOCRM_CONFIG.CUSTOM_FIELDS.EXCHANGE_RATE,
            values: [{ value: data.exchangeRate }]
          },
          {
            field_id: AMOCRM_CONFIG.CUSTOM_FIELDS.IS_ESCROW,
            values: [{ value: data.isEscrow }]
          },
          {
            field_id: AMOCRM_CONFIG.CUSTOM_FIELDS.IS_URGENT,
            values: [{ value: data.isUrgent }]
          },
          {
            field_id: AMOCRM_CONFIG.CUSTOM_FIELDS.COMMISSION,
            values: [{ value: data.commission }]
          },
          {
            field_id: AMOCRM_CONFIG.CUSTOM_FIELDS.PHONE,
            values: [{ value: data.phone }]
          }
        ].concat(
          data.email ? [{
            field_id: AMOCRM_CONFIG.CUSTOM_FIELDS.EMAIL,
            values: [{ value: data.email }]
          }] : [],
          data.message ? [{
            field_id: AMOCRM_CONFIG.CUSTOM_FIELDS.MESSAGE,
            values: [{ value: data.message }]
          }] : []
        ),
        _embedded: contact ? {
          contacts: [{ id: contact.id }]
        } : undefined
      };

      console.log('Sending lead data to AmoCRM:', {
        ...leadData,
        custom_fields_values: leadData.custom_fields_values.map(field => ({
          ...field,
          values: field.field_id === AMOCRM_CONFIG.CUSTOM_FIELDS.PHONE || 
                 field.field_id === AMOCRM_CONFIG.CUSTOM_FIELDS.EMAIL
            ? [{ value: '******' }]
            : field.values
        }))
      });

      return this.request('POST', '/leads', [leadData]);
    } catch (error) {
      console.error('Error in createOrUpdateLead:', error);
      throw error;
    }
  }

  private async updateLead(leadId: number, data: LeadData) {
    try {
      console.log(`Updating lead ${leadId} with data:`, {
        ...data,
        phone: data.phone ? '******' + data.phone.slice(-4) : undefined,
        email: data.email ? '******' + data.email.slice(data.email.indexOf('@')) : undefined
      });

      const updateData = {
        custom_fields_values: [
          {
            field_id: AMOCRM_CONFIG.CUSTOM_FIELDS.AMOUNT,
            values: [{ value: data.amount }]
          },
          {
            field_id: AMOCRM_CONFIG.CUSTOM_FIELDS.CURRENCY_FROM,
            values: [{ value: data.currencyFrom }]
          },
          {
            field_id: AMOCRM_CONFIG.CUSTOM_FIELDS.CURRENCY_TO,
            values: [{ value: data.currencyTo }]
          },
          {
            field_id: AMOCRM_CONFIG.CUSTOM_FIELDS.EXCHANGE_RATE,
            values: [{ value: data.exchangeRate }]
          },
          {
            field_id: AMOCRM_CONFIG.CUSTOM_FIELDS.IS_ESCROW,
            values: [{ value: data.isEscrow }]
          },
          {
            field_id: AMOCRM_CONFIG.CUSTOM_FIELDS.IS_URGENT,
            values: [{ value: data.isUrgent }]
          },
          {
            field_id: AMOCRM_CONFIG.CUSTOM_FIELDS.COMMISSION,
            values: [{ value: data.commission }]
          }
        ]
      };

      return this.request('PATCH', `/leads/${leadId}`, updateData);
    } catch (error) {
      console.error(`Error updating lead ${leadId}:`, error);
      throw error;
    }
  }
}
