# Passo 1: Conheça a Luma Gallery

Você já sabe conversar com o Copilot e personalizar seu comportamento. Neste hands-on, vai aplicar essas técnicas para melhorar a experiência de tags na Luma Gallery. O objetivo é adicionar sugestões acessíveis ao campo de tags da página Upload.

Não é necessário consultar a apresentação. Este passo e os seguintes contêm as instruções necessárias.

## Teoria: contexto antes de código

O Copilot usa seu pedido, o contexto que você fornece e as ferramentas disponíveis. Contexto explícito — como arquivos anexados — ajuda a fundamentar uma resposta em evidências do projeto. Ferramentas de busca recuperam trechos relevantes; isso se relaciona ao princípio de RAG, mas não garante que a resposta esteja correta. Confira as fontes citadas.

Use Ask para investigar antes de editar. Instructions de repositório já aplicam regras compartilhadas; não é necessário recriá-las neste exercício.

### Ponte: `/`, `@` e `#` têm funções diferentes

| Recurso | Para que serve | Como aparece nesta entrega |
| --- | --- | --- |
| `/` — slash command | Inicia um comando ou fluxo reutilizável disponível no Chat | `/explain`, quando disponível, ajuda a entender um trecho; no passo 5 você criará `/test-tags` |
| `@` — chat participant | Direciona a conversa para um participante especializado, quando suportado | Se `@workspace` aparecer no menu, ele pode ajudar a investigar o projeto |
| `#` — menção de contexto ou ferramenta | Seleciona arquivos, símbolos, saídas ou ferramentas pelo menu | Anexe a página Upload e o catálogo para a resposta usar as fontes certas |

O `#` não é uma hashtag de classificação: selecione o item no autocomplete e confira a referência anexada. Um participante não é o modelo escolhido nem um agente personalizado do seletor de agentes. Mencionar uma ferramenta também não concede permissão para executá-la.

> **Compatibilidade:** Local e Copilot são ambientes de execução da sessão (harnesses), não modelos. A [documentação atual do VS Code](https://code.visualstudio.com/docs/chat/copilot-chat-context) trata participantes `@` como recurso legado de sessões Local, não suportado em sessões Copilot. Se não aparecerem, faça a pergunta diretamente com os arquivos anexados. A ausência do participante não impede a atividade.

## Atividade: abra o projeto e investigue (5 minutos)

> Inicie o Codespace durante a apresentação ou antes dos 60 minutos de hands-on. Este passo pressupõe o ambiente aberto.

1. Confirme que está na cópia do template. No terminal, execute:

   ```bash
   npm run preflight
   npm test
   git switch -c improve-upload
   ```

2. Execute **Terminal > Run Task > Luma Gallery: iniciar aplicação**. Em **Ports**, abra **3000** e navegue até `/upload`.
3. Consulte os menus `/`, `@` e `#` e o seletor de ferramentas, sem enviar um pedido para cada menu. Observe quais itens são comandos, participantes, fontes ou ações. A disponibilidade depende da sessão, versão e políticas.
4. Em Ask, digite `#`, procure `page.tsx` e selecione **o arquivo em `src/app/upload/`**; repita para `src/lib/mock-tag-data.ts`. Confira os anexos. **Add Context** ou arrastar os arquivos ao Chat são alternativas equivalentes. Se `@workspace` estiver listado, você pode selecioná-lo para esta mesma pergunta; caso contrário, envie diretamente:

   ```text
   Explique de onde vêm as tags e como o campo do Upload é renderizado.
   Cite os arquivos e símbolos que sustentam a resposta. Diferencie o que
   já funciona do que falta para oferecer sugestões. Não edite arquivos.
   ```

5. Abra as referências da resposta e confira no código: `AVAILABLE_TAGS` é derivada de `PHOTO_TAGS`, mas ainda não alimenta o campo do Upload. Se um trecho continuar pouco claro, selecione-o e use `/explain`, quando disponível, ou peça “Explique esta seleção”. Não é necessário repetir toda a investigação.
6. Publique a branch:

   ```bash
   git push -u origin improve-upload
   ```

## Resultado esperado

Você identificou as fontes das tags, observou a diferença entre catálogo e campo do Upload e publicou `improve-upload`. O workflow verifica o starter e libera o passo 2.

**A ponte na entrega:** `/` indica uma tarefa, `@` pode direcionar a conversa e `#` fornece fontes ou indica ferramentas. A evidência de grounding é a correspondência entre a explicação e o código, não a presença desses caracteres no prompt.

<details>
<summary>Está com problemas? 🤷</summary><br/>

- **O passo não avançou:** confirme a branch com `git branch --show-current`. O nome deve ser exatamente `improve-upload`, publicado no seu repositório. Confira **Actions > Passo 1**. Se o trabalho já estiver pronto, use **Run workflow** nessa branch em vez de um commit vazio.
- **O Codespace parece parado:** abra **View Creation Log**. A criação instala dependências e testa o starter, sem iniciar servidor em primeiro plano.
- **`npm run preflight` falhou:** leia a linha indicada. Rode `npm ci` ou **Codespaces: Rebuild Container** para recuperar Node, Git e GitHub CLI.
- **O preview não abre:** execute a task **Luma Gallery: iniciar aplicação** e abra **Ports > 3000 > Open in Browser**, acessando `/upload`. Se a porta já estiver ocupada, use o servidor existente.
- **`#arquivo` não virou contexto:** selecione o item no menu de `#` e confira o anexo. Digitar o caminho ou deixar a aba aberta não garante a inclusão. **Add Context** é uma alternativa.
- **`/explain` ou `@workspace` não aparece:** faça a pergunta diretamente com os arquivos anexados. A atividade não depende desses itens.

</details>
