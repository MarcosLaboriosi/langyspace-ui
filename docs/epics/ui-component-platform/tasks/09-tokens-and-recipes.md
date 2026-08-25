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

## Rollback

Tokens aditivos podem permanecer sem uso; recipe changes são revertidos pelo commit focado e o
catálogo before/after mostra o retorno esperado.
