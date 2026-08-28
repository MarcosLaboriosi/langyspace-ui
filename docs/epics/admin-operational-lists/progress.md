# Progresso

## Estado

- fase: execução; T01–T06 concluídas, T07 em andamento;
- branch: `main`, por orientação explícita;
- runtime changes: `ActionMenu` e `OperationalList` publicados no contrato local do package;
- package candidate: `1.4.0` gerado e validado localmente; release ainda não publicada;
- consumer adoption: pilotos de Leads e Alunos concluídos localmente no Admin;
- produção: não iniciada.

## Concluído nesta fase

- inventário do Admin ativo e exclusão do `AdminPage` não roteado;
- baseline de tabelas, listas, ações e padrões de navegação;
- definição das boundaries entre package e Admin;
- proposta de API para `ActionMenu` e `OperationalList`;
- refinamento UI/UX com anatomia, densidades, ação primária, responsividade e matriz de stories;
- refinamento técnico com API exata, primary row header, menu controlled/uncontrolled,
  posicionamento, semântica responsiva, refs, SSR, manifest e gates;
- revisão crítica e revisão técnica;
- plano de Storybook, tests, package, pilotos, release e rollout posterior;
- fixture TypeScript privada comprovando Leads e Alunos no mesmo contrato;
- spike Playwright com seis cenários sem perda de roles ou overflow;
- veredito da T01 registrado em `t01-evidence.md`;
- `ActionMenu` com controlled/uncontrolled, portal, keyboard/focus, flip/clamp e SSR;
- 11 unit tests, 6 stories e regras de layout específicas para o popup;
- `validate:ui` completo com 193 tests e 816 cenários de layout;
- veredito da T02 registrado em `t02-evidence.md`.
- `OperationalList` genérico com table semântica, sorting, navigation descriptor e action hierarchy;
- recipe por container com table ampla, card de duas colunas e card de uma coluna;
- 9 unit tests, 11 stories e roles reais validadas em todas as larguras;
- spikes privados de T01 substituídos pelo componente e audit integrados;
- `validate:ui` completo com 213 tests e 942 cenários de layout;
- veredito da T03 registrado em `t03-evidence.md`.
- root exports, manifesto, molecules bundle, README e API report abertos atomicamente;
- public type/ref contracts e package/browser/SSR smokes cobrem os dois componentes;
- budgets revisados pelo delta medido: library 77.780/17.209 bytes e molecules 63.856/14.389;
- candidate local de 53.270 bytes validado por install exato, SHA-256
  `0abeff3f795a6051d293bc7e0506edd82cd1b0ea75569e6325d9eb1d01fc65c0`;
- `validate:ui` completo com 214 tests e 942 cenários de layout;
- veredito da T04 registrado em `t04-evidence.md`.
- candidate exato instalado no Admin e exports runtime confirmados;
- `LeadCohortPage` ativo migrado para `OperationalList`, sem mover queries, mutations ou dialogs;
- conversão primary, WhatsApp quick, navegação e demais ações no overflow compartilhado;
- CSS local de Leads reduzido de 211 para 90 linhas, sem override do recipe;
- 7 tests focados, a11y completo, build e design-system passaram;
- matriz de Leads passou em 160 cenários, oito larguras e zero issues;
- bloqueios externos do gate integral registrados: 1/316 teste do fluxo paralelo de matrícula e
  timeout de 900 s no layout global após avanço sem issues até 1280 px;
- veredito da T05 registrado em `t05-evidence.md`.
- lista ativa de Alunos migrada para `OperationalList` sem mover filtros, monthly payment, sort,
  recorrência ou drawers para a library;
- nome como primary navigation, WhatsApp quick e Agenda/Arquivar no overflow compartilhado;
- row pseudo-link removida e restauração de foco adaptada ao alvo primário sem prop de aluno;
- 24 tests focados, a11y completo, build e design-system passaram;
- matriz principal de Alunos passou em 120 cenários e overflow em 12 cenários, zero issues;
- gate integral permaneceu em 315/316 por falha externa do fluxo paralelo de matrícula experimental;
- veredito da T06 registrado em `t06-evidence.md`.

## Próxima task

Concluir a T07: versionar o snapshot validado, publicar a release minor imutável, instalar o
artifact remoto no Admin e provar CI, Hosting, rotas e bundle servido.

## Handoff

O candidate final está em
`.local/candidates/admin-operational-lists/v1.4.0/langyspace-ui-1.4.0.tgz`, SHA-256
`6366538346b571482a01dfc8e191353820b267d16178c5c45852f9dd31cb3e60`. O `validate:ui` integral da
library passou sobre esse contrato. O Admin ainda aponta para o candidate histórico `1.3.0` usado
nos pilotos; a próxima ação é publicar `v1.4.0` e substituir esse path pela URL imutável.
