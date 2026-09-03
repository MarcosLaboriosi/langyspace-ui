# Plano técnico: primitives de mensagens

## Inventário confirmado

- versão atual e tag mais recente: `1.4.1` / `v1.4.1`;
- `Avatar`, `IconButton` e `TextareaInput` têm contracts co-localizados, refs e component IDs;
- tokens existentes cobrem cor, status, spacing, radius, shadow e typography;
- components públicos exigem test, story, manifest, browser smoke e SSR smoke;
- `validate:ui` reúne arquitetura, lint, formato, types, unit/story tests, coverage, build, API,
  bundle, package e layout screenshots;
- release é uma tag `v<version>`; o workflow empacota `.tgz` e `.sha256` num GitHub Release público.

## Estrutura

```text
src/molecules/MessageBubble/
  index.tsx
  styles.ts
  types.ts
  MessageBubble.test.tsx
  MessageBubble.stories.tsx
src/molecules/MessageComposer/
  index.tsx
  styles.ts
  types.ts
  MessageComposer.test.tsx
  MessageComposer.stories.tsx
```

## API proposta

`MessageBubbleProps` estende props de `article`, exceto children, com `children`, `side`,
`timestamp`, `dateTime` e uma união discriminada que exige `statusLabel` quando `status` existe.

`MessageComposerProps` estende props de `form`, exceto children/onSubmit, com controlled value,
callbacks sem evento, copy/ícone fornecidos, limite, disabled/loading e atributos essenciais da
textarea. O componente previne submit inválido, mas não altera o conteúdo nem executa regra de
produto.

## Visual

- `MessageBubble` é alinhada pelo side, limitada a 80%/34rem e usa `overflow-wrap: anywhere` mais
  `white-space: pre-wrap`;
- incoming usa surface neutra; outgoing usa brand; failed usa feedback danger sem depender apenas
  de cor porque o status textual permanece;
- `MessageComposer` compõe `TextareaInput` e `IconButton`, empilha feedback/counter e vira uma coluna
  estável em containers estreitos somente se necessário;
- sem animation, portal, CSS global ou ThemeProvider obrigatório.

## Validação

1. testes focados e typecheck;
2. `write:api` após revisão da mudança minor, seguido de `check:api`;
3. bundle/package/SSR smokes com ambos os markers;
4. audit focado das stories e inspeção das screenshots;
5. `validate:ui` completo uma vez no candidate final;
6. `pnpm pack`, conteúdo, SHA-256 e smoke do tarball;
7. commit/push/tag/release somente com autorização explícita.

## Revisão crítica

- Produto: copy e regras de conversa permanecem nos portais.
- Tech Lead: duas molecules bastam; lista/thread/hook genérico seria abstração prematura.
- Engenharia: controlled composer não mantém estado duplicado nem apaga rascunho.
- QA: tipos, teclado, status bloqueados, texto extremo, SSR e package cobrem os principais riscos.
