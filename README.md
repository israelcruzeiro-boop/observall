# Observall — novo site institucional

Landing page estática, responsiva e preparada para hospedagem compartilhada na HostGator.

## Comandos

```powershell
npm.cmd test
npm.cmd run build
npm.cmd run dev
```

O build final é criado em `dist/`. Para publicar via cPanel, envie **o conteúdo** de `dist/` para a pasta `public_html` do domínio de destino.

## Estrutura

- `index.html`: conteúdo e semântica.
- `styles.css`: sistema visual Observall.
- `script.js`: menu, animações, FAQ e calculadora de ROI.
- `public/assets/`: imagens próprias recuperadas do site atual.
- `test/`: testes de contrato da landing page.
- `scripts/`: build e servidor local sem dependências externas.
