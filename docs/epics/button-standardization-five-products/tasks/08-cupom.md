# T08 — Atualizar Cupom e fechar auditoria estática

## Responsabilidade

Levar o consumidor já padronizado ao mesmo release e impedir regressão.

## Subtasks

- [x] atualizar package/lockfile;
- [x] confirmar que RangeButton continua apenas contextual;
- [x] adicionar audit estático ao gate;
- [x] rodar tests/build/layout gate;
- [x] inspecionar pressed/unpressed em 390/1281/2048;
- [x] provar zero ocorrência e revisar diff;
- [x] atualizar progress.

## Conclusão

Cupom usa o release comum sem regressão do relatório.

## Validação focada

- `pnpm test`;
- `pnpm run build`;
- `pnpm run validate:ui`.
