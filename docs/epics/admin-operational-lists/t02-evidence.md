# Evidência T02 — ActionMenu acessível

## Veredito

T02 aprovada. `ActionMenu` foi implementado isoladamente como molecule product-agnostic, sem
dependência runtime nova, adapter de router, biblioteca de ícones, backdrop, focus trap ou integração
prematura com `OperationalList`.

Isso autoriza iniciar T03. O componente ainda não está exportado pelo root, registrado no manifesto,
incluído no bundle slice ou usado por package smoke; esses contratos entram juntos em T04, depois
de `OperationalList` existir.

## Arquivos

- `src/molecules/ActionMenu/index.tsx`: state, portal, eventos, foco e markup;
- `src/molecules/ActionMenu/types.ts`: contrato público planejado;
- `src/molecules/ActionMenu/position.ts`: flip, clamp e max height privados;
- `src/molecules/ActionMenu/styles.ts`: recipe visual e reduced motion;
- `src/molecules/ActionMenu/ActionMenu.test.tsx`: unit, SSR e geometry;
- `src/molecules/ActionMenu/ActionMenu.stories.tsx`: seis cenários de Storybook.

## Contrato implementado

`ActionMenu` recebe:

- `items` com `id`, `label`, `icon`, `tone`, `disabled`, `isLoading` e `onSelect`;
- `triggerLabel` obrigatório;
- `size: sm | md` e `align: start | end`;
- `open`, `defaultOpen` e `onOpenChange` para controlled/uncontrolled;
- native div props e ref no root.

Não recebe custom trigger, coordenadas, portal target, `className` por item, router adapter ou
callback assíncrono gerenciado.

## Comportamento comprovado

- glyph ellipsis interno dentro de `IconButton`;
- popup em `document.body`, `position: fixed` e z-index 1200;
- alinhamento, viewport clamp, vertical flip e scroll interno por max height;
- neutral items preservam ordem; danger items formam grupo final com separator;
- click/Enter/Espaço abrem no primeiro enabled;
- ArrowDown/ArrowUp no trigger abrem no primeiro/último enabled;
- ArrowDown/ArrowUp/Home/End fazem roving focus e ignoram disabled/loading;
- Escape e seleção restauram o trigger;
- Tab/Shift+Tab fecham e movem para o tabbable adjacente ao trigger;
- pointer externo preserva o alvo clicado;
- resize/scroll externo fecham; scroll interno permanece aberto;
- todos disabled/loading continuam perceptíveis com foco no menu;
- zero items omite trigger/portal sem instalar listeners;
- SSR com `defaultOpen` renderiza root/trigger sem portal ou hydration mismatch;
- listeners globais existem somente enquanto o popup está aberto e limpam no unmount.

## Storybook e inspeção visual

Stories:

- `Default`;
- `TonesAndDisabled`;
- `InteractiveKeyboard`;
- `NarrowViewportFlip`;
- `Loading`;
- `StressLongLabels`.

O audit focado passou em 54 cenários, cinco stories visuais e motion normal/reduced. Foram
inspecionadas as capturas:

- `Default` em 390 px;
- `NarrowViewportFlip` em 390 px;
- `StressLongLabels` em 390 px;
- `Loading` em 1281 px.

O popup preservou hierarquia, wrapping, separator, contraste localizado, flip no canto e bounds do
viewport, sem corte ou overlap. O layout audit agora verifica bounds, accessible name e motion do
marker `data-ui-action-menu`.

## Gates

### Focados

- 11 unit tests passaram;
- 6 Storybook tests passaram;
- typecheck, ESLint e Prettier passaram;
- audit focado: 54 cenários, zero issues.

### `pnpm run validate:ui`

- architecture audit: 118 production files;
- 57 test files e 193 tests;
- coverage global: 95,89% statements, 93,38% branches, 99,48% functions e 97,77% lines;
- coverage `ActionMenu`: 96,82% statements, 94,44% branches, 100% functions/lines;
- build, API report, bundle budgets, package consumer e SSR smoke passaram;
- layout global: 816 cenários, 94 stories, zero issues.

O primeiro `validate:ui` revelou duas classificações arquiteturais e o delta deliberado de
declarations. A correção reutilizou `DOMRectReadOnly`, registrou a motion com owner/motivo/expiração
e atualizou somente as quatro declarations do ActionMenu no API report. O gate completo foi
reexecutado e passou.

## Package boundary

- `quality/public-api.json` registra as quatro declarations geradas;
- `src/index.ts`, `quality/component-manifest.ts` e bundle entries permanecem inalterados;
- o bundle público permaneceu em 52.552 bytes raw / 11.832 bytes gzip;
- nenhum candidate, tag, release ou consumer foi criado;
- T04 fará export, manifest, README, bundle slice e package smoke de forma atômica.

## Handoff para T03

`OperationalList` deve consumir `ActionMenu` pelo import local e controlá-lo por item key, garantindo
no máximo um menu aberto por lista. Não ampliar `ActionMenu` durante T03 sem um caso observado que
reabra a revisão técnica.
