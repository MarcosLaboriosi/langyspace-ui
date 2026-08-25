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

## Rollback

Checks novos podem voltar a advisory se houver falso positivo comprovado; não remover os smokes
anteriores antes da equivalência.
