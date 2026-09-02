## Passo 3: Separe contexto estável, contexto da tarefa e fases

O experimento anterior trabalhou com arquivos e requisitos da tarefa. Projetos também possuem orientações estáveis, como arquitetura, comandos e limites. Misturar tudo em um único prompt gera repetição; esconder tudo em instructions pode tornar o contexto permanente e caro.

### 📖 Teoria: camadas e fases

1. **Instructions do repositório** contêm regras estáveis aplicáveis a muitas tarefas.
2. **Context packet** reúne somente o que esta tarefa precisa.
3. **Pesquisa, plano e implementação** são fases distintas. Em trabalhos maiores, uma conversa nova por fase reduz contexto antigo e decisões conflitantes.

Peça conclusões, premissas e evidências. Não peça o raciocínio privado passo a passo do modelo.

### ⌨️ Atividade: compare instructions e monte o pacote

1. Leia `.github/copilot-instructions.md` no editor. Identifique o que é estável e o que ainda precisa ser informado pela tarefa.

1. No terminal, desative temporariamente o arquivo sem fazer commit:

   ```bash
   mv .github/copilot-instructions.md .github/copilot-instructions.md.off
   ```

1. Em uma conversa nova, anexe `src/app/upload/page.tsx` e envie:

   ```text
   Proponha um plano de hardening para a experiência de tags da página Upload.
   Retorne: restrições reconhecidas, arquivos, acessibilidade, riscos e validação.
   Não edite arquivos.
   ```

1. Restaure as instructions e execute exatamente o mesmo prompt em outra conversa nova:

   ```bash
   mv .github/copilot-instructions.md.off .github/copilot-instructions.md
   test -f .github/copilot-instructions.md
   test ! -f .github/copilot-instructions.md.off
   ```

1. Compare as respostas em `workshop/instruction-comparison.md`. Em cada célula, registre o que a resposta priorizou ou omitiu: arquivos citados, restrições reconhecidas, comportamentos acessíveis, comandos propostos e trabalho fora do escopo.

1. Em uma nova conversa de pesquisa, envie:

   ```text
   Pesquise onde a lista e o campo de tags são definidos. Retorne apenas:
   1. fatos com referência de arquivo;
   2. premissas ainda não confirmadas;
   3. menor conjunto de arquivos necessário;
   4. critérios observáveis para validar o autocomplete.
   Não planeje nem implemente.
   ```

1. Use a pesquisa para preencher `workshop/context-packet.md`. O pacote deve ser suficiente para alguém planejar sem reler o repositório inteiro.

1. Remova os campos `[PREENCHA]`, marque os dois documentos como `CONCLUIDO`, faça commit e push:

   ```bash
   git add workshop/instruction-comparison.md workshop/context-packet.md
   git commit -m "docs: definir camadas de contexto"
   git push
   ```

### ✅ Resultado esperado

A comparação mostra o que pertence às orientações estáveis e o context packet contém apenas fontes, restrições e critérios que mudam a decisão desta tarefa.

<details>
<summary>Está com problemas?</summary><br/>

- Confirme que `.github/copilot-instructions.md` foi restaurado antes do commit com `git status`.
- Se o arquivo `.off` permanecer após uma interrupção, restaure-o antes de continuar. Nunca faça commit com as instructions desativadas.
- Se as respostas forem parecidas, procure diferenças verificáveis em arquivos priorizados, limites e validações. Resultado parecido também é uma observação válida.
- Um context packet não é documentação geral do projeto. Remova qualquer informação que não mude a decisão desta tarefa.

</details>
