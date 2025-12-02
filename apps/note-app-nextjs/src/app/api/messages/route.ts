import proxyRequestService from '@/services/proxyRequestService';

const baseApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/messages`;

export async function POST(req: Request) {
  return proxyRequestService.proxyRequest(req, baseApiUrl);
}
