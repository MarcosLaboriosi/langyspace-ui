# T01 — Baseline e component manifest

## Objetivo

Substituir contagens e listas informais por uma baseline verificável, sem mudar runtime.

## Passos

1. confirmar `origin/main`, package/version/peer dependencies e worktree limpo;
2. inventariar exports de value/type, layer, owner path, component ID, test, story e smoke;
3. medir tarball, declarations e bundles consumidores atuais;
4. criar `quality/component-manifest.ts` com os 19 components;
5. criar contract test que compara entrypoint, arquivos e metadata;
6. registrar gaps como allowlist temporária apontando para T02/T04/T10;
7. provar por build/tarball que `quality` não é publicado.

## Checks focados

- `pnpm run typecheck`
- `pnpm test -- <manifest-suite>`
- `pnpm run build`
- `pnpm pack --pack-destination <temp-dir>` e inspeção do conteúdo

## Done

- baseline e manifesto concordam;
- gaps conhecidos são acionáveis;
- nenhum arquivo de runtime foi alterado;
- diff e tarball foram revisados.

## Rollback

Remover manifesto/contract test; nenhuma export ou publicação é tocada.
