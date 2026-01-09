import { LogMessagesConstants } from '@/constants/logMessages.constants';
import { NextResponse } from 'next/server';

export class ProxyRequestService {
  private static instance: ProxyRequestService;

  /*
   *
   * Proxies a Next.js request to a backend API and forwards
   * Sends status and response body directly to the client.
   *
   * @param req
   * @param backendBaseUrl
   */
  public async proxyRequest(req: Request, backendBaseUrl: string) {
    try {
      const backendUrl = new URL(backendBaseUrl);
      const { searchParams } = new URL(req.url);
      let response: Response;
      let requestBody;

      // Copy query params
      searchParams.forEach((value, key) => {
        backendUrl.searchParams.set(key, value);
      });

      // Forward response Headers (important: cookies, authorization, etc.)
      const headers = new Headers(req.headers);

      if (req.method === 'GET' || req.method === 'HEAD') {
        response = await fetch(backendUrl.toString(), {
          method: req.method,
          headers
        });
      } else {
        // We get req.text() in order to check if it is empty, invalid json or valid json
        const text = await req.text();

        if (text) {
          try {
            const json = JSON.parse(text); // attempt JSON parse
            requestBody = JSON.stringify(json); // re-stringify valid JSON
          } catch {
            requestBody = text; // fallback for non-JSON bodies
          }
        }

        response = await fetch(backendUrl.toString(), {
          method: req.method,
          headers,
          body: requestBody
        });
      }

      const responseBody = await response.text();
      // Forward request Headers (important: ETag, etc.)
      const responseHeaders = new Headers(response.headers);

      responseHeaders.set(
        'content-type',
        response.headers.get('content-type') ?? 'text/plain'
      );

      return new NextResponse(responseBody, {
        status: response.status,
        headers: responseHeaders
      });
    } catch (err: unknown) {
      let message = LogMessagesConstants.global.internalServerError;

      if (err instanceof Error) {
        message = err.message;
      }

      return NextResponse.json({ message }, { status: 500 });
    }
  }

  public static getInstance() {
    if(!ProxyRequestService.instance) {
      ProxyRequestService.instance = new ProxyRequestService();
    }

    return ProxyRequestService.instance;
  }
}

const proxyRequestService = ProxyRequestService.getInstance();

export default proxyRequestService;
