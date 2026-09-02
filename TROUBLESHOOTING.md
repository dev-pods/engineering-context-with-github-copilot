# Troubleshooting

## Codespaces e aplicação

| Sintoma | Causa provável | Ação |
| --- | --- | --- |
| `npm ci` falha por versão do Node | Imagem ou Codespace antigo | Rebuild Container e confirme Node.js 22 ou superior |
| `npm run preflight` falha | Container incompleto ou dependências ausentes | Execute `npm ci`; se Node, Git ou GitHub CLI faltarem, use **Rebuild Container** |
| Porta 3000 não abre | Servidor não iniciou ou porta não encaminhada | Execute `npm run dev`, abra a aba **Ports** e selecione **Open in Browser** |
| Fontes ou estilos não aparecem | Build/cache antigo | Pare o servidor, remova `.next` e execute `npm run dev` novamente |
| O campo de tags já tem autocomplete | Branch ou cópia reutilizada | Crie uma nova cópia do template ou restaure os arquivos conforme o guia do facilitador |

## Copilot Chat

| Sintoma | Causa provável | Ação |
| --- | --- | --- |
| `/`, `#` ou `@` não mostram opções | Foco fora do Chat ou extensão desatualizada | Clique na caixa do Chat, atualize GitHub Copilot Chat e recarregue a janela |
| Prompt file não aparece | Descoberta ainda não atualizada | Abra o arquivo e use o botão de execução ou **Chat: Run Prompt** |
| Instructions não afetam a resposta | Arquivo desativado ou sessão antiga | Confirme `.github/copilot-instructions.md`, inicie uma conversa nova e repita o prompt |
| Copilot inclui arquivos inesperados | Contexto implícito ou conversa antiga | Inicie novo chat, remova anexos e selecione explicitamente as fontes |
| Modelo esperado não aparece | Licença, política da organização ou disponibilidade regional | Escolha outro modelo da mesma categoria e registre a limitação |

## Validação dos passos

Execute localmente:

```bash
node scripts/validate-step.mjs 1
```

Substitua `1` pelo passo atual.

| Mensagem | Correção |
| --- | --- |
| `must contain 'Status: CONCLUIDO'` | Atualize o status no topo de todos os documentos do passo |
| `still contains fields marked PREENCHA` | Substitua cada campo por evidência real; não apague a seção inteira |
| `needs explicit human approval` | Revise o artefato e altere apenas o gate indicado pela lição |
| `must integrate TagAutocomplete` | Importe e renderize o componente na página Upload |

## Testes do autocomplete

| Falha | Verifique |
| --- | --- |
| Não encontra `combobox` | O input deve ter semântica de combobox e label acessível |
| Não encontra `wedding` ou `wildlife` | Filtre a lista existente usando o token depois da última vírgula |
| `ArrowDown` + `Enter` falha | Mantenha um índice ativo e substitua somente o token atual |
| `aria-expanded` ou `aria-controls` falha | Relacione o combobox ao `listbox` e atualize o estado anunciado quando a lista abrir ou fechar |
| `Escape` não fecha a lista | Feche as sugestões sem limpar o valor atual do input |
| Sugere uma tag repetida | Compare sugestões com tokens já selecionados, ignorando espaços e caixa |
| Build falha após adicionar estado | A página que usa estado precisa respeitar a fronteira de Client Component |

Não altere `tests/solution/tag-autocomplete.test.tsx`. Ele representa o contrato do exercício.

## GitHub Actions

| Sintoma | Causa provável | Ação |
| --- | --- | --- |
| Nenhum workflow inicia | Workflow atual desabilitado ou arquivo fora dos paths monitorados | Abra **Actions**, confirme o passo habilitado e faça push do artefato indicado |
| Próximo passo não aparece | Grading falhou | Abra o job, corrija o artefato e faça novo push |
| Issue do exercício não existe | Passo 0 ainda não terminou | Execute **Passo 0** manualmente ou crie uma nova cópia do template |
| Passo 6 não inicia | PR aponta para outra branch | Abra ou atualize um PR com base `main` |

## Extensão opcional

| Sintoma | Causa provável | Ação |
| --- | --- | --- |
| Spaces não aparece | Recurso indisponível para a conta | Use o Space de contingência do facilitador |
| Não é possível adicionar o PR | PR ainda não existe ou acesso insuficiente | Abra um draft PR e confirme o owner do Space |
| Resposta ignora fontes | Instrução ampla ou contexto excessivo | Remova fontes irrelevantes e peça citações e lacunas explicitamente |
| Link não pode ser aberto pela turma | Permissão do Space | Ajuste o compartilhamento ou use owner organizacional adequado |
| GitHub MCP não autentica | OAuth bloqueado ou servidor desabilitado | Acompanhe o walkthrough do facilitador; nunca cole um PAT no Chat ou faça commit de credenciais |
| Coding agent não aparece como responsável | Política da organização ou repositório incompatível | Revise a sessão demonstrada pelo facilitador e registre que a execução foi simulada |

Spaces, GitHub MCP e coding agent não bloqueiam a conclusão do núcleo. Quando indisponíveis, não invente URLs ou evidências: identifique explicitamente o walkthrough usado.
