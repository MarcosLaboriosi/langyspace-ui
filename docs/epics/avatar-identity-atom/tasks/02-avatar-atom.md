# T02 — Atom Avatar

## Responsabilidade

Implementar o menor atom que satisfaz o contrato aprovado, com test e story owners.

## Checklist

- [ ] criar `src/atoms/Avatar/{index.tsx,styles.ts,types.ts}`;
- [ ] criar `Avatar.test.tsx` antes ou junto do behavior;
- [ ] cobrir defaults, native props/ref, image, failure e URL recovery;
- [ ] criar stories Default, Sizes, Tones, WithImage, ImageFailure e Stress;
- [ ] usar somente tokens e recipe privado tipado;
- [ ] confirmar componentId, clipped content e reduced-motion não aplicável;
- [ ] revisar diff contra R01–R16.

## Done

O atom funciona isoladamente, não conhece domínio/interatividade e toda variação pública possui
evidência comportamental e visual.

## Validação focada

- `pnpm test -- Avatar.test.tsx` ou project unit equivalente;
- `pnpm run test:storybook -- Avatar` quando suportado;
- layout runner filtrado para stories Avatar em 390/1281/2048;
- typecheck, lint e Prettier dos arquivos alterados.
