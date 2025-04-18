export const AMOCRM_CONFIG = {
  // Базовые настройки
  BASE_DOMAIN: 'amocrm.ru',
  API_DOMAIN: 'api-b.amocrm.ru',
  ACCOUNT_ID: '32019510',
  
  // Данные интеграции
  CLIENT_ID: 'a6d6ac46-b602-4b9f-b613-03575925e72a',
  CLIENT_SECRET: 'mGEZOVKcPMfx9iIhfnAaJk1bajqcfGBNLAsFsczmw2PgGq4TNgonD2rxYXdtd0au',
  
  // Токены
  ACCESS_TOKEN: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImIwNTVhYjRhMDUwZmIwMmY2MjcwYzQ4NzhlZDQwNGE5NmU3ZTNlMjJjZWZhODg2MjNhNWNlMWNkMzE5NGZhMjU3MTJkMGQ2YWZmMTQwNzI0In0.eyJhdWQiOiJhNmQ2YWM0Ni1iNjAyLTRiOWYtYjYxMy0wMzU3NTkyNWU3MmEiLCJqdGkiOiJiMDU1YWI0YTA1MGZiMDJmNjI3MGM0ODc4ZWQ0MDRhOTZlN2UzZTIyY2VmYTg4NjIzYTVjZTFjZDMxOTRmYTI1NzEyZDBkNmFmZjE0MDcyNCIsImlhdCI6MTczNzk2NDc2MCwibmJmIjoxNzM3OTY0NzYwLCJleHAiOjE3Njk0NzIwMDAsInN1YiI6IjExNjc0ODU0IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMyMDE5NTEwLCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiMTVlMDNmMmMtYTFlZC00YmY4LTk3NDItNTE5ODVlMDM3N2I1IiwiYXBpX2RvbWFpbiI6ImFwaS1iLmFtb2NybS5ydSJ9.IPLdZJXKzFfFTHlRaOmpPShAcs22O4GJomLEvVgGJiD1-zQvEq4wIlZFOFVNiZ250iRUKNOwQPEUzEj-sDRMH0xKL9XjdermHzM0s3uMNejyxhdmTT3iF4dArjYR47S9QSFwXubXuRIjEIBF54xs67M9neGLYtVW7ruCZRmPOu0QoFQkUZI-k9kXnpDf2uQU5uo_z7MG-YqRVA4Rg-2sB0Bghr-Hs2Iw2Fqgxbwps2LZRokAhfPlBZo2NdfQVlWdz-xmi3AySRCYLW_9-aNlXOvCk6D8f9--iy1G1nLqFQx2CtCdBXDirEZJIUFRuLf5iSGLcnAvCPRHuvWsS05M1A',
  AUTH_CODE: 'def5020080d2f6bea400e6255ba6d3314cf06b9bdad40aa8c476e85e6faf6b714979e636a99f99435b86e5399c5ae610d9fef65186320dfe299f02192ae75c5a4ce928ee6a1203b91dc8ef5e7d0440b790848f492ffe31c406d52441958e9a4c098cd343b286924eedf72f64253e81df051cdc15a7973dc3b3bbc57dd03b95f27493bd030e53349cc9116ba5e217813b57b3a8dc193b0ac74d9215240bcd15279dcd5c4d35c757e8fdbdb7977fb26fe086a812de0a58f597eb59345121942ba5c5ae4d6ab6a11b481f505b22820371eb017108fc3261d537bcf6b2d0999795b3182f886a02d633a80227b4952195ce81c34c58f9f1d15db2db785b7aef454f824e898eb90c4e34b5a5774bec4ddbe26fc141e9c74bc6a5b1d4e1d2e97b94ec49c9b064a4a970284280ee2fa59bc32979725b8b4da8b69e6a77cf211f6ad9f5c1812553fbff33d9614491cc61b63e65f0b6cdeaec685396795ef7d9028e922942a29243dd08c2b5d71ff3d6f0bc070cf61cd41085f3090ed39043494d5108a9900fcdaabe253dffcf6dad75e45dc9a7b779bfec2a547d5449458341567dd2a2f343d26cf7600cab14b7f0e83371dcfb936564c7c3ec50aa79944c71a88f3e003fd6bf7c832129d4013ee9ac5e2c0d06866c39fc056d3c8c401daba4c4a5a87ef4d46528ca43',
  
  // Настройки запросов
  REQUEST_TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  
  // ID полей AmoCRM
  CUSTOM_FIELDS: {
    PHONE: process.env.AMOCRM_PHONE_FIELD_ID,
    EMAIL: process.env.AMOCRM_EMAIL_FIELD_ID,
    MESSAGE: process.env.AMOCRM_MESSAGE_FIELD_ID,
    PIPELINE: process.env.AMOCRM_PIPELINE_ID,
    STATUS: process.env.AMOCRM_LEAD_STATUS_ID,
    AMOUNT: '3531281',
    CURRENCY_FROM: '3531283',
    CURRENCY_TO: '3531285',
    EXCHANGE_RATE: '3531287',
    IS_ESCROW: '3531289',
    IS_URGENT: '3531291',
    COMMISSION: '3531293'
  },
  
  // Поиск контактов
  CONTACTS_SEARCH_LIMIT: 1
} as const;
