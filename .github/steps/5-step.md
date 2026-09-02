## Passo 5: Selecione o modelo por evidência e implemente

Modelos diferem em latência, custo, entradas suportadas e capacidade para tarefas complexas. Model engineering, neste exercício, significa escolher conscientemente o modelo adequado ao trabalho, usando o mesmo contexto e critérios para tornar a comparação justa.

### 📖 Teoria: menor custo que cumpre o contrato

Nomes e multiplicadores mudam com o tempo. Compare categorias, não marcas:

- um modelo otimizado para velocidade e custo;
- um modelo indicado para raciocínio e codificação complexa.

Se ambos satisfazem o contrato, prefira o mais rápido ou econômico. Use o modelo maior quando a melhoria de qualidade for observável e necessária.

> [!IMPORTANT]
> Se apenas um modelo estiver disponível, use como segunda execução a resposta fornecida pelo facilitador na issue do workshop ou apresentada em modo somente leitura. Registre `amostra do facilitador` como origem. Não espere a disponibilidade mudar e não invente métricas.

### ⌨️ Atividade: compare, decida e implemente

1. Execute o prompt `/tag-autocomplete` com um modelo de velocidade/custo. Não edite código. Registre a resposta na seção **Modelo A** de `workshop/model-decision.md`.

1. Inicie uma conversa nova, selecione um modelo de raciocínio/codificação e execute o mesmo prompt sem mudar contexto ou requisitos. Preencha **Modelo B**. Em cada execução, registre se a origem foi `execução própria` ou `amostra do facilitador`.

1. Compare aderência, escopo, premissas, validação, follow-ups, latência e créditos/requests. Escolha um modelo e registre o trade-off. Altere:

   ```text
   Decisão humana: APROVADO
   ```

1. Leia `tests/solution/tag-autocomplete.test.tsx` no editor. Ele define a API mínima do componente e o comportamento verificável.

1. Com o modelo escolhido, selecione **Agent** no menu de modos do Chat e envie:

   ```text
   Implemente somente o plano aprovado em workshop/implementation-plan.md.
   Crie src/components/upload/TagAutocomplete.tsx e integre-o à página Upload.
   Use src/lib/mock-tag-data.ts como fonte. Não altere o contrato dos testes.
   Execute npm run test:solution, npm run lint e npm run build.
   Pare e peça aprovação se precisar ampliar o escopo.
   ```

1. Revise cada alteração antes de aceitá-la. O modo de execução é apenas um mecanismo neste workshop; configuração de custom agents e delegação pertencem aos cursos dedicados.

1. Execute os checks manualmente:

   ```bash
   npm run test:solution
   npm run lint
   npm run build
   ```

1. Marque `workshop/model-decision.md` como `CONCLUIDO`, remova os campos `[PREENCHA]`, faça commit e push:

   ```bash
   git add workshop/model-decision.md src/app/upload/page.tsx src/components/upload/TagAutocomplete.tsx
   git commit -m "feat: adicionar autocomplete de tags"
   git push
   ```

### ✅ Resultado esperado

A escolha do modelo cita diferenças observáveis e a origem de cada amostra. A implementação satisfaz os contratos sem alterar os testes nem ampliar o escopo.

<details>
<summary>Está com problemas?</summary><br/>

- Se latência ou requests não forem exibidos, registre `não disponível`; não estime valores.
- Se o teste de teclado falhar, confira qual opção recebe destaque após `ArrowDown` e se `Enter` substitui apenas o token atual.
- Não edite os testes para fazer a solução passar. Corrija o componente ou a integração.

</details>
