import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (file) => readFile(new URL(`../${file}`, import.meta.url), 'utf8');

test('a landing apresenta o Score como resposta ao cliente que não volta', async () => {
  const html = await read('index.html');

  assert.match(html, /Eu sou o cliente que nunca mais volta/i);
  assert.match(html, /Quantos clientes passaram pelas suas lojas e tomaram essa mesma decisão/i);
  assert.match(html, /A Observe\+ cruza o que um profissional identifica, o que o cliente sente e o que a operação acredita estar entregando/i);
  assert.match(html, /Quero descobrir por que meus clientes não voltam/i);
  assert.match(html, /Ele não reclamou[\s\S]*Só decidiu não voltar/i);
  assert.match(html, /proteger[\s\S]*marca/i);
  assert.match(html, /Auditor Profissional/i);
  assert.match(html, /Cliente Real/i);
  assert.match(html, /Operação Interna/i);
  assert.match(html, /Score da Loja/i);
  assert.match(html, /Somos especialistas em descobrir[\s\S]*por que o cliente não volta/i);
  assert.match(html, /Dúvidas Frequentes/i);
  assert.match(html, /wa\.me\/5561993715292/);
});

test('modela exatamente três módulos que convergem para o Score e deixa a IA depois dele', async () => {
  const html = await read('index.html');
  const modules = [...html.matchAll(/<article[^>]+data-score-module="([^"]+)"/g)].map((match) => match[1]);
  const flowSteps = [...html.matchAll(/data-score-step="([^"]+)"/g)].map((match) => match[1]);

  assert.deepEqual(modules, ['auditor-profissional', 'cliente-real', 'operacao-interna']);
  assert.deepEqual(flowSteps, ['tres-visoes', 'cruzamento', 'score', 'plano-de-acao']);
  assert.match(html, /data-score-flow/);
  assert.match(html, /class="score-ai[^"]*"[\s\S]*Inteligência Artificial/i);
  assert.doesNotMatch(html, /data-score-module="ia"/i);
});

test('mantém linguagem segura para Opinii, Score e a simulação de ROI', async () => {
  const [html, css, js] = await Promise.all([read('index.html'), read('styles.css'), read('script.js')]);
  const productSource = `${html}\n${css}\n${js}`;

  assert.doesNotMatch(productSource, /Alpine/i);
  assert.doesNotMatch(html, /fórmula do Score|peso(?:s)? do Score/i);
  assert.match(html, /simulação ilustrativa/i);
  assert.match(html, /O que compõe o Score/i);
  assert.match(html, /Como as três visões são cruzadas/i);
  assert.match(html, /Como os dados dos clientes são protegidos/i);
});

test('usa a nova logo Observe+ enviada pelo usuário', async () => {
  const html = await read('index.html');

  assert.match(html, /public\/assets\/logo-observe-plus-light\.png/);
  assert.match(html, /public\/assets\/logo-observe-plus-dark\.png/);
  assert.doesNotMatch(html, /alt="Observall"/);
  await access(new URL('../public/assets/logo-observe-plus-light.png', import.meta.url));
  await access(new URL('../public/assets/logo-observe-plus-dark.png', import.meta.url));
  await access(new URL('../public/assets/logo-observe-plus-icon.png', import.meta.url));
});

test('não incorpora marca, URLs ou copies específicas da referência de terceiros', async () => {
  const source = `${await read('index.html')}\n${await read('styles.css')}\n${await read('script.js')}`;

  assert.doesNotMatch(source, /seuclienteoculto/i);
  assert.doesNotMatch(source, /Seu Cliente Oculto/);
  assert.doesNotMatch(source, /maior e melhor empresa/i);
  assert.doesNotMatch(source, /América Latina/i);
  assert.doesNotMatch(source, /SCO Experience/i);
  assert.doesNotMatch(source, /Mídia e parceiros/i);
});

test('aproxima a sequência da referência seção por seção', async () => {
  const html = await read('index.html');

  const order = [
    'class="hero"',
    'class="metrics-strip"',
    'class="section value-section"',
    'id="solucoes"',
    'id="plataforma"',
    'id="clientes"',
    'id="depoimentos"',
    'id="sobre"',
    'id="resultados"',
    'id="faq"',
    'class="section final-cta-section"',
  ];

  let previous = -1;
  for (const marker of order) {
    const current = html.indexOf(marker);

    assert.ok(current > previous, `${marker} deveria aparecer depois da seção anterior`);
    previous = current;
  }
});

test('mantém títulos com palavra destacada em verde, como na referência adaptada', async () => {
  const [html, css] = await Promise.all([read('index.html'), read('styles.css')]);

  assert.ok((html.match(/<h2[\s\S]*?<span>/g) || []).length >= 5);
  assert.match(css, /h2 span\s*\{[^}]*color:\s*var\(--green\)/s);
  assert.match(css, /\.metrics-grid h3\s*\{[^}]*color:\s*var\(--green\)/s);
  assert.match(css, /\.card-icon\s*\{[^}]*background:\s*var\(--green\)/s);
});

test('incorpora o vídeo enviado na área sobre a Observall', async () => {
  const [html, videoJs] = await Promise.all([read('index.html'), read('video.js')]);

  assert.match(html, /class="about-video reveal" data-youtube-video="yuGAr_NQis8"/);
  assert.match(html, /public\/assets\/video-observall-youtube\.jpg/);
  assert.match(html, /Reproduzir vídeo/);
  assert.match(html, /<script src="video\.js" defer><\/script>/);
  assert.doesNotMatch(html, /<a[^>]+class="about-video/);
  assert.match(videoJs, /youtube-nocookie\.com\/embed/);
  assert.match(videoJs, /replaceChildren\(iframe\)/);
  assert.match(videoJs, /window\.location\.protocol === 'file:'/);
});

test('o build inclui o controlador dedicado do vídeo', async () => {
  const build = await read('scripts/build.mjs');

  assert.match(build, /'video\.js'/);
});

test('implementa a nova calculadora de ROI com captura de lead antes do resultado', async () => {
  const [html, js] = await Promise.all([read('index.html'), read('script.js')]);

  for (const id of ['stores', 'coupons', 'ticket', 'margin', 'visits']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }

  for (const id of ['lead-name', 'lead-company', 'lead-whatsapp', 'lead-email']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }

  assert.match(html, /class="calculator-layout reveal"/);
  assert.match(html, /id="lead-modal"/);
  assert.match(html, /Calcular meu potencial de ganho/);
  assert.match(html, /Ver meu resultado/);
  assert.match(js, /observallVisitPrice:\s*300/);
  assert.match(js, /couponGrowth:\s*0\.1/);
  assert.match(js, /ticketGrowth:\s*0\.12/);
  assert.match(js, /\/api\/lead-capture/);
  assert.doesNotMatch(js, /lead-capture\.php/);
  assert.match(js, /Preencha todos os campos para calcular seu potencial de ganho/);
});

test('substitui abreviações do simulador por ícones e atualiza a métrica de redução', async () => {
  const [html, css] = await Promise.all([read('index.html'), read('styles.css')]);

  for (const icon of ['icon-store', 'icon-receipt', 'icon-card', 'icon-pie-chart', 'icon-eye', 'icon-coins', 'icon-trend', 'icon-clock', 'icon-chart', 'icon-wallet']) {
    assert.match(html, new RegExp(`id="${icon}"`));
  }

  assert.doesNotMatch(html, /class="metric-icon"/);
  assert.doesNotMatch(html, /<span class="(?:field-icon|result-icon)" aria-hidden="true">[LCT%VPRGI$]<\/span>/);
  assert.match(html, /class="metric-label">Redução de<\/span>\s*<h3>69,6%<\/h3>/);
  assert.doesNotMatch(html, /-69,6%/);
  assert.match(css, /\.metric-label\s*\{[^}]*color:\s*var\(--green\)/s);
  assert.match(css, /\.field-icon,\s*\.result-icon\s*\{[^}]*stroke:\s*currentColor/s);
});

test('o endpoint local de leads responde pela rota Vercel', async () => {
  const port = 45000 + Math.floor(Math.random() * 1000);
  const cwd = new URL('../', import.meta.url);

  const server = spawn(process.execPath, ['scripts/serve.mjs'], {
    cwd,
    env: { ...process.env, PORT: String(port) },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('servidor local não iniciou a tempo')), 7000);
    server.stdout.on('data', (chunk) => {
      if (String(chunk).includes(`http://127.0.0.1:${port}`)) {
        clearTimeout(timer);
        resolve();
      }
    });
    server.once('error', reject);
    server.once('exit', (code) => {
      if (code !== null) reject(new Error(`servidor local encerrou com código ${code}`));
    });
  });

  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/lead-capture`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lead: {
          nome: 'Lead Teste',
          empresa: 'Empresa Teste',
          whatsapp: '+55 61 99999-9999',
          email: 'lead@example.com',
        },
        simulation: {
          quantidadeDeLojas: 12,
          receitaExtraMensal: 222720,
          roiAnual: 1137.3333333333333,
        },
      }),
    });

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true, storage: 'local-dev' });
  } finally {
    server.kill();
  }
});

test('o build e as APIs usam somente o fluxo Vercel', async () => {
  const [build, api, exportApi, gitignore, packageJson, readme, deployGuide] = await Promise.all([
    read('scripts/build.mjs'),
    read('api/lead-capture.js'),
    read('api/leads-export.js'),
    read('.gitignore'),
    read('package.json'),
    read('README.md'),
    read('DEPLOY_VERCEL.md'),
  ]);

  assert.doesNotMatch(build, /lead-capture\.php/);
  assert.doesNotMatch(build, /storage/);
  assert.match(api, /@vercel\/blob/);
  assert.match(api, /roi-leads\//);
  assert.match(exportApi, /ROI_LEADS_TOKEN/);
  assert.match(exportApi, /format.*csv/s);
  assert.match(exportApi, /format.*json/s);
  assert.match(exportApi, /text\/html/);
  assert.match(exportApi, /roi-leads\//);
  assert.match(packageJson, /"@vercel\/blob"/);
  assert.doesNotMatch(gitignore, /storage\/\*\.jsonl/);
  assert.match(readme, /deploy na Vercel/i);
  assert.match(deployGuide, /Deploy — Vercel/);
});

test('mantém proteção contra métricas comerciais sem fonte da referência', async () => {
  const html = await read('index.html');

  assert.doesNotMatch(html, /\+\s*551\s*mil/i);
  assert.doesNotMatch(html, /\+\s*620\s*mil/i);
  assert.doesNotMatch(html, /\+\s*9\s*milhões/i);
  assert.doesNotMatch(html, /\+\s*10\s*milhões/i);
  assert.doesNotMatch(html, /\+\s*4444\b/i);
  assert.doesNotMatch(html, /\+\s*5000\b/i);
  assert.doesNotMatch(html, /Dado fictício até Gabriel enviar os insights/i);
  assert.match(html, /\+22 mil/);
  assert.match(html, /Momentos da experiência auditados em loja/);
  assert.match(html, /Redução de/);
  assert.match(html, /69,6%/);
  assert.match(html, /Redução de uma falha crítica após acompanhamento/);
  assert.match(html, /\+3 mil/);
  assert.match(html, /Oportunidades identificadas antes de virarem problemas maiores/);
});

test('a identidade troca o laranja da referência por verde sem introduzir laranja no CSS', async () => {
  const css = (await read('styles.css')).toUpperCase();

  assert.match(css, /#25D670/);
  assert.match(css, /#000000/);
  assert.match(css, /#FFFFFF/);
  assert.doesNotMatch(css, /#FF5E15/);
  assert.doesNotMatch(css, /#FF6A00/);
  assert.doesNotMatch(css, /ORANGE/i);
});

test('a página continua semântica e responsiva', async () => {
  const [html, css] = await Promise.all([read('index.html'), read('styles.css')]);

  assert.match(html, /<header[\s>]/);
  assert.match(html, /<main[\s>]/);
  assert.match(html, /<footer[\s>]/);
  assert.match(html, /aria-label="Navegação principal"/);
  assert.match(html, /<details/);
  assert.match(css, /@media\s*\(max-width:\s*720px\)/);
  assert.match(css, /:focus-visible/);
});

test('usa assets próprios e não imagens da referência', async () => {
  const html = await read('index.html');

  for (const asset of [
    'public/assets/logo-observe-plus-light.png',
    'public/assets/logo-observe-plus-dark.png',
    'public/assets/hero-score-tres-visoes-neon-observall.png',
    'public/assets/plataforma-relatorios-observall.png',
    'public/assets/insights-supermercado-observall.png',
    'public/assets/video-observall-youtube.jpg',
  ]) {
    assert.match(html, new RegExp(asset.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    await access(new URL(`../${asset}`, import.meta.url));
  }
});

test('exibe carrossel de clientes da Observall', async () => {
  const [html, css, js] = await Promise.all([read('index.html'), read('styles.css'), read('script.js')]);

  assert.match(html, /id="clientes"/);
  assert.match(html, /Empresas que decidiram enxergar <span>o que o cliente não dizia<\/span>/);
  assert.match(html, /aria-label="Logos de clientes"/);

  for (const logo of ['goldko', 'ultrabox', 'derela', 'bigbox', 'nativas', 'tecnotica', 'lojas-mel']) {
    assert.match(html, new RegExp(`public/assets/clients/${logo}\\.png`));
  }

  assert.match(css, /@keyframes\s+logo-marquee/);
  assert.match(js, /function moveClientCarousel/);
});

test('os depoimentos seguem o bloco alternado da referência', async () => {
  const [html, css] = await Promise.all([read('index.html'), read('styles.css')]);

  assert.match(html, /class="testimonials-section"/);
  assert.match(html, /Bruna Reges/);
  assert.match(html, /Marcus/);
  assert.match(html, /Márcia Matos/);
  assert.match(html, /class="testimonial-logo" src="public\/assets\/clients\/bigbox-ultrabox\.png" alt="BigBox e Ultrabox"/);
  assert.match(html, /class="testimonial-logo" src="public\/assets\/clients\/nativas\.png" alt="Nativas"/);
  assert.match(html, /class="testimonial-logo" src="public\/assets\/clients\/tecnotica\.png" alt="Tecnótica"/);
  assert.match(css, /\.testimonials-section\s*\{[^}]*grid-template-columns:\s*repeat\(3,\s*1fr\)/s);
  assert.match(css, /\.testimonial-card\.featured\s*\{[^}]*background:\s*#181a17/s);
  assert.match(css, /\.testimonial-logo\s*\{[^}]*border-radius:\s*50%/s);
});

test('todas as imagens referenciadas resolvem localmente', async () => {
  const html = await read('index.html');
  const sources = [...html.matchAll(/src="(public\/assets\/[^"]+)"/g)].map((match) => match[1]);

  assert.ok(sources.length >= 14);
  await Promise.all(sources.map((source) => access(new URL(`../${source}`, import.meta.url))));
});

test('o rodapé inclui redes sociais e WhatsApp flutuante', async () => {
  const [html, css] = await Promise.all([read('index.html'), read('styles.css')]);

  assert.match(html, /https:\/\/www\.instagram\.com\/observall/);
  assert.match(html, /https:\/\/www\.youtube\.com\/@Observall/);
  assert.match(html, /class="whatsapp-float"[\s\S]*?wa\.me\/5561999555580/);
  assert.match(html, /class="whatsapp-icon"/);
  assert.match(css, /\.whatsapp-float svg/);
});
