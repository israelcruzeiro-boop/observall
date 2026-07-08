import { appendFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import crypto from 'node:crypto';

const MAX_BODY_SIZE = 20000;

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';

    request.on('data', (chunk) => {
      body += chunk;
      if (body.length > MAX_BODY_SIZE) {
        reject(new Error('request_too_large'));
      }
    });

    request.on('end', () => resolve(body));
    request.on('error', reject);
  });
}

function cleanText(value) {
  return String(value || '').trim().slice(0, 180);
}

export default async function handler(request, response) {
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');

  if (request.method !== 'POST') {
    response.status(405).json({ ok: false, error: 'method_not_allowed' });
    return;
  }

  try {
    const payload = JSON.parse(await readBody(request));
    const lead = {
      nome: cleanText(payload?.lead?.nome),
      empresa: cleanText(payload?.lead?.empresa),
      whatsapp: cleanText(payload?.lead?.whatsapp),
      email: cleanText(payload?.lead?.email),
    };

    if (!lead.nome || !lead.empresa || !lead.whatsapp || !lead.email) {
      response.status(422).json({ ok: false, error: 'missing_lead_fields' });
      return;
    }

    const record = {
      id: crypto.randomUUID(),
      source: 'observall-site-roi',
      createdAt: new Date().toISOString(),
      lead,
      simulation: payload?.simulation || {},
      client: {
        ipHash: crypto.createHash('sha256').update(request.headers['x-forwarded-for'] || '').digest('hex'),
        userAgent: String(request.headers['user-agent'] || '').slice(0, 240),
      },
    };

    const storageDir = join(tmpdir(), 'observall');
    await mkdir(storageDir, { recursive: true });
    await appendFile(join(storageDir, 'roi-leads.jsonl'), `${JSON.stringify(record)}\n`, 'utf8');

    response.status(200).json({ ok: true });
  } catch (error) {
    response.status(400).json({ ok: false, error: 'invalid_payload' });
  }
}
