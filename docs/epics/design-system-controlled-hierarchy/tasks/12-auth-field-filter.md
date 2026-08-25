# T12 — criar auth, field e filter components

Status: pendente.

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
