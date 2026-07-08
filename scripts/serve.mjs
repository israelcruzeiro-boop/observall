import { createReadStream, existsSync } from 'node:fs';
import { appendFile, mkdir } from 'node:fs/promises';
import crypto from 'node:crypto';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

const root = normalize(new URL('../', import.meta.url).pathname.replace(/^\/(.:)/, '$1'));
const port = Number(process.env.PORT || 4173);
const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

async function readRequestBody(request, limit = 20000) {
  let body = '';

  for await (const chunk of request) {
    body += chunk;
    if (body.length > limit) throw new Error('request_too_large');
  }

  return body;
}

async function captureLead(request, response) {
  try {
    const body = await readRequestBody(request);
    const payload = JSON.parse(body);
    const lead = payload?.lead || {};

    if (!lead.nome || !lead.empresa || !lead.whatsapp || !lead.email) {
      response.writeHead(422, { 'Content-Type': 'application/json; charset=utf-8' });
      response.end(JSON.stringify({ ok: false, error: 'missing_lead_fields' }));
      return;
    }

    const record = {
      id: crypto.randomUUID(),
      source: 'observall-site-roi',
      createdAt: new Date().toISOString(),
      lead,
      simulation: payload.simulation || {},
      client: {
        ipHash: '',
        userAgent: String(request.headers['user-agent'] || '').slice(0, 240),
      },
    };

    await mkdir(join(root, 'storage'), { recursive: true });
    await appendFile(join(root, 'storage', 'roi-leads.jsonl'), `${JSON.stringify(record)}\n`, 'utf8');

    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
    response.end(JSON.stringify({ ok: true }));
  } catch (error) {
    response.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify({ ok: false, error: 'invalid_payload' }));
  }
}

createServer((request, response) => {
  const requestPath = decodeURIComponent(request.url?.split('?')[0] || '/');

  if (request.method === 'POST' && (requestPath === '/api/lead-capture' || requestPath === '/lead-capture.php')) {
    captureLead(request, response);
    return;
  }

  const requestedFile = requestPath === '/' ? 'index.html' : requestPath.replace(/^\/+/, '');
  const relative = requestedFile;
  const file = normalize(join(root, relative));

  if (!file.startsWith(root) || !existsSync(file)) {
    response.writeHead(404).end('Not found');
    return;
  }

  response.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' });
  createReadStream(file).pipe(response);
}).listen(port, '127.0.0.1', () => {
  console.log(`Observall disponível em http://127.0.0.1:${port}`);
});
