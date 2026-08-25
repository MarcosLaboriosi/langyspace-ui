# Tasks

## Ordem e dependências

| Status | ID  | Task                                   | Depende de    | Impacto visual | Resultado principal                        |
| ------ | --- | -------------------------------------- | ------------- | -------------- | ------------------------------------------ |
| [x]    | T01 | Baseline e component manifest          | —             | indirect       | inventário verificável da API              |
| [x]    | T02 | Naming e ownership dos testes          | T01           | none           | suites semânticas e setup central          |
| [x]    | T03 | Spike do Storybook React/Vite          | T01, T02      | direct         | catálogo mínimo comprovado                 |
| [x]    | T04 | Stories de todos os components         | T03           | direct         | cobertura visual 1:1                       |
| [x]    | T05 | A11y e interaction tests nas stories   | T04           | direct         | contracts de uso blocking em CI            |
| [x]    | T06 | Runner de layout orientado a stories   | T04, T05      | direct         | fim do showcase monolítico                 |
| [x]    | T07 | Foundations e contracts compartilhados | T04           | indirect       | layer direction consistente                |
| [ ]    | T08 | Correções de API/composição            | T05, T07      | direct         | contracts implícitos resolvidos            |
| [ ]    | T09 | Tokens e recipes                       | T04, T07      | direct         | escala controlada e divergências decididas |
| [ ]    | T10 | Package, SSR, API e bundle quality     | T01, T07–09   | indirect       | release surface completa                   |
| [ ]    | T11 | Audit engine e governance              | T02, T04, T10 | indirect       | rules escaláveis e maturity gate           |
| [ ]    | T12 | Inventário/piloto da próxima onda      | T09–T11       | direct         | decisão evidence-based de expansão         |
| [ ]    | T13 | Catálogo, rollout e encerramento       | T06, T10–T12  | direct         | Pages/artifact, release proof e handoff    |

## T01 — Baseline e component manifest

Escopo:

- congelar SHA, versions, files, exports, component IDs, tests, stories, smokes e bundle baseline;
- criar manifesto test-only tipado para os 19 components;
- adicionar contract test que falha se export/component/test/story/smoke metadata divergir;
- registrar runtime versus type-only exports e wrappers que reutilizam markup.

Acceptance:

- inventário reproduzível por command/script pequeno;
- manifesto não entra em `dist`/tarball;
- gaps atuais ficam vermelhos ou explicitamente allowlisted com task/owner;
- nenhum runtime diff.

## T02 — Naming e ownership dos testes

Escopo:

- renomear todas as suites para `Component.test.tsx`;
- criar setup central de Vitest;
- separar AuthNotice, EmptyState, LoadingState, SegmentedControl e cada field em owners nominais;
- manter integration tests de FieldRoot/StatePanel/selection sem duplicar a matriz dos children;
- documentar import local versus public contract.

Acceptance:

- zero `index.test.tsx`;
- cada component público tem owner de teste detectável pelo manifesto;
- continuam pelo menos os 46 invariants atuais, redistribuídos sem perda;
- test output mostra nomes semânticos;
- typecheck/test/build sem runtime diff.

## T03 — Spike do Storybook React/Vite

Escopo:

- instalar configuração mínima compatível com a stack resolvida;
- stories piloto de Button, FieldRoot e AuthTokenDigits;
- controls/autodocs, backgrounds, reduced motion e CSS/reset mínimo;
- build estático e artifact local;
- inspecionar tarball e consumer bundle.

Acceptance:

- dev/build passam;
- styled-components, refs e focus funcionam no iframe;
- nenhuma dependency/runtime Storybook no package;
- as três stories cobrem atom simples, composition/context e interaction stateful;
- decisão go/no-go registrada. Se no-go, testar Ladle com os mesmos critérios antes de mudar o
  plano.

## T04 — Stories de todos os components

Escopo:

- adicionar story co-localizada para todas as 19 exports;
- criar fixtures sintéticas reutilizáveis para icons, labels e containers;
- documentar variantes, sizes, states, stress e compositions;
- criar foundations pages para tokens/action/field recipes;
- medir paridade com o showcase.

Acceptance:

- manifesto reporta 100% story coverage;
- nenhuma story depende de app, rede, clock não controlado ou dado real;
- props inválidas não aparecem nos controls;
- 390/1281/2048 e narrow container inspecionados;
- showcase ainda preservado até T06.

## T05 — A11y e interaction tests

Escopo:

- configurar addon a11y + Vitest integration blocking;
- `play` tests para Button/IconButton busy, Search clear, filters/segmented selection,
  AuthTokenDigits paste/keyboard e FieldRoot errors;
- adicionar keyboard/focus matrix e reduced motion checks;
- manter unit tests para pure logic/type contracts.

Acceptance:

- axe roda em todas as stories aplicáveis com `error`;
- zero disable global ou exception sem metadata;
- interaction tests rodam localmente e em CI;
- failures apontam component/story/contract;
- checks manuais não automatizáveis documentados.

## T06 — Runner de layout orientado a stories

Escopo:

- extrair assertions genéricas e por contract do script atual;
- enumerar story IDs/metadata em vez de uma page longa;
- suportar stress/reduced motion/width por story;
- gerar report e screenshots determinísticos;
- remover showcase/CSS somente após paridade.

Acceptance:

- todas as assertions atuais possuem destino identificado;
- 36 cenários baseline têm cobertura equivalente ou melhor;
- adicionar component exige story/metadata, não editar lista de selectors central;
- screenshots 390/1281/2048 revisados;
- `Showcase.tsx` e CSS removidos no último commit da task, com rollback simples.

## T07 — Foundations e contracts compartilhados

Escopo:

- mover field recipe/type, selection types e AccessibleName para foundations;
- criar helper de IDREF para a11y;
- preservar entrypoint/re-exports;
- avaliar ref pattern com spike completa;
- fortalecer layer audit.

Acceptance:

- direction `foundation -> primitive -> atom -> molecule` passa no audit;
- zero type union copiada;
- API report sem remoção acidental;
- ref decisão registrada com evidence, mesmo se a decisão for manter coexistência;
- package/SSR smokes passam.

## T08 — Correções de API e composição

Dividir em commits focados:

1. combinar/deduplicar `aria-describedby`;
2. definir ownership de disabled/invalid/size em CompoundControl;
3. exigir `clearLabel` junto de `onClear`;
4. fechar accessible names e ChoiceOption custom labels;
5. definir AuthTokenDigits length/keyboard/autofocus;
6. retirar margem externa de AuthNotice;
7. resolver ownership de `title` em StatusChip.

Acceptance:

- cada correção nasce de failing test/story antes do source diff;
- consumer search/typecheck prova impacto;
- breaking change não entra silenciosamente; se necessária, sai para major separado;
- screenshots e a11y passam nos callsites relevantes.

## T09 — Tokens e recipes

Escopo:

- classificar os 196 literais brutos;
- propor/adotar apenas tokens semânticos necessários;
- revisar FilterPills size typography, CompoundControl lg, Segmented wrapping/background,
  AuthNotice info, StatePanel fill e inverse alphas;
- documentar foundations/tokens no Storybook.

Acceptance:

- cada literal recorrente tem classe/owner;
- nenhuma prop cosmética livre adicionada;
- changes before/after comparadas em stories e products com uso;
- token additions possuem naming, purpose e usage;
- visual gate completo passa sem regressão de layout.

## T10 — Package, SSR, API e bundle quality

Escopo:

- completar browser/SSR smokes para todas as exports;
- validar tarball files/exports/types/bin/component IDs;
- criar API diff revisável;
- medir tree-shaking e bundle de imports focados;
- decidir ferramenta externa versus script local com base na spike;
- medir coverage e definir thresholds após baseline.

Acceptance:

- zero export omitido;
- package consumer compila e SSRiza todos os contracts aplicáveis;
- Storybook/test fixture não entra no tarball/bundle;
- API removal falha CI ou exige snapshot/version review;
- thresholds documentados, graduais e sem esconder branches críticos.

## T11 — Audit engine e governance

Escopo:

- fixtures isoladas por rule;
- rule IDs/line/remediation;
- AST seletiva para imports/JSX/styled aliases onde necessário;
- rules de layer, private import, native ownership, naming e story/test completeness;
- exceptions com owner/reason/expiry;
- checklist/maturity score de promoção e deprecação.

Acceptance:

- cada rule tem positive/negative fixture;
- aliases e formatting cases comprovados não escapam;
- consumer CLI smoke passa no tarball;
- novo component sem test/story/manifest falha com mensagem acionável;
- governance não exige bureaucracy para component local de produto.

## T12 — Inventário e piloto da próxima onda

Escopo:

- refazer scan dos cinco products a partir das origins atuais;
- medir duplicate families e callsites;
- aplicar as três decisões e maturity gate;
- escolher no máximo uma family piloto ou registrar no-go;
- se aprovada, implementar package first e testar tarball nos consumers aplicáveis.

Acceptance:

- inventário por semântica/markup/styles, não filename;
- cada candidate possui decisão e evidence;
- callsite piloto fica mais simples;
- product-specific rules continuam fora do package;
- concluir sem novo export é válido quando nenhum candidate passa.

## T13 — Catálogo, rollout e encerramento

Escopo:

- publicar Storybook static como Pages ou artifact aprovado;
- dividir CI para feedback legível mantendo release gate agregada;
- atualizar README para apontar ao catálogo e manter guidance de package;
- release minor somente se runtime/API mudou;
- tarball/checksum/consumer gates/deploys live quando aplicáveis;
- fechar progress com evidence e follow-ups.

Acceptance:

- catálogo do mesmo SHA do source acessível ao time;
- CI, a11y, interactions, story build, layout, package e SSR passam;
- nenhuma fixture contém dado real;
- package release e product deploy ocorrem somente quando necessários;
- rollback ensaiado/documentado;
- screenshots e bundles servidos aplicáveis comprovados.
