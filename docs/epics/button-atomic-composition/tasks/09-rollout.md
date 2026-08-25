# T09 — publicar, integrar e provar produção

Status: concluída.

## Responsabilidade

Publicar o package validado e levar o mesmo artefato aos cinco produtos com prova operacional.

## Escopo

- escolher SemVer pela API final e publicar release imutável;
- verificar checksum, conteúdo, Node import e prerender do asset público;
- substituir tarball local pela URL pública e executar frozen installs;
- criar commits coerentes com staging explícito por repo;
- provar ancestry, atualizar mains sem force e acompanhar workflows;
- verificar canais Firebase live, HTTP 200 e markers dos bundles;
- atualizar documentação, rollback e handoff final.

## Checklist

- [x] AC-09 a AC-11 comprovados;
- [x] release/tag/package version consistentes;
- [x] cinco consumidores no mesmo artefato;
- [x] CI/Hosting concluídos com sucesso;
- [x] worktrees originais preservados;
- [x] épico fechado sem próxima task ambígua.

## Conclusão

Mains e produções servem o patch validado; rollback é executável e o handoff contém toda a evidência.

## Evidência do rollout

- `@langyspace/ui` `0.6.0` foi publicado na tag anotada `v0.6.0`, que resolve para `6fe2500`; o
  asset público `langyspace-ui-0.6.0.tgz` tem SHA-256
  `d4035636a72e2d892f60cf71124edeafab880a55fd4f075c4e741b670386aef2` e passou novamente por
  inspeção de conteúdo, Node import e prerender.
- Landing `d73ebaa`, Admin `d7af28e`, Student `f48a3d8`, Teacher `177cb5a` e Cupom `a461f52`
  apontam para a mesma URL imutável da release; frozen install e build/audit passaram em cada
  consumidor.
- CI do package, release e os cinco workflows de produção concluíram com sucesso pelos SHAs acima.
- `langy.space`, `admin.langy.space`, `student.langy.space`, `teacher.langy.space` e
  `cupom.langy.space` responderam HTTP 200 e serviram, respectivamente, `index-Crmp2sqi.js`,
  `index-BwHy6Xrj.js`, `index-BJviWSRB.js`, `index-DiX-7tRA.js` e `index-BbgbKG57.js`; os cinco
  bundles contêm os markers `lsui-sc-spinner` e `lsui-sc-action-link`.
- Os worktrees de rollout ficaram limpos. O checkout original do Teacher preservou os dois arquivos
  preexistentes não relacionados em `adminLesson.repository.ts` e
  `adminLessonAttendance.repository.emulator.test.ts`.

## Rollback

Reverter o commit de adoção de cada consumidor, restaurar sua URL imutável anterior de
`@langyspace/ui`, gerar o lockfile com essa versão e deixar o workflow normal promover o artefato.
A tag `v0.6.0` e seus assets não devem ser movidos nem sobrescritos.

## Validação focada

- checksum e conteúdo do release;
- `pnpm install --frozen-lockfile` em cada consumidor;
- workflows por SHA;
- Firebase live version, rota HTTP e marker servido.
