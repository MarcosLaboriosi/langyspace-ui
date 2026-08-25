# ADR — Ref pattern em React 19

## Status

Aceita na T07.

## Contexto

O package usa dois padrões válidos: actions/primitives recebem `ref` em native props do React 19,
enquanto fields e SearchInput publicam `forwardRef`. Uma padronização mecânica mudaria declarations
sem eliminar lógica: SearchInput precisa unir ref interno, callback ref e object ref para restaurar
foco depois de clear.

## Evidência

- stack da spike: React 19.2.5, types 19.2.14 e styled-components 6.4.0;
- unit tests existentes provam object refs em ActionLink, Button, IconButton, Pressable, Spinner,
  TextInput, SelectInput e TextareaInput;
- `quality/RefInterop.test.tsx` prova object/callback refs por composição direta e `styled(...)` em
  Button, TextInput e SearchInput;
- a mesma fixture server-renderiza os dois padrões e preserva component IDs;
- typecheck, unit tests, library build e package smoke são gates da decisão.

## Decisão

Manter coexistência explícita:

- leaf components que apenas repassam native props podem tipar `ref` via `ComponentPropsWithRef`;
- components que interceptam, combinam ou direcionam o ref mantêm `forwardRef`;
- um component não muda de padrão apenas por uniformidade; a mudança precisa reduzir lógica ou
  resolver incompatibilidade comprovada;
- a declaration pública e styled-components interop fazem parte do contract.

## Consequências

O source não fica artificialmente uniforme, mas cada padrão possui um motivo verificável. Uma
migração futura de declarations será tratada como API review, com consumer compile e versionamento
adequado, não como cleanup interno.
