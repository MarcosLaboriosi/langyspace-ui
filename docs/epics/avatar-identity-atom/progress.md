# Progresso

## Status

T01–T03 concluídas. O package candidato está comprovado e a adoção Admin está em execução.

## Baseline

| Item                     | Valor                                           |
| ------------------------ | ----------------------------------------------- |
| Worktree root            | `/private/tmp/langyspace-next-component.s0jagm` |
| UI branch                | `codex/avatar-atom-rollout-20260826`            |
| UI base                  | `f91f74b0b2fc`                                  |
| Package                  | `@langyspace/ui@1.1.0`                          |
| Public components        | 20                                              |
| Avatar runtime callsites | Admin 10 / Teacher 9                            |
| Dead Avatar copy         | Student 3 files                                 |

## Evidência atual

- os cinco `origin/main` foram fetched e montados em worktrees isolados;
- directory-name matches foram reclassificados por source, props, styles, semantics e imports;
- Avatar é a única family aprovada nesta onda;
- Admin possui 158 linhas locais incluindo test, Teacher 99 e Student 77; a revisão encontrou mais
  15 linhas do recipe artesanal no drawer Teacher;
- Admin já prova image failure e decorative semantics em teste local;
- Teacher possui image/fallback e nove callsites visuais em shell, lists e drawers;
- Student possui zero imports runtime;
- Landing e Cupom não possuem Avatar;
- o recipe proposto normaliza tamanhos sem criar props para diferenças cosméticas;
- visual impact: `direct` para Admin/Teacher/library e `none` para a remoção Student isoladamente.
- Admin baseline: 36 cenários focados em 390/1281/2048, zero issue;
- Teacher baseline: 18 cenários focados em 390/1281/2048, zero issue;
- screenshots de busca, tabelas/drawers, shells, Today e Students foram inspecionadas;
- dois gaps foram transformados em requirements: assertion geométrica do marker e case da tab de
  perfil Teacher para o size `xl`.
- T02 criou o atom com API fechada, marker `lsui-sc-avatar`, cinco sizes, três tones, image/fallback
  e zero dependência de product;
- seis unit tests e seis story/axe tests passaram;
- 48 cenários de layout Avatar passaram com zero issue e screenshots de todas as variações críticas
  foram inspecionadas.
- T03 integrou Avatar a exports, manifesto, API, browser/styled/SSR smokes e slice de bundle;
- o gate completo passou com 49 files/158 tests, coverage acima dos thresholds e 660 cenários;
- o candidate `1.2.0` foi gerado com SHA-256
  `a74968bf19d266159da40191bbda954f9a6064906bbe4c292c0d7461ff035b2a`;
- a revisão do primeiro consumer encontrou um non-package `ProfileAvatar` adicional no drawer
  Teacher; ele foi incorporado ao escopo em vez de preservar uma exceção cosmética.

## Próxima subtask

T04 — concluir adoção Admin, incluindo assertions do marker e comparação after.

## Blockers

Nenhum.

## Decisões abertas controladas

Nenhuma. A comparação after continua blocking antes do release.
