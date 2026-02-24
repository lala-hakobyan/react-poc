import { ContactForm } from '@/types/contactForm.types';
import { LogMessagesConstants } from '@/constants/logMessages.constants';
import { debugFlags } from '@/debug-experiments/debugFlags';

class ContactApiService {
  private readonly baseApiUrl = `api/messages`;
  private readonly testAccessToken = process.env.NEXT_PUBLIC_TEST_ACCESS_TOKEN;
  private static instance: ContactApiService;

  public async sendMessage(form: ContactForm ) {
    const baseUrl = debugFlags.enableContactCorsApiError ? 'http://localhost:3010/api/messages' : this.baseApiUrl;

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.testAccessToken}`
      },
      body: JSON.stringify(form)
    })

    if(!response.ok) {
      throw new Error(LogMessagesConstants.contact.sendError);
    }

    return response.json();
  }

  public static getInstance() {
    if(!ContactApiService.instance) {
      ContactApiService.instance = new ContactApiService();
    }

    return ContactApiService.instance;
  }
}

const contactApiService = new ContactApiService();

export default contactApiService;
