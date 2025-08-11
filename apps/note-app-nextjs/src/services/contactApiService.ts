import { ContactForm } from '@/types/contactForm.types';

class ContactApiService {
  private readonly baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/messages`;
  private static instance: ContactApiService;

  public async sendMessage(form: ContactForm ) {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    })

    if(!response.ok) {
      throw new Error('Failed to send message.');
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
