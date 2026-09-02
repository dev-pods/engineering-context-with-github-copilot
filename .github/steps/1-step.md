## Passo 1: Escolha conscientemente os recursos do Copilot Chat

O GitHub Copilot oferece mais do que uma caixa de texto. Comandos, participantes, referências e modos mudam a forma como o contexto é reunido e o tipo de ação permitida. A lista disponível pode variar por licença, extensão e organização, por isso o objetivo não é decorar nomes: é reconhecer a categoria certa para cada fase.

### 📖 Teoria: diagnostique o ambiente pela intenção

Você já usou Ask, Plan e Agent nos exercícios anteriores. Aqui, `/`, `@` e `#` funcionam como um diagnóstico: eles revelam quais comandos, especializações e fontes de contexto estão realmente disponíveis neste Codespace.

> [!IMPORTANT]
> Um recurso aparecer na interface não significa que ele seja necessário. Comece pela intenção: pesquisar, planejar, implementar ou revisar.

### ⌨️ Atividade: descubra e classifique o que está disponível

1. Abra este repositório em um Codespace.

1. No terminal, crie a branch que será usada durante todo o exercício:

   ```bash
   git switch -c copilot-advanced
   npm run preflight
   ```

1. Inicie a aplicação pela task **Luma Gallery: iniciar aplicação** ou execute `npm run dev` em um terminal dedicado. Quando a porta 3000 for encaminhada, abra o preview.

1. Abra o GitHub Copilot Chat no modo **Ask**. Digite, sem enviar, `/`, `#` e `@`. Observe as opções e a origem indicada pela interface.

1. Confirme que o Chat responde com uma pergunta simples sobre o repositório. Depois faça uma pergunta de descoberta sem editar arquivos:

   ```text
   Resuma o fluxo da página Upload e identifique somente os arquivos que controlam
   o campo de tags. Para cada arquivo, explique por que ele é relevante. Não proponha
   alterações ainda e sinalize qualquer hipótese sem evidência.
   ```

1. Abra `workshop/copilot-capabilities.md` no editor. Registre pelo menos três recursos encontrados e escolha a interface apropriada para pesquisa, planejamento, implementação e revisão.

1. Substitua todos os campos `[PREENCHA]` e altere `Status: PENDENTE` para `Status: CONCLUIDO`.

1. Salve, faça commit e push. O próximo passo será publicado na issue do exercício.

   ```bash
   git add workshop/copilot-capabilities.md
   git commit -m "docs: mapear recursos do Copilot Chat"
   git push -u origin copilot-advanced
   ```

### ✅ Resultado esperado

O inventário registra pelo menos três recursos realmente disponíveis e justifica uma interface para cada fase. Limitações possuem um fallback, em vez de serem ocultadas.

<details>
<summary>Está com problemas?</summary><br/>

- Se `/`, `#` ou `@` não abrirem uma lista, confirme que o foco está na caixa do Copilot Chat e atualize a extensão.
- Registre apenas o que aparece na sua instalação. Um fallback válido pode ser anexar um arquivo manualmente ou descrever o contexto no prompt.
- Se o pre-flight falhar nas dependências, execute `npm ci` e tente novamente.
- Mantenha o servidor em uma task ou terminal dedicado e use outro terminal para Git.

</details>
