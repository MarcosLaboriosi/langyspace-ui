# Evidência T07 — release imutável e produção Admin

## Veredito

T07 concluída. `@langyspace/ui@1.4.0` foi publicado como release GitHub imutável, o Admin passou a
fixar a URL exata desse artifact e os pilotos de Leads e Alunos foram colocados no canal live do
Firebase Hosting com prova de rota, bundle, checksum e markers servidos.

Todo o trabalho permaneceu em `main`, conforme orientação explícita. Alterações paralelas do editor
de perfil no Admin foram preservadas e versionadas pelo fluxo responsável antes do commit das
listas; nenhum branch, reset ou stash foi criado.

## Release da UI library

| Item                | Evidência                                                                                |
| ------------------- | ---------------------------------------------------------------------------------------- |
| Runtime commit      | `24c65f626635b203e5001b0f2a0f836b70139e0d`                                               |
| CI da `main`        | run `33161079150`, package, architecture, tests, visual e aggregate success              |
| Tag                 | `v1.4.0`, anotada no runtime commit                                                      |
| Workflow de release | run `33161750198`, success em 10m50s                                                     |
| Release             | `https://github.com/MarcosLaboriosi/langyspace-ui/releases/tag/v1.4.0`                   |
| Artifact remoto     | `langyspace-ui-1.4.0.tgz`, 53.352 bytes                                                  |
| SHA-256 remoto      | `806cd071be9e8f10a79f7e7697a2a5cc813c7e41396ada3304f252a296f3a194`                       |
| Candidate local     | 53.270 bytes, SHA-256 `6366538346b571482a01dfc8e191353820b267d16178c5c45852f9dd31cb3e60` |

O tarball e o checksum foram baixados anonimamente pela URL pública. O SHA-256 do download confere
com o arquivo `.sha256` do release. Os archives local e remoto possuem metadata de empacotamento
diferente, mas todos os arquivos descompactados são idênticos.

O `validate:ui` local da library passou com:

- 214 tests;
- cobertura global de 96,38% statements, 92,59% branches, 99,54% functions e 98,06% lines;
- API pública com 27 values, 79 types e 96 declarations;
- library bundle de 77.780 bytes raw / 17.204 bytes gzip;
- molecules slice de 63.856 bytes raw / 14.405 bytes gzip;
- package browser/SSR smoke;
- 942 cenários em 105 stories, zero issue geométrica.

O CI da `main` repetiu todos os jobs e o workflow da tag repetiu o `validate:ui` antes de empacotar.
Capturas finais de `OperationalList` densa/long content e `ActionMenu` com flip foram inspecionadas
em 390, 1281 e 2048 px.

## Instalação e commits Admin

O Admin fixa exatamente:

```text
https://github.com/MarcosLaboriosi/langyspace-ui/releases/download/v1.4.0/langyspace-ui-1.4.0.tgz
```

`pnpm install --frozen-lockfile` passou e os exports runtime `ActionMenu` e `OperationalList` foram
confirmados no package instalado.

| Commit                                     | Escopo                                                         |
| ------------------------------------------ | -------------------------------------------------------------- |
| `fcc80d91645795238a39273667812a2d7499008d` | dependency imutável, pilotos Leads/Alunos, tests e audits      |
| `87c44f778a7e060f225e68537bbc037f7fce6ab9` | estabilização do teste de matrícula com cadastro reaproveitado |

O teste estabilizado não preenche mais nascimento ou objetivo depois de selecionar um cadastro
existente que já possui esses dados; o caso recebeu o mesmo timeout explícito de 30s dos fluxos de
integração vizinhos.

## Gates Admin

- architecture audit: 142 production source files;
- lint: passed;
- tests: 33 files e 316/316 tests passed;
- build: passed;
- accessibility: 27 flows, WCAG A/AA e focus entry/restoration;
- design system: 45 cenários, zero issues;
- teste focado final do cadastro reaproveitado: passed em 13,58s;
- testes focados finais das listas: 6 passed;
- casos de ação de Leads/Alunos: 24 cenários, 24 tables, 1.152 cells, zero issues;
- reconciliação PIX repetida isoladamente: 2 cenários, zero issues.

O `validate:ui` integral avançou por architecture, lint, 316 tests, build, a11y e design system. A
matriz layout global parou primeiro por timeout ao encontrar o radio de conciliação PIX e, numa
execução focada ampla posterior, por timeout ao abrir `Agenda` em 1551 px. Ambos os estados passaram
ao serem repetidos isoladamente com o timeout de interação de 30s, sem mudança de assertion ou
issue geométrica. As matrizes completas específicas dos pilotos permanecem registradas em
`t05-evidence.md` e `t06-evidence.md`.

## Deploy e produção

Os workflows Admin `33162624865` e `33163604492` falharam no job de detecção antes de executar
qualquer step; validate, shards e deploy foram skipped. Portanto, eles não são evidência contra o
código nem prova de produção.

Com a autorização da T07 e após os gates locais, foi usado o fallback exato:

```text
npx firebase-tools deploy --only hosting:admin --project langyspace-564b5
```

O deploy publicou somente o site `langyspace-admin`, versão Firebase `0fab868ce2168065`, no canal
live. Nenhuma Function, Rule, dado, mensagem ou provider foi alterado.

## Prova pública

As quatro verificações responderam HTTP 200:

- `https://langyspace-admin.web.app/leads?area=contato`;
- `https://langyspace-admin.web.app/alunos`;
- `https://admin.langy.space/leads?area=contato`;
- `https://admin.langy.space/alunos`.

O HTML servido referencia `assets/index-Bjoz4iip.js`. O bundle remoto e o build local possuem o
mesmo SHA-256:

```text
36cc345b5b8ba9b11526d3ba17e13158378cf5d9b374c9b046056bc4b78f4941
```

O asset remoto contém um marker `data-ui-action-menu` e quatro ocorrências de
`data-ui-operational-list-row`. Ele responde com cache imutável e ETag
`144f265a599d9dcc8c94afcdee67b638be172085b9410c303395308ebe1203a1`.

## Rollback

O rollback é reinstalar a URL imutável de `v1.3.0` e reverter os commits Admin de adoção. O release
`v1.4.0` é aditivo e não deve ser apagado ou substituído.

## Handoff para T08

T08 deve revisar separadamente as filas financeiras e decidir, por família, entre migrar, estender o
contrato depois ou manter a implementação local. Nenhuma ação financeira, seleção em lote ou
mutation de provider entra automaticamente no V1 publicado.

## Fechamento pós-release

A revisão foi concluída em [t08-evidence.md](t08-evidence.md). Ela não alterou o artifact publicado:
classificou os callsites restantes, separou a proposta de bulk selection e abriu a próxima onda com
Assinaturas como primeiro escopo pequeno.
