# T13 — adotar auth, field e filter components

Status: pendente.

## Responsabilidade

Migrar duplicações comprovadas preservando state machines e adapters de formulário nos produtos.

## Escopo

- Student/Teacher AuthNotice e AuthTokenDigits;
- Admin field/compound/search where equivalent;
- filter/segmented consumers nos três portais e Cupom;
- retirar arquivos duplicados somente após zero imports.

## Conclusão

Flows continuam explícitos e locais, enquanto comportamento visual/interativo está centralizado.

## Validação focada

- auth and form focused tests;
- login/register/search/filter states em mobile/dense/wide;
- builds e accessibility checks aplicáveis.
