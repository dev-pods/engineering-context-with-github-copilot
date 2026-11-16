{%- set all_passed = (results_table | selectattr("passed") | length) == (results_table | length) %}

{%- if all_passed %}

## Passo {{ step_number }} aprovado

Todas as verificações exigidas nesta etapa foram atendidas. Aguarde a próxima lição ou, no passo final, a revisão e o encerramento do exercício.

{%- else %}

## Passo {{ step_number }} precisa de ajustes

Algumas verificações falharam. Revise os resultados e envie uma nova alteração.

> [!IMPORTANT]
> Abra **Actions > Passo {{ step_number }}** e leia o log da verificação que falhou. Corrija a entrega na mesma branch; não altere contratos ou workflows para contornar o resultado.

{%- endif %}

| Status | Verificação |
| --- | --- |
{%- for row in results_table %}
| {% if row.passed -%}OK{%- else -%}Falhou{%- endif %} | {{ row.description }} |
{%- endfor %}

**Como ler:** `OK` indica que o requisito foi atendido nesta etapa; `Falhou` pede investigação no log. A exigência de dois testes próprios começa no passo 5. Uma linha aprovada não compensa outra com falha.

{%- if tips and tips.length %}

### Dicas

{%- for tip in tips %}
- {{ tip }}
{%- endfor %}

{%- endif %}
