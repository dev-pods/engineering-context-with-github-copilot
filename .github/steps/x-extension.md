# Extensão opcional: Spaces, GitHub MCP e coding agent

Este roteiro é material de apoio ao facilitador para a hora da apresentação. Não faz parte dos 60 minutos de hands-on, não exige mudanças no repositório do aluno e não participa da validação. A apresentação desses recursos é opcional; não acrescente tempo ao treinamento de duas horas. Disponibilidade e autorização dependem da conta e das políticas da organização.

Esta demonstração não conta como prática do aluno. Se não couber na apresentação ou faltar acesso aprovado, omita-a ou use uma gravação identificada.

## A ponte com o hands-on

Use a mesma melhoria de tags em um repositório de demonstração autorizado, com a solução já disponível. Assim, a turma reconhece os artefatos, sem precisar aprender outro domínio.

| No hands-on | Na demonstração | O que muda |
| --- | --- | --- |
| Fontes anexadas com `#` no passo 3 | Arquivos e PR reunidos em um Space | De contexto de uma conversa para curadoria compartilhada |
| Diff local revisado no passo 6 | Leitura dos comentários de uma PR por GitHub MCP | De arquivos locais para dados externos obtidos por uma ferramenta autorizada |
| Implementação em Agent no Codespace | Issue delegada ao coding agent | De acompanhamento local para execução delegada e revisão posterior |

Mantenha explícitas as distinções: `/` inicia um comando/fluxo; `@` direciona a um participante legado; `#` seleciona contexto ou ferramentas disponíveis; o seletor escolhe o modelo. Nenhum desses atalhos instala MCP, autentica no GitHub ou autoriza escrita.

## 1. Copilot Space: curadoria de contexto

Explique a diferença entre contexto local de uma conversa e uma coleção compartilhada de fontes. Na conta do facilitador, crie um Space com os arquivos de dados, Upload, autocomplete e a PR da demonstração. Inclua uma instrução curta: responder com base nessas fontes, citar evidências e explicitar lacunas. Não inclua todo o repositório indiscriminadamente.

Pergunte: “Quais comportamentos de tags estão implementados e quais riscos ainda precisam de testes?”. Abra as fontes citadas e confira se a resposta descreve a aplicação real. Não use limites menores de contexto como garantia de qualidade. Mostre propriedade, permissões e cuidados com conteúdo sensível antes de compartilhar.

## 2. GitHub MCP: ferramenta autorizada, não apenas texto

Em ambiente próprio previamente autorizado, mostre a configuração do servidor GitHub MCP e o seletor de ferramentas. Explique que o protocolo conecta o assistente a ferramentas e fontes externas; permissões vêm da autenticação e das políticas, não do prompt.

Comece por uma leitura: peça os comentários da PR de demonstração. Exiba o nome da ferramenta, os argumentos de repositório/PR e o retorno. Confira um comentário na página real. Se nenhuma ferramenta foi chamada, não apresente uma resposta plausível como prova de acesso ao GitHub.

Em seguida, peça um rascunho de issue pequena para adicionar testes de limpeza do campo. Confira repositório, título e critérios. Só então autorize a ferramenta de criação da issue. Abra a issue no GitHub e confira o resultado. Compare com `gh pr create` do passo 6: a CLI também acessa o GitHub, mas esse comando não é uma chamada MCP. Não configure um servidor nem compartilhe tokens com os alunos; prefira OAuth onde disponível.

## 3. Coding agent: delegação com revisão

Atribua a issue ao Copilot coding agent em um repositório de demonstração. Mostre uma sessão e PR previamente concluídas para evitar esperar pela execução ao vivo. Confira arquivos alterados, testes, permissões e mudanças fora do escopo. Solicite uma correção quando necessário; a aprovação e o merge continuam humanos.

Retome o passo 3: a tarefa delegada também precisa de objetivo, fontes, limites e critérios de aceite. O agente não herda automaticamente toda a conversa do Codespace. Inclua na issue o contexto necessário, sem credenciais, e diferencie explicitamente a nova execução da PR preparada que está exibindo.

## Alternativa sem acesso

Use capturas sanitizadas ou uma gravação preparada contendo fontes do Space, chamada MCP revisada, issue criada e PR do agente. Identifique explicitamente como demonstração gravada. Nunca invente URLs, execução de ferramentas ou resultados. A omissão desta extensão não muda a conclusão do aluno nem prolonga a sessão.