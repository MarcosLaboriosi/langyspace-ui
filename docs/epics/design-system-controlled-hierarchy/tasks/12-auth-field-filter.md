# T12 — criar auth, field e filter components

Status: concluída.

## Responsabilidade

Adicionar visual/interaction components pequenos sem importar flow, router ou form library.

## Escopo

- AuthNotice e AuthTokenDigits;
- FieldRoot e native inputs;
- CompoundControl e SearchInput;
- FilterPills e SegmentedControl quando a equivalência for comprovada;
- unit/a11y/type/layout tests e docs.

## Conclusão

Components compartilhados têm APIs narrow e children/native-first; adapters de form continuam locais.

## Validação focada

- controlled/uncontrolled token tests, paste/backspace/focus;
- field hint/error/focus and compound single-surface cases;
- filters keyboard/selection and package SSR/layout.

## Resultado

- `AuthNotice` e `AuthTokenDigits` foram promovidos sem flow, service, resend, router ou copy fixa;
- `FieldRoot` compõe context acessível com `TextInput`, `SelectInput` e `TextareaInput` native-first;
- `CompoundControl` é o único owner da surface e `SearchInput` devolve foco após clear;
- `FilterPills` diferencia densidade `sm | md`; `SegmentedControl` diferencia surface
  `light | inverse` e shape `rounded | pill`, sem medidas livres;
- tokens de fields são separados dos tokens de actions para impedir regressão cruzada de altura.

## Evidência

- 45 testes unitários cobrem controlled/uncontrolled, sanitização, paste, backspace, foco,
  hint/error, single-surface, clear e seleção exclusiva;
- audit arquitetural passou com 67 production files e nenhuma inversão de camada;
- tarball passou import Node, SSR, typecheck e build de consumidor com todos os novos contracts;
- 12 cenários focados em 390/1281/2048, normal/stress e motion normal/reduced passaram e foram
  inspecionados sem overflow ou perda de hierarquia.
