# T10 — Package, SSR, API e bundle quality

## Objetivo

Provar que a surface documentada é exatamente a surface publicada e consumível.

## Passos

1. render/import de ActionLink, CompoundControl, SelectInput e TextareaInput nos gaps atuais;
2. derivar completeness check do component manifest;
3. validar `exports`, types, audit subpath, bin, files e peer dependencies no tarball;
4. gerar/revisar API report ou structural snapshot;
5. criar consumers mínimos para action, field e molecule;
6. medir bundle/module graph e tree-shaking;
7. executar coverage baseline e propor thresholds progressivos;
8. impedir Storybook/stories/tests/fixtures no package.

## Checks

- `pnpm run build`
- package consumer build
- SSR smoke e collected CSS
- audit CLI do tarball
- API diff
- bundle/coverage reports

## Done

- 19/19 exports cobertos;
- tarball possui somente files aprovados;
- remoção de API exige review/versionamento;
- bundle baseline está registrado antes de decidir subpath exports;
- thresholds focam contracts críticos, não vanity percentage.

## Resultado

- manifest 19/19 completo em owner test, story, browser smoke e SSR smoke;
- tarball consumer valida conteúdo, exports, bin, peers, ESM, audit, SSR/CSS e browser build;
- snapshot estrutural cobre 20 values, 48 types e 69 declaration files;
- `sideEffects: false` reduziu o recorte actions de 32.911 para 13.872 bytes raw;
- budgets calibrados cobrem library/actions/fields/molecules em raw e gzip;
- coverage V8 ficou em 96,67/96,11/99,06/97,29, com threshold inicial de 90 por métrica.

## Rollback

Checks novos podem voltar a advisory se houver falso positivo comprovado; não remover os smokes
anteriores antes da equivalência.
