# T06 — migrar Admin

Status: pendente.

## Responsabilidade

Adotar actions canônicas no portal denso sem regressão de wrapping, fields ou drawers.

## Escopo

- migrar leading/trailing para iconStart/iconEnd;
- adotar IconButton e remover adapter/aliases cosméticos;
- convergir 42/44 px e descendant overrides sem função;
- manter somente boundaries de produto comprovadas.

## Conclusão

Actions densas usam API canônica e nenhum footer/drawer altera geometry por cascade.

## Validação focada

- tests de base/action e design-system audit;
- login, leads, alunos, search e drawers em 390/1281/2048 e boundaries 620/1280;
- a11y e screenshot inspection de states densos.
