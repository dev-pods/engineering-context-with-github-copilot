# GitHub Copilot Advanced: entregas com contexto

_Aplique contexto, prompts e modelos em melhorias reais de uma aplicação, do primeiro commit à revisão da pull request._

## Boas-vindas

- **Para quem é:** pessoas que já usam Copilot Chat, Git, pull requests e têm noções de TypeScript e React.
- **O que você vai aprender:** fundamentar pedidos no código, usar exemplos e critérios, decompor uma mudança, escolher modelos pela tarefa, automatizar testes e revisar resultados com responsabilidade humana.
- **O que você vai construir:** melhorias de tags na Luma Gallery: catálogo ampliado, autocomplete integrado, interação acessível por teclado e testes de regressão com um prompt reutilizável.
- **Pré-requisitos:** [Getting started with GitHub Copilot](https://github.com/skills/getting-started-with-github-copilot) e [Customize your GitHub Copilot experience](https://github.com/skills/customize-your-github-copilot-experience), acesso ao Copilot e permissão para criar Codespaces e executar Actions.
- **Duração do treinamento:** 2 horas: até 60 minutos de apresentação e até 60 minutos de hands-on. A preparação do Codespace acontece durante a apresentação ou antes do hands-on.
- **Duração do hands-on:** no máximo 60 minutos: 50 minutos de atividades e 10 minutos reservados, distribuídos entre as etapas, para checks do Actions e uma correção simples. Comece com Codespace e issue prontos; problemas de provisionamento ou de infraestrutura devem ser resolvidos fora da hora cronometrada.

Você já conhece Ask, Plan, Agent, instructions, skills e agentes personalizados. Vamos aplicar esses conhecimentos, sem repetir a criação de cada personalização. Não é necessário ler uma apresentação para realizar o exercício.

## Percurso

| Passo | Você entrega | Como é validado | Tempo |
| --- | --- | --- | --- |
| 1. Conheça a aplicação | Branch `improve-upload` e diagnóstico baseado no código | Saúde do starter e branch | 5 min |
| 2. Amplie o catálogo | Novas tags nas categorias existentes | Contrato dos dados | 5 min |
| 3. Planeje e construa sugestões | Plano aprovado e autocomplete integrado ao Upload | Filtro, clique, duplicatas e integração | 12 min |
| 4. Refine a acessibilidade | Navegação e seleção por teclado | Contrato de interação completo | 10 min |
| 5. Automatize testes | Prompt reutilizável e dois testes próprios | Execução dos testes do aluno | 8 min |
| 6. Revise e entregue | PR para `main` | Contratos, checks e revisão humana | 10 min |

As atividades somam 50 minutos; reserve até 10 minutos distribuídos entre os gates para retorno das Actions e uma correção simples. Cada passo explica a técnica no momento em que ela é usada. Não há planilhas de comparação nem fichas de evidência. Escolha um modelo disponível para a tarefa; não é necessário comparar execuções. As entregas são código, testes e um prompt utilizável.

Spaces, GitHub MCP e coding agent podem ser apresentados como demonstração opcional durante a hora de apresentação, ou por gravação. Não são atividades práticas nem gates do hands-on; essa limitação está explícita em [.github/steps/x-extension.md](.github/steps/x-extension.md).

## Inicie o exercício

1. Use o botão abaixo para criar **uma cópia do template**, não um fork, na sua conta. Prefira repositório público para simplificar o uso de Actions; Codespaces continua sujeito à sua franquia e cobrança.
2. Aguarde o workflow **Passo 0** criar a issue do exercício. Abra a issue e siga o passo mais recente. Se a issue não aparecer em alguns minutos, confira **Actions > Passo 0** e as permissões de Actions e issues da cópia.
3. Crie e abra o Codespace durante a apresentação ou antes do início dos 60 minutos de hands-on. Assim, o tempo variável de provisionamento não consome a prática.

[![Copiar exercício](https://img.shields.io/badge/Copiar%20Exerc%C3%ADcio-1f883d?style=for-the-badge&logo=github)](https://github.com/new?template_owner=dev-pods&template_name=engineering-context-with-github-copilot&owner=%40me&name=skills-engineering-context-with-github-copilot&description=Exercise:+Engineering+Context+with+GitHub+Copilot&visibility=public)

## Como funciona

A issue é o guia, assim como nos Skills anteriores; cada etapa também pode ser lida neste repositório sem a apresentação. Cada commit/push da entrega dispara o workflow do passo atual. Ele sinaliza que a verificação começou, publica uma tabela de resultados e só libera a próxima lição quando os checks passam. Se falhar, corrija na mesma branch e faça outro push. Se o trabalho já estiver pronto, use **Actions > Passo atual > Run workflow** na branch `improve-upload`.

As lições também ficam disponíveis em [.github/steps/1-step.md](.github/steps/1-step.md). Os testes em `tests/solution/` são contratos fornecidos: não os altere durante o exercício. No starter, esses contratos de entrega **ainda falham por projeto**; `npm test`, lint e build devem passar. Execute o contrato do passo indicado, não exija a solução completa na criação do Codespace.

## Ambiente e apoio

O devcontainer instala Node 22, GitHub CLI e extensões do Copilot/ESLint, instala dependências e verifica o starter. Inicie o preview por **Terminal > Run Task > Luma Gallery: iniciar aplicação**, depois abra a porta 3000 em **Ports**. O servidor não bloqueia a criação do container.

Cada passo termina com uma seção **Está com problemas? 🤷** com as falhas mais comuns daquela entrega. A [demonstração opcional de Spaces, MCP e coding agent](.github/steps/x-extension.md) não faz parte da validação.

Não há autenticação da aplicação, persistência, APIs ou deployment neste exercício. A demonstração opcional de funcionalidades externas é conduzida pelo facilitador e não exige configuração ou permissões adicionais na conta do aluno.

---

Parte da aplicação foi adaptada de [copilot-intermediate-gallery-repo](https://github.com/ps-copilot-sandbox/copilot-intermediate-gallery-repo), sob licença MIT. A progressão utiliza o padrão de [GitHub Skills exercise-template](https://github.com/skills/exercise-template).