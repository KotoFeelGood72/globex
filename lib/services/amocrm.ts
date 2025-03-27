import axios from "axios"

interface AmoCredentials {
  client_id: string
  client_secret: string
  redirect_uri: string
  code: string
}

interface AmoTokens {
  access_token: string
  refresh_token: string
  expires_in: number
}

interface AmoCompany {
  id: number
  name: string
  custom_fields_values?: Array<{
    field_id: number
    values: Array<{
      value: string | number
    }>
  }>
  responsible_user_id?: number
}

interface AmoLead {
  id: number
  name: string
  price: number
  pipeline_id: number
  status_id: number
  custom_fields_values?: Array<{
    field_id: number
    values: Array<{
      value: string | number
    }>
  }>
}

class AmoCRMService {
  private baseUrl: string
  private accessToken: string | null
  private refreshToken: string | null
  private expiresAt: number | null

  // ID пользовательских полей в AmoCRM
  private readonly CUSTOM_FIELDS = {
    EMAIL: process.env.AMOCRM_EMAIL_FIELD_ID,
    PHONE: process.env.AMOCRM_PHONE_FIELD_ID,
    COUNTRY: process.env.AMOCRM_COUNTRY_FIELD_ID,
    PARTNER_ID: process.env.AMOCRM_PARTNER_ID_FIELD_ID,
    STATUS: process.env.AMOCRM_STATUS_FIELD_ID,
    MESSAGE: process.env.AMOCRM_MESSAGE_FIELD_ID
  }

  constructor() {
    this.baseUrl = process.env.AMOCRM_BASE_URL || ""
    this.accessToken = process.env.AMOCRM_ACCESS_TOKEN || null
    this.refreshToken = null
    this.expiresAt = null
  }

  private async ensureAuth() {
    if (!this.accessToken) {
      throw new Error('Access token not found');
    }
    return true;
  }

  private async refreshAccessToken() {
    try {
      // В данный момент у нас есть долгосрочный токен, 
      // поэтому просто используем его
      return;
    } catch (error) {
      console.error("Failed to refresh AmoCRM token:", error)
      throw error
    }
  }

  // Преобразование компании из нашего формата в формат AmoCRM
  private mapCompanyToAmo(company: any): Partial<AmoCompany> {
    const customFields = []

    if (company.email) {
      customFields.push({
        field_id: Number(this.CUSTOM_FIELDS.EMAIL),
        values: [{ value: company.email }]
      })
    }

    if (company.phone) {
      customFields.push({
        field_id: Number(this.CUSTOM_FIELDS.PHONE),
        values: [{ value: company.phone }]
      })
    }

    if (company.country) {
      customFields.push({
        field_id: Number(this.CUSTOM_FIELDS.COUNTRY),
        values: [{ value: company.country }]
      })
    }

    if (company.partnerId) {
      customFields.push({
        field_id: Number(this.CUSTOM_FIELDS.PARTNER_ID),
        values: [{ value: company.partnerId }]
      })
    }

    if (company.status) {
      customFields.push({
        field_id: Number(this.CUSTOM_FIELDS.STATUS),
        values: [{ value: company.status }]
      })
    }

    return {
      name: company.name,
      custom_fields_values: customFields
    }
  }

  // Преобразование компании из формата AmoCRM в наш формат
  private mapAmoToCompany(amoCompany: AmoCompany) {
    const getCustomFieldValue = (fieldId: string | undefined) => {
      if (!fieldId) return null
      const field = amoCompany.custom_fields_values?.find(
        (f) => f.field_id === Number(fieldId)
      )
      return field?.values[0]?.value || null
    }

    return {
      id: amoCompany.id.toString(),
      name: amoCompany.name,
      email: getCustomFieldValue(this.CUSTOM_FIELDS.EMAIL),
      phone: getCustomFieldValue(this.CUSTOM_FIELDS.PHONE),
      country: getCustomFieldValue(this.CUSTOM_FIELDS.COUNTRY),
      partnerId: getCustomFieldValue(this.CUSTOM_FIELDS.PARTNER_ID),
      status: getCustomFieldValue(this.CUSTOM_FIELDS.STATUS) || "pending"
    }
  }

  async createCompany(company: any) {
    await this.ensureAuth()
    
    try {
      const amoCompany = this.mapCompanyToAmo(company)
      const response = await axios.post(
        `${this.baseUrl}/api/v4/companies`,
        [amoCompany],
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`
          }
        }
      )

      return this.mapAmoToCompany(response.data._embedded.companies[0])
    } catch (error) {
      console.error("Failed to create company in AmoCRM:", error)
      throw error
    }
  }

  async updateCompany(id: string, company: any) {
    await this.ensureAuth()

    try {
      const amoCompany = this.mapCompanyToAmo(company)
      const response = await axios.patch(
        `${this.baseUrl}/api/v4/companies/${id}`,
        amoCompany,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`
          }
        }
      )

      return this.mapAmoToCompany(response.data)
    } catch (error) {
      console.error("Failed to update company in AmoCRM:", error)
      throw error
    }
  }

  async deleteCompany(id: string) {
    await this.ensureAuth()

    try {
      await axios.delete(`${this.baseUrl}/api/v4/companies/${id}`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      })
    } catch (error) {
      console.error("Failed to delete company in AmoCRM:", error)
      throw error
    }
  }

  async getCompany(id: string) {
    await this.ensureAuth()

    try {
      const response = await axios.get(
        `${this.baseUrl}/api/v4/companies/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`
          }
        }
      )

      return this.mapAmoToCompany(response.data)
    } catch (error) {
      console.error("Failed to get company from AmoCRM:", error)
      throw error
    }
  }

  async getCompanies(params: { page?: number; limit?: number } = {}) {
    await this.ensureAuth()

    try {
      const response = await axios.get(`${this.baseUrl}/api/v4/companies`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        },
        params: {
          page: params.page || 1,
          limit: params.limit || 50
        }
      })

      return {
        companies: response.data._embedded.companies.map((company: AmoCompany) =>
          this.mapAmoToCompany(company)
        ),
        pagination: {
          total: response.data._total_items,
          page: response.data._page,
          pages: response.data._pages
        }
      }
    } catch (error) {
      console.error("Failed to get companies from AmoCRM:", error)
      throw error
    }
  }

  async createLead(data: {
    name: string;
    email: string;
    phone: string;
    message?: string;
  }) {
    await this.ensureAuth();
    
    try {
      const lead = {
        name: `Заявка с сайта от ${data.name}`,
        price: 0,
        pipeline_id: Number(process.env.AMOCRM_PIPELINE_ID),
        status_id: Number(process.env.AMOCRM_LEAD_STATUS_ID),
        _embedded: {
          contacts: [
            {
              first_name: data.name,
              custom_fields_values: [
                {
                  field_id: Number(process.env.AMOCRM_EMAIL_FIELD_ID),
                  values: [{ value: data.email }]
                },
                {
                  field_id: Number(process.env.AMOCRM_PHONE_FIELD_ID),
                  values: [{ value: data.phone }]
                }
              ]
            }
          ]
        }
      };

      if (data.message) {
        lead._embedded.contacts[0].custom_fields_values.push({
          field_id: Number(process.env.AMOCRM_MESSAGE_FIELD_ID),
          values: [{ value: data.message }]
        });
      }

      console.log('Sending lead to AmoCRM:', {
        url: `${this.baseUrl}/api/v4/leads/complex`,
        lead,
        token: this.accessToken?.substring(0, 10) + '...'
      });

      const response = await axios.post(
        `${this.baseUrl}/api/v4/leads/complex`,
        lead,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('AmoCRM response:', response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to create lead in AmoCRM:", error);
      if (axios.isAxiosError(error) && error.response) {
        console.error("AmoCRM error response:", {
          status: error.response.status,
          data: error.response.data
        });
      }
      throw error;
    }
  }
}

export const amoCRMService = new AmoCRMService()
