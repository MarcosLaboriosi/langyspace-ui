# Plano técnico

## Baseline protegida

- base: `origin/main` em `ae654a7`, package `@langyspace/ui@1.0.0`;
- React 19, TypeScript 6, Vite 8, Vitest 4, styled-components 6 e Node 24;
- 19 components exportados, 46 unit tests, package/SSR/layout audits existentes;
- os cinco products usam o release imutável 1.0.0 e não entram na primeira fase;
- nenhum component ID, export ou recipe muda na instalação inicial do catálogo.

## Arquitetura alvo

```text
src/
  foundations/
    accessibility/
    actions/
    fields/
    selection/
    tokens/
  primitives/
    Pressable/
    Spinner/
  internal/
    FieldControlContext/
    IconSlot/
  atoms/
    Button/
      index.tsx
      styles.ts
      types.ts
      Button.test.tsx
      Button.stories.tsx
    ...
  molecules/
    ...
  index.ts

.storybook/
  main.ts
  preview.tsx
  vitest.setup.ts

quality/
  component-manifest.ts
  contracts/
  fixtures/
  story-audit/
```

`quality` é build/test tooling e não entra em `src/index.ts` nem no tarball. Foundations exportadas
continuam plain TypeScript/styled recipes, sem ThemeProvider obrigatório.

## Unidade de component

Cada component público deve responder cinco perguntas no mesmo diretório:

| Arquivo                 | Pergunta respondida                               |
| ----------------------- | ------------------------------------------------- |
| `index.tsx`             | qual markup/behavior compõe o contract?           |
| `types.ts`              | quais decisões o consumidor pode tomar?           |
| `styles.ts`             | qual recipe o component possui?                   |
| `Component.test.tsx`    | quais invariants de unidade/composição ele prova? |
| `Component.stories.tsx` | quais estados válidos uma pessoa pode ver/testar? |

`index.tsx` não será renomeado nesta etapa. Ele deixa o import `./Button` enxuto e a pasta já
nomeia o source. Testes e stories ganham nome porque aparecem isolados em output, busca, coverage e
Storybook.

Wrappers públicos (`EmptyState`, `LoadingState`) podem ter testes curtos que provem defaults e
ownership sem duplicar a matriz inteira de `StatePanel`.

## Component manifest

Criar metadata test-only tipada com uma entrada por export público:

```ts
interface ComponentContract {
  exportName: string
  layer: 'primitive' | 'atom' | 'molecule'
  ownerPath: string
  storyTitle: string
  smoke: 'render' | 'import'
  visual: boolean
  interactive: boolean
}
```

O manifesto não contém JSX, copy de produto ou imports de runtime. Um contract test compara suas
entries com o entrypoint e verifica a presença de teste/story. Os smokes consomem a mesma lista
somente para conferir completeness; fixtures de render permanecem explícitas e tipadas para evitar
um universal renderer cheio de casts.

## Storybook

### Instalação incremental

1. criar uma spike em commit/task isolada com Button, FieldRoot e AuthTokenDigits;
2. confirmar dev/build, React 19 refs, styled component IDs, no ThemeProvider e CSS SSR expectations;
3. confirmar Vitest addon/a11y compatibility com as versões realmente resolvidas;
4. inspecionar tarball e bundle para provar que Storybook não entrou no package;
5. somente depois migrar os outros components.

Não usar blindly o initializer se ele reformatar source/config ou gerar examples. Instalar os
pacotes necessários e criar a configuração mínima de forma revisável.

### Organização

```text
Foundations/Tokens
Primitives/Pressable
Primitives/Spinner
Atoms/Actions/Button
Atoms/Actions/IconButton
Atoms/Fields/TextInput
Molecules/Fields/FieldRoot
Molecules/Selection/FilterPills
...
```

Usar CSF tipado com `satisfies Meta<typeof Component>` e `StoryObj<typeof meta>`. Default args e
argTypes documentam somente decisions públicas. Decorators globais ficam limitados a reset/background
necessários; containers de layout específicos pertencem a cada story.

### Taxonomia de stories

- `Default`: menor uso válido;
- `Variants`/`Sizes`: matrizes estáticas, sem controls que gerem combinações inválidas;
- `States`: disabled/loading/error/focus;
- `Stress`: long label, unbroken token e narrow container;
- `Interaction`: clear, paste, selection, keyboard;
- `Composition`: uma composição recomendada, sem regra de app.

Stories não devem consultar Firebase, fazer fetch, usar dados reais ou depender de clock/rede.

### Publicação

- todo PR relevante: `storybook-static` como artifact;
- `main`: workflow de Pages preferido, com `contents: read`, `pages: write` e `id-token: write`
  apenas no job de deploy;
- release de package: linkar o catálogo construído do mesmo commit;
- fallback: artifact de CI caso Pages ainda não esteja ativado;
- Chromatic fica como decisão futura, não blocker.

## Estratégia de testes

### Unit tests

- setup central com jest-dom/cleanup;
- import local para markup/behavior/styles internos;
- `Component.test.tsx` por owner;
- type contracts pequenos podem ficar em `Component.types.test.tsx` ou em uma suite foundation;
- evitar assertions que apenas repetem implementation sem proteger contract.

### Story/interaction tests

- render de toda story como smoke;
- `play` functions para behavior dependente do browser;
- a11y com `parameters.a11y.test = 'error'` por default;
- focus/keyboard/paste/clear/selection cobertos onde aplicável;
- violação conhecida nunca vira `off` global.

### Layout/visual tests

Refatorar o runner em:

```text
story manifest -> abre story isolada -> aplica viewport/motion/content
               -> assertions genéricas + contract-specific assertions
               -> screenshot/report por story
```

Assertions genéricas:

- page/component overflow e containment;
- minimum target/height quando o contract define;
- focus-visible perceptível;
- reduced motion;
- sem layout shift em loading;
- texto acessível permanece no DOM;
- exactly-one selection somente para o contract que exige.

Assertions específicas ficam em módulos pequenos nomeados e selecionam `data-*` público de audit
ou role/name. Evitar depender de generated styled-components classes. Component IDs explícitos
continuam apenas para SSR/audit de recipe, não como API de style do consumidor.

Widths globais: 390, 1281 e 2048. Cada story declara boundary adicional somente quando seu layout
muda. Screenshots são inspecionados manualmente antes de estabelecer qualquer image baseline.

## Foundations e APIs

### Accessibility

Mover `AccessibleName` para uma foundation/internal type e aplicar XOR real. Criar helpers pequenos
para combinar IDREFs (`aria-describedby`) sem apagar consumer/context values.

### Fields

Mover `FieldControlSize`, recipe e style props de `atoms/fieldControlStyles.ts` para
`foundations/fields`. Preservar re-exports públicos durante a mudança. Definir uma única family de
height/typography/radius e registrar exceções de Textarea como behavior multiline, não outro field.

### Selection

Mover `ChoiceValue`/`ChoiceOption` para `foundations/selection`. Modelar text label versus custom
label com accessible name. `FilterPills` e `SegmentedControl` continuam molecules distintas;
compartilhar types não significa fundir behavior.

### CompoundControl

Spike em duas opções:

1. compound context consumido somente por inputs do package, propagando disabled/invalid/size;
2. slots tipados (`control`, `leading`, `trailing`) com contract estrito.

Rejeitar `cloneElement` genérico ou descendant magic que aceite qualquer ReactNode sem conseguir
garantir estado. Escolher a menor API que mantenha SearchInput e o currency field atuais simples.

### SearchInput

Modelar clear como union:

```ts
type ClearAction =
  | { onClear?: never; clearLabel?: never }
  | { onClear: () => void; clearLabel: string }
```

Preservar focus após clear e input native props. Mudança de type deve ser validada nos consumers
antes de release; como os callsites atuais já fornecem label, tende a ser non-breaking na prática.

### AuthTokenDigits

Definir supported lengths a partir dos fluxos reais antes do tipo final. A implementation deve ser
segura para mudança de length, controlled/uncontrolled, paste parcial/completo, Backspace e arrows.
Autofocus deve ocorrer deterministicamente; se o delay for necessário, deve ser configurado no
flow owner e não como magic number do component.

### Ref pattern

A spike deve comparar:

- declaration gerada;
- `<TextInput ref={objectRef}>` e callback ref;
- styled extension;
- React 19 StrictMode;
- SSR render;
- Vite consumer build;
- compatibilidade dos cinco product typechecks.

Adotar um padrão somente se o diff reduzir code sem reduzir compatibilidade. Caso contrário,
documentar coexistência por categoria.

## Tokens e styles

Inventariar literais por significado, não por regex count:

| Classe de valor                | Decisão                                       |
| ------------------------------ | --------------------------------------------- |
| escala semântica repetida      | token foundation                              |
| detalhe privado de um recipe   | constante privada nomeada                     |
| diferença sem razão de produto | convergir para token/recipe existente         |
| requisito geométrico singular  | manter local com comment/story/test           |
| valor livre fornecido por prop | rejeitar, salvo contract semântico comprovado |

Prioridades: typography abaixo de xs, regular weight, spacing intermediário, field heights,
inverse alpha e panel dimensions. Não criar aliases duplicados (por exemplo, dois neutral values
iguais) sem meaning distinto.

Correções visuais (`FilterPills`, Compound lg, Segmented wrap/background, AuthNotice typography,
StatePanel fill) devem usar stories before/after e consumers relevantes. Margin externa de
AuthNotice pode ser removida com owner de spacing no parent.

## Package, API e bundle

### Contract checks

- build declarations e comparar uma API report revisável ou snapshot estrutural;
- validar `exports`, types e bin no tarball real;
- browser consumer e SSR consumer cobrem as 19 exports;
- verificar component IDs determinísticos onde styled-components/SSR exige;
- testar ESM import puro e ausência de CSS asset inesperado;
- validar package metadata com ferramenta consolidada apenas se a spike justificar dependency.

### Bundle

Criar consumers mínimos para Button, field e molecule composta e registrar tamanho gzip/brotli e
modules. Primeiro medir tree-shaking da entry única; subpath exports só entram se houver ganho real e
sem quebrar a ergonomia.

Storybook, stories, tests, quality fixtures e docs não podem aparecer no tarball ou consumer graph.

## Audit engine

1. quebrar o teste sintético em fixtures por rule;
2. definir mensagens com rule ID, path, line e remediation;
3. manter regex nas rules simples e comprovadas;
4. migrar para AST apenas imports/JSX/styled composition em que aliases gerem falso negativo;
5. adicionar rules para test/story naming e layer ownership;
6. validar o engine empacotado no smoke consumer;
7. versionar exceptions com owner/reason/expiry.

## Pipeline de promoção

Depois da plataforma base:

1. medir candidates nos cinco products no mesmo commit baseline;
2. agrupar por semântica/markup/recipe, não por filename;
3. classificar como local, prop legítima ou convergência;
4. pontuar reuso, API reduction, visual equivalence, a11y e migration risk;
5. escolher no máximo uma family piloto;
6. construir no package com story/tests/smokes antes de tocar consumers;
7. instalar um tarball candidato nos consumers aplicáveis;
8. abandonar a promoção se o callsite ficar mais complexo que a implementação local.

Candidates conhecidos do épico anterior (`Title`, `List`, `Item`, `VerticalLogo`, global styles)
entram como hipóteses, não como backlog aprovado.

## Sequência de execução

```text
T01 baseline/manifest
  -> T02 naming/test ownership
  -> T03 Storybook spike
  -> T04 story migration
  -> T05 a11y/interaction
  -> T06 layout runner migration
  -> T07 foundations/contracts
  -> T08 component correctness
  -> T09 tokens/recipes
  -> T10 package/API/bundle
  -> T11 audit/governance
  -> T12 candidate inventory/pilot decision
  -> T13 catalog/release/rollout
```

T07–T10 podem ser refinadas em commits menores, mas não começam antes de T04 estabelecer stories de
baseline. Isso impede corrigir styles sem uma comparação visual isolada.

## Gate por task

1. focused test/type/story da área;
2. lint/format dos changed files;
3. Storybook build para task visual/story;
4. focused Playwright widths/states;
5. screenshot inspection e registro no progress;
6. package/build/SSR smoke para API/runtime change;
7. full `validate:ui` uma vez ao final da task integrada;
8. diff review e commit Conventional Commit.

## Release, rollout e rollback

- catalog-only pode ir para Pages sem nova package version;
- internal/non-runtime renames não exigem consumer rollout;
- additive runtime/API usa minor depois de tarball candidate;
- breaking contract usa épico major separado;
- consumers recebem exatamente o mesmo tarball/checksum;
- cada product executa focused gate + full UI gate conforme impacto;
- deploy de product só ocorre se seu bundle mudou;
- rollback de catalog reverte workflow/Pages; rollback de runtime fixa o último tarball imutável;
- release proof inclui CI, release asset/checksum, catalog do mesmo SHA e bundles live aplicáveis.

## Riscos

| Risco                             | Mitigação                                                 |
| --------------------------------- | --------------------------------------------------------- |
| Storybook inflar dependencies/CI  | spike, cache, artifact separado e tarball inspection      |
| story duplicar unit test          | matriz clara de responsabilidades                         |
| visual baseline congelar bug      | inspeção antes de baseline e consumer evidence            |
| refactor de layer quebrar exports | re-export, API diff e tarball consumer                    |
| corrigir recipe regredir layout   | stories + products nos callsites comprovados              |
| manifest virar segunda API manual | contract test contra entrypoint e metadata mínima         |
| audit AST virar projeto paralelo  | migrar somente rules com falso negativo demonstrado       |
| Pages expor dados                 | fixtures sintéticas e network block                       |
| promover components cedo demais   | maturity gate e permissão para concluir sem novos exports |
| full gate ficar lento             | focused jobs durante execução, full gate único por marco  |
