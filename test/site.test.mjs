import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (file) => readFile(new URL(`../${file}`, import.meta.url), 'utf8');

test('a landing page preserva a proposta comercial da Observall', async () => {
  const html = await read('index.html');

  assert.match(html, /Cliente Oculto para[\s\S]*vender mais/i);
  assert.match(html, /Correção rápida/i);
  assert.match(html, /Relatórios em tempo real/i);
  assert.match(html, /Quem é a[\s\S]*Observall/i);
  assert.match(html, /Segmentos atendidos/i);
  assert.match(html, /Como funciona/i);
  assert.match(html, /Dashboard de Cliente Oculto/i);
  assert.match(html, /NPS com IA/i);
  assert.match(html, /Resultados esperados/i);
  assert.match(html, /Dúvidas frequentes/i);
  assert.match(html, /wa\.me\/5561993715292/);
});

test('a identidade usa exclusivamente a paleta principal definida', async () => {
  const css = (await read('styles.css')).toUpperCase();

  assert.match(css, /#25D670/);
  assert.match(css, /#000000/);
  assert.match(css, /#FFFFFF/);
  assert.doesNotMatch(css, /#FF5E15/);
});

test('a página oferece estrutura semântica e responsiva', async () => {
  const [html, css] = await Promise.all([read('index.html'), read('styles.css')]);

  assert.match(html, /<header[\s>]/);
  assert.match(html, /<main[\s>]/);
  assert.match(html, /<footer[\s>]/);
  assert.match(html, /aria-label="Navegação principal"/);
  assert.match(html, /<details/);
  assert.match(html, /id="sobre"/);
  assert.match(html, /id="segmentos"/);
  assert.match(css, /@media\s*\(max-width:\s*760px\)/);
  assert.match(css, /:focus-visible/);
});

test('não incorpora marca ou URLs da referência de terceiros', async () => {
  const source = `${await read('index.html')}\n${await read('styles.css')}\n${await read('script.js')}`;

  assert.doesNotMatch(source, /seuclienteoculto/i);
  assert.doesNotMatch(source, /Seu Cliente Oculto/);
  assert.doesNotMatch(source, /se destacar da concorrência/i);
  assert.doesNotMatch(source, /Conheça todos os resultados/i);
  assert.doesNotMatch(source, /Mídia e parceiros/i);
});

test('não exibe métricas comerciais sem fonte no conteúdo da Observall', async () => {
  const html = await read('index.html');

  assert.doesNotMatch(html, /\+\s*12\s*mil/i);
  assert.doesNotMatch(html, /\+\s*180\s*mil/i);
  assert.doesNotMatch(html, /\+\s*450\b/i);
  assert.doesNotMatch(html, /Avaliadores treinados/i);
  assert.doesNotMatch(html, /Interações avaliadas/i);
  assert.doesNotMatch(html, /Projetos e ciclos realizados/i);
});

test('a calculadora de ROI possui os campos e o comportamento-base', async () => {
  const [html, js] = await Promise.all([read('index.html'), read('script.js')]);

  for (const id of ['stores', 'customers', 'currentRate', 'futureRate', 'ticket', 'investment']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.match(js, /function calculateROI/);
  assert.match(js, /extraRevenue/);
  assert.match(js, /payback/);
});

test('usa a identidade visual fornecida e exibe carrossel de clientes', async () => {
  const [html, css, js] = await Promise.all([read('index.html'), read('styles.css'), read('script.js')]);

  assert.match(html, /public\/assets\/logo-observall\.png/);
  assert.match(html, /id="clientes"/);
  assert.match(html, /aria-label="Logos de clientes"/);
  assert.ok(html.indexOf('id="clientes"') < html.indexOf('id="depoimentos"'));

  for (const logo of ['goldko', 'ultrabox', 'derela', 'bigbox', 'nativas', 'tecnotica', 'lojas-mel']) {
    assert.match(html, new RegExp(`public/assets/clients/${logo}\\.png`));
  }

  assert.match(css, /@keyframes\s+logo-marquee/);
  assert.match(css, /\.client-logo/);
  assert.match(js, /function moveClientCarousel/);
});

test('aproxima a sequÃªncia visual da referÃªncia sem trocar o header preto', async () => {
  const [html, css] = await Promise.all([read('index.html'), read('styles.css')]);

  const heroIndex = html.indexOf('class="hero"');
  const proofIndex = html.indexOf('class="proof-strip"');
  const clientsIndex = html.indexOf('id="clientes"');
  const testimonialsIndex = html.indexOf('id="depoimentos"');
  const aboutIndex = html.indexOf('id="sobre"');
  const partnersIndex = html.indexOf('id="segmentos"');
  const faqIndex = html.indexOf('id="faq"');

  assert.ok(heroIndex < proofIndex);
  assert.ok(proofIndex < clientsIndex);
  assert.ok(clientsIndex < testimonialsIndex);
  assert.ok(testimonialsIndex < aboutIndex);
  assert.ok(aboutIndex < partnersIndex);
  assert.ok(partnersIndex < faqIndex);

  assert.match(css, /\.site-header\s*\{[^}]*background:\s*var\(--black\)/s);
  assert.match(css, /\.faq-section\s*\{[^}]*background:\s*var\(--black\)/s);
  assert.match(css, /\.proof-title/s);
  assert.match(css, /\.about-section/s);
  assert.match(css, /\.partners-section/s);
});

test('todas as imagens resolvem ao abrir index.html diretamente por file://', async () => {
  const html = await read('index.html');
  const sources = [...html.matchAll(/src="(public\/assets\/[^"]+)"/g)].map((match) => match[1]);

  assert.ok(sources.length >= 18);
  await Promise.all(sources.map((source) => access(new URL(`../${source}`, import.meta.url))));
});

test('tipografia acompanha a escala da referência e assets transparentes não recebem cartões opacos', async () => {
  const css = await read('styles.css');

  assert.match(css, /h1\s*\{[^}]*font-size:\s*clamp\(2\.4rem,\s*3\.15vw,\s*2\.8rem\)/s);
  assert.match(css, /h2\s*\{[^}]*font-size:\s*clamp\(2rem,\s*3\.4vw,\s*2\.7rem\)/s);
  assert.match(css, /\.hero-image-shell\s*\{[^}]*background:\s*transparent/s);
  assert.match(css, /\.client-carousel-shell\s*\{[^}]*background:\s*transparent/s);
  assert.match(css, /\.client-logo\s*\{[^}]*background:\s*transparent/s);
});

test('as composições principais usam PNG com canal alfa', async () => {
  for (const asset of ['public/assets/hero-observall.png', 'public/assets/dashboard-observall.png']) {
    const png = await readFile(new URL(`../${asset}`, import.meta.url));
    const colorType = png[25];

    assert.ok(
      colorType === 4 || colorType === 6,
      `${asset} precisa preservar transparência alfa; color type atual: ${colorType}`,
    );
  }
});

test('o hero mantém a arte principal compacta e o conteúdo alinhado ao topo', async () => {
  const css = await read('styles.css');

  assert.match(css, /\.hero-grid\s*\{[^}]*align-items:\s*start/s);
  assert.match(css, /\.hero-image-shell\s*\{[^}]*width:\s*min\(100%,\s*400px\)/s);
  assert.match(css, /\.hero-visual\s*\{[^}]*min-height:\s*460px/s);
  assert.match(css, /@media\s*\(max-width:\s*760px\)[\s\S]*?\.hero-visual\s*\{[^}]*display:\s*none/s);
  assert.match(css, /@media\s*\(max-width:\s*760px\)[\s\S]*?\.hero-visual\s*\{[^}]*min-height:\s*0/s);
});

test('as demais imagens de conteúdo usam escala mais compacta', async () => {
  const css = await read('styles.css');

  assert.match(css, /\.feature-media\s*\{[^}]*width:\s*min\(88%,\s*500px\)/s);
  assert.match(css, /\.dashboard-stage img\s*\{[^}]*max-height:\s*480px/s);
  assert.match(css, /\.process-card img\s*\{[^}]*aspect-ratio:\s*4\s*\/\s*3/s);
  assert.match(css, /\.benefit-image\s*\{[^}]*height:\s*170px/s);
  assert.match(css, /\.results-story > img\s*\{[^}]*max-height:\s*360px/s);
});

test('a seção do dashboard começa próxima ao título e usa arte compacta', async () => {
  const css = await read('styles.css');

  assert.match(css, /\.platform-section\s*\{[^}]*padding:\s*42px\s+0\s+78px/s);
  assert.match(css, /\.platform-grid\s*\{[^}]*align-items:\s*start/s);
  assert.match(css, /\.dashboard-stage\s*\{[^}]*padding:\s*0/s);
  assert.match(css, /\.dashboard-stage img\s*\{[^}]*max-height:\s*480px/s);
});

test('os títulos destacam palavras-chave com contraste da identidade Observall', async () => {
  const [html, css] = await Promise.all([read('index.html'), read('styles.css')]);

  assert.ok((html.match(/class="title-accent"/g) || []).length >= 8);
  assert.ok((html.match(/class="title-accent-light"/g) || []).length >= 3);
  assert.match(css, /\.title-accent\s*\{[^}]*color:\s*var\(--green\)/s);
  assert.match(css, /\.title-accent-light\s*\{[^}]*color:\s*var\(--white\)/s);
});

test('os depoimentos seguem o padrão alternado da referência com logos dos clientes', async () => {
  const [html, css] = await Promise.all([read('index.html'), read('styles.css')]);

  for (const logo of ['bigbox', 'nativas', 'tecnotica']) {
    assert.match(html, new RegExp(`testimonial-logo[^>]*>[\\s\\S]*?clients/${logo}\\.png`));
  }

  assert.match(css, /\.testimonial-card:nth-child\(odd\)\s*\{[^}]*background:\s*var\(--green\)/s);
  assert.match(css, /\.testimonial-card:nth-child\(2\)\s*\{[^}]*background:\s*var\(--black\)/s);
  assert.match(css, /\.testimonial-logo\s*\{[^}]*border-radius:\s*50%/s);
});

test('o rodapé inclui redes sociais e o WhatsApp flutuante solicitado', async () => {
  const [html, css] = await Promise.all([read('index.html'), read('styles.css')]);

  assert.match(html, /https:\/\/www\.instagram\.com\/observall/);
  assert.match(html, /https:\/\/www\.youtube\.com\/@Observall/);
  assert.match(html, /class="whatsapp-float"[\s\S]*?wa\.me\/5561999555580/);
  assert.match(html, /class="whatsapp-icon"/);
  assert.match(css, /\.whatsapp-float svg/);
});
