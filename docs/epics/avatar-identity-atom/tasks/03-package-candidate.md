# T03 — Contratos e package candidato

## Responsabilidade

Integrar Avatar à surface pública e produzir um tarball `1.2.0` comprovável antes de alterar
consumers.

## Checklist

- [ ] exportar component e types pelo entrypoint;
- [ ] registrar owner/test/story/smokes no manifesto;
- [ ] atualizar API report pelo comando oficial;
- [ ] incluir Avatar em browser, styled e SSR smokes;
- [ ] medir bundles e ajustar somente budgets necessários;
- [ ] subir package version para `1.2.0` e atualizar lockfile;
- [ ] inspecionar conteúdo/metadata do tarball;
- [ ] rodar full library gate uma vez.

## Done

Um único tarball candidato passa todos os gates, não contém tooling e está pronto para instalação
nos consumers sem tag prematuro.

## Validação focada

- `pnpm run check:api`;
- `pnpm run test:bundle`;
- `pnpm run test:package`;
- `pnpm run validate:ui`;
- checksum SHA-256 do candidate.
