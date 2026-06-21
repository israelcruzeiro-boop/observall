# Log

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
