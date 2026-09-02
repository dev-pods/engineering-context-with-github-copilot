## Passo 2: Compare pouco, excesso e contexto suficiente

Context engineering é o trabalho de selecionar, organizar e manter as informações que permitem ao modelo resolver uma tarefa. Mais contexto não é automaticamente melhor: conteúdo irrelevante consome atenção, aumenta custo e pode ampliar o escopo da resposta.

### 📖 Teoria: duas falhas opostas

- **Contexto insuficiente** obriga o modelo a adivinhar ou fazer perguntas adicionais.
- **Contexto excessivo** mistura assuntos, aumenta a busca e incentiva mudanças desnecessárias.
- **Contexto mínimo suficiente** fornece objetivo, fontes, restrições, exemplos e validação na medida da tarefa.

Neste passo, você repetirá a mesma tarefa de planejamento três vezes. Não aceite edições de código.

### ⌨️ Atividade: execute o experimento controlado

1. Em uma conversa já usada para outro assunto, sem anexar arquivos, envie:

   ```text
   Deixe o campo de tags do upload mais inteligente com autocomplete.
   Não edite arquivos. Apenas explique o que faria.
   ```

1. Abra `workshop/context-experiment.md` no editor. Registre arquivos consultados, perguntas adicionais, créditos ou requests e problemas na seção **Execução A**.

1. Continue na mesma conversa e anexe arquivos relevantes e irrelevantes, por exemplo:

   - `src/app/upload/page.tsx`
   - `src/components/upload/UploadZone.tsx`
   - `src/app/page.tsx`
   - `src/app/layout.tsx`
   - `README.md`

   Envie:

   ```text
   Melhore o autocomplete de tags do upload. Use os arquivos anexados como contexto,
   preserve a aplicação e explique um plano. Não edite arquivos.
   ```

1. Registre os resultados na **Execução B**. Observe tokens/créditos, arquivos realmente usados e alterações fora do objetivo.

1. Inicie uma conversa nova. Anexe apenas `src/app/upload/page.tsx` e `src/lib/mock-tag-data.ts`. Envie:

   ```text
   Planeje um autocomplete para o campo de tags da página Upload.

   Critérios:
   - ao digitar "w", sugerir "wedding" e "wildlife";
   - usar a lista de tags existente;
   - preservar valores separados por vírgula;
   - não alterar outras áreas da aplicação;
   - considerar teclado e semântica de combobox.

   Liste fontes consultadas, arquivos a alterar, riscos e validações. Não edite arquivos.
   ```

1. Registre a **Execução C**, escolha a abordagem mais previsível e explique a evidência da escolha.

1. Com pelo menos duas respostas ainda acessíveis, abra a paleta de comandos e execute **Copilot Chat Debug: Focus on Copilot Chat Debug View**. Compare o que estiver disponível em cada requisição:

   - prompt e system instructions;
   - arquivos ou trechos incluídos como contexto;
   - modelo e metadados de uso.

   Registre em `workshop/context-experiment.md` uma diferença observável. Não copie system prompts ou conteúdo interno completo: anote apenas categorias, fontes e metadados relevantes ao experimento.

1. Remova todos os campos `[PREENCHA]`, altere o status para `CONCLUIDO`, faça commit e push:

   ```bash
   git add workshop/context-experiment.md
   git commit -m "docs: comparar estratégias de contexto"
   git push
   ```

### ✅ Resultado esperado

As três execuções usam a mesma intenção, mas diferem deliberadamente no contexto. A conclusão cita pelo menos uma evidência da resposta e uma evidência do Chat Debug.

> [!TIP]
> Exportar ou compartilhar a conversa é opcional. Caminhos relativos deste exercício podem permanecer, mas remova nomes de usuário, caminhos locais, repositórios privados, código proprietário, e-mails, tokens, segredos e metadados que identifiquem pessoas ou ambientes. Não faça commit do chat exportado.

<details>
<summary>Está com problemas?</summary><br/>

- Créditos e detalhes de uso podem aparecer ao passar o cursor sobre uma resposta. Se sua interface não os mostrar, registre `não disponível` e compare turnos, arquivos e escopo.
- Se a opção de Chat Debug não existir, registre `não disponível` e use a lista de referências exibida na própria resposta como evidência alternativa.
- Não busque respostas idênticas. Compare previsibilidade, evidência e esforço necessário para chegar a uma proposta útil.
- Se o Copilot editar arquivos, reverta apenas essas mudanças antes de continuar; este passo é exclusivamente analítico.

</details>
