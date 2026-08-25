# T07 — migrar Student

Status: concluída.

## Responsabilidade

Remover adapters de action e aliases de cor preservando live, planos, pagamento e auth.

## Escopo

- migrar Button/IconButton para slots e variants semânticos;
- retirar aliases pink/green e overrides paralelos;
- preservar domain motion e loading right-slot;
- adicionar cobertura de auth/icon-only quando faltante.

## Conclusão

Student usa a API pública diretamente ou mantém boundary com responsabilidade documentada.

## Validação focada

- action/auth focused tests;
- home, live-reserve-loading, plans/checkout, handoff e auth em 390/1281/2048;
- build e screenshots normal/stress.

## Evidência

- 133 testes focados de actions, auth, checkout, handoff e páginas integradas passaram;
- layout audit focado passou em 110 cenários nas larguras 390/768/1280/1281/2048;
- o full `validate:ui` passou com build e 630 cenários, sem problemas geométricos;
- home, live loading, planos, checkout, handoff e login foram inspecionados visualmente.
