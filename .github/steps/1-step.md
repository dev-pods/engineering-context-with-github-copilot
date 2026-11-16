# Passo 1: Localize o catálogo e publique sua branch

Uma pessoa que organiza fotografias trouxe este problema:

> "Quero reutilizar as tags da galeria no Upload, sem precisar lembrar a grafia e sem perder as tags que já digitei."

**O que vamos praticar:** usar arquivos como contexto e conferir a resposta do Copilot no código.

**O que você vai fazer:** abrir `/upload`, localizar de onde vêm as tags e publicar a branch `improve-upload`. Neste passo, **não implemente sugestões nem altere arquivos**. O campo continuará sem autocomplete.

Nos cursos anteriores, você aprendeu a conversar com o Copilot e a personalizá-lo. Agora vai usar esses recursos para construir a melhoria. As lições são autossuficientes; não é necessário consultar a apresentação.

| Neste passo | Referência rápida |
| --- | --- |
| Tempo e modo | 7 minutos · Ask, sem edição |
| Fontes principais | `src/app/upload/page.tsx` e `src/lib/mock-tag-data.ts` |
| Entrega | Branch `improve-upload` publicada |
| Fora do escopo | Implementar autocomplete ou reescrever a seleção de arquivos |

## Teoria: Uma resposta plausível não é um diagnóstico

O modelo conhece padrões comuns de aplicações, mas isso não significa que conheça esta aplicação. Ao ouvir "Upload", pode sugerir armazenamento, uma API ou persistência. Essas soluções podem fazer sentido em outro produto e estar fora do problema atual.

**Grounding** é fundamentar a resposta em fontes verificáveis. Uma afirmação como "as tags vêm do backend" precisa de evidência; o nome de uma página ou uma frase confiante não basta. Separe três coisas:

| Tipo de afirmação | Exemplo | Como conferir |
| --- | --- | --- |
| Fato observado | O campo possui `name="tags"` | Abrir o elemento na página Upload |
| Inferência | Os termos devem ser consistentes | Relacionar o pedido ao texto de ajuda do campo |
| Proposta | Usar um componente de sugestões | Avaliar depois de entender dados e integração |

O contexto pode vir de arquivos que você escolhe ou de buscas feitas por ferramentas. Recuperar trechos relevantes antes de responder é o princípio de **RAG**; não equivale a carregar todo o projeto nem assegura que o trecho recuperado seja suficiente. Para uma investigação localizada, comece pelas fontes conhecidas e amplie a busca somente quando houver uma lacuna.

### Escolha o mecanismo pelo objetivo

| Recurso | Para que serve | Como aparece nesta entrega |
| --- | --- | --- |
| `/` — slash command | Invoca um comando ou fluxo disponível | `/explain`, quando disponível, ajuda a entender uma seleção |
| `@` — chat participant | Direciona a pergunta a um participante especializado, quando suportado | `@workspace` pode apoiar uma investigação do projeto |
| `#` — contexto ou ferramenta | Seleciona uma fonte ou indica uma ferramenta disponível | Escolher a página Upload, em vez de outro `page.tsx` |

O `#` não é uma hashtag de classificação: selecione o item no menu e confira o anexo. Uma aba aberta ou um caminho digitado não são prova de que a fonte foi incluída. **Add Context** é uma alternativa. Nenhum desses atalhos escolhe um modelo ou concede permissão de execução.

> [!NOTE]
> **Compatibilidade:** participantes `@` são legados de sessões Local e não são suportados no harness Copilot. Harness é o ambiente que coordena a sessão e suas ferramentas, não o modelo. Se um recurso não aparecer, pergunte diretamente com as fontes anexadas; não instale nada para concluir a atividade. Veja a [documentação de contexto](https://code.visualstudio.com/docs/chat/copilot-chat-context).

## Atividade: delimite o problema com evidências (7 minutos)

1. Abra o botão abaixo em uma nova aba e crie um Codespace para sua cópia do exercício usando a configuração padrão.

   [![Abrir no GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/{{full_repo_name}}?quickstart=1)

1. Na sua cópia do template, confirme o starter e crie a branch:

   ```bash
   npm run preflight
   npm test
   git switch -c improve-upload
   ```

1. Execute **Terminal > Run Task > Luma Gallery: iniciar aplicação**. Em **Ports**, abra **3000**, acesse `/upload` e digite `portrait, wi`. Observe o comportamento atual antes de pedir a mudança.
1. Em Ask, use `#` ou **Add Context** para selecionar `src/app/upload/page.tsx` e `src/lib/mock-tag-data.ts`. Confira o caminho completo: há outros arquivos chamados `page.tsx`. Envie:

   ```text
   Precisamos reutilizar as tags existentes no campo do Upload sem perder
   o texto já digitado. Investigue o caminho dos dados até esse campo.
   Separe fatos encontrados, lacunas e propostas. Cite arquivos e símbolos.
   Identifique a menor área de mudança e o que deve ficar intacto.
   Se faltar uma fonte, procure-a antes de concluir. Não edite arquivos.
   ```

1. **Tome a decisão de escopo.** Abra as referências e confira: existe um catálogo? Ele já alimenta esse campo? O pedido exige mudar a seleção de arquivos? Se o Copilot recomendar backend, peça a evidência que tornaria isso necessário. Não aceite uma proposta apenas porque parece mais completa.

   Uma resposta útil deve permitir conferir estes três pontos, com referências:

   ```text
   Dados: PHOTO_TAGS define as categorias; AVAILABLE_TAGS deriva a lista.
   Tela: o input name="tags" de UploadPage ainda não usa essa lista.
   Escopo: ligar catálogo e input; não reescrever UploadZone.
   ```

   Não é necessário obter essas palavras exatas. Abra cada referência e confirme a afirmação. Se um trecho for pouco claro, use `/explain`, quando disponível, ou peça a explicação da seleção.
1. Publique a branch:

   ```bash
   git push -u origin improve-upload
   ```

## Resultado esperado

**Entrega:** a branch `improve-upload` aparece no seletor de branches do seu repositório no GitHub. Não há arquivo de diagnóstico para criar ou conversa para enviar.

### Para passar neste passo

1. Faça o push indicado acima.
1. Em **Actions > Passo 1**, confira as verificações: branch e arquivos do starter, contratos preservados, `npm test`, `npm run lint` e `npm run build`.
1. Volte à issue do exercício. Aguarde o comentário **Passo 1 aprovado**, com a tabela em `OK`, seguido da lição 2.

Uma resposta correta no Chat não libera o passo: quem dispara a verificação é a publicação da branch. A investigação explica **onde trabalharemos**; a automação confere o ambiente para começar.

<details>
<summary>Está com problemas? 🤷</summary><br/>

- **O passo não avançou:** confirme a branch com `git branch --show-current`. O nome deve ser exatamente `improve-upload`, publicado no seu repositório. Confira **Actions > Passo 1**. Se o trabalho já estiver pronto, use **Run workflow** nessa branch em vez de um commit vazio.
- **O Codespace parece parado:** abra **View Creation Log**. A criação instala dependências e testa o starter, sem iniciar servidor em primeiro plano.
- **`npm run preflight` falhou:** leia a linha indicada. Rode `npm ci` ou **Codespaces: Rebuild Container** para recuperar Node, Git e GitHub CLI.
- **O preview não abre:** execute a task **Luma Gallery: iniciar aplicação** e abra **Ports > 3000 > Open in Browser**, acessando `/upload`. Se a porta já estiver ocupada, use o servidor existente.
- **`#arquivo` não virou contexto:** selecione o item no menu de `#` e confira o anexo. Digitar o caminho ou deixar a aba aberta não garante a inclusão. **Add Context** é uma alternativa.
- **`/explain` ou `@workspace` não aparece:** faça a pergunta diretamente com os arquivos anexados. A atividade não depende desses itens.

</details>
