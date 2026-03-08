import type { VercelRequest, VercelResponse } from '@vercel/node';
import { join } from 'path';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Dynamically import the vinext server handler after build
    const serverPath = join(process.cwd(), 'dist/server/index.js');
    const serverModule = await import(serverPath);
    const vinextHandler = serverModule.default;

    // Convert Vercel request to Web Request format
    const url = new URL(req.url!, `https://${req.headers.host}`);
    const request = new Request(url.toString(), {
      method: req.method,
      headers: new Headers(req.headers as Record<string, string>),
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    });

    // Call the vinext handler
    const response = await vinextHandler(request);
    
    // Convert Web Response to Vercel Response
    res.status(response.status);
    response.headers.forEach((value: string, key: string) => {
      res.setHeader(key, value);
    });
    
    const body = await response.text();
    res.send(body);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export const config = {
  runtime: 'nodejs',
};
