# Investigação técnica

## Método e baseline

Data: 2026-08-25. Base: `origin/main` em `ae654a7`, branch isolada
`codex/ui-component-platform-epic-20260825`.

A revisão percorreu os 78 arquivos TS/TSX em `src` (3.608 linhas), entrypoint, props, styles,
foundations, todas as onze suites, showcase, CSS do showcase, audit de arquitetura, fixtures do
audit, layout runner, browser/package smoke, SSR smoke, Vite, Vitest, TypeScript, ESLint, package,
README, CI e release. Também confrontou as decisões com o épico anterior e com os cinco products
já migrados.

Baseline executada sem alteração de runtime:

- `pnpm install --frozen-lockfile`: passou;
- `pnpm run typecheck`: passou;
- `pnpm test`: 11 arquivos e 46 testes passaram;
- zero stories e zero setup central de teste;
- 19 exports públicos de components;
- 18 component IDs explícitos entre components/helpers renderizados;
- quatro arquivos usam `forwardRef`; cinco usam `ComponentPropsWithRef`;
- 196 ocorrências de literais CSS (medida bruta; não significa 196 problemas).

## Mapa de ownership e cobertura

`Direto` significa que o component é o owner nominal da suite. `Indireto` significa que ele aparece
na suite de outro component. Package e SSR indicam render/import no smoke atual.

| Component        | Layer     | Teste atual                 | Story | Package | SSR | Observação principal                               |
| ---------------- | --------- | --------------------------- | ----- | ------- | --- | -------------------------------------------------- |
| ActionLink       | atom      | direto                      | não   | sim     | não | contrato SSR omitido                               |
| AuthNotice       | atom      | indireto em AuthTokenDigits | não   | sim     | sim | margem externa e fonte mono por tone               |
| Button           | atom      | direto                      | não   | sim     | sim | suite de 284 linhas concentra type/behavior/style  |
| IconButton       | atom      | direto                      | não   | sim     | sim | accessible-name union mais estrita que peers       |
| SelectInput      | atom      | indireto em FieldRoot       | não   | não     | não | export público invisível nos smokes                |
| StatusChip       | atom      | direto                      | não   | sim     | sim | `title` duplicado em root/label                    |
| TextareaInput    | atom      | indireto em FieldRoot       | não   | não     | não | export público invisível nos smokes                |
| TextInput        | atom      | indireto em FieldRoot       | não   | sim     | sim | context contract não tem suite própria             |
| AuthTokenDigits  | molecule  | direto, junto de AuthNotice | não   | sim     | sim | length irrestrito e autofocus com timeout          |
| CompoundControl  | molecule  | indireto em FieldRoot       | não   | não     | não | disabled visual não garante child disabled         |
| EmptyState       | molecule  | indireto em StatePanel      | não   | sim     | sim | wrapper público sem ownership nominal              |
| FieldRoot        | molecule  | direto, cobre seis exports  | não   | sim     | sim | described-by explícito substitui hint/error        |
| FilterPills      | molecule  | direto, junto de Segmented  | não   | sim     | sim | escala de fonte sm/md invertida                    |
| LoadingState     | molecule  | indireto em StatePanel      | não   | sim     | sim | wrapper público sem ownership nominal              |
| SearchInput      | molecule  | indireto em FieldRoot       | não   | sim     | sim | default `Clear search` embute idioma               |
| SegmentedControl | molecule  | indireto em FilterPills     | não   | sim     | sim | wrap e recipe precisam decisão visual              |
| StatePanel       | molecule  | direto, cobre três exports  | não   | sim     | sim | fill/spacing usam literais sem foundation          |
| Pressable        | primitive | direto                      | não   | sim     | sim | boundary simples e correto                         |
| Spinner          | primitive | direto                      | não   | sim     | sim | primitive pequeno, decorativo e com reduced motion |

## Achados de alta prioridade

### 1. `aria-describedby` perde informação

`src/internal/FieldControlContext/index.ts:19` usa o atributo do consumidor **ou** o contexto. Se um
input declarar uma descrição própria, os IDs de hint/error do `FieldRoot` desaparecem. O contract
correto é acumular e deduplicar IDs. É um problema funcional de acessibilidade, não preferência de
arquitetura.

### 2. Smokes não representam a API pública

`CompoundControl`, `SelectInput` e `TextareaInput` não aparecem no browser/package smoke nem no SSR
smoke. `ActionLink` aparece no browser smoke, mas não no SSR. Uma export pode quebrar no tarball sem
o gate atual perceber. O problema vem de quatro listas manuais: imports, render, component IDs e
SSR.

### 3. `CompoundControl` permite estado contraditório

`disabled` marca somente o wrapper (`aria-disabled`/data attribute). O child continua interativo se
o consumidor esquecer a prop. `SearchInput` duplica corretamente o valor nos dois levels, mas a API
genérica aceita um estado visualmente disabled e funcionalmente ativo. A task precisa escolher
ownership seguro; clonar children arbitrários sem contrato não é uma correção aceitável.

### 4. Nome acessível repetido e permissivo

`AuthTokenDigits`, `SearchInput`, `FilterPills` e `SegmentedControl` repetem uma union que permite
fornecer `aria-label` e `aria-labelledby` ao mesmo tempo. `IconButton` já representa melhor a regra.
O tipo pertence a foundations/internal contracts e deve ter type tests únicos.

### 5. `AuthTokenDigits` aceita domínio inválido

`length` é qualquer `number`. Zero pode calcular focus em índice `-1`, e valores arbitrariamente
altos podem romper o layout. O autofocus aguarda 80 ms sem o motivo estar documentado. O component
também precisa de uma matriz explícita de paste, backspace, setas, controlled/uncontrolled e mudança
de length.

## Achados de arquitetura/manutenção

### 6. O showcase virou o maior component do package

`showcase/Showcase.tsx` possui 457 linhas e todos os estados compartilham state/DOM/rota. Adicionar
um component exige editar o mesmo arquivo, CSS global e layout audit. Uma falha não identifica uma
story isolada. O título ainda diz `Actions e Pressable`, embora o catálogo inclua auth, fields,
status e selection.

### 7. O layout runner conhece detalhes de todos os components

`scripts/audit-layout.mjs` possui 422 linhas, lista selectors e pressupõe quatro dígitos, exatamente
uma seleção e um field inválido na mesma page. Ele é valioso e detectou regressões reais, portanto
não deve ser descartado; deve virar runner genérico de stories + assertions pequenas por contract.
Os screenshots atuais são artifacts de inspeção, não image-diff versionado.

### 8. Testes agrupados escondem coverage debt

- `FieldRoot/index.test.tsx` importa `CompoundControl`, `SearchInput`, `SelectInput`, `TextInput` e
  `TextareaInput`;
- `FilterPills/index.test.tsx` também é o owner efetivo de `SegmentedControl`;
- `StatePanel/index.test.tsx` cobre `EmptyState` e `LoadingState`;
- `AuthTokenDigits/index.test.tsx` cobre `AuthNotice`.

Isso explica por que 19 components parecem cobertos por onze files. Renomear para
`Button.test.tsx` é correto, mas insuficiente: a migração precisa separar ownership sem duplicar
testes de integração úteis.

### 9. Setup e import policy se repetem

As onze suites importam jest-dom e cleanup. Algumas importam do entrypoint e outras do diretório
local, sem declarar se provam unidade ou package contract. Um setup único e uma convenção de dois
levels reduzem ruído e tornam a intenção verificável.

### 10. Foundations de fields/choices estão no layer errado

- `src/atoms/fieldControlStyles.ts` define family type/recipe usado por atoms e molecules;
- `src/molecules/choice.ts` define types compartilhados por molecules irmãs;
- accessible-name unions aparecem em quatro arquivos.

Esses contratos devem descer para foundations. A mudança pode preservar as exports públicas por
re-export e não justifica um breaking release.

### 11. Padrão de ref está dividido

Inputs e Search usam `forwardRef`; actions/primitives usam props nativas com ref, alinhadas ao React 19. Ambos compilam hoje. A decisão correta é uma spike sobre declarations, styled-components,
callback/object refs, SSR e consumer build; uma troca mecânica teria risco sem ganho comprovado.

### 12. Audit arquitetural ainda é regex-first

O engine central de 261 linhas entrega bom valor para imports, keyframes, native buttons e style
overrides. O teste sintético de 92 linhas concentra dez violações em um arquivo. Ao escalar, aliases,
re-exports e formatação podem gerar falso negativo. AST deve entrar seletivamente nas regras em que
isso foi demonstrado, com fixtures isoladas por rule; não é necessário reescrever tudo.

## Achados de API e composição

### 13. `AuthNotice` possui layout e branding de fluxo

O atom define `margin: 1rem 0 0`, portanto escolhe o espaçamento do parent. O tone info também muda
para fonte monospace, uma decisão que parece pertencer ao conteúdo/token exibido e não ao significado
`info`. Remover margem é uma correção de composition; a fonte exige comparação visual nos auth
consumers antes de decidir.

### 14. `SearchInput` embute idioma

Quando `onClear` existe, `clearLabel` deveria ser obrigatório no tipo correspondente. O default
inglês `Clear search` é incoerente com produtos em português e design system não é owner de locale.
Uma union pode exigir ambos juntos: sem clear action, sem label; com `onClear`, `clearLabel`.

### 15. Choice labels precisam de contract para ReactNode

`ChoiceOption.label` aceita qualquer `ReactNode` e `accessibleLabel` é sempre opcional. Texto simples
possui nome acessível natural; label visual não textual precisa de nome. O tipo pode distinguir essas
duas formas sem obrigar copy redundante no caso comum.

### 16. Wrapping de SegmentedControl é uma decisão de UX

O group usa `flex-wrap: wrap`. Isso evita overflow, mas pode quebrar o gestalt de opções exclusivas.
Não deve ser mudado por preferência: stories estreitas precisam comparar wrap, scroll e stack, e o
contract deve escolher uma política única ou uma prop semântica fechada.

### 17. Styles revelam acidentes prováveis

- `FilterPills md` usa fonte menor que `sm`;
- `CompoundControl lg` usa 3rem enquanto field `lg` usa 3.5rem;
- SegmentedControl retorna o mesmo background nos dois branches do active item;
- `StatusChip` repassa `title` ao root e também o calcula no label;
- StatePanel/Auth/Filter/Segmented possuem values fora das escalas atuais.

Cada item requer visual baseline e consumer evidence. O épico não assume que todo literal deve ser
token nem que toda divergência deve ser preservada.

## Achados de documentação, release e escala

### 18. README é bom manual, mas é outra fonte de verdade

As 425 linhas explicam contratos com cuidado, porém props/defaults/examples podem divergir do type e
da story. O README deve focar installation, arquitetura, usage e release; a matriz viva de estados
deve vir das stories/autodocs.

### 19. Não há API diff, coverage ou size budget

Typecheck/build provam muito, mas não existe snapshot revisável da surface pública, coverage report ou
medida de bundle por import. O plano adiciona primeiro medição e thresholds calibrados; não bloqueia
CI com percentuais arbitrários.

### 20. Release e CI executam um gate correto, porém monolítico

`validate:ui` passa pelo audit, lint, format, types, tests, build, tarball e 36 layout scenarios. É
uma boa release gate. Para feedback de PR, jobs/artifacts podem ser separados e o gate final pode
agregá-los sem repetir o full browser matrix em cada focused task.

### 21. O repositório público ainda não tem Pages configurado

O catálogo pode ser gerado como artifact imediatamente. GitHub Pages é o caminho operacional mais
simples depois de aprovar o workflow/permissions; não há necessidade inicial de outro app ou um
hosting acoplado aos products.

## Decisão de visualização

Recomendação: Storybook React/Vite dentro da Langyspace UI.

Motivos:

- o framework oficial suporta React + Vite e build estático;
- uma story representa um estado isolado e pode alimentar docs e testes;
- o addon oficial de a11y usa axe e integra com Vitest/CI;
- interaction tests usam `play` functions e podem ser depurados visualmente;
- a stack atual já usa Vite, Vitest, Testing Library e Playwright;
- stories co-localizadas resolvem descoberta/ownership melhor que um app externo;
- o package publicado continua separado pelo campo `files`.

Fontes primárias consultadas:

- [Storybook para React com Vite](https://storybook.js.org/docs/get-started/frameworks/react-vite/)
- [Stories, docs, testes e compartilhamento](https://storybook.js.org/docs)
- [Interaction tests](https://storybook.js.org/docs/writing-tests/interaction-testing)
- [Accessibility tests](https://storybook.js.org/docs/writing-tests/accessibility-testing)

Alternativas consideradas:

| Opção          | Vantagem                         | Limite para este caso                             |
| -------------- | -------------------------------- | ------------------------------------------------- |
| Showcase atual | zero dependency nova             | monolítico, sem isolamento/docs/controls          |
| Ladle          | leve, React/Vite, CSF            | ecossistema de docs/tests/a11y menos integrado    |
| React Cosmos   | fixtures e isolamento muito bons | menos adequado como portal de API/autodocs        |
| app separado   | deploy independente              | duplica config e afasta stories do owner          |
| Chromatic      | visual diff/PR review hospedado  | SaaS/custo/lock-in; pode ser fase futura opcional |

Storybook não substituirá os testes unitários nem o layout audit. Ele se torna o inventário de
estados renderizáveis sobre o qual os outros gates podem operar.

## Decisões que a execução ainda precisa provar

1. versão exata do Storybook compatível com React 19, Vite 8, Vitest 4 e Node 24 no lockfile real;
2. padrão final de refs depois da spike;
3. semântica/UX de wrapping do SegmentedControl;
4. ownership de disabled em CompoundControl;
5. comprimentos e keyboard contract do AuthTokenDigits;
6. quais literais viram tokens e quais continuam privados;
7. se API diff/size checks usam ferramenta externa ou um script pequeno local;
8. se GitHub Pages será ativado ou se artifacts de CI atendem a primeira release;
9. quais candidates dos products passam o maturity gate para a próxima onda.

Nenhum desses pontos deve ser decidido por refactor em massa. Cada um possui task focada, fixture e
critério de rollback no plano.
