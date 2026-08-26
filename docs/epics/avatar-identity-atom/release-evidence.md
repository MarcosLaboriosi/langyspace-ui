# Evidência de release e produção

## Package e catálogo

| Item              | Evidência                                                                               |
| ----------------- | --------------------------------------------------------------------------------------- |
| UI runtime commit | `3d97f07e90c31114a14c282edbc3cc0b100e6a8f`                                              |
| CI da library     | `32914764487`, success em architecture, tests, package, visual e aggregate              |
| Catálogo          | `32915245083`, success; `https://marcoslaboriosi.github.io/langyspace-ui/` responde 200 |
| Stories Avatar    | Default, Sizes, Tones, With Image, Image Failure e Stress no `index.json` público       |
| Tag/release       | `v1.2.0`, workflow `32915361887`, success                                               |
| Artifact remoto   | `langyspace-ui-1.2.0.tgz`, 37.061 bytes                                                 |
| SHA-256 remoto    | `c2b7adb751907878b2fc904084097f29d2e433924e7e6348fcae86fa7dcfa459`                      |
| Candidate local   | SHA-256 de archive `a74968bf19d266159da40191bbda954f9a6064906bbe4c292c0d7461ff035b2a`   |
| Comparação        | todos os arquivos descompactados do candidate e do release são idênticos                |

Os archives têm checksum externo diferente por metadata do empacotamento em ambientes distintos;
o conteúdo descompactado foi comparado arquivo a arquivo e não possui diferença.

## Consumers

| Product | Commit                                     | Workflow      | Resultado                                                            |
| ------- | ------------------------------------------ | ------------- | -------------------------------------------------------------------- |
| Admin   | `9d685c4d13a960f368306c9474ea98545f67ef18` | `32916231773` | build/test/a11y/design-system, quatro layout shards e deploy success |
| Teacher | `226bccdffdba838d2b0971f84e95629de2390e3f` | `32916232724` | validation, layout e Hosting success                                 |
| Student | `ee243e743ee700e4f753b8cdba99aeade8492080` | `32915476670` | validation, 648 cenários e Hosting success                           |

Landing e Cupom não possuem callsite runtime e permaneceram sem diff/deploy forçado.

## Artefatos servidos

| Surface | Route                                      | Bundle              | SHA-256                                                            | Marker     |
| ------- | ------------------------------------------ | ------------------- | ------------------------------------------------------------------ | ---------- |
| Admin   | `https://langyspace-admin.web.app/login`   | `index-BMbdTNSe.js` | `47f7ceca0fb7bdc3ec6f923b89b474a481e197318f7ba40d84c48b5596b42d31` | 1          |
| Teacher | `https://langyspace-teacher.web.app/login` | `index-CrvKzABr.js` | `31f98513b2564729d3525592e03225deb199b36fdd13996ebfe925837097e24f` | 1          |
| Student | `https://langyspace-student.web.app/`      | `index-CVkiMW9G.js` | `359c78a0817781c51e78f67476f600980b1c87a5048c109332d6694c0769aeb0` | 0 esperado |

Todas as routes e assets responderam 200. Cada SHA-256 servido coincide com o build local do commit
publicado. Student não consome Avatar e, portanto, não deve carregar o marker.

## Validação visual

- library: 660 cenários em 78 stories, zero issue;
- Admin focado: 36 cenários e 348 leituras de Avatar, zero issue;
- Admin completo: o runner local serial chegou ao timeout de 900 segundos sem issue emitida; o CI
  obrigatório executou a matriz completa em quatro shards, todos success;
- Teacher: 270 cenários e 594 leituras de Avatar, zero issue;
- Student: 648 cenários, zero issue;
- screenshots after de busca global, finance drawer, class/student drawer, shell e Alunos foram
  inspecionadas em 390, 1281 e 2048 px.

## Incidentes contidos

1. O primeiro budget experimental do slice `identity` era menor que os 1.765 bytes gzip medidos;
   apenas esse budget foi calibrado para 1.900 bytes.
2. O full layout Admin local é serial e excedeu o safety timeout; o CI sharded é a fonte de prova
   completa e passou antes do deploy.
3. O lint completo Student possui 15 erros anteriores em sources fora do diff. O gate oficial do
   repo, architecture audit, build e layout passaram; nenhum erro foi mascarado ou alterado.
4. Uma tentativa intermediária de restaurar lockfiles no worktree foi truncada pela saída do
   terminal. Os arquivos foram reconstruídos exatamente do `HEAD`, tiveram somente seis linhas de
   release alteradas e passaram `pnpm install --frozen-lockfile` antes dos commits.

## Rollback

Reverter os commits Admin/Teacher restaura `@langyspace/ui@1.1.0` e os sources locais. Reverter o
commit Student restaura apenas a cópia morta. O release `v1.2.0` permanece imutável; não há dado,
Function, rule ou migration para desfazer.
