# Observall — novo site institucional

Landing page estática, responsiva e preparada para deploy na Vercel.

## Comandos

```powershell
npm.cmd test
npm.cmd run build
npm.cmd run dev
```

O build final é criado em `dist/`. O deploy da Vercel usa `vercel.json`, roda `npm run build` e publica `dist/`.

## Estrutura

- `index.html`: conteúdo e semântica.
- `styles.css`: sistema visual Observall.
- `script.js`: menu, animações, FAQ e calculadora de ROI.
- `public/assets/`: imagens próprias recuperadas do site atual.
- `api/`: funções serverless da Vercel para captura/exportação de leads.
- `test/`: testes de contrato da landing page.
- `scripts/`: build e servidor local sem dependências externas.
