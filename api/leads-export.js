import { get, list } from '@vercel/blob';

function isAuthorized(request) {
  const expected = process.env.ROI_LEADS_TOKEN;
  if (!expected) return false;

  const url = new URL(request.url, `https://${request.headers.host || 'observall.com.br'}`);
  const provided = request.headers['x-leads-token'] || url.searchParams.get('token');
  return provided === expected;
}

async function streamToText(stream) {
  const chunks = [];

  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk));
  }

  return Buffer.concat(chunks).toString('utf8');
}

function csvEscape(value) {
  const text = String(value ?? '');
  return `"${text.replace(/"/g, '""')}"`;
}

function toCsv(records) {
  const headers = [
    'createdAt',
    'nome',
    'empresa',
    'whatsapp',
    'email',
    'quantidadeDeLojas',
    'cuponsPorMes',
    'ticketMedio',
    'margemDeLucro',
    'visitasOcultasPorLojaMes',
    'receitaExtraMensal',
    'lucroIncrementalMensal',
    'investimentoMensalObservall',
    'roiAnual',
    'ganhoLiquidoAnual',
  ];

  const rows = records.map((record) => {
    const simulation = record.simulation || {};
    const lead = record.lead || {};

    return [
      record.createdAt,
      lead.nome,
      lead.empresa,
      lead.whatsapp,
      lead.email,
      simulation.quantidadeDeLojas,
      simulation.cuponsPorMes,
      simulation.ticketMedio,
      simulation.margemDeLucro,
      simulation.visitasOcultasPorLojaMes,
      simulation.receitaExtraMensal,
      simulation.lucroIncrementalMensal,
      simulation.investimentoMensalObservall,
      simulation.roiAnual,
      simulation.ganhoLiquidoAnual,
    ].map(csvEscape).join(',');
  });

  return `${headers.join(',')}\n${rows.join('\n')}\n`;
}

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');

  if (request.method !== 'GET') {
    response.status(405).json({ ok: false, error: 'method_not_allowed' });
    return;
  }

  if (!process.env.ROI_LEADS_TOKEN) {
    response.status(501).json({ ok: false, error: 'missing_ROI_LEADS_TOKEN' });
    return;
  }

  if (!isAuthorized(request)) {
    response.status(401).json({ ok: false, error: 'unauthorized' });
    return;
  }

  try {
    const url = new URL(request.url, `https://${request.headers.host || 'observall.com.br'}`);
    const format = url.searchParams.get('format') === 'csv' ? 'csv' : 'json';
    const records = [];
    let cursor;

    do {
      const page = await list({ prefix: 'roi-leads/', cursor, limit: 1000 });
      cursor = page.cursor;

      for (const blob of page.blobs) {
        const result = await get(blob.pathname, { access: 'private' });
        if (result?.statusCode !== 200 || !result.stream) continue;
        records.push(JSON.parse(await streamToText(result.stream)));
      }
    } while (cursor);

    records.sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')));

    if (format === 'csv') {
      response.setHeader('Content-Type', 'text/csv; charset=utf-8');
      response.setHeader('Content-Disposition', 'attachment; filename="observall-roi-leads.csv"');
      response.status(200).send(toCsv(records));
      return;
    }

    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.status(200).json({ ok: true, count: records.length, leads: records });
  } catch (error) {
    response.status(500).json({ ok: false, error: 'export_failed' });
  }
}
