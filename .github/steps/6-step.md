# Passo 6: Revise e entregue a pull request

Sua mudança está implementada e testada. Faça uma última revisão humana e abra uma PR que outra pessoa consiga avaliar.

## Teoria: Human-in-the-Loop

Copilot pode sugerir código e apontar riscos, mas não é responsável pela aprovação. CI verde é evidência útil, não autorização automática para merge. Confira o diff, os resultados e as limitações antes de aprovar.

### Ponte: do contexto local ao MCP e à colaboração

Até aqui você escolheu fontes com `#`, descreveu tarefas, selecionou modelos e usou ferramentas para editar e testar. Quando os dados estão fora do workspace — por exemplo, comentários atuais de uma PR — uma integração autorizada pode recuperá-los.

| Conceito | O que acrescenta ao fluxo |
| --- | --- |
| Ferramenta nativa ou de extensão | Lê arquivos, executa testes ou consulta serviços; nem toda ferramenta é MCP |
| MCP | Protocolo para conectar ferramentas e fontes externas ao assistente; não é modelo, participante nem sinônimo de RAG |
| Copilot Space | Curadoria de fontes compartilhadas, como código, issues e PRs, para uma discussão com contexto |
| Coding agent | Execução delegada de uma tarefa em outra sessão/ambiente, com mudanças e PR a revisar; não é apenas o Agent local no Codespace |

Uma chamada MCP pode trazer evidências para grounding ou realizar uma ação. As permissões vêm da autenticação e das políticas, não de escrever `#` ou pedir acesso no prompt. Antes de uma escrita externa, confira ferramenta, repositório, argumentos e autorização; depois, verifique o resultado no serviço. Uma resposta dizendo “criei a issue” não comprova a criação.

Esta é uma conexão conceitual com o roteiro `.github/steps/x-extension.md`, não uma atividade extra: **não configure MCP, Space ou coding agent para concluir**.

## Atividade: revise e entregue (10 minutos)

1. Na branch `improve-upload`, confira o escopo:

   ```bash
   git diff origin/main -- src tests .github/prompts
   git diff --exit-code origin/main -- tests/solution/
   ```

   Confirme que não alterou contratos, adicionou dependências desnecessárias ou introduziu backend/persistência.
2. Solicite uma revisão no editor ou no Chat com a comparação da branch contra `origin/main`. Use o contexto de alterações em `#` ou **Add Context** se ele oferecer essa comparação. Se mostrar apenas mudanças não commitadas, anexe a saída do primeiro comando acima: seus commits continuam fazendo parte da revisão mesmo com o working tree limpo.

   ```text
   Revise esta branch em relação a origin/main. Priorize bugs, regressões de
   interação e lacunas de teste. Confira filtro, clique, teclado, foco e
   referências ARIA. Cite os locais dos problemas. Não edite arquivos nem
   aprove a PR por mim.
   ```

3. Confira cada achado no diff e no preview. Descarte falsos positivos; corrija defeitos reais. Se editar arquivos, faça commit e push somente dos arquivos envolvidos antes de abrir ou atualizar a PR.
4. Abra uma PR de `improve-upload` para `main`:

   ```bash
   gh pr create --base main --head improve-upload --title "Improve upload tags" --body-file .github/pull_request_template.md
   ```

   Este comando usa a **GitHub CLI**, não MCP. Uma ferramenta GitHub MCP também pode criar artefatos no serviço; muda o mecanismo de acesso, não a obrigação de revisar e autorizar.

5. Preencha a descrição com o comportamento entregue, checks executados e limitações reais. Aguarde **Passo 6** e **CI** ficarem verdes; você decide se deve fazer merge.

## Resultado esperado

Uma PR com escopo revisado, contrato preservado e validações aprovadas. Copilot review é insumo, não aprovação. Spaces, MCP e coding agent são extensões opcionais apresentadas pelo facilitador, sem gate nem acesso exigido do aluno.

**A ponte na entrega:** feche o ciclo com fontes → pedido → modelo/agente → ferramentas → testes → decisão humana. O gate verifica o resultado técnico, não qual modelo, participante ou integração você utilizou. Saiba mais sobre [MCP no VS Code](https://code.visualstudio.com/docs/agent-customization/mcp-servers).

<details>
<summary>Está com problemas? 🤷</summary><br/>

- **Um check falhou:** abra o log, corrija na mesma branch e publique novamente. Não crie outra PR nem modifique workflows ou contratos para contornar a falha.
- **A PR não encerrou o exercício:** a PR deve ser do mesmo repositório, de `improve-upload` para `main`. Se ela foi criada antes de o passo 6 ser habilitado, faça um novo push na branch ou reabra a PR.
- **A revisão final apareceu, mas o encerramento falhou:** abra o job `finish_exercise` em **Actions > Passo 6** e reexecute somente esse job. Não é necessário refazer a implementação.
- **Uma ferramenta MCP não aparece:** MCP não é requisito deste passo. Nunca forneça tokens no Chat.

</details>
