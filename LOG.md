# Log

## 2026-06-22 — Reprodução do vídeo dentro do site

- A capa do vídeo agora funciona como gatilho para carregar o player do YouTube no mesmo espaço da página.
- Adicionado `video.js`, separado do `script.js` preservado da calculadora.
- Em visualização por `file://`, o clique muda a mesma aba para o servidor local e solicita reprodução automática; em HTTP/HTTPS, o player abre imediatamente dentro da seção.
- O build foi atualizado para incluir `video.js` em `dist/`.

## 2026-06-22 — Correção do vídeo para abertura local

- Removido o iframe do YouTube que apresentava `Erro 153` quando o site era aberto por `file://`.
- Adicionada capa local do vídeo em `public/assets/video-observall-youtube.jpg`, com play central e link direto para o vídeo no YouTube.
- A área agora funciona tanto na visualização local quanto após publicação, sem exibir erro de configuração do player.

## 2026-06-22 — Restauração do título da área de insights

- Restaurado o título `Transforme a experiência do cliente em crescimento real com nossos insights de Cliente Oculto` na primeira área após os indicadores.
- Mantido o novo título principal do hero: `Cliente Oculto para supermercados que querem vender mais.`.

## 2026-06-22 — Ajuste do título principal do hero

- Título principal do hero revisado de `Observall para supermercados que querem vender mais com Cliente Oculto.` para `Cliente Oculto para supermercados que querem vender mais.`.
- Objetivo: deixar a primeira promessa mais curta, natural e forte, sem perder foco em supermercados e Cliente Oculto.

## 2026-06-22 — Ajustes de título, vídeo, logo transparente e imagens geradas

- Melhorado o título da primeira área pós-insights para `Transforme cada visita em crescimento real`, mantendo o destaque verde no trecho principal.
- Gerados e aplicados dois novos assets próprios para as áreas enviadas nos prints: `public/assets/insights-supermercado-observall.png` e `public/assets/plataforma-relatorios-observall.png`.
- Logo transparente enviada pelo usuário salva como `public/assets/logo-observall-transparente.png` e aplicada no header/rodapé, sem recorte por `object-fit: cover`.
- Área de vídeo substituída por embed real do YouTube: `https://www.youtube.com/embed/yuGAr_NQis8`.
- Calculadora de ROI preservada; `script.js` segue idêntico ao snapshot congelado.
- Validação: `npm.cmd run check` PASS, 15/15 testes, build PASS; smoke local desktop/mobile sem overflow horizontal, com imagem de insights, plataforma e iframe validados.
- Produção, DNS e credenciais não foram acessados.

## 2026-06-22 — Reconstrução menor e mais fiel à referência

- Corrigido o rumo após feedback do usuário: a intenção era reconstruir do zero, área por área, com máxima fidelidade visual à referência, não apenas criar uma variação inspirada.
- Mantido o congelamento do site anterior em `docs/snapshots/2026-06-22-site-atual/` como fonte de conteúdo e recuperação.
- Auditadas áreas da referência em sequência: header, hero, métricas, bloco de valor, soluções, plataforma, clientes/prova social, depoimentos, sobre e FAQ.
- Refeita a landing em versão menor e mais próxima da referência, substituindo laranja por verde Observall e mantendo títulos com palavra destacada.
- Novo logo recebido pelo usuário salvo em `public/assets/logo-observall-novo.png` e aplicado no header/rodapé.
- A calculadora de ROI foi preservada: mesmos campos/ids e `script.js` idêntico ao snapshot.
- A seção de mídia/parceiros da referência não foi copiada por falta de prova equivalente da Observall; em seu lugar, foi mantida prova social com logos de clientes já existentes.
- Validação: `npm.cmd run check` PASS, 14/14 testes, build PASS e smoke responsivo sem overflow horizontal.
- Produção, DNS e credenciais não foram acessados.

## 2026-06-22 — Reforma visual fiel por área com foco em supermercados

- Congelado o estado anterior do site em `docs/snapshots/2026-06-22-site-atual/`, incluindo `index.html`, `styles.css`, `script.js`, `public/assets/` e captura do topo.
- Auditada a referência `https://seuclienteoculto.com.br/` em navegador local para mapear ordem, ritmo visual, header branco, hero colorido, métricas, soluções, plataforma, cases, promessa/segurança e FAQ.
- Reestruturada a landing da Observall com conteúdo próprio: hero para supermercados, insights provisórios com dados fictícios, soluções, dashboard, processo, clientes, promessa/segurança, ROI, depoimentos, sobre, foco em supermercados, FAQ e CTA.
- Adicionados os assets `public/assets/hero-supermercado-observall.png` e `public/assets/auditoria-supermercado-observall.png`, gerados para uso próprio no segmento de supermercados.
- Mantido `script.js` igual ao snapshot para preservar o comportamento da calculadora de ROI.
- Atualizados testes para proteger a nova estrutura, impedir cópia de marca/textos/URLs da referência e validar os novos assets.
- Validação final: `npm.cmd run check` PASS, build PASS, smoke desktop/mobile em `127.0.0.1:4173` sem overflow horizontal.
- Produção, DNS e credenciais não foram acessados.

## 2026-06-19 — Fundação do novo site

- Validado Codex Agent Kit: 32 wrappers Codex, 32 Claude e 3 skills coerentes.
- Selecionado `@D LayoutReplicator` como executor visual principal.
- Auditados `observall.com.br` e a referência indicada pelo usuário em leitura pública.
- Classificação: `ADAPTAÇÃO_INSPIRADA`, preservando marca e conteúdo Observall.
- Recuperados logo, hero, dashboard e quatro imagens de processo do site atual.
- Implementada landing page estática com navegação, hero, soluções, plataforma, processo, benefícios, NPS, ROI, depoimentos, planos, FAQ, CTA e rodapé.
- Corrigido mapeamento local de `/assets` encontrado no primeiro smoke.
- Produção e DNS não foram alterados.

## 2026-06-19 — Integração da biblioteca visual

- Inventariados 19 arquivos em `Imagens/`.
- Substituído o logo do cabeçalho/rodapé pela versão transparente fornecida.
- Integradas três imagens temáticas nos benefícios com tratamento monocromático.
- Integrada a imagem “Padrão de Excelência” na seção de resultados.
- Criado carrossel contínuo com GoldKo, Ultrabox, Derela, Big Box, Nativas Grill, Tecnótica e Lojas Mel.
- Adicionados controles anterior/próximo e pausa temporária ao interagir.
- Smoke desktop/mobile: 14 cards no loop, sete marcas únicas, zero imagens quebradas e zero erros de console.

## 2026-06-19 — Correção dos caminhos de imagens

- Reproduzido o erro ao abrir `index.html` diretamente por `file://`.
- Causa: HTML apontava para `assets/`, enquanto os arquivos estavam em `public/assets/`.
- Corrigidas as 18 referências de imagem para `public/assets/`.
- Build ajustado para gerar `dist/public/assets/`, mantendo o mesmo contrato local e na HostGator.
- Criado teste de regressão que valida fisicamente cada caminho de imagem.
- Smoke: logo 1536 px, benefícios 1536 px e logos de clientes 500/611 px; zero imagens quebradas.

## 2026-06-19 — Ajuste de tipografia e transparência

- H1 desktop ajustado para 40,3 px e H2 para 43,2 px, acompanhando a escala medida na referência.
- Escala mobile ajustada para H1 de 39 px e H2 de 31,2 px.
- Removidos fundos, bordas e sombras artificiais do hero e do carrossel de clientes.
- Logos com canal alfa agora aparecem diretamente sobre o fundo da página, sem cartões brancos.
- Fotografias sem canal alfa foram preservadas sem remoção destrutiva do fundo.
- Validação final: 8/8 testes, build PASS e zero overflow em 1280 px e 390 px.

## 2026-06-19 — Substituição das composições transparentes

- `Observall-cliente-oculto.png` substituiu o asset do hero.
- `dashboard-observall-2.png` substituiu o asset da seção de dashboard.
- As duas imagens foram validadas em 611 × 736 px, formato ARGB com canal alfa.
- Adicionado teste de regressão que exige transparência alfa nos dois PNGs principais.
- Smoke visual confirmou o verde do hero e o preto da plataforma visíveis através das áreas transparentes.
- Validação final: 9/9 testes, build PASS e `dist/` atualizado.

## 2026-06-19 — Compactação do hero

- Arte principal reduzida de 520 px para 440 px no desktop.
- Texto e imagem alinhados pelo topo para eliminar o grande vazio acima do título.
- Altura mínima do hero reduzida de 710 px para 640 px.
- Em 1365 px, o título passou a iniciar próximo ao topo e o hero completo cabe na primeira tela.
- Em 390 px, a arte responde para aproximadamente 278 px sem overflow horizontal.
- Validação final: 10/10 testes, build PASS e `dist/` atualizado.

## 2026-06-19 — Redução global das imagens

- Arte do hero reduzida novamente, de 440 px para 400 px no desktop e 264 px no mobile validado.
- Imagem de apresentação limitada a 500 px e aproximadamente 278 px no mobile.
- Dashboard limitado a 560 px de altura.
- Imagens das etapas alteradas para proporção 4:3, com 210 px de altura no desktop.
- Imagens de benefícios reduzidas para 170 px e imagem de resultados limitada a 360 px.
- Cards de benefícios compactados para acompanhar a nova escala.
- Validação final: 11/11 testes, build PASS e zero overflow em 1365 px e 390 px.

## 2026-06-19 — Compactação da seção de dashboard

- Espaçamento superior preto reduzido de 110 px para 42 px no desktop.
- Dashboard reduzido de 560 px para 480 px de altura máxima.
- Removido o padding interno de 28 px ao redor da arte.
- Texto e imagem alinhados pelo topo da grade.
- Medição desktop: título inicia a 48 px do topo da seção.
- Mobile: arte em aproximadamente 362 × 436 px e zero overflow.
- Validação final: 12/12 testes, build PASS e `dist/` atualizado.

## 2026-06-19 — Nova auditoria visual da referência

- Reauditado `seuclienteoculto.com.br` diretamente no navegador.
- Confirmado o padrão de títulos com uma expressão curta em cor de destaque.
- Aplicados destaques verdes em fundos claros/pretos e brancos em fundos verdes.
- Depoimentos refeitos no padrão da referência: três painéis, logos em selos circulares, texto centralizado, divisor e autor.
- Paleta dos depoimentos adaptada para verde–preto–verde, mantendo os textos e clientes da Observall.
- Instagram e YouTube oficiais adicionados ao rodapé.
- WhatsApp flutuante atualizado para `+55 61 99955-5580`.
- Mobile: depoimentos em uma coluna de 362 px, rodapé em duas colunas e zero overflow.
- Validação final: 15/15 testes, build PASS e `dist/` atualizado.

## 2026-07-01 — Substituição das imagens principais

- `Observall - Imagem Hero Section.png` aplicado no hero.
- `Observall img001.png` aplicado na área "Transforme a experiência do cliente...".
- `Observall img002.png` aplicado na área "Acesse relatórios em tempo real...".
- Metadados `width`/`height` e textos alternativos atualizados para as novas imagens 1672 × 941.
- Enquadramento do hero ajustado para preservar a imagem panorâmica sem cortes laterais.
- Mobile: H1 e botões compactados e tarja decorativa da hero ocultada para evitar corte visual.
- Validação final: 16/16 testes, build PASS e smoke desktop/mobile via Chrome CDP sem overflow.

## 2026-07-01 — Logos circulares nos depoimentos

- Adicionado asset local `public/assets/clients/bigbox-ultrabox.png` a partir da imagem enviada para BigBox e Ultrabox.
- Depoimentos agora exibem logos circulares para BigBox/Ultrabox, Nativas e Tecnótica.
- CSS `.testimonial-logo` criado com círculo branco, `border-radius: 50%`, sombra e `object-fit: contain`.
- Teste de regressão atualizado para exigir os três logos e o formato circular.
- Validação final: 16/16 testes, build PASS e smoke desktop/mobile dos depoimentos sem overflow.
