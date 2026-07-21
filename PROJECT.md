# Projeto Observall

## Objetivo

Apresentar a Observall como uma solução de diagnóstico para operações: Auditor Profissional, Cliente Real e Operação Interna se cruzam em um único Score da Loja, usado para priorizar riscos e planos de ação.

## Produto

- Público: gestores de varejo, restaurantes, hotelaria e operações correlatas.
- Conversão principal: conversa comercial via WhatsApp e captura de lead na calculadora de ROI.
- Paleta: `#25D670`, `#000000`, `#FFFFFF`.
- A calculadora é uma simulação ilustrativa; não representa garantia comercial.
- O Score não publica fórmula, pesos ou disponibilidade operacional sem confirmação do produto.

## Arquitetura

A interface é uma landing estática em `index.html`, `styles.css` e `script.js`. O build gera `dist/` a partir dessas fontes e de `public/assets/`. Há funções serverless em `api/` para capturar leads e exportá-los; quando configuradas no ambiente de hospedagem, usam Vercel Blob privado e o segredo server-side `ROI_LEADS_TOKEN`.

O desenho técnico derivado do código está em `ARCHITECTURE.md`.

## Estado de entrega

- A alteração editorial do Score foi validada localmente em 2026-07-17.
- Produção, DNS e credenciais não foram acessados nem alterados.
- O artefato `dist/` foi regenerado localmente; publicação exige `@CRED` e confirmação explícita.

## Lacunas

- Aprovação visual e editorial do responsável pela Observall.
- Fórmula, pesos e disponibilidade pública do Score, se vierem a ser divulgados.
- Configuração confirmada do Blob Store privado e de `ROI_LEADS_TOKEN` no ambiente de hospedagem.
- Smoke pós-publicação e confirmação de SSL, somente após autorização de deploy.
