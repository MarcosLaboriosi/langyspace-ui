# T04 — Stories de todos os components

## Objetivo

Dar a cada export público uma representação visual isolada, documentada e determinística.

## Lotes

1. primitives e actions;
2. status/state;
3. native fields e compound/search;
4. selection;
5. auth;
6. foundations/tokens pages.

## Passos por component

1. mapear props e combinações válidas;
2. criar `Default`, variations, states, stress e composition aplicáveis;
3. configurar controls sem expor transient/internal props;
4. usar fixtures sintéticas estáveis;
5. declarar widths/motion/visual metadata;
6. revisar docs/description/defaults;
7. atualizar manifesto e paridade com showcase.

## Checks focados

- Storybook build por lote
- render smoke das stories do lote
- screenshot 390/1281/2048
- typecheck/lint/format

## Done

- 19/19 components com stories;
- zero rede/dado real;
- states do showcase mapeados;
- README e stories não se contradizem.

## Rollback

Cada lote é commit independente; showcase permanece disponível até T06.
