# Passo 2: Adicione três tags ao catálogo

**O que vamos praticar:** dar um exemplo de formato ao Copilot e limitar a edição para não duplicar os dados.

**O que você vai fazer:** adicionar `travel`, `outdoor` e `editorial` em `src/lib/mock-tag-data.ts`, mantendo as tags existentes. O resultado aparece no arquivo e nos testes; a tela do Upload ainda não muda.

| Neste passo | Referência rápida |
| --- | --- |
| Tempo e modo | 5 minutos · Agent, com edição delimitada |
| Único arquivo de implementação | `src/lib/mock-tag-data.ts` |
| Evidência principal | Diff do catálogo + contrato `tag-catalog.test.ts` aprovado |
| Ainda não muda | Campo de tags e interface do Upload |

## Teoria: exemplos ensinam o padrão; restrições preservam o sistema

"Adicione tags ao Upload" permite várias interpretações: mudar o placeholder, criar uma lista no componente ou editar o catálogo. Todas podem parecer atender ao pedido, mas só uma preserva a fonte de verdade existente.

Neste projeto, `PHOTO_TAGS` organiza os termos por categoria e `AVAILABLE_TAGS` deriva a lista usada pelos consumidores. Se você acrescentar termos apenas a uma segunda lista, futuras alterações nas categorias não chegarão a ela. **A invariável é a relação entre os dados, não apenas a presença das três palavras.**

O fluxo já está expresso nesta linha do starter, que deve continuar derivando o catálogo:

```ts
export const AVAILABLE_TAGS = Object.values(PHOTO_TAGS).flat().sort();
```

| Termo novo | Categoria usada neste roteiro | O que conferir no diff |
| --- | --- | --- |
| `travel` | `SUBJECT` | Os assuntos anteriores permanecem |
| `outdoor` | `LOCATION` | Os locais anteriores permanecem |
| `editorial` | `STYLE` | Os estilos anteriores permanecem |

> [!IMPORTANT]
> Ordenar não é remover duplicatas. A derivação existente usa `sort()`, mas os termos de `PHOTO_TAGS` também precisam continuar únicos, em minúsculas e sem espaços extras.

Zero-shot é um pedido sem exemplo; one-shot fornece um exemplo; few-shot fornece vários. Um exemplo real, como `EVENT: ["wedding", "professional"]`, mostra formato e organização. Ele não especifica sozinho onde novos termos pertencem, nem proíbe duplicatas. Por isso, combine **objetivo + exemplo + invariantes + verificação**. Não é necessário executar três versões do pedido.

### Escolher um modelo é administrar o custo da decisão

Engenharia de prompt organiza o pedido. Engenharia de contexto escolhe as informações que o sustentam. **Engenharia de modelos**, neste curso, significa escolher e usar um modelo de acordo com tarefa, qualidade necessária, latência, custo e disponibilidade; não treinamento ou fine-tuning.

| Decisão | Critério neste passo |
| --- | --- |
| Trabalhar em Ask, Plan ou Agent | A alteração já está delimitada; Agent pode editar e testar |
| Usar um modelo rápido ou de maior capacidade | O diff é pequeno e os critérios são claros; comece com uma opção rápida disponível |
| Trocar de modelo após um erro | Primeiro confira se faltou contexto, se o requisito era ambíguo ou se houve erro de implementação |

Um modelo mais capaz não sabe uma regra que você omitiu. Para estado, eventos e acessibilidade nos próximos passos, maior capacidade pode ajudar a relacionar restrições; ainda assim, a verificação continua obrigatória. Seleção automática ou a única opção permitida pela organização são válidas. Não há modelo comercial obrigatório nem benchmark.

## Atividade: delegue uma alteração com limites claros (5 minutos)

1. Continue na branch `improve-upload`. Abra `src/lib/mock-tag-data.ts` e `tests/mock-tag-data.test.ts`. Neste roteiro, use `travel` em `SUBJECT`, `outdoor` em `LOCATION` e `editorial` em `STYLE`. São categorias existentes; não crie uma estrutura nova.
1. Em Agent, anexe os dois arquivos com `#` ou **Add Context**. No seletor de modelos, escolha uma opção rápida disponível, ou mantenha Auto se oferecido. Envie:

   ```text
   Em src/lib/mock-tag-data.ts, acrescente travel a SUBJECT, outdoor
   a LOCATION e editorial a STYLE dentro de PHOTO_TAGS.
   Siga o padrão EVENT: ["wedding", "professional"].
   Preserve os termos existentes e a derivação ordenada de AVAILABLE_TAGS,
   sem duplicatas, espaços extras ou maiúsculas.
   Limite a edição ao catálogo. Execute o teste de dados e explique
   como o diff preserva a fonte de verdade. Não altere tests/solution.
   ```

1. **Revise a estratégia, não só as palavras adicionadas.** Uma lista `AVAILABLE_TAGS` reescrita manualmente pode conter todos os termos e ainda ser a solução errada. Confirme a derivação, a preservação dos termos antigos e a ausência de mudanças de interface.
1. Execute as duas camadas de testes:

   ```bash
   node scripts/validate-step.mjs 2
   npm test -- --run tests/mock-tag-data.test.ts
   npm run test:solution -- tests/solution/tag-catalog.test.ts
   ```

   O teste do starter confere ordenação e duplicatas, mas não exige os três termos novos. O contrato de solução confere também a expansão e a derivação. Portanto, `npm test` verde, sozinho, não comprova esta entrega.
1. Publique somente o catálogo:

   ```bash
   git add src/lib/mock-tag-data.ts
   git commit -m "Expand photo tag catalog"
   git push
   ```

## Resultado esperado

**Entrega:** um commit que altera `src/lib/mock-tag-data.ts`. No diff, as três palavras novas estão nas categorias; a linha que deriva `AVAILABLE_TAGS` continua usando `PHOTO_TAGS`. Mudar apenas o placeholder do Upload não atende à atividade.

### Para passar neste passo

1. O teste de dados e `npm run test:solution -- tests/solution/tag-catalog.test.ts` devem terminar sem falhas.
1. Faça commit e push do catálogo. O **Passo 2** também executa os testes do projeto, lint e build e confere que `tests/solution/` não mudou.
1. Aguarde **Passo 2 aprovado** na issue e a publicação da lição 3.

O contrato exige os termos, a preservação das tags e a derivação ordenada, sem duplicatas ou termos mal formatados. Ele não fixa a categoria de cada termo nem avalia o modelo escolhido. O exemplo ensinou o formato; as restrições preservaram os dados. Consulte a [seleção de modelos no VS Code](https://code.visualstudio.com/docs/agent-customization/language-models) para opções atuais.

<details>
<summary>Está com problemas? 🤷</summary><br/>

- **O check falhou:** leia o teste indicado em Actions e corrija os dados, não o contrato. Neste passo, os outros contratos de solução ainda podem falhar porque a interface não foi implementada.
- **Falta uma tag no catálogo:** adicione o termo a uma categoria de `PHOTO_TAGS`. Não substitua `AVAILABLE_TAGS` por uma lista paralela.
- **`npm run test:solution` falha por completo:** é esperado antes das próximas entregas. Execute o contrato deste passo.
- **O modelo sugerido não está disponível:** escolha outro adequado a uma edição pequena. Nenhum nome ou multiplicador específico é obrigatório.
- **O push não iniciou a verificação:** confira se publicou `src/lib/mock-tag-data.ts` na branch `improve-upload` e se **Actions > Passo 2** está habilitado.

</details>
