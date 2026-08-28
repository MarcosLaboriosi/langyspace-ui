# Plano técnico

## Arquitetura

```text
src/molecules/ActionMenu
  index.tsx
  styles.ts
  types.ts
  position.ts
  ActionMenu.test.tsx
  ActionMenu.stories.tsx

src/molecules/OperationalList
  index.tsx
  styles.ts
  types.ts
  OperationalList.test.tsx
  OperationalList.stories.tsx
  normalizeActions.ts
```

Os dois componentes são molecules. `OperationalList` coordena conteúdo fornecido pelo produto, mas
não justifica ampliar a taxonomia `ComponentLayer` atual. Stories ficam em
`Molecules/Data/OperationalList`.

## Fluxo de render

1. consumer filtra/ordena/pagina os itens;
2. `primaryColumn` cria row header, anatomy e navegação do título;
3. `columns` criam somente data cells secondary/tertiary;
4. sorting permanece controlado em descriptors do header;
5. `getActions` é normalizado: uma primary action rotulada, até duas quick actions neutras e
   overflow; excedentes e danger vão para menu;
6. labels dos headers reaparecem no compact layout;
7. ActionMenu é controlado por item key para existir no máximo um popup;
8. empty/footer são compostos sem lifecycle interno.

## Storybook

### ActionMenu

- `Default`;
- `TonesAndDisabled`;
- `InteractiveKeyboard` com play test;
- `NarrowViewportFlip`;
- `Loading`;
- `StressLongLabels`.

### OperationalList

- `DefaultLeads`;
- `DenseStudents`;
- `Sortable`;
- `ActionHierarchy`;
- `DangerOverflow`;
- `DisabledAndLoading`;
- `Empty`;
- `NarrowCards`;
- `LongLocalizedContent`;
- `NoActions`;
- `FiftyRows` sem screenshot full-page obrigatório.

As stories não fazem requests externos. `layout-boundary` cobre os breakpoints globais e de
boundary; `visual-review` captura 390, 768, 1281 e 2048. Interaction stories comprovam navegação,
sort, menu e disabled/loading. Como o menu usa portal, play tests consultam
`canvasElement.ownerDocument.body`, não apenas o canvas da story.

## Unit e browser tests

- generic items e keys estáveis;
- primary row header, data cells secondary/tertiary e accessible table name;
- sort direction e toggle;
- link `href` e callback de router;
- command navigation;
- ações primary/quick/overflow, limites, ordem e danger;
- zero/uma/mais de duas ações;
- relação row/column `headers`, empty row com `colSpan` e footer;
- forwarding de props/ref somente onde o contrato permitir;
- menu focus, arrows, Home/End, Escape, outside click e return focus;
- popup flip e viewport bounds;
- table roles em layout amplo e compacto;
- axe e reduced motion.

## Adoção Admin

### Piloto 1: Leads contato

- manter React Query, filters, pagination, dialogs e mutations;
- substituir `ListHeader`, `LeadList`, `LeadCard`, `Actions`, `ActionMenu` e `MenuAction`;
- mapear `Converter em aluna` como primary, até duas ações frequentes como quick e demais comandos
  como overflow;
- validar default, actions, disqualify, duplicate, loading, error, empty, paginated e extreme.

### Piloto 2: Alunos

- manter derivação de rows, filtros, monthly payment e drawers;
- migrar sorting para descriptors controlados;
- trocar click de `<tr>` por navigation action explícita;
- passar WhatsApp como quick e Agenda/Arquivar como overflow;
- remover apenas CSS comprovadamente órfão após busca;
- validar todas as filas operacionais e 390/1281/1551/1552/2048.

### Ondas posteriores

1. Professoras e Leads sem pagamento;
2. Assinaturas e Repasses;
3. Cobranças sem bulk mode;
4. extensão deliberada para bulk selection, se ainda necessária;
5. despesas, influencers, planos e tables de detalhe;
6. avaliação separada de agenda/marketing, sem migração automática.

Cada onda é um task/release independente. Nenhuma remoção global de `.stu-table` ocorre até o
último callsite.

## Validation ladder

1. typecheck e unit focados;
2. Storybook interaction/axe focado;
3. layout audit focado com screenshots;
4. lint, format e coverage;
5. build, public API, bundle, SSR e package smoke;
6. full `pnpm run validate:ui` uma vez no candidate;
7. pack candidate e instalar no checkout `main` do Admin, sem branch/worktree e preservando dirty
   work;
8. testes/visual focados por piloto;
9. full `pnpm run validate:ui` Admin;
10. diff e screenshot review;
11. tag minor/checksum e URL imutável;
12. reinstall, CI/deploy Admin e prova de bundle/markers servidos.

## Rollback

- antes do tag: restaurar os components/styles locais nos callsites piloto;
- depois do tag: o package é aditivo; Admin volta à versão anterior e aos callsites locais;
- nunca apagar CSS compartilhado por busca aproximada; remover somente selectors sem callsite;
- não reescrever dados, rotas ou contracts de serviço durante rollback.

## Entregáveis

- source, tests, stories, docs e public API dos dois componentes;
- candidate e release imutável;
- dois pilotos Admin;
- screenshots e reports de layout/axe;
- inventário atualizado com decisão para todas as filas;
- release evidence e handoff para a próxima onda.
