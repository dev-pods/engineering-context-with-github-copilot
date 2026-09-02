{%- set all_passed = (results_table | selectattr("passed") | length) == (results_table | length) %}

{%- if all_passed %}

## Passo {{ step_number }} aprovado

{%- else %}

## Passo {{ step_number }} precisa de ajustes

Algumas verificações falharam. Revise os resultados e envie uma nova alteração.

{%- endif %}

| Status | Verificação |
| --- | --- |
{%- for row in results_table %}
| {% if row.passed -%}OK{%- else -%}Falhou{%- endif %} | {{ row.description }} |
{%- endfor %}

{%- if tips and tips.length %}

### Dicas

{%- for tip in tips %}
- {{ tip }}
{%- endfor %}

{%- endif %}
