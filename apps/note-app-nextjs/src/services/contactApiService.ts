import { ContactForm } from '@/types/contactForm.types';
import { LogMessagesConstants } from '@/constants/logMessages.constants';

class ContactApiService {
  private readonly baseUrl = `api/messages`;
  private readonly testAccessToken = process.env.NEXT_PUBLIC_TEST_ACCESS_TOKEN;
  private static instance: ContactApiService;

  public async sendMessage(form: ContactForm ) {
    const response = await fetch(this.baseUrl, {
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
