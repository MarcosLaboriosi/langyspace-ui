# Progresso

## Status

Concluído. T01–T07 estão em `main`, `@langyspace/ui@1.2.0` está publicado e os consumers estão
comprovados em produção.

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
- Admin migrou dez callsites e passou build/test/a11y/design-system, focused layout e os quatro
  shards oficiais antes do Hosting;
- Teacher migrou nove callsites visuais, passou 18 focused tests e 270 cenários com 594 leituras do
  marker antes do Hosting;
- Student removeu 77 linhas mortas e passou architecture/build/648 cenários antes do Hosting;
- o release remoto tem SHA-256
  `c2b7adb751907878b2fc904084097f29d2e433924e7e6348fcae86fa7dcfa459` e conteúdo descompactado
  idêntico ao candidate;
- Admin/Teacher/Student servem exatamente os bundles produzidos pelos builds dos commits publicados;
- o catálogo público responde 200 e contém as seis stories Avatar;
- evidência completa: [release-evidence.md](release-evidence.md).

## Próxima subtask

Nenhuma. Uma nova family exige novo maturity gate e épico próprio.

## Blockers

Nenhum.

## Decisões abertas controladas

Nenhuma.
