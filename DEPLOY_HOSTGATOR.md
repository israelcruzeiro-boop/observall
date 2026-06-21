# Deploy — HostGator e Registro.br

## Antes do corte

1. Aprovar visual e conteúdo.
2. Executar `npm.cmd run check`.
3. Fazer backup completo do site atual.
4. Confirmar no painel HostGator o diretório do domínio e os nameservers ou IP realmente atribuídos à conta.
5. Registrar a configuração DNS atual para rollback.

## Publicação na HostGator

1. Gerar `dist/` com `npm.cmd run build`.
2. No Gerenciador de Arquivos do cPanel, abrir o diretório web do domínio (normalmente `public_html`, mas confirmar no painel).
3. Enviar **o conteúdo interno** de `dist/`, mantendo `index.html`, `styles.css`, `script.js` e a pasta `public/assets/` exatamente na estrutura gerada.
4. Validar o site por URL temporária, subdomínio ou alteração controlada do arquivo hosts, se disponível.
5. Ativar/confirmar SSL antes do tráfego definitivo.

## DNS no Registro.br

Há duas rotas válidas; escolher apenas depois de ler os valores exibidos na conta HostGator:

- Delegar o DNS pelos nameservers fornecidos pela HostGator; ou
- Manter a zona no Registro.br e apontar os registros web para o destino informado pela HostGator.

Não usar valores genéricos ou adivinhados. A troca de DNS exige confirmação explícita, credenciais e janela de rollback.

## Pós-deploy

- Testar HTTPS, versão com e sem `www`, imagens, menu mobile, FAQ, calculadora e todos os CTAs de WhatsApp.
- Verificar metadados, favicon e ausência de conteúdo misto.
- Manter o backup anterior até a homologação final.
