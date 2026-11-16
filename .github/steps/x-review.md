# Exercício concluído

Você entregou melhorias concretas na Luma Gallery:

- Um catálogo de tags ampliado, derivado e sem duplicatas.
- Sugestões integradas à página Upload.
- Seleção por mouse e teclado, com estado acessível.
- Um prompt reutilizável e testes próprios de regressão.
- Uma pull request com verificações automatizadas e revisão humana.

Você aplicou os modos e as personalizações dos cursos anteriores em um fluxo de engenharia: fontes antes de suposições, exemplos e critérios no prompt, planejamento proporcional, iteração guiada por comportamento e aprovação humana.

## Como os conceitos se conectam

| Passo | Ponte demonstrada pela entrega |
| --- | --- |
| 1 — Investigar | Distinguir `/`, `@` e `#`; conferir as fontes da explicação, usando os recursos disponíveis na sessão |
| 2 — Ampliar dados | Usar um exemplo no prompt e escolher um modelo proporcional à tarefa |
| 3 — Construir sugestões | Organizar regras, fontes, critérios e plano aprovado: engenharia de contexto |
| 4 — Refinar teclado | Transformar resultados dos testes em contexto para uma correção localizada |
| 5 — Proteger comportamento | Versionar uma tarefa em prompt file e executá-la por `/test-tags` quando suportado, ou pelo conteúdo anexado |
| 6 — Entregar | Revisar o diff e os checks; distinguir ferramentas locais, CLI, MCP e execução delegada |

Você não precisou testar vários modelos, registrar conversas ou configurar serviços externos. As pontes explicam as decisões durante as entregas; não adicionam gates.

Os checks verificam um contrato mínimo, não certificam qualidade completa, segurança ou acessibilidade. Revise a PR e faça merge somente quando estiver satisfeito com a entrega.

## Extensão opcional para o facilitador

O material `x-extension.md` descreve uma demonstração de Copilot Spaces, GitHub MCP e coding agent. Ela pode ocorrer na hora da apresentação, sem atividade obrigatória, credenciais compartilhadas ou gate de conclusão. Não é uma etapa prática do hands-on.

Reconhecer a função de MCP não equivale a tê-lo configurado ou usado. A prática obrigatória termina na PR; a demonstração apenas mostra como ampliar o mesmo fluxo com contexto compartilhado, acesso externo e delegação.

## Continue praticando

- [Boas práticas de prompts](https://docs.github.com/en/copilot/get-started/best-practices)
- [Personalização no VS Code](https://code.visualstudio.com/docs/copilot/customization/overview)
- [Contexto e participantes no Chat](https://code.visualstudio.com/docs/chat/copilot-chat-context)
- [Modelos disponíveis e seleção](https://code.visualstudio.com/docs/agent-customization/language-models)
- [MCP no VS Code](https://code.visualstudio.com/docs/agent-customization/mcp-servers)
- [GitHub Skills](https://skills.github.com/)

Experimente levar o mesmo processo para uma issue pequena do seu projeto: contexto confiável, entrega observável, testes relevantes e revisão responsável.