# T03 — simplificar actions e publicar IconButton

Status: concluída.

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

## Evidência

- `ButtonVariant` agora é a union fechada de sete valores e `tone`, `shape` e `iconOnly` falham em
  typecheck;
- `IconButton` possui seis variants semânticos, três sizes, duas shapes, nome acessível obrigatório
  e loading que substitui somente o glyph pelo Spinner;
- 31 testes unitários passaram em seis arquivos, incluindo contratos válidos e inválidos;
- audit arquitetural, lint, typecheck, build e tarball com import Node, SSR e consumer Vite passaram;
- 12 cenários de layout passaram em 390, 1281 e 2048 px, normal/stress e motion normal/reduzido;
- screenshots mobile e desktop foram inspecionados: sem overflow, corte, salto de hierarquia ou
  perda de contraste nas surfaces claras e escuras.
