## Passo 4: Trate prompt engineering como experimento

Prompt engineering não é procurar uma frase mágica. É tornar objetivo, contexto, restrições, exemplos, formato e Definition of Done observáveis, comparar resultados e preservar a melhor versão como um ativo reutilizável.

### 📖 Teoria: técnicas com propósitos diferentes

- **No-shot** mede o que o modelo faz apenas com a instrução.
- **One-shot ou few-shot** reduz ambiguidade por meio de exemplos de entrada e saída.
- **Step-back** pede primeiro princípios gerais relevantes, que depois orientam o prompt específico.
- **Retrieval** encontra evidências externas ou internas. Ele pode usar busca, Spaces ou MCP, mas não é sinônimo desses mecanismos.

### ⌨️ Atividade: compare e refine o prompt

1. Em conversas novas, execute três versões sem permitir edições:

   **No-shot**

   ```text
   Planeje um autocomplete para as tags da página Upload.
   ```

   **Com exemplo**

   ```text
   Planeje um autocomplete para as tags da página Upload.
   Exemplo: entrada "w" deve mostrar "wedding" e "wildlife".
   Preserve tags separadas por vírgula. Não edite arquivos.
   ```

   **Step-back e contexto**

   ```text
   Antes de planejar, resuma os princípios verificáveis de um combobox acessível,
   incluindo teclado, foco e semântica. Em seguida, aplique esses princípios ao
   context packet anexado. Liste arquivos, riscos, critérios e comandos. Não edite.
   ```

1. Anexe `workshop/context-packet.md` somente à terceira versão. Pontue as três respostas em `workshop/prompt-rubric.md`.

1. Abra `.github/prompts/tag-autocomplete.prompt.md` no editor. Substitua os dois campos `[PREENCHA]` usando as evidências vencedoras. Preserve o foco único e o frontmatter.

1. Inicie uma conversa nova e execute o prompt pelo menu `/` ou pelo botão de execução do editor. Salve a resposta em `workshop/implementation-plan.md`.

1. Revise o plano. Quando fontes, arquivos, acessibilidade, riscos e validações estiverem claros, altere:

   ```text
   Plano aprovado para comparação de modelos: SIM
   ```

1. Marque a rubrica e o plano como `CONCLUIDO`, remova todos os campos `[PREENCHA]`, faça commit e push:

   ```bash
   git add .github/prompts/tag-autocomplete.prompt.md workshop/prompt-rubric.md workshop/implementation-plan.md
   git commit -m "docs: criar prompt verificável de autocomplete"
   git push
   ```

### ✅ Resultado esperado

A rubrica permite explicar por que uma versão venceu, o prompt file possui uma finalidade única e o plano aprovado referencia fontes, riscos e comandos verificáveis.

<details>
<summary>Está com problemas?</summary><br/>

- Prompt files de workspace ficam em `.github/prompts` e usam a extensão `.prompt.md`.
- Se o prompt não aparecer em `/`, use **Chat: Run Prompt** na paleta de comandos ou abra o arquivo e selecione o botão de execução.
- Confirme que `chat.promptFiles` está habilitado nas configurações do VS Code quando a instalação oferecer essa opção.
- O maior texto não precisa vencer. Escolha a versão que produz o plano correto com menos ambiguidade e trabalho adicional.

</details>
