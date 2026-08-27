# T06 — Adoção Student e revisão final

## Responsabilidade

Migrar os shells Student e revisar o épico completo antes do release.

## Subtasks

- [ ] instalar o mesmo candidate;
- [ ] migrar Notification e ProblemReport;
- [ ] migrar CheckoutDialog e remover trap/scroll lock locais;
- [ ] mapear submit para dismissal blocked;
- [ ] adicionar audit states ausentes;
- [ ] rodar focused tests/build/layout e `validate:ui`;
- [ ] revisar diffs dos quatro repos contra requisitos e inventário;
- [ ] registrar visual verdict candidato.

## Done

- shells Student usam package sem mover regra de checkout;
- todos os requisitos e critérios de aceite possuem evidência;
- nenhum log, dead code ou override visual residual.

## Validação

- ChoosePlan/StudentPayment/Profile/AppShell tests;
- `pnpm run build` e focused layout;
- `pnpm run validate:ui`;
- busca final por infraestrutura modal duplicada.
