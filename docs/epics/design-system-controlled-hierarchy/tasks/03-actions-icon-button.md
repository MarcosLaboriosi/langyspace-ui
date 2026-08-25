# T03 — simplificar actions e publicar IconButton

Status: em andamento.

## Responsabilidade

Entregar a API final de actions, sem compat layer permanente.

## Escopo

- unir brand ao variant e retirar tone;
- retirar iconOnly/shape de Button;
- criar IconButton com accessible-name union;
- desacoplar ActionLink de Button types;
- atualizar README, showcase, unit e type tests.

## Conclusão

Cada semântica possui atom próprio e callsites novos não precisam traduzir props.

## Validação focada

- tests de todas as combinações válidas/inválidas;
- layout normal/stress/loading/reduced motion em 390/1281/2048;
- package build e SSR smoke.
