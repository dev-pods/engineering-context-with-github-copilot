# Passo 5: Automatize testes com um prompt reutilizável

Os contratos fornecidos verificam comportamentos conhecidos. Agora crie testes próprios para proteger casos de borda que tenham valor para esta interface.

Continue na branch `improve-upload`.

## Teoria: teste comportamento observável

Um prompt file versionado torna uma tarefa recorrente reutilizável. Instructions definem convenções amplas; o prompt inicia uma tarefa específica; uma skill pode ser útil para um fluxo maior com referências e scripts. Para gerar testes neste projeto, um prompt é suficiente.

### Ponte: de usar `/explain` a criar `/test-tags`

O nome `test-tags.prompt.md` origina `/test-tags` nas sessões que suportam prompt files. O comando carrega instruções da tarefa; `agent: agent` escolhe o agente, não o modelo. Os links no corpo apontam para as fontes e as ferramentas executam o trabalho. O slash command não é um comando de terminal nem aprovação automática das ações.

> **Compatibilidade:** [prompt files executam como comandos em sessões Local](https://code.visualstudio.com/docs/agent-customization/prompt-files), hoje legadas. Em sessões Copilot, a alternativa reutilizável é uma skill, como no curso anterior. Para manter este exercício e seus gates, não migre formatos agora: se Local não estiver disponível, anexe o arquivo e peça a execução do seu conteúdo. Isso não registra um slash command nessa sessão.

Teste resultados que a pessoa usuária observa: sugestões exibidas, valor selecionado, lista fechada ou foco mantido. Um teste que apenas importa o componente não protege esse comportamento. Copilot pode escrever o teste, mas você decide se a asserção verifica o requisito.

## Atividade: crie um prompt e dois testes (8 minutos)

1. Crie `.github/prompts/test-tags.prompt.md`:

   ```markdown
   ---
   description: Gerar testes de regressão do autocomplete de tags
   agent: agent
   ---
   Examine [TagAutocomplete](../../src/components/upload/TagAutocomplete.tsx)
   e o [setup de testes](../../tests/setup.ts). Use Vitest, React Testing
   Library e userEvent. Crie testes
   em tests/tag-autocomplete.test.tsx, com lista local e wrapper controlado.
   Não copie nem altere tests/solution. Teste comportamento observável.
   Inclua ao menos dois casos de borda com asserções de resultado. Execute
   os testes e corrija defeitos reais.
   ```

2. Acrescente ao prompt pelo menos dois casos e resultados esperados. Por exemplo: prefixo em maiúsculas deve encontrar a mesma sugestão; espaços depois da vírgula não devem impedir a busca. Outras opções: token sem resultados ou token vazio.
3. Salve e, em uma sessão Local com Agent, digite `/` e selecione `/test-tags`. Se o recurso não estiver disponível, anexe o prompt e o componente usando `#` ou **Add Context** e peça: “Execute as instruções do prompt anexado para gerar os testes”. Não instale extensões ou crie outra personalização para contornar a ausência.
4. Revise se cada teste simula uma interação e verifica um resultado observável. Se houver tempo, altere temporariamente uma asserção para confirmar que o teste falha; restaure somente essa edição antes de publicar.
5. Execute:

   ```bash
   node scripts/validate-step.mjs 5
   npm test -- --run tests/tag-autocomplete.test.tsx
   npm run test:learner
   npm run test:solution
   ```

6. Publique o prompt, os testes e qualquer correção necessária:

   ```bash
   git add .github/prompts/test-tags.prompt.md tests/tag-autocomplete.test.tsx
   git add src/app/upload/page.tsx src/components/upload
   git commit -m "Add reusable tag regression tests"
   git push
   ```

## Resultado esperado

Você criou um prompt reutilizável e pelo menos dois testes próprios aprovados. O workflow verifica a presença e execução dos testes; a relevância das asserções continua sendo sua responsabilidade na revisão.

**A ponte na entrega:** transformar o pedido em um arquivo permite reutilizar tarefa, contexto e limites. Encontrar `/test-tags` no menu comprova descoberta, não qualidade; o que valida o resultado é executar e revisar os testes gerados.

<details>
<summary>Está com problemas? 🤷</summary><br/>

- **Os testes não executam:** siga `tests/setup.ts`, use `@/` para imports e não instale outro runner.
- **O gate não reconhece seus testes:** entregue pelo menos dois testes aprovados em `tests/tag-autocomplete.test.tsx`, sem `skip` ou `todo`. Confira com `npm run test:learner`.
- **`/test-tags` não aparece:** confirme que salvou `.github/prompts/test-tags.prompt.md`. [Prompt files viram comandos](https://code.visualstudio.com/docs/agent-customization/prompt-files) nas sessões que os suportam. Se não aparecer, anexe o prompt e o componente e peça para executar as instruções. Mantenha o arquivo e os testes exigidos pelo gate.
- **Você precisa desfazer a asserção alterada temporariamente:** restaure apenas essa linha. Não use `git restore` nem reverta arquivos inteiros, para não perder os testes gerados.
- **Um contrato foi alterado sem querer:** confira com `git diff origin/main -- tests/solution/` e desfaça apenas a alteração indevida.

</details>
