# T10 — criar atoms e molecules de estado

Status: concluída.

## Responsabilidade

Adicionar somente os components de estado/status com equivalência e volume comprovados.

## Escopo

- StatusChip semântico;
- StatePanel e wrappers EmptyState/LoadingState;
- tokens, accessibility contracts, unit/type/layout tests e docs;
- registrar components rejeitados e motivo.

## Conclusão

Package oferece composition de estado pequena, sem copy ou regras de produto.

## Resultado

- `StatusChip` expõe somente tones semânticos e mantém conteúdo extremo contido;
- `StatePanel` é o único recipe de painel e aplica acessibilidade por estado;
- `EmptyState` e `LoadingState` fixam somente a semântica que nomeiam;
- IDs explícitos preservam SSR e os smokes exercitam todos os exports novos;
- componentes de produto rejeitados estão registrados em `../state-component-decisions.md`.

## Validação focada

- unit/a11y/type tests;
- all tones/states, optional content, stress e 390/1281/2048;
- package build/SSR smoke.

Evidência: 37 testes, audit/lint/format/typecheck/build, tarball com import Node e render SSR, e 36
cenários visuais em nove larguras. Capturas normal/stress de 390, 1281 e 2048 px foram inspecionadas.
