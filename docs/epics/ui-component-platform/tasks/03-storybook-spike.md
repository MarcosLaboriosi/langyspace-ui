# T03 — Spike do Storybook React/Vite

## Objetivo

Provar o catálogo na stack real antes de migrar todos os components.

## Pilotos

- Button: props/variants/loading e styled recipe;
- FieldRoot + TextInput: context, label, hint/error e composition;
- AuthTokenDigits: state, refs, paste/focus e layout responsivo.

## Passos

1. resolver versions compatíveis e registrar o motivo;
2. criar configuração mínima manualmente, sem examples gerados;
3. criar as três stories piloto e docs;
4. validar controls, backgrounds, focus e reduced motion;
5. executar build estático sem requests externas;
6. inspecionar package tarball e consumer bundle;
7. medir tempo de install/build/test e registrar go/no-go.

## Checks focados

- `pnpm storybook` com smoke headless/manual
- `pnpm run build:storybook`
- `pnpm run typecheck`
- `pnpm run build`
- `pnpm run test:package`

## Done

- os três tipos de component funcionam isolados;
- output não entra em package;
- visual 390/1281/2048 e focus são inspecionados;
- go/no-go e fallback ficam documentados.

## Rollback

Remover `.storybook`, stories piloto e dev dependencies em um commit. A biblioteca runtime fica
intacta.
