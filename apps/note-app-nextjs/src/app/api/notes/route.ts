import proxyRequestService from '@/services/proxyRequestService';

const baseApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/notes`;

export async function GET(req: Request) {
  return proxyRequestService.proxyRequest(req, baseApiUrl);
}

export async function POST(req: Request) {
  return proxyRequestService.proxyRequest(req, baseApiUrl);
}
