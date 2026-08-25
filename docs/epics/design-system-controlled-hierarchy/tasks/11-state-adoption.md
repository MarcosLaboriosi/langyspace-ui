# T11 — adotar components de estado nos produtos

Status: concluída.

## Responsabilidade

Remover duplicações de status/empty/loading sem apagar diferenças reais de produto.

## Escopo

- mapear cada color alias para semântica no callsite;
- migrar Admin, Student e Teacher em lotes por component;
- preservar style local quando a equivalência falhar e documentar a decisão;
- atualizar cases de loading/empty/error/status.

## Conclusão

Duplicações aprovadas saem dos produtos e nenhuma prop cosmética é criada para forçar adoção.

## Validação focada

- tests das surfaces migradas;
- status/empty/loading screenshots em 390/1281/2048;
- product builds e focused audits.

## Resultado

- Admin, Student e Teacher importam diretamente `StatusChip`, `StatePanel`, `EmptyState` e
  `LoadingState` quando o contrato é equivalente;
- aliases cromáticos foram resolvidos no callsite para tones semânticos, sem mover significado de
  negócio para o package;
- adapters locais duplicados foram removidos; wrappers de skeleton, banners e loading inline foram
  preservados quando a estrutura ou a densidade não equivalem ao component compartilhado;
- fixtures determinísticas de erro/loading e assertions acessíveis foram adicionadas aos audits do
  Admin e Teacher.

## Evidência

- package: 37 testes, smoke Node/SSR e 36 cenários em nove larguras;
- Admin: 240 testes, 13 fluxos WCAG, 45 cenários do showcase e 1.820 cenários de layout;
- Student: build, 85 testes focados e 630 cenários de layout;
- Teacher: build, 48 testes focados e 234 cenários de layout;
- inspeção visual focada em 390/1281/2048 confirmou contenção, hierarquia e semântica dos estados.
