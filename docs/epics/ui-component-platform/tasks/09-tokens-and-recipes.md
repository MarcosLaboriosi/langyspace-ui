# T09 — Tokens e recipes

## Objetivo

Dar significado aos valores compartilhados e eliminar divergências acidentais sem criar uma API
cosmética livre.

## Passos

1. classificar literais em token, private recipe constant, singular requirement ou inconsistency;
2. revisar typography, spacing, field heights, inverse alpha e state panel dimensions;
3. produzir before/after stories para cada decisão visual;
4. verificar callsites produtivos que originaram o recipe;
5. adicionar tokens mínimos e atualizar consumers somente quando necessário;
6. documentar token purpose/usage no catálogo;
7. bloquear novas props livres no audit.

## Decisões focadas

- FilterPills `sm`/`md` typography;
- CompoundControl/field `lg` geometry;
- SegmentedControl wrapping e branch de background;
- AuthNotice info typography;
- StatePanel fill/min-height/spacing;
- Status/selection tiny text scale;
- duplicate neutral token values.

## Done

- cada mudança visual possui reason e evidence;
- nenhum token existe apenas para esconder um magic number singular;
- visual/a11y/layout gates passam;
- public API continua sem color/radius/spacing props livres.

## Resultado

- as 86 ocorrências em owners de style foram classificadas em foundations, recipe compartilhada,
  recipe privada ou borda estrutural em `literal-classification.md`;
- `FilterPills` recuperou escala monotônica de tamanho, `CompoundControl lg` passou a compartilhar
  a geometria dos fields e `SegmentedControl` preserva uma única trilha com scroll estreito;
- inverse roles e `fontSize.2xs` são os únicos tokens novos; StatePanel e demais geometrias
  singulares permanecem constants privadas;
- `neutral[400]` permanece somente como alias deprecated para não quebrar consumers v1;
- o audit rejeita props cosméticas livres com tipo `string`/`number`;
- quatro stories before/after, 72 unit tests, 68 story/axe tests e 36 cenários focados passaram.

## Rollback

Tokens aditivos podem permanecer sem uso; recipe changes são revertidos pelo commit focado e o
catálogo before/after mostra o retorno esperado.
