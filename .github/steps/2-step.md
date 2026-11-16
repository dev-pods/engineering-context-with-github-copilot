# Passo 2: Amplie o catálogo de tags

O campo do Upload ainda não usa o catálogo como sugestões. Primeiro, amplie os dados sem mudar a interface.

## Teoria: exemplos e escolha do modelo

Zero-shot é pedir uma tarefa sem exemplos; one-shot usa um exemplo; few-shot usa vários. Um exemplo da estrutura existente, junto de requisitos claros, costuma bastar para uma alteração pequena. Não é preciso repetir a tarefa em várias configurações.

### Ponte: prompt engineering e engenharia de modelos

**Engenharia de prompt** é especificar tarefa, exemplos e critérios. **Engenharia de modelos**, neste curso, é escolher e usar um modelo conforme complexidade, qualidade necessária, latência, custo e disponibilidade — não treinar ou fazer fine-tuning de um modelo.

| Decisão | O que muda |
| --- | --- |
| Ask, Plan ou Agent | O tipo de trabalho: investigar, planejar ou implementar com ferramentas |
| Modelo no seletor | O modelo que processa o pedido; não muda por si só as fontes ou permissões |
| Contexto com `#` | As fontes e ferramentas indicadas para a tarefa, independentemente do modelo |

Para acrescentar três tags, comece com um modelo rápido disponível. Nos passos 3 e 4 há mais regras interligadas; maior capacidade pode ser útil se houver dificuldade. A seleção automática, quando oferecida, também é válida. Não há nome ou multiplicador obrigatório, nem comparação de execuções.

## Atividade: entregue novos dados (5 minutos)

1. Continue na branch `improve-upload`. Abra `src/lib/mock-tag-data.ts` e `tests/mock-tag-data.test.ts`.
2. Em Agent, use `#` ou **Add Context** para anexar esses dois arquivos. Abra o seletor de modelos e confira as opções e informações de consumo/limites disponíveis antes de escolher. Se a política só oferecer uma opção, use-a. Envie:

   ```text
   Amplie PHOTO_TAGS com travel, outdoor e editorial, cada uma na categoria
   existente mais apropriada. Siga o formato atual; por exemplo, EVENT
   contém wedding e professional. Preserve as tags existentes, use termos
   minúsculos sem duplicatas e mantenha AVAILABLE_TAGS derivada e ordenada.
   Não altere a interface nem tests/solution. Rode o teste de dados e
   explique brevemente o diff.
   ```

   O trecho sobre `EVENT` é o exemplo one-shot; preservar e derivar as tags são restrições; executar o teste é a verificação. Você está ajustando o pedido e o modelo à tarefa, não tentando provar que uma combinação sempre vence outra.
3. Confira o diff: as novas tags devem estar nas categorias, sem uma lista paralela. Corrija qualquer remoção ou duplicação antes de aceitar.
4. Execute:

   ```bash
   node scripts/validate-step.mjs 2
   npm test -- --run tests/mock-tag-data.test.ts
   npm run test:solution -- tests/solution/tag-catalog.test.ts
   ```

5. Publique somente a entrega deste passo:

   ```bash
   git add src/lib/mock-tag-data.ts
   git commit -m "Expand photo tag catalog"
   git push
   ```

## Resultado esperado

O catálogo preserva as tags anteriores, inclui `travel`, `outdoor` e `editorial`, e continua ordenado e sem duplicatas. O workflow executa o contrato dos dados antes de publicar o passo 3.

**A ponte na entrega:** julgue se o modelo produziu a menor mudança correta e passou no contrato. Uma resposta rápida, longa ou confiante não é suficiente. Para consultar as opções atuais, veja [seleção de modelos no VS Code](https://code.visualstudio.com/docs/agent-customization/language-models).

<details>
<summary>Está com problemas? 🤷</summary><br/>

- **O check falhou:** leia o teste indicado em Actions e corrija os dados, não o contrato. Neste passo, os outros contratos de solução ainda podem falhar porque a interface não foi implementada.
- **Falta uma tag no catálogo:** adicione o termo a uma categoria de `PHOTO_TAGS`. Não substitua `AVAILABLE_TAGS` por uma lista paralela.
- **`npm run test:solution` falha por completo:** é esperado antes das próximas entregas. Execute o contrato deste passo.
- **O modelo sugerido não está disponível:** escolha outro adequado a uma edição pequena. Nenhum nome ou multiplicador específico é obrigatório.
- **O push não iniciou a verificação:** confira se publicou `src/lib/mock-tag-data.ts` na branch `improve-upload` e se **Actions > Passo 2** está habilitado.

</details>
