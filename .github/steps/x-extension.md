## Extensão opcional: Space, MCP e coding agent

Esta atividade de 30 a 45 minutos conecta contexto compartilhado, ferramentas externas e delegação. Ela não bloqueia a conclusão do núcleo porque a disponibilidade depende da licença e das políticas da organização.

### 📖 Teoria: três responsabilidades diferentes

- **Copilot Spaces** cura fontes e instruções para uma finalidade compartilhada.
- **GitHub MCP** permite que o agente consulte ou altere recursos do GitHub usando ferramentas explicitamente habilitadas.
- **Copilot coding agent** recebe uma issue delimitada, trabalha em um ambiente efêmero e abre um pull request para revisão.

> [!IMPORTANT]
> Use OAuth quando disponível e habilite somente as ferramentas necessárias. Nunca cole PATs, tokens ou segredos no Chat, em arquivos versionados ou nos artefatos do workshop.

### ⌨️ Atividade 1: cure e teste um Space

1. Confirme se [Copilot Spaces](https://github.com/copilot/spaces) está disponível. Se não estiver, acompanhe o walkthrough do facilitador e marque a execução como `simulada` em `workshop/space-design.md`.
1. Crie o Space `Luma Gallery - Tag Autocomplete Review` com a instrução de responder somente com base nas fontes, citar fontes usadas e declarar lacunas.
1. Adicione apenas o context packet, o prompt aprovado, a decisão de modelo, o componente, a página Upload e o pull request concluído.
1. Faça a mesma pergunta em um Chat comum sem anexos e no Space:

   ```text
   A implementação do autocomplete de tags está pronta para evoluir?
   Liste evidências, riscos e o menor hardening recomendado.
   ```

1. Registre diferenças de fundamentação, lacunas e fontes em `workshop/space-design.md`.

### ⌨️ Atividade 2: crie uma issue com GitHub MCP

1. No Codespace, abra a configuração de MCP pelo menu de ferramentas do Chat e conecte o servidor GitHub usando OAuth. A interface pode variar por versão.
1. Habilite somente as ferramentas necessárias para consultar o repositório e criar issues.
1. Peça ao Agent para criar uma issue neste repositório:

   ```text
   Crie uma issue de hardening para o autocomplete de tags.

   Escopo:
   - anunciar de forma acessível a quantidade de sugestões e o resultado selecionado;
   - fechar sugestões com Escape sem apagar o valor;
   - adicionar testes observáveis para esses comportamentos;
   - não alterar APIs, persistência, layout geral ou testes existentes.

   Inclua critérios de aceite, arquivos prováveis e comandos de validação.
   Mostre o conteúdo final antes de criar a issue.
   ```

1. Revise o título, o corpo, o repositório alvo e o escopo antes de autorizar a ferramenta. Registre a URL da issue.

### ⌨️ Atividade 3: delegue e revise

1. Atribua a issue ao Copilot coding agent. Se o responsável não estiver disponível, use a sessão demonstrada pelo facilitador e marque a execução como `simulada`.
1. Quando o pull request for aberto, selecione **View session** e observe fontes consultadas, comandos, testes e decisões de escopo.
1. Revise o diff e os checks. Se houver uma divergência, faça um comentário específico no PR e aguarde a iteração.
1. Registre em `workshop/space-design.md` a URL do PR, aderência aos critérios, mudanças fora do escopo e sua decisão. Não faça merge automático.

### ✅ Resultado esperado

A evidência distingue claramente execução real de walkthrough. A issue é pequena e verificável, o coding agent trabalha apenas no hardening e a decisão final continua com a pessoa revisora.

<details>
<summary>Está com problemas?</summary><br/>

- Se algum recurso não estiver disponível, use o walkthrough e registre `simulada`; não invente URLs.
- Se o MCP solicitar um segredo manual, cancele e peça ajuda ao facilitador. Segredos não devem passar pelo Chat.
- Se o coding agent ampliar o escopo, comente no PR citando os critérios da issue antes de aceitar mudanças.

</details>