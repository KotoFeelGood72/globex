import { amoCRMService } from '../utils/amocrm.ts';

async function checkFields() {
  try {
    console.log('Checking contact fields...');
    const contactFields = await amoCRMService.getCustomFields('contacts');
    console.log('Contact fields:', JSON.stringify(contactFields, null, 2));

    console.log('\nChecking lead fields...');
    const leadFields = await amoCRMService.getCustomFields('leads');
    console.log('Lead fields:', JSON.stringify(leadFields, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

checkFields();
