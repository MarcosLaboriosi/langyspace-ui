# T08 — Atualizar Cupom e fechar auditoria estática

## Responsabilidade

Levar o consumidor já padronizado ao mesmo release e impedir regressão.

## Subtasks

- [ ] atualizar package/lockfile;
- [ ] confirmar que RangeButton continua apenas contextual;
- [ ] adicionar audit estático ao gate;
- [ ] rodar tests/build/layout gate;
- [ ] inspecionar pressed/unpressed em 390/1281/2048;
- [ ] provar zero ocorrência e revisar diff;
- [ ] atualizar progress.

## Conclusão

Cupom usa o release comum sem regressão do relatório.

## Validação focada

- `pnpm test`;
- `pnpm run build`;
- `pnpm run validate:ui`.
