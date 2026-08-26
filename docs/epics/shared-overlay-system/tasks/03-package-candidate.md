# T03 — Contratos e package candidate

## Responsabilidade

Integrar a family a todos os gates públicos e produzir um tarball candidate reproduzível.

## Subtasks

- [ ] atualizar entrypoint, manifesto e public API;
- [ ] adicionar browser, styled composition, SSR e package smoke;
- [ ] medir e revisar bundle budgets;
- [ ] declarar `react-dom` peer;
- [ ] rodar `validate:ui` completo;
- [ ] gerar tarball `1.3.0` e checksum.

## Done

- package completo e candidate verde;
- conteúdo publicado não inclui sources/tests/stories/quality;
- SemVer e peers explícitos.

## Validação

- `pnpm run validate:ui`;
- inspeção de `pnpm pack --dry-run` e tarball;
- hash SHA-256 registrado.
