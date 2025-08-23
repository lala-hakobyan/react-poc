import proxyRequestService from '@/services/proxyRequestService';

const baseApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/notes`;

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const url = `${baseApiUrl}/${id}`;

  return proxyRequestService.proxyRequest(req, url);
}


export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const url = `${baseApiUrl}/${id}`;

  return proxyRequestService.proxyRequest(req, url);
}
