import axios from 'axios';

interface AmoCRMConfig {
  domain: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  accessToken?: string;
  authCode?: string;
  pipelineId: number;
  statusId: number;
}

interface AmoCRMLead {
  name: string;
  price: number;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  message?: string;
}

interface AmoCRMTokenResponse {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

export class AmoCRMService {
  private config: AmoCRMConfig;
  private apiDomain: string;

  constructor(config: AmoCRMConfig) {
    console.log('Initializing AmoCRM service with config:', {
      baseUrl: config.domain,
      hasAccessToken: !!config.accessToken,
      hasClientId: !!config.clientId,
      hasClientSecret: !!config.clientSecret,
      hasAuthCode: !!config.authCode
    });

    if (!config.domain || !config.clientId || !config.clientSecret) {
      throw new Error('Missing required AmoCRM configuration');
    }

    this.config = config;
    this.apiDomain = this.config.domain;
  }

  async exchangeAuthCode(): Promise<AmoCRMTokenResponse> {
    if (!this.config.authCode) {
      throw new Error('Authorization code is required');
    }

    const tokenUrl = `https://${this.apiDomain}/oauth2/access_token`;
    const tokenData = {
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      grant_type: 'authorization_code',
      code: this.config.authCode,
      redirect_uri: this.config.redirectUri
    };

    try {
      const response = await axios.post(tokenUrl, tokenData);
      return response.data;
    } catch (error: any) {
      console.error('Failed to exchange auth code:', error.response?.data || error.message);
      throw new Error('Failed to exchange authorization code');
    }
  }

  async createLead(data: AmoCRMLead) {
    try {
      if (!this.config.accessToken) {
        throw new Error('Access token is required');
      }

      // Создаем контакт
      const contactResponse = await axios.post(
        `https://${this.apiDomain}/api/v4/contacts`,
        [{
          name: data.contact.name,
          custom_fields_values: [
            {
              field_id: 302075, // ID для поля телефона
              values: [{
                value: data.contact.phone,
                enum_id: 268195 // ID для типа MOB
              }]
            },
            {
              field_id: 302077, // ID для поля email
              values: [{
                value: data.contact.email,
                enum_id: 268203 // ID для типа WORK
              }]
            }
          ]
        }],
        {
          headers: {
            'Authorization': `Bearer ${this.config.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const contactId = contactResponse.data._embedded.contacts[0].id;

      // Создаем сделку
      const leadResponse = await axios.post(
        `https://${this.apiDomain}/api/v4/leads`,
        [{
          name: data.name,
          price: data.price,
          status_id: this.config.statusId,
          pipeline_id: this.config.pipelineId,
          _embedded: {
            contacts: [
              {
                id: contactId
              }
            ]
          },
          custom_fields_values: [
            {
              field_id: 727333, // ID для поля "Сообщение с сайта"
              values: [{
                value: data.message || ''
              }]
            }
          ]
        }],
        {
          headers: {
            'Authorization': `Bearer ${this.config.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return leadResponse.data;
    } catch (error: any) {
      console.error('Error creating lead:', error.response?.data || error.message);
      throw error;
    }
  }

  async getPipelines() {
    try {
      if (!this.config.accessToken) {
        throw new Error('Access token is required');
      }

      const response = await axios.get(
        `https://${this.apiDomain}/api/v4/leads/pipelines`,
        {
          headers: {
            'Authorization': `Bearer ${this.config.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Error getting pipelines:', error.response?.data || error.message);
      throw error;
    }
  }
}

// Проверяем наличие необходимых переменных окружения
const requiredEnvVars = [
  'AMOCRM_BASE_URL',
  'AMOCRM_CLIENT_ID',
  'AMOCRM_CLIENT_SECRET',
  'AMOCRM_PIPELINE_ID',
  'AMOCRM_STATUS_ID'
] as const;

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

// Создаем и экспортируем экземпляр сервиса
export const amoCRMService = new AmoCRMService({
  domain: process.env.AMOCRM_BASE_URL!,
  clientId: process.env.AMOCRM_CLIENT_ID!,
  clientSecret: process.env.AMOCRM_CLIENT_SECRET!,
  redirectUri: process.env.AMOCRM_REDIRECT_URI || 'http://localhost:4000',
  accessToken: process.env.AMOCRM_ACCESS_TOKEN,
  authCode: process.env.AMOCRM_AUTH_CODE,
  pipelineId: Number(process.env.AMOCRM_PIPELINE_ID),
  statusId: Number(process.env.AMOCRM_STATUS_ID)
});
