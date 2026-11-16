# Passo 3: Planeje e construa as sugestões

Agora conecte o catálogo ao campo de tags. Planeje antes de editar para que a mudança permaneça pequena e verificável.

Continue na branch `improve-upload`.

## Teoria: contexto focado e planejamento

Contexto focado não significa enviar o menor número possível de arquivos: forneça as fontes que determinam o comportamento. Instructions descrevem convenções duráveis; código, estilos e testes mostram o estado atual; o pedido descreve os requisitos desta tarefa. Não crie PRDs, diagramas ou ADRs quando os arquivos existentes bastam.

### Ponte: de anexar arquivos a fazer context engineering

Engenharia de contexto é escolher fontes, regras, histórico e evidências que ajudam a decidir, não apenas escrever um prompt melhor.

| Camada | Fonte neste projeto | Decisão que sustenta |
| --- | --- | --- |
| Convenções duráveis | `.github/copilot-instructions.md` | Onde colocar componentes e o que não alterar |
| Estado atual | Página Upload e catálogo | Onde integrar e de onde vêm as sugestões |
| Restrições verificáveis | Estilos e contrato em `tests/solution/` | Aparência e comportamentos que precisam ser preservados |
| Histórico relevante | Plano aprovado nesta conversa | O que implementar sem rediscutir ou ampliar o escopo |

Use `#` para selecionar fontes conhecidas. Quando não souber onde algo está, peça uma busca no projeto; `#codebase`, se disponível, solicita recuperação de código relevante, **não anexa o repositório inteiro**. Confira os resultados antes de usá-los como requisito. Essa recuperação ajuda a fazer grounding; não elimina a necessidade de revisão.

Uma aplicação do step-back prompting é esclarecer primeiro o objetivo, as restrições e os critérios de aceite. Em seguida, decomponha o trabalho em alterações revisáveis. Peça plano e justificativas concisas, não raciocínio privado. Confira se as recomendações citam evidências reais.

**React/App Router:** a página pode continuar sendo um componente de servidor. Estado de digitação e eventos ficam em um componente cliente com `"use client"`; também é válido importá-lo por um wrapper cliente pequeno. Um componente controlado recebe `value` e `onChange` do componente que mantém o estado.

## Atividade: aprove um plano e implemente (12 minutos)

1. Inicie uma conversa em Plan para esta feature, sem carregar tentativas antigas ou assuntos não relacionados. Use `#` ou **Add Context** para anexar `src/app/upload/page.tsx`, `src/lib/mock-tag-data.ts`, `src/app/globals.css`, `tests/solution/tag-autocomplete.test.tsx` e `.github/copilot-instructions.md`. As instructions já são contexto compartilhado; anexá-las aqui facilita conferir as regras.
2. No seletor, escolha um modelo disponível apropriado para planejar e implementar uma mudança de interface. Não precisa comparar modelos.
3. Envie:

   ```text
   Investigue as fontes anexadas e planeje sugestões para o campo de tags
   do Upload. Use AVAILABLE_TAGS e mantenha o layout atual.
   O componente deve ser controlado: availableTags: readonly string[],
   label: string, value: string, onChange: (value: string) => void.
   Exporte TagAutocomplete por nome em
   src/components/upload/TagAutocomplete.tsx. Integre diretamente ou por
   um wrapper cliente pequeno em src/components/upload/.
   Filtre o prefixo do último token separado por vírgula, sem diferenciar
   maiúsculas; preserve tokens anteriores e não sugira tags já escolhidas.
   Inicialmente a lista fica fechada e só abre para token não vazio com
   resultados. Selecionar por clique atualiza o valor e fecha a lista.
   Preserve name="tags" e use label, combobox, listbox e option com
   aria-expanded e aria-controls. Cite as fontes, arquivos a alterar,
   riscos e testes. Não implemente ainda.
   ```

4. Confira o plano contra as fontes e instructions. Ele deve manter o escopo nas tags, preservar a página de servidor sempre que possível e propor um componente cliente controlado. Se inventar uma API ou persistência, corrija o plano antes de aprová-lo.
5. Passe para Agent com o plano aprovado e peça a implementação de filtro e clique, sem alterar `tests/solution/` ou ampliar o escopo. Mantenha a conversa desta feature; se usar outra sessão, leve o plano, as fontes e os critérios, não o histórico inteiro. Revise as mudanças antes de aceitá-las.
6. No preview `/upload`, confira os resultados:

   | Entrada no campo | Resultado esperado |
   | --- | --- |
   | `w` | Sugestões `wedding` e `wildlife` |
   | `portrait, wi` e seleção de `wildlife` | Valor `portrait, wildlife`; lista fechada |

7. Execute:

   ```bash
   node scripts/validate-step.mjs 3
   npm run test:solution -- tests/solution/tag-autocomplete.test.tsx -t "filters|click|already selected|integrates"
   ```

8. Publique os arquivos de implementação. Inclua também um eventual wrapper cliente:

   ```bash
   git add src/app/upload/page.tsx src/components/upload
   git commit -m "Add tag suggestions to upload"
   git push
   ```

## Resultado esperado

O Upload usa sugestões reais do catálogo. O contrato verifica filtro, clique, tags já escolhidas e integração por comportamento; não é necessário que a página importe diretamente um componente com nome específico. Lint e build também são conferidos pelo workflow.

**A ponte na entrega:** o plano deve ligar cada mudança a uma fonte ou requisito. Isso aplica documentação AI-first de forma proporcional: instructions, código e testes já fornecem contexto útil, sem produzir documentos só para preencher um gate.

<details>
<summary>Está com problemas? 🤷</summary><br/>

- **O teste não encontra `TagAutocomplete`:** exporte o componente por nome em `src/components/upload/TagAutocomplete.tsx`, com as props do prompt de planejamento: `availableTags`, `label`, `value` e `onChange`.
- **O componente passa, mas o Upload falha:** um wrapper cliente pequeno é válido. Mantenha `name="tags"` e uma label acessível, sem labels aninhadas.
- **Vírgulas ou duplicatas falham:** filtre apenas o último token e compare as tags anteriores ignorando caixa e espaços.
- **O clique não seleciona:** o blur pode estar fechando a lista antes da seleção. Investigue a ordem dos eventos de foco.
- **O Copilot alterou arquivos demais:** rejeite apenas a proposta indesejada e reformule com os arquivos permitidos e os critérios de aceite.
- **O build local falha com `Operation not permitted` do Turbopack:** em ambiente restrito, confirme a compilação com `npm run build -- --webpack`, sem alterar a configuração. O Actions executa o build padrão.

Não edite o teste para contornar a falha.

</details>
