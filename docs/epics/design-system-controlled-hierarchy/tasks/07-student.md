# T07 — migrar Student

Status: pendente.

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
