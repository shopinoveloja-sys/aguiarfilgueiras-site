# DriverCash - Logicas dos dados da plataforma

Este documento resume como cada bloco principal da plataforma calcula e exibe os dados, para facilitar conferencia funcional.

## 1. Resumo mensal

### Ganhos do mes
- Soma todas as transacoes de receita do mes atual.
- Nao depende da tela de metricas nem do veiculo ativo.

### Projecao do mes
- Usa o historico por dia da semana.
- Para os dias futuros do mes, projeta com base na media historica do mesmo dia da semana.
- Para os dias ja realizados, usa o valor real ja faturado.

### Lucro do mes
- Objetivo: mostrar o valor livre de obrigacoes.
- Formula pratica:
  - `receitas do mes`
  - menos `despesas pontuais ja lancadas`
  - menos `total reservado atual` das despesas futuras/recorrentes
- Despesas recorrentes quitadas pelo botao `Quitar` nao devem entrar novamente como despesa do dia.

### Lucro do dia
- Objetivo: refletir o caixa operacional do dia.
- Formula pratica:
  - `faturamento do dia`
  - menos `gastos reais do dia`
  - menos `reserva diaria de hoje`
- Quitacao de despesa recorrente paga com valor ja reservado nao entra novamente aqui.

### Indicador acima/abaixo da meta
- Compara `projecao do mes` com `meta do mes`.
- Se o resultado for positivo, fica verde.
- Se o resultado for negativo, fica vermelho.

## 2. Metas hoje

### Receita do dia
- Soma real das receitas lancadas no dia atual.

### Media
- Media historica do mesmo dia da semana.
- Exemplo: se hoje for quinta, usa a media de todas as quintas ja registradas.

### Recorde
- Maior valor historico do mesmo dia da semana.

## 3. Grafico de progresso mensal

O grafico mostra tres linhas:
- `Meta`: acumulado esperado do mes pela media historica por dia da semana.
- `Projecao`: acumulado real ate hoje + media projetada para os dias futuros.
- `Recorde`: melhor acumulado historico possivel por dia da semana.

## 4. Reserva diaria

### O que e
- Mostra quanto precisa ser separado por dia util para cobrir despesas recorrentes/futuras.

### Total reservado
- Soma quanto ja foi acumulado ate agora das despesas recorrentes/futuras ativas.
- Nao deve incluir valores futuros ainda nao reservados.

### Quando o usuario clica em `Quitar`
- A despesa deixa de pressionar o `Total reservado`.
- O valor nao deve ser relancado como despesa operacional do dia se ele ja foi provisionado antes.
- Em despesas de data especifica, a despesa pode ser encerrada/removida do ciclo.
- Em despesas recorrentes semanal/mensal, o ciclo reinicia para o proximo vencimento.

## 5. Despesas por categoria

### Visao dia
- Mostra despesas reais do dia.
- Despesas recorrentes quitadas com valor provisionado nao devem aparecer como gasto operacional duplicado do dia.

### Visao semana e mes
- Soma despesas do periodo.
- Despesas recorrentes aparecem pela recorrencia esperada no periodo.
- Exemplo: aluguel semanal de carro deve somar todos os vencimentos da semana/mes.

## 6. Receitas por fonte

- Agrupa receitas pela fonte/categoria.
- Permite fontes padrao como Uber, 99, InDrive, Particular e Outras.
- Quando `Outras` e usada, a descricao pode virar o nome real da fonte.

## 7. Saldo anterior

- Serve para registrar o caixa inicial antes de comecar a usar o app.
- Quando positivo, entra como receita de ajuste inicial.
- Quando negativo, entra como despesa de ajuste inicial.
- Nao aceita valor zero.

## 8. Lancamentos rapidos

### Ganhos
- Podem ser lancados por data, semanal ou mensal conforme o fluxo.

### Despesas
- Categorias principais:
  - Combustivel
  - Alimentacao
  - Manutencao
  - Outros

### Combustivel
- Agora registra:
  - veiculo em uso
  - tipo de combustivel
  - valor da unidade
  - valor total abastecido
  - KM no abastecimento
- A quantidade abastecida e calculada automaticamente:
  - `valor total / valor da unidade`

## 9. Veiculos

- O usuario pode cadastrar mais de um veiculo.
- Um veiculo fica marcado como `Em uso`.
- O veiculo em uso alimenta:
  - metricas de jornada
  - metricas de combustivel
  - manutencoes por KM

## 10. Metricas

## 10.1 Jornada operacional
- Registra por veiculo:
  - data
  - horario de inicio
  - horario de termino
  - KM inicial
  - KM final
- Pode salvar parcial no inicio do dia e completar depois.

## 10.2 Aviso no painel principal
- Se o dia atual nao tiver jornada completa registrada, aparece um aviso no dashboard.
- Quando a jornada e preenchida, o aviso sai.

## 10.3 Filtro por periodo
- `Hoje`, `Semana`, `Mes` usam a data selecionada na tela de metricas como referencia.
- Exemplo:
  - se a data selecionada for `13/05/2026`
  - `Hoje` mostra so esse dia
  - `Semana` mostra a semana dessa data
  - `Mes` mostra o mes dessa data

## 10.4 Indicadores operacionais

### Ganho por KM
- `receitas do periodo / km rodado no periodo`

### Ganho por hora
- `receitas do periodo / horas registradas no periodo`

### Combustivel por KM
- `gasto total com combustivel no periodo / km rodado no periodo`

### Lucro por KM
- `(receitas do periodo - despesas operacionais do periodo) / km rodado no periodo`

### KM percorridos
- Mostra quantos KM foram percorridos no periodo selecionado.

## 10.5 Consumo de combustivel

### Media real
- `km rodado / quantidade abastecida`

### Quantidade
- Soma da quantidade abastecida no periodo.

### Historico de abastecimento
- Exibe:
  - data
  - tipo de combustivel
  - valor da unidade
  - valor total
  - KM do abastecimento

## 11. Manutencoes

- Cada manutencao pode ser associada ao veiculo em uso.
- Dados minimos:
  - nome da manutencao
  - KM em que deve acontecer
- Pode usar modelos como:
  - Troca de oleo
  - Filtro de oleo
  - Filtro de ar
  - Pastilha de freio
  - Pneu
  - Alinhamento e balanceamento
  - Outra

### Alerta no painel principal
- Quando o KM atual do veiculo em uso atingir ou passar o KM da manutencao cadastrada, aparece alerta no dashboard.

### Acao `Feito`
- Marca a manutencao como tratada para aquele KM, evitando repeticao do alerta ate o proximo ciclo definido pelo usuario.

## 12. Observacoes importantes

### Sobre despesas recorrentes quitadas
- A quitacao nao deve distorcer o lucro do dia.
- O valor ja foi sendo provisionado dia a dia.
- Ao quitar, o esperado e baixar da reserva, nao duplicar como custo operacional diario.

### Sobre metricas e veiculo
- As metricas operacionais dependem do veiculo em uso e da jornada corretamente registrada.
- Se nao houver jornada completa, os indicadores podem ficar zerados ou parciais.

### Sobre combustivel
- Quanto mais fiel for o registro de:
  - tipo
  - valor por unidade
  - valor total
  - KM no abastecimento
mais preciso fica o consumo real do periodo.
