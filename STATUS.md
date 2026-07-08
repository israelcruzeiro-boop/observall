# Status

**Fase:** REFORMA VISUAL LOCAL / aguardando aprovação editorial
**Atualizado em:** 2026-07-08

## Estado geral

- [x] Site anterior da Observall congelado em `docs/snapshots/2026-06-22-site-atual/`.
- [x] Referência `seuclienteoculto.com.br` auditada por áreas no navegador.
- [x] Landing refeita do zero em versão menor, seguindo a ordem visual da referência: header, hero, números/insights, valor, soluções, plataforma, clientes, depoimentos, sobre, calculadora e FAQ.
- [x] Logo transparente do usuário salvo em `public/assets/logo-observall-transparente.png` e aplicado no header/rodapé.
- [x] Cores adaptadas: laranja da referência substituído por verde Observall.
- [x] Títulos com palavra de destaque em verde preservados como padrão visual.
- [x] Duas novas imagens geradas para as áreas de insights/crescimento e relatórios em tempo real.
- [x] Imagens anexadas pelo usuário aplicadas no hero, na área "Transforme a experiência..." e na área "Acesse relatórios em tempo real...".
- [x] Logos circulares aplicados nos depoimentos de BigBox/Ultrabox, Nativas e Tecnótica.
- [x] Chamada da área de clientes ajustada para "Eles já confiam em nós".
- [x] Métricas reais dos insights aplicadas: +22 mil itens auditados, -69,6% em falhas de item-chave e +3 mil oportunidades.
- [x] Vídeo informado pelo usuário reproduzido dentro da área "Quem é a Observall?" quando servido por HTTP/HTTPS, com transição local de `file://` para o servidor de desenvolvimento na mesma aba.
- [x] Calculadora de ROI atualizada conforme mockups e PDF: campos por cupons/ticket/margem/visitas, modal de lead antes do resultado e tela de payback/ROI anual.
- [x] Ajuste visual da calculadora revisado: escala desktop ampliada, painel direito sem duplicação de estados e modal de lead em duas colunas conforme mockup.
- [x] Modal de lead compactado para viewport real do Chrome e rota de exportação `/api/leads-export` adicionada para Vercel Blob.
- [x] Captura de leads preparada para Vercel: `api/lead-capture.js` grava em Vercel Blob privado quando o Blob Store estiver conectado.
- [x] Exportação de leads ajustada para abrir tabela HTML no navegador, com CSV e JSON como opções.
- [x] `npm.cmd run check` verde e `dist/` gerado.
- [x] Smoke responsivo local em desktop/mobile sem overflow horizontal.
- [ ] Aprovação visual e editorial do usuário.
- [ ] Merge do PR no GitHub para disparar deploy de produção na Vercel.
- [ ] Conectar Blob Store privado e `ROI_LEADS_TOKEN` na Vercel.
- [ ] Smoke pós-deploy e confirmação de SSL.

## Ambiente web

**Progresso:** versão local pronta; `dist/` gerado.  
**Validação:** 18/18 testes; build PASS; smoke desktop via inspeção de layout da calculadora; imagens 1672x941 carregam no hero, valor e plataforma; logos circulares carregam nos depoimentos; métricas reais dos insights renderizam; calculadora de ROI captura lead local e exibe resultado esperado do exemplo; exportação de leads protegida por token preparada para Vercel Blob.
**Produção:** não alterada.

## Próximo passo

Revisar visualmente a versão local e preparar deploy mediante confirmação explícita.
