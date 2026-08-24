# T05 — Migrar Admin

## Responsabilidade

Substituir buttons nativos e selectors legados segundo a taxonomia semântica já aprovada.

## Subtasks

- [x] atualizar package/lockfile e wrappers Button/IconButton;
- [x] migrar TextButton, FilterPills, SegmentedControl, AppShell, AdminPage e busca para Pressable ou Button;
- [x] migrar GuidedWorkSessionPanel por grupo decisório;
- [x] migrar InvoiceBatchPanel por grupo decisório;
- [x] migrar markup do AdminPortal por famílias `.pill`, `.ico-btn`, `.link-btn`, `.back-link` e destrutivas;
- [x] remover overrides locais sem consumer ou contrários aos tamanhos canônicos;
- [x] ampliar `test:design-system`/audit estático e testes focados;
- [x] rodar tests/build/accessibility/design-system/layout gate;
- [x] inspecionar screenshots 390/1281/2048 e revisar diff;
- [x] provar zero ocorrência e atualizar progress.

## Conclusão

Zero button nativo de produção e nenhuma hierarquia/ação operacional mudou de significado.

## Validação focada

- testes de Button/IconButton/TextButton/FilterPills/SegmentedControl;
- testes de GuidedWorkSession e InvoiceBatch;
- `pnpm run test`;
- `pnpm run validate:ui`.
