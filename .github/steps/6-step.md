## Passo 6: Revise como humano e conclua o pull request

Uma saída plausível não é uma saída aprovada. Human-in-the-Loop significa verificar comportamento, riscos e evidências antes da entrega. O mecanismo de execução pode mudar, mas a responsabilidade pela decisão final permanece humana.

### 📖 Teoria: aprovação exige evidência

Revise o comportamento contra os critérios, inspecione o diff e execute validações independentes da resposta do modelo. Uma aprovação deve apontar evidências e limitações conhecidas.

### ⌨️ Atividade: revise e conclua o PR

1. Revise o diff e execute novamente:

   ```bash
   npm test
   npm run test:solution
   npm run lint
   npm run build
   ```

1. Teste manualmente `/upload`: digite `w`, navegue com teclado, selecione uma sugestão e confirme que tags existentes não são repetidas.

1. Inspecione o diff e confirme que `tests/solution/tag-autocomplete.test.tsx` não foi alterado. Preencha `workshop/human-review.md`, mas mantenha a decisão pendente enquanto houver falhas ou divergências.

1. Faça commit da revisão inicial, envie a branch e abra um **draft pull request** para `main`:

   ```bash
   git add workshop/human-review.md
   git commit -m "docs: registrar revisão humana inicial"
   git push
   ```

1. Corrija qualquer divergência relevante. Depois:

   - altere `workshop/human-review.md` para `Status: CONCLUIDO`;
   - altere a revisão final para `Decisão: APPROVED`;
   - remova todos os campos `[PREENCHA]`.

1. Faça commit e push. Marque o draft pull request como **Ready for review**. O workflow executará a validação final e concluirá o exercício:

   ```bash
   git add workshop/human-review.md
   git commit -m "docs: registrar aprovação humana"
   git push
   ```

### ✅ Resultado esperado

O PR está pronto para revisão, todos os checks passam e a decisão humana referencia o diff, o contrato automatizado e o teste manual. Spaces, MCP e coding agent permanecem disponíveis como extensão opcional após a conclusão.

<details>
<summary>Está com problemas?</summary><br/>

- Se o workflow ainda não executar, confirme que o PR aponta para `main` e não está mais como draft.
- Se o diff mostrar mudanças nos testes de solução, restaure o contrato antes de aprovar.
- O workflow só finaliza quando os checks passam e a decisão humana é `APPROVED`.

</details>
