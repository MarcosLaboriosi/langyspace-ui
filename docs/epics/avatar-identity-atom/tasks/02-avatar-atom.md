# T02 — Atom Avatar

## Responsabilidade

Implementar o menor atom que satisfaz o contrato aprovado, com test e story owners.

## Checklist

- [x] criar `src/atoms/Avatar/{index.tsx,styles.ts,types.ts}`;
- [x] criar `Avatar.test.tsx` antes ou junto do behavior;
- [x] cobrir defaults, native props/ref, image, failure e URL recovery;
- [x] criar stories Default, Sizes, Tones, WithImage, ImageFailure e Stress;
- [x] usar somente tokens e recipe privado tipado;
- [x] confirmar componentId, clipped content e reduced-motion não aplicável;
- [x] revisar diff contra R01–R16.

## Done

O atom funciona isoladamente, não conhece domínio/interatividade e toda variação pública possui
evidência comportamental e visual.

## Validação focada

- `pnpm test -- Avatar.test.tsx` ou project unit equivalente;
- `pnpm run test:storybook -- Avatar` quando suportado;
- layout runner filtrado para stories Avatar em 390/1281/2048;
- typecheck, lint e Prettier dos arquivos alterados.

## Resultado

Concluído. Seis unit tests e seis story/axe tests passaram. O layout runner executou 48 cenários em
390/1281/2048, incluindo os boundaries do stress, com zero issue. Screenshots de Sizes, Tones,
WithImage, ImageFailure e Stress foram inspecionadas; o atom permaneceu circular, não encolheu e não
criou overflow. Fallback por error e retry de URL nova ficaram no unit test determinístico.
