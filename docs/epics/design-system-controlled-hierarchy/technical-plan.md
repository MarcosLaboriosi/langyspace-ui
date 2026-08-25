# Plano técnico

## Baseline atual

| Repo               | `origin/main` | Dependência UI |
| ------------------ | ------------- | -------------- |
| langyspace-ui      | `4038675`     | package 0.6.0  |
| langyspace         | `d73ebaa`     | tarball 0.6.0  |
| langyspace-admin   | `93bb68b`     | tarball 0.6.0  |
| langyspace-student | `a4fb6da`     | tarball 0.6.0  |
| langyspace-teacher | `51f9904`     | tarball 0.6.0  |
| langyspace-cupom   | `a461f52`     | tarball 0.6.0  |

Worktrees isolados usam a branch `codex/design-system-hierarchy-20260825` sob
`/private/tmp/langyspace-design-system-hierarchy.YMowcs`. Os checkouts originais não entram em
staging, commits ou deploy.

## Evidência arquitetural

- Student e Teacher: 190 caminhos TS/TSX em comum, 115 byte-identical;
- Admin, Student e Teacher: 66 caminhos em comum, 27 byte-identical;
- `GlobalStyles.ts`, theme typing e componentes como Title/List/Item/VerticalLogo se repetem nos
  três portais;
- 30 usos de `IconButton`, 35 de `StatusChip`, 34 de `EmptyState`, 21 de `StatePanel`, 20 de
  `AuthNotice` e quatro de `AuthTokenDigits`;
- 16 wrappers de actions alteram propriedades visuais canônicas;
- seis scripts de button audit somam 595 linhas e não detectam overrides CSS/descendant selectors;
- Student/Teacher usam `icon + iconPosition`, Admin usa `leadingIcon + trailingIcon` e o package usa
  `iconStart + iconEnd`;
- `ActionLink/types` e o recipe dependem de tipos definidos em `Button`, invertendo o ownership da
  foundation;
- `ButtonVariant` mistura hierarchy e intent, enquanto `tone="brand"` cria um segundo eixo parcial;
- `shape` e `iconOnly` existem principalmente para construir adapters de `IconButton`.

## Arquitetura alvo

```text
foundations/
  tokens
  action-contracts
  status-contracts
  focus-and-motion
      ↓
primitives/
  Pressable
  Spinner
  Surface
      ↓
atoms/
  Button
  IconButton
  ActionLink
  StatusChip
  TextInput / SelectInput / TextareaInput
      ↓
molecules/
  FieldRoot
  CompoundControl / SearchInput
  StatePanel / EmptyState / LoadingState
  FilterPills / SegmentedControl
  AuthNotice / AuthTokenDigits
      ↓
products/
  auth steps, calendars, drawers, cards, workspaces and pages
```

`IconSlot` continua helper interno das actions. Não é exportado somente para preencher a camada de
atoms.

## Contrato de actions

### Foundation

- mover `size`, `density`, `variant` e style props para `foundations/actions`;
- unir `tone="brand"` ao variant `brand` e adicionar `inverse` para os usos recorrentes em surface
  escura;
- manter recipe privado e dependente apenas de foundations;
- manter heights `sm=32`, `md=40`, `lg=48`, focus ring e reduced motion atuais;
- preservar os component IDs existentes.

### Button

- ação rotulada, sempre pill;
- props públicas: variant, size, density, fullWidth, iconStart, iconEnd, isLoading e native props;
- retirar `iconOnly`, `shape` e `tone`;
- manter `ButtonVariant` como nome público por ergonomia, agora derivado da foundation;
- preservar label durante loading e o Spinner no fim.

### IconButton

- atom público sobre `Pressable` + action recipe;
- accessible-name union obrigatória;
- `shape="circle" | "rounded"` e sizes canônicos;
- variants `neutral | subtle | brand | success | danger | inverse`;
- glyph único por children e Spinner substituindo o glyph em loading;
- sem prop de cor, radius ou dimensão livre.

### ActionLink

- anchor rotulado, pill, sem loading/disabled/icon-only;
- variants aplicáveis `primary | secondary | tertiary | brand`; não adicionar `inverse` sem um
  callsite de link comprovado;
- tipos vêm da foundation, nunca de Button;
- links editoriais e router links permanecem locais.

## Foundations e theme

- exportar tokens como plain typed objects, sem exigir um ThemeProvider específico;
- package atoms usam os tokens diretamente para render idêntico em qualquer consumidor;
- produtos podem referenciar os mesmos tokens em seus themes e estender somente domínio/gradients;
- migrar `GlobalStyles` idêntico depois de provar que resets e fontes são iguais;
- Admin mantém seus semantic tokens adicionais; Student/Teacher mantêm apenas extensions diferentes;
- não introduzir `createTheme`, CSS-variable theming ou runtime override neste épico.

## Components promovidos

### Primeira promoção

- `StatusChip`: forte volume e contrato semântico; Admin é a referência de tone;
- `StatePanel`, `EmptyState`, `LoadingState`: composição já aprovada no Admin e repetição equivalente
  nos portais;
- `AuthNotice` e `AuthTokenDigits`: Student/Teacher possuem implementações idênticas e boundaries
  pequenas.

### Promoção condicionada a equivalência visual

- `FieldRoot`, native inputs, `CompoundControl`, `SearchInput`;
- `FilterPills` e `SegmentedControl`.

Se a comparação de styles mostrar diferença de produto não representável por tokens semânticos
existentes, o componente permanece local e a decisão é registrada; não será criada prop cosmética.

## Classificação dos wrappers atuais

- convergir para action canônica: TrialLessonForm Submit, Admin 42/44 px, variações puramente de
  hover/color/radius e CTA equivalentes;
- layout-only permitido: width/full-width/margin/position no container ou wrapper sem alterar recipe;
- componente de domínio sobre Pressable: controles de áudio/play/back/translation das showcases e
  range selector do Cupom;
- exceções reais: somente com selector, motivo e owner no config do audit.

## Estratégia por produto

### Landing

- substituir overrides sem valor por variants canônicos;
- extrair media controls específicos sobre Pressable;
- preservar Hero, TrialLessonForm, sticky/header e showcases em todas as larguras.

### Admin

- migrar leading/trailing para start/end em lotes pequenos;
- adotar IconButton público e retirar aliases xs/neutral/subtle/danger locais após mapear callsites;
- convergir 42/44 px e descendant selectors;
- usar os components de estado/fields compartilhados apenas quando a comparação provar equivalência;
- preservar compound-control single-surface contract.

### Student

- migrar adapter de Button e IconButton;
- mapear pink/green/grey/amber/ink para semântica no callsite;
- adotar auth atoms idênticos e components de estado aprovados;
- preservar live, checkout, planos e flashcard motion de domínio.

### Teacher

- mesma migração canônica de Student, sem copiar o resultado de forma cega;
- preservar PillButton apenas enquanto ele acrescentar density/link boundary real;
- adotar auth/state atoms e manter controls de calendário sobre Pressable;
- proteger a geometria do footer do attendance drawer.

### Cupom

- substituir RangeButton por SegmentedControl local/shared conforme T01;
- não criar adapter de Button sem reutilização;
- preservar relatório e redirects sanitizados.

## Audit central

- package fornece CLI/engine versionado e helpers de configuração;
- cada produto mantém somente config explícito: source roots, boundaries, motion allowlist e
  exceptions;
- regras AST/textuais continuam pequenas e com mensagens acionáveis;
- adicionar detecção de styled canonical action override e descendant action override;
- layout audits continuam locais porque conhecem rotas, fixtures e densidade do produto;
- fixtures negativas temporárias comprovam cada regra.

## Cobertura visual

### Package

- showcase com Button/ActionLink/IconButton em todas as variantes, sizes, densities e shapes válidos;
- loading, disabled, accessible names, stress labels e reduced motion;
- status, state panels, fields, filters e auth states quando promovidos;
- 390/1281/2048 e as nove larguras já usadas pelo package.

### Consumers

- Landing: `landing`, `trial-access-loading`, header/sticky, forms e showcases;
- Admin: login, leads/alunos loading/error/empty, search, drawers e dense actions;
- Student: home, live reserve loading, plan/checkout, handoff e auth token/error;
- Teacher: Today, attendance drawer, Students/Payouts loading, auth token/error e calendar controls;
- Cupom: report normal/stress e segmented range;
- toda rede externa bloqueada; somente fixtures/design mocks sanitizados.

Screenshots obrigatórios: 390, 1281 e 2048; 620/640/720/900 e 1280 quando a superfície cruza o
breakpoint correspondente.

## Validação e releases

1. focused unit/type/audit por subtask;
2. build/package/SSR smoke do package;
3. `pnpm pack` ou tarball equivalente local e checksum;
4. instalar o mesmo tarball local nos cinco worktrees, sem publicar;
5. focused tests e layouts por produto;
6. full `validate:ui` uma vez após os focused checks;
7. publicar versão imutável somente depois da validação cruzada;
8. substituir dependências pela URL imutável, frozen install e repetir smokes necessários;
9. commits, pushes sem force, CI/Hosting e prova de bundles live.

## Migração e rollback

- a remoção de props públicas exige major `1.0.0`; a publicação só ocorre com os cinco consumidores
  validados contra o tarball candidato;
- components promovidos posteriormente podem usar minor `1.1.0` se forem somente aditivos;
- rollback de consumidor aponta para o tarball 0.6.0; package publicado nunca é sobrescrito;
- component IDs antigos permanecem; novos components recebem IDs explícitos;
- nenhuma branch existente ou dirty tree é usada para staging.

## Riscos e mitigação

| Risco                                  | Mitigação                                                             |
| -------------------------------------- | --------------------------------------------------------------------- |
| major API quebrar consumidor oculto    | busca nos cinco repos, type tests e tarball local antes da publicação |
| token central mudar visual             | valores baseline congelados e screenshot comparison por superfície    |
| IconButton perder nome acessível       | union TypeScript, unit tests e a11y gate                              |
| field criar double surface             | contract do Admin, focused states vazio/focused/filled/error          |
| StatusChip mapear cor errada           | decisão semântica por callsite e fixtures de todos os statuses        |
| override reaparecer por cascade        | audit de wrapper/descendant e inspeção computed-style                 |
| package crescer como app framework     | out-of-scope explícito e promoção somente com evidência               |
| rollout longo misturar trabalho alheio | worktrees isolados, commits por task e ancestry checks                |

## Revisão crítica

- Product: equivalência visual e implementação simples importam mais que a árvore de pastas; toda
  mudança precisa reduzir decisões no callsite.
- Tech Lead: rejeitado criar um `UniversalComponent` ou Button polimórfico; cada semântica possui
  atom próprio e contracts vivem abaixo deles.
- Senior Engineering: rejeitado manter aliases indefinidamente; a release major permite remover a
  tradução após validação simultânea dos consumidores.
- QA: inventário estático não prova cascade, focus ou geometry; os casos focados e screenshots são
  parte de cada task, não somente do rollout final.
- UX: diferenças de 42/44 px, radius ou hover sem razão convergem; controles promocionais/pedagógicos
  não viram props do Button.
- Accessibility: semântica nativa, accessible-name unions, focus-visible e status ownership são
  invariants públicos.
- Performance: nenhuma nova runtime dependency e imports tree-shakeable; organisms permanecem nos
  apps.
- Operação: nenhum publish/deploy ocorre antes do tarball candidato passar nos seis worktrees.

## Decisões aprovadas

- release major para simplificar action API sem compat layer permanente;
- IconButton público e separado;
- tokens e contracts em foundations sem ThemeProvider obrigatório;
- primeira promoção limitada a componentes comprovadamente repetidos;
- audit engine central, layout fixtures locais;
- monolith decomposition em épicos locais posteriores;
- rollout incremental com prova visual e produção dos cinco produtos.
