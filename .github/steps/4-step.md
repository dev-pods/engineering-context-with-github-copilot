# Passo 4: Refine a acessibilidade pelo teclado

O filtro e a seleção por clique estão prontos. Agora permita concluir o mesmo fluxo sem mouse.

Continue na branch `improve-upload`.

## Teoria: itere a partir do comportamento observado

Uma boa iteração identifica o comportamento que falta, descreve o resultado esperado e limita a correção. Em um autocomplete, foco, opção ativa e estado anunciado por ARIA devem permanecer sincronizados. A presença de atributos ARIA, sozinha, não comprova acessibilidade.

### Ponte: resultados de ferramentas também são contexto

O erro de um teste é uma evidência nova para o próximo pedido. Anexar o erro observado é mais útil do que dizer apenas “não funciona”. O ciclo é: **executar → observar → fornecer contexto → corrigir → executar novamente**.

Antes de trocar de modelo, confira se ele recebeu o erro e o comportamento esperado. Se o problema persistir mesmo com contexto suficiente, considere um modelo de maior capacidade disponível. Trocar de modelo não corrige requisitos ausentes nem garante acerto.

## Atividade: implemente e confira o teclado (10 minutos)

1. Execute o contrato completo e observe quais interações faltam:

   ```bash
   npm run test:solution
   ```

2. Em Agent, anexe o componente, um eventual wrapper cliente e `tests/solution/tag-autocomplete.test.tsx` com `#` ou **Add Context**. Se houve falha, selecione a saída relevante no terminal e anexe-a pelo menu; use a referência de seleção de terminal oferecida em `#`, quando disponível. Como alternativa, cole somente o erro necessário, sem dados sensíveis. Escolha um modelo adequado e envie:

   ```text
   Use as fontes e, se presente, o erro anexado para completar a interação
   de teclado sem regredir filtro e clique.
   ArrowDown/ArrowUp navegam pelas opções; Enter seleciona a opção ativa
   sem submeter o formulário; Escape fecha sem mudar o texto; Tab sai
   normalmente e fecha a lista. Mantenha foco no input, atualize
   aria-activedescendant e aria-selected coerentemente e nunca aponte
   para um ID ausente. Preserve tags anteriores, name="tags" e a label.
   Não altere os testes de aceitação. Execute-os e corrija a causa real.
   ```

3. Revise o diff e confira no preview:

   | Ação | Resultado esperado |
   | --- | --- |
   | `portrait, wi`, `ArrowDown`, `Enter` | `portrait, wildlife`, sem enviar o formulário |
   | `ArrowUp` | Opção anterior fica ativa |
   | `Escape` | Lista fecha sem alterar o texto |
   | `Tab` | Foco sai do campo e a lista fecha |

   Confira também foco visível e que `aria-activedescendant` referencia uma opção existente.

4. Execute:

   ```bash
   node scripts/validate-step.mjs 4
   npm run test:solution
   ```

5. Se houve alteração, publique a mudança. Se o teclado já estava completo e todos os checks passaram, não faça commit artificial: use **Actions > Passo 4 > Run workflow**, selecionando `improve-upload`, em vez destes comandos.

   ```bash
   git add src/app/upload/page.tsx src/components/upload
   git commit -m "Support accessible tag keyboard navigation"
   git push
   ```

## Resultado esperado

O contrato completo passa e a interação funciona com teclado. O workflow também verifica lint e build, inclusive quando iniciado manualmente.

**A ponte na entrega:** confira a execução da ferramenta — comando, saída e resultado — em vez de aceitar apenas “os testes passaram” no texto do Chat. Rodar `npm test` pelo terminal é uso de ferramenta; não exige nem comprova uso de MCP.

<details>
<summary>Está com problemas? 🤷</summary><br/>

- **O check falhou:** anexe a mensagem do teste ao pedido e solicite a menor correção necessária. Não remova asserções nem altere os contratos protegidos.
- **Teclado ou ARIA falha:** mantenha o foco no input, use IDs reais para a opção ativa e sincronize o estado anunciado. Enter deve selecionar sem enviar o formulário.
- **O teclado já funcionava desde o passo 3:** não crie mudanças artificiais. Use **Actions > Passo 4 > Run workflow** na branch `improve-upload`.

</details>
