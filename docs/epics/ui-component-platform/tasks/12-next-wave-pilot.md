# T12 — Inventário e piloto da próxima onda

## Objetivo

Usar a plataforma nova para decidir o próximo component, em vez de crescer a library por intuição.

## Passos

1. criar worktrees isolados das origins dos cinco products;
2. medir families repetidas por markup, behavior, semantics e computed recipe;
3. reavaliar hipóteses antigas como Title/List/Item/VerticalLogo/global styles;
4. classificar cada candidate: local, prop válida ou convergência;
5. aplicar maturity gate e critical review;
6. selecionar no máximo uma family;
7. se aprovada, package first com story/tests/a11y/smokes;
8. instalar o mesmo tarball nos consumers e medir simplificação do callsite;
9. registrar no-go se nenhuma opção melhorar manutenção.

## Evidence por candidate

- callsites e products;
- diff visual/computed styles;
- state/accessibility matrix;
- props finais versus adapters removidos;
- dependency direction;
- migration/rollback cost.

## Done

- todas as decisões possuem evidence;
- no máximo uma family piloto;
- implementação consumer fica menor e direta;
- nenhum organism/regra de negócio entra no package.

## Rollback

Não publicar o candidate antes dos consumer gates; abandonar a promoção e manter o component local
é um resultado válido.
