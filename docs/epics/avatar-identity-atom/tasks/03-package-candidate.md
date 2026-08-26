# T03 — Contratos e package candidato

## Responsabilidade

Integrar Avatar à surface pública e produzir um tarball `1.2.0` comprovável antes de alterar
consumers.

## Checklist

- [x] exportar component e types pelo entrypoint;
- [x] registrar owner/test/story/smokes no manifesto;
- [x] atualizar API report pelo comando oficial;
- [x] incluir Avatar em browser, styled e SSR smokes;
- [x] medir bundles e ajustar somente budgets necessários;
- [x] subir package version para `1.2.0`; o lockfile não repete a versão do root;
- [x] inspecionar conteúdo/metadata do tarball;
- [x] rodar full library gate uma vez.

## Resultado

- public API: 22 values, 54 types e 75 declarations;
- bundle completo: 42.743 raw / 9.209 gzip;
- slice `identity`: 4.717 raw / 1.765 gzip, dentro de 5.100 / 1.900;
- 49 files e 158 tests passaram; 27 files e 80 unit tests no coverage;
- coverage: 96,86% statements, 95,69% branches, 99,11% functions e 97,45% lines;
- 660 cenários de layout em 78 stories passaram;
- browser, styled composition, SSR e consumer tarball smokes passaram;
- candidate `langyspace-ui-1.2.0.tgz`:
  `a74968bf19d266159da40191bbda954f9a6064906bbe4c292c0d7461ff035b2a`.

O primeiro budget experimental de gzip para `identity` era 1.600 bytes e recusou os 1.765 bytes
medidos. A correção calibrou somente esse slice com margem pequena; nenhum source foi reduzido por
obfuscação ou API removida para satisfazer um número arbitrário.

## Done

Um único tarball candidato passa todos os gates, não contém tooling e está pronto para instalação
nos consumers sem tag prematuro.

## Validação focada

- `pnpm run check:api`;
- `pnpm run test:bundle`;
- `pnpm run test:package`;
- `pnpm run validate:ui`;
- checksum SHA-256 do candidate.
