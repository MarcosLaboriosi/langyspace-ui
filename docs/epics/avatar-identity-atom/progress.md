# Progresso

## Status

T01 concluída. Planejamento, critical review e baseline visual estão aprovados; nenhum runtime foi
alterado.

## Baseline

| Item                     | Valor                                           |
| ------------------------ | ----------------------------------------------- |
| Worktree root            | `/private/tmp/langyspace-next-component.s0jagm` |
| UI branch                | `codex/avatar-atom-rollout-20260826`            |
| UI base                  | `f91f74b0b2fc`                                  |
| Package                  | `@langyspace/ui@1.1.0`                          |
| Public components        | 20                                              |
| Avatar runtime callsites | Admin 10 / Teacher 8                            |
| Dead Avatar copy         | Student 3 files                                 |

## Evidência atual

- os cinco `origin/main` foram fetched e montados em worktrees isolados;
- directory-name matches foram reclassificados por source, props, styles, semantics e imports;
- Avatar é a única family aprovada nesta onda;
- Admin possui 158 linhas locais, Teacher 99 e Student 77;
- Admin já prova image failure e decorative semantics em teste local;
- Teacher possui image/fallback e oito callsites em shell, lists e drawer;
- Student possui zero imports runtime;
- Landing e Cupom não possuem Avatar;
- o recipe proposto normaliza tamanhos sem criar props para diferenças cosméticas;
- visual impact: `direct` para Admin/Teacher/library e `none` para a remoção Student isoladamente.
- Admin baseline: 36 cenários focados em 390/1281/2048, zero issue;
- Teacher baseline: 18 cenários focados em 390/1281/2048, zero issue;
- screenshots de busca, tabelas/drawers, shells, Today e Students foram inspecionadas;
- dois gaps foram transformados em requirements: assertion geométrica do marker e case da tab de
  perfil Teacher para o size `xl`.

## Próxima subtask

T02 — implementar o atom Avatar com unit tests e stories, sem ainda alterar consumers.

## Blockers

Nenhum.

## Decisões abertas controladas

Nenhuma para T02. A comparação after continua blocking antes do release.
