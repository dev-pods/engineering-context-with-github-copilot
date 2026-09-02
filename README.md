# GitHub Copilot Advanced: Contexto, Prompts e Modelos

_Aprenda a tornar o trabalho com IA mais previsível por meio de contexto focado, prompts verificáveis e escolha consciente de modelos._

## Bem-vindo

- **Para quem é**: pessoas desenvolvedoras que já usam GitHub Copilot Chat e conhecem Git, pull requests, VS Code e fundamentos de TypeScript/React.
- **O que você vai aprender**: como controlar o contexto, experimentar técnicas de prompt, comparar modelos e revisar resultados antes da entrega.
- **O que você vai construir**: um autocomplete acessível para as tags da página Upload da Luma Gallery, acompanhado das evidências que justificam cada decisão.
- **Pré-requisitos**:
  - [GitHub Copilot Fundamentals](https://github.com/skills/getting-started-with-github-copilot)
  - [GitHub Copilot Personalization](https://github.com/skills/customize-your-github-copilot-experience)
  - Licença ativa do GitHub Copilot e permissão para criar um Codespace
- **Duração**: 2 horas em ritmo facilitado ou de 2 a 2,5 horas em autoestudo. A extensão opcional leva de 30 a 45 minutos com o ambiente preparado; reserve até 60 minutos para autenticação e políticas.

Você já deve conhecer Ask, Plan e Agent, além de instructions, skills e custom agents. Este exercício não repete a criação desses recursos: ele os aplica em um processo de engenharia baseado em evidências.

Neste exercício, você vai:

1. Escolher conscientemente entre comandos, participantes, referências e modos do Chat.
2. Comparar contexto insuficiente, excessivo e mínimo suficiente.
3. Separar instruções estáveis do contexto específico da tarefa.
4. Avaliar prompts no-shot, com exemplos e step-back.
5. Selecionar um modelo com base em evidências e implementar uma melhoria.
6. Revisar a mudança, abrir um pull request e tomar a decisão final como responsável humano.

### Extensão opcional

Quando Copilot Spaces, GitHub MCP e Copilot coding agent estiverem habilitados pela conta ou organização, uma [atividade adicional](.github/steps/x-extension.md) conecta os três recursos:

1. Curar um Space para revisar a feature e o pull request.
2. Usar o GitHub MCP para criar uma issue pequena de hardening.
3. Atribuir a issue ao coding agent, inspecionar a sessão e revisar o pull request gerado.

Esses recursos dependem de licença e políticas organizacionais. A indisponibilidade deles não impede a conclusão do exercício principal.

> [!NOTE]
> A extensão só começa depois que o workflow publicar a revisão final. O facilitador decide se a turma seguirá a atividade completa, apenas os recursos disponíveis ou um walkthrough identificado como simulação.

### Como iniciar este exercício

Copie o exercício para sua conta e aguarde cerca de 20 segundos enquanto a primeira lição é preparada. Depois, atualize a página.

[![](https://img.shields.io/badge/Copiar%20Exerc%C3%ADcio-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/new?template_owner=dev-pods&template_name=engineering-context-with-github-copilot&owner=%40me&name=skills-engineering-context-with-github-copilot&description=Exercise:+Engineering+Context+with+GitHub+Copilot&visibility=public)

<details>
<summary>Está com problemas?</summary><br/>

- Use sua conta pessoal ou uma organização na qual você possa criar repositórios e Codespaces.
- Repositórios públicos não consomem minutos privados de GitHub Actions.
- Se a primeira lição não aparecer, confira a aba **Actions** e atualize esta página.
- Antes do workshop, confirme que o GitHub Copilot Chat funciona no Codespace. O seletor de modelos, Spaces, GitHub MCP e coding agent são verificados separadamente e possuem alternativas conduzidas pelo facilitador.

</details>

---

Parte da aplicação foi adaptada de [ps-copilot-sandbox/copilot-intermediate-gallery-repo](https://github.com/ps-copilot-sandbox/copilot-intermediate-gallery-repo), sob licença MIT.
