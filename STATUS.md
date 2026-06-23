# Status

**Fase:** REFORMA VISUAL LOCAL / aguardando aprovação editorial
**Atualizado em:** 2026-06-22

## Estado geral

- [x] Site anterior da Observall congelado em `docs/snapshots/2026-06-22-site-atual/`.
- [x] Referência `seuclienteoculto.com.br` auditada por áreas no navegador.
- [x] Landing refeita do zero em versão menor, seguindo a ordem visual da referência: header, hero, números/insights, valor, soluções, plataforma, clientes, depoimentos, sobre, calculadora e FAQ.
- [x] Logo transparente do usuário salvo em `public/assets/logo-observall-transparente.png` e aplicado no header/rodapé.
- [x] Cores adaptadas: laranja da referência substituído por verde Observall.
- [x] Títulos com palavra de destaque em verde preservados como padrão visual.
- [x] Duas novas imagens geradas para as áreas de insights/crescimento e relatórios em tempo real.
- [x] Vídeo informado pelo usuário reproduzido dentro da área "Quem é a Observall?" quando servido por HTTP/HTTPS, com transição local de `file://` para o servidor de desenvolvimento na mesma aba.
- [x] Calculadora de ROI preservada com mesmos campos, ids e `script.js` idêntico ao snapshot.
- [x] `npm.cmd run check` verde e `dist/` gerado.
- [x] Smoke responsivo local em desktop/mobile sem overflow horizontal.
- [ ] Substituir métricas fictícias pelos dados reais do Gabriel.
- [ ] Aprovação visual e editorial do usuário.
- [ ] Deploy em HostGator.
- [ ] Corte de DNS no Registro.br.
- [ ] Smoke pós-deploy e confirmação de SSL.

## Ambiente web

**Progresso:** versão local pronta; `dist/` gerado.  
**Validação:** 16/16 testes; build PASS; smoke desktop/mobile PASS; player inline sem erro 153, logo transparente, novas imagens e calculadora renderizam; produção não acessada.
**Produção:** não alterada.

## Próximo passo

Revisar visualmente a versão local, substituir os dados fictícios da faixa de insights pelos números reais do Gabriel e só então preparar deploy mediante confirmação explícita.
