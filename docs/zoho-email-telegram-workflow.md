# Zoho Email To Telegram Workflow

## Status

- Workflow criado no n8n: `E-mail Carlos - Aviso Telegram`
- Workflow ID: `RA3JTFLzEEX28G0L`
- Status atual: inativo
- Motivo: aguardando credencial IMAP do Zoho ser cadastrada/anexada no n8n.

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

## Como ativar

1. Entrar no n8n.
2. Criar uma credencial IMAP para o Zoho com os dados acima.
3. Abrir o workflow `E-mail Carlos - Aviso Telegram`.
4. Anexar a credencial IMAP no no `Zoho IMAP - Novos Emails`.
5. Executar teste com um e-mail enviado para `contato@aguiarfilgueiras.com.br`.
6. Confirmar se o Telegram do Carlos recebeu a notificacao correta.
7. So entao ativar o workflow.

## Evolucao Futura

Uma segunda etapa pode adicionar botoes no Telegram:

- Responder com sugestao.
- Encaminhar.
- Arquivar.
- Excluir.

Essas acoes devem exigir confirmacao humana. O fluxo nao deve tomar decisoes irreversiveis sozinho.
