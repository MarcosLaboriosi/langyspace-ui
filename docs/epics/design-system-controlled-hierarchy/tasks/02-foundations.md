# T02 — criar foundations e dependency boundaries

Status: concluída.

## Responsabilidade

Mover tokens e contracts comuns para uma camada inferior, sem mudar a API/renderização das actions.

## Escopo

- criar foundations typed para actions, focus, motion e tokens usados pelo package;
- organizar imports por camada e preservar component IDs;
- adicionar audit de dependency direction;
- documentar extensão local de theme sem ThemeProvider obrigatório.

## Conclusão

Button, ActionLink e recipes dependem da foundation e produzem markup/CSS equivalente ao baseline.

## Validação focada

- unit/type tests existentes;
- snapshot/computed styles do package;
- lint, typecheck e Node/SSR smoke.

## Evidência

- 30 testes unitários passaram em cinco arquivos;
- audit arquitetural passou em 19 arquivos produtivos e agora valida dependency direction;
- lint, typecheck, build e package smoke com import Node/SSR passaram;
- os quatro cenários visuais focados passaram em 390 px;
- component IDs, markup e API pública existente foram preservados; `tokens` foi o único export
  aditivo.
