# T05 — Migrar Admin

## Responsabilidade

Substituir buttons nativos e selectors legados segundo a taxonomia semântica já aprovada.

## Subtasks

- [ ] atualizar package/lockfile e wrappers Button/IconButton;
- [ ] migrar TextButton, FilterPills, SegmentedControl, AppShell, AdminPage e busca para Pressable ou Button;
- [ ] migrar GuidedWorkSessionPanel por grupo decisório;
- [ ] migrar InvoiceBatchPanel por grupo decisório;
- [ ] migrar markup do AdminPortal por famílias `.pill`, `.ico-btn`, `.link-btn`, `.back-link` e destrutivas;
- [ ] remover CSS/classes sem consumer;
- [ ] ampliar `test:design-system`/audit estático e testes focados;
- [ ] rodar tests/build/accessibility/design-system/layout gate;
- [ ] inspecionar screenshots 390/1281/2048 e revisar diff;
- [ ] provar zero ocorrência e atualizar progress.

## Conclusão

Zero button nativo de produção e nenhuma hierarquia/ação operacional mudou de significado.

## Validação focada

- testes de Button/IconButton/TextButton/FilterPills/SegmentedControl;
- testes de GuidedWorkSession e InvoiceBatch;
- `pnpm run test`;
- `pnpm run validate:ui`.
