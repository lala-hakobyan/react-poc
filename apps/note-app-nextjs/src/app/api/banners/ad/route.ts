import proxyRequestService from '@/services/proxyRequestService';

const baseApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/banners/ad`;

export async function GET(req: Request) {
  return proxyRequestService.proxyRequest(req, baseApiUrl);
}
