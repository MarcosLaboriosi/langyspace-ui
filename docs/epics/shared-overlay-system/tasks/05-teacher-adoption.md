# T05 — Adoção Teacher

## Responsabilidade

Migrar os seis drawers modais Teacher e ampliar cobertura determinística.

## Subtasks

- [ ] instalar o mesmo candidate;
- [ ] migrar Notification e ProblemReport;
- [ ] migrar AvailabilitySettings e SlotAction;
- [ ] migrar StudentProfile e ClassDrawer;
- [ ] remover focus/Escape/scrim/shell recipes duplicados;
- [ ] adicionar audit states ausentes;
- [ ] rodar focused tests/build/layout e `validate:ui`;
- [ ] revisar screenshots mobile/dense/wide.

## Done

- seis organisms compõem Drawer público;
- tabs/forms/serviços permanecem locais;
- sem regressão de presença, calendário, aluno, notificação ou reporte.

## Validação

- component tests afetados;
- `pnpm run build`;
- focused audit dos seis states;
- `pnpm run validate:ui`.
