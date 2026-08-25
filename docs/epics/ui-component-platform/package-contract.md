# Contrato de package e budgets

## Surface publicada

O component manifest possui 19/19 components com test owner, story, browser smoke e SSR smoke
completos. O entrypoint também publica `tokens`, totalizando 20 value exports e 48 type exports.
`quality/public-api.json` registra esses nomes e hashes das 69 declarations emitidas; qualquer diff
falha com instrução explícita para revisão SemVer antes de atualizar o report.

O smoke instala o tarball em um consumer vazio e valida:

- top-level restrito a `LICENSE`, `README.md`, `audit`, `dist` e `package.json`;
- ausência de source, tests, stories, fixtures, Storybook e quality tooling;
- exports `.` e `./audit`, bin `langyspace-ui-audit`, peer ranges e `sideEffects: false`;
- import ESM, CLI do audit, SSR com CSS coletado e build Vite/TypeScript;
- render dos 19 components, inclusive os gaps anteriores: ActionLink, CompoundControl, SelectInput e
  TextareaInput.

## Bundle e tree-shaking

As medidas minificadas externalizam React e styled-components. Os budgets têm aproximadamente
5–11% de folga sobre a baseline atual e falham antes de crescimento silencioso:

| Recorte   | Raw atual | Budget raw | Gzip atual | Budget gzip |
| --------- | --------: | ---------: | ---------: | ----------: |
| Library   |    39.319 |     41.000 |      8.579 |       9.000 |
| Actions   |    13.872 |     15.000 |      3.177 |       3.500 |
| Fields    |    22.966 |     25.000 |      5.123 |       5.600 |
| Molecules |    18.864 |     21.000 |      5.342 |       5.900 |

Antes de declarar `sideEffects: false`, o recorte actions media 32.911 bytes raw. A metadata é
segura porque os módulos apenas constroem components/recipes; não registram globals, CSS global ou
efeitos de import. O report de cada execução fica em `.local/quality/bundle-report.json`.

## Coverage

A baseline V8 possui 96,67% statements, 96,11% branches, 99,06% functions e 97,29% lines. O gate
inicial é 90% por métrica: abaixo o bastante para não incentivar assertions artificiais por um
décimo percentual, acima o bastante para impedir que uma nova family entre sem contract tests. O
report fica em `.local/quality/coverage`.
