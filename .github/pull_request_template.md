## Objetivo

Descreva o problema resolvido e o comportamento implementado.

| Antes | Depois | Como reproduzir |
| --- | --- | --- |
| Descreva a limitação observada | Descreva a experiência entregue | Informe entrada, ação e resultado esperado |

> [!TIP]
> Descreva o efeito para quem usa o Upload, não apenas os arquivos alterados. Preencha os campos abaixo com evidências desta versão da PR.

## Verificações

- [ ] `npm test`
- [ ] `npm run test:solution`
- [ ] `npm run test:learner`
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] Verificação manual de filtro, teclado, Escape, foco e duplicatas
- [ ] Achados da revisão assistida conferidos no código e no preview

Registre o resultado real de cada comando. Marque um checkbox somente quando a verificação correspondente estiver concluída; não substitua um resultado por uma expectativa.

| Comando ou verificação | Resultado | Evidência ou observação |
| --- | --- | --- |
| `npm test` | Não executado | Informe o resumo da execução |
| `npm run test:solution` | Não executado | Informe o resumo dos contratos |
| `npm run test:learner` | Não executado | Informe quantos testes próprios executaram e passaram |
| `npm run lint` | Não executado | Informe sucesso ou diagnóstico |
| `npm run build` | Não executado | Informe sucesso ou erro; registre o comando exato se usou uma alternativa |
| Verificação manual | Não executada | Liste sequências observadas, incluindo clique, teclado e saída do campo |
| Revisão assistida | Não realizada | Registre achados confirmados, descartados ou ausência de achados |

Use resultados do commit final. Se algo não foi executado ou falhou, mantenha isso explícito e explique o motivo; não marque como aprovado.

## Decisões e limitações

Descreva decisões relevantes, limitações conhecidas e o que foi verificado manualmente. Não publique tokens nem conteúdo sensível de conversas. CI aprovada não substitui sua decisão de revisão.

| Tema | O que explicar |
| --- | --- |
| Arquitetura | Quem mantém o valor do campo e por que a fronteira cliente escolhida é adequada |
| Regressões | Como os testes próprios protegem riscos além dos contratos fornecidos |
| Limitações | O que não foi verificado, como uso com leitor de tela |

Consulte os [logs do GitHub Actions](https://docs.github.com/en/actions/how-tos/monitor-workflows/use-workflow-run-logs) para vincular uma falha ou execução à evidência correta.
