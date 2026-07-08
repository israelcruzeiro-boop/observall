# Deploy — Vercel

## Antes de publicar

1. Executar `npm.cmd run check`.
2. Confirmar que o projeto Vercel está conectado ao repositório GitHub `israelcruzeiro-boop/observall`.
3. Confirmar que `vercel.json` usa `buildCommand: npm run build` e `outputDirectory: dist`.
4. Criar/conectar um Blob Store privado ao projeto para persistir leads.
5. Criar a variável de ambiente `ROI_LEADS_TOKEN` na Vercel.

## Publicação

- Push em branch de PR cria Deploy Preview.
- Merge em `main` publica produção, se o projeto Vercel estiver conectado à branch principal.

## Leads

Os leads são capturados por `api/lead-capture.js` e gravados no Vercel Blob quando o Blob Store estiver conectado ao projeto.

Exportação protegida:

- JSON: `https://observall.com.br/api/leads-export?token=SEU_TOKEN`
- CSV: `https://observall.com.br/api/leads-export?format=csv&token=SEU_TOKEN`

`SEU_TOKEN` é o valor da variável de ambiente `ROI_LEADS_TOKEN`.

## Pós-deploy

- Testar HTTPS em `https://observall.com.br`.
- Testar menu mobile, FAQ, calculadora ROI e CTAs de WhatsApp.
- Fazer uma simulação de ROI e confirmar exportação em CSV.
