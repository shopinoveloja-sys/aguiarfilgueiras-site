# Zoho Email To Telegram Workflow

## Status

- Workflow criado no n8n: `E-mail Carlos - Aviso Telegram`
- Workflow ID: `RA3JTFLzEEX28G0L`
- Status atual: ativo
- Credencial IMAP Zoho anexada no n8n.
- Teste controlado executado em 2026-06-01: e-mail enviado para `contato@aguiarfilgueiras.com.br`, workflow disparou com sucesso na execucao `168`.

## Objetivo

Avisar Carlos no Telegram quando chegar um novo e-mail em `contato@aguiarfilgueiras.com.br`.

O primeiro fluxo e intencionalmente conservador:

- Notifica o Telegram.
- Resume o e-mail.
- Classifica prioridade basica.
- Nao responde automaticamente.
- Nao exclui e-mail.
- Nao encaminha e-mail.
- Nao marca como resolvido.

## Configuracao Zoho

IMAP:

- Host: `imappro.zoho.com`
- Porta: `993`
- SSL: ativo
- Usuario: `contato@aguiarfilgueiras.com.br`
- Senha: cadastrar diretamente na credencial do n8n. Nao registrar em arquivo.

SMTP, para uma etapa futura de resposta assistida:

- Host: `smtppro.zoho.com`
- Porta: `465`
- SSL: ativo
- Usuario: `contato@aguiarfilgueiras.com.br`
- Senha: cadastrar diretamente na credencial do n8n. Nao registrar em arquivo.

## Como validar

1. Enviar um e-mail simples para `contato@aguiarfilgueiras.com.br`.
2. Aguardar o ciclo do IMAP.
3. Confirmar se o Telegram do Carlos recebeu a notificacao.
4. No n8n, conferir execucoes do workflow `E-mail Carlos - Aviso Telegram`.

## Evolucao Futura

Uma segunda etapa pode adicionar botoes no Telegram:

- Responder com sugestao.
- Encaminhar.
- Arquivar.
- Excluir.

Essas acoes devem exigir confirmacao humana. O fluxo nao deve tomar decisoes irreversiveis sozinho.
