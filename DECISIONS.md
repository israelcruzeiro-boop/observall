# Decisões

## ADR-001 — Site estático para HostGator

**Status:** Aceito  
**Data:** 2026-06-19

### Decisão

Usar HTML, CSS e JavaScript sem framework ou backend.

### Motivo

O escopo é institucional e precisa funcionar com baixo risco em hospedagem compartilhada. A solução reduz dependências, custo operacional e complexidade de deploy.

### Trade-offs

- Conteúdo editorial exige alteração em arquivo e novo upload.
- Não há CMS nesta fase.
- Integrações futuras que exigirem segredo deverão usar backend separado.

## ADR-002 — Adaptação inspirada, não clone literal

**Status:** Aceito  
**Data:** 2026-06-19

### Decisão

Replicar hierarquia, ritmo, composição e qualidade percebida da referência, mas usar apenas conteúdo, identidade e assets próprios da Observall.

### Motivo

A referência é um site comercial de terceiro. Esta abordagem atende ao objetivo visual sem copiar logo, textos, personagem, cores ou arquivos proprietários.
