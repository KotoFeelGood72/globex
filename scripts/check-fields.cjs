require('dotenv').config({ path: '../.env.local' });
const axios = require('axios');

async function checkFields() {
  try {
    const token = process.env.AMOCRM_ACCESS_TOKEN;
    const domain = process.env.AMOCRM_BASE_URL;

    if (!token || !domain) {
      throw new Error('Missing required environment variables');
    }

    console.log('Checking contact fields...');
    const contactFields = await axios.get(`https://${domain}/api/v4/contacts/custom_fields`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Contact fields:', JSON.stringify(contactFields.data, null, 2));

    console.log('\nChecking lead fields...');
    const leadFields = await axios.get(`https://${domain}/api/v4/leads/custom_fields`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Lead fields:', JSON.stringify(leadFields.data, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

checkFields();
