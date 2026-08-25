# Hierarquia controlada do design system

## Problema

O `@langyspace/ui` já centraliza `Pressable`, `Button`, `Spinner` e `ActionLink`, mas a arquitetura
continua concentrada no ecossistema de ações. Os cinco produtos ainda possuem vocabulários de props,
themes, estados, campos e componentes de autenticação paralelos. A repetição atual não é apenas
visual: Student e Teacher compartilham 115 arquivos TypeScript idênticos; Admin, Student e Teacher
compartilham 27; `IconButton` existe três vezes; e seis scripts locais repetem 595 linhas de audit.

Também existem 16 wrappers de `Button` ou `ActionLink` que alteram aparência canônica. Parte deles é
um controle de domínio legítimo e deveria nascer de `Pressable`; outra parte só preserva diferenças
de cor, altura ou radius sem valor de produto. Adicionar props para todas essas exceções produziria
um componente-monstro e tornaria a implementação mais difícil de entender.

## Objetivo

Estabelecer uma hierarquia descendente e pequena de foundations, primitives, atoms e molecules,
mantendo implementações React simples, styled-components, semântica HTML e equivalência visual. O
design system deve absorver apenas padrões comprovadamente compartilhados; componentes de produto
continuam locais e compõem as camadas inferiores.

## Impacto visual

`direct` — a migração altera a implementação de botões, controles icon-only, status, estados,
campos, filtros e autenticação. A intenção é equivalência visual, mas markup, cascade, foco, loading,
densidade, wrapping e breakpoints podem regredir.

### Superfícies e estados

- package: showcase de actions, icon-only, status, state panels, fields, filters e auth atoms;
- Landing `/`: Header, Hero, showcases pedagógicas, formulário experimental, footer e sticky CTA;
- Admin `/login`, `/leads`, `/alunos` e drawers operacionais: ações densas, status, empty/loading,
  busca, fields e compound controls;
- Student: home, aulas/live, planos/pagamento, login/cadastro e handoff;
- Teacher: Today, calendário, Students, Payouts, previews, login/cadastro e drawers;
- Cupom `/relatorio/:id`: seletor de período e controle de regressão das actions;
- estados: normal, hover, active, focus-visible, disabled, loading, reduced motion, erro, vazio,
  conteúdo parcial, labels longas, URLs sem quebra e densidade máxima;
- larguras: 390, breakpoints locais 620/640/720/900, 1280/1281 e 2048 px.

## Princípios de decisão

1. Diferença recorrente e semanticamente válida vira prop fechada.
2. Semântica diferente vira componente diferente.
3. Diferença sem função converge para o padrão, sem nova prop.
4. Dependency direction é sempre `foundations -> primitives -> atoms -> molecules -> produto`.
5. Um componente compartilhado não importa regras de negócio, router, form library ou Firebase.
6. Um adapter local só existe quando acrescenta responsabilidade real de produto.
7. Atomic design não exige exportar wrappers internos sem utilidade pública.
8. A migração preserva o visual aprovado e amplia cobertura antes de alterar uma superfície.

## Escopo

- criar foundations compartilhadas para tokens e contratos de actions sem dependência de `Button`;
- organizar componentes do package por camada sem alterar seus component IDs de SSR;
- publicar `IconButton` e retirar `iconOnly`/`shape` do contrato de `Button`;
- unificar a aparência de actions em uma única prop fechada e retirar traduções históricas de ícone;
- manter loading com label estável e Spinner no slot direito;
- classificar wrappers atuais entre convergência canônica e controle local sobre `Pressable`;
- compartilhar `StatusChip`, `StatePanel`, `EmptyState`, `LoadingState`, `AuthNotice` e
  `AuthTokenDigits` quando a migração comprovar equivalência;
- separar field visual de `react-hook-form`, preservando adapters de formulário no produto;
- centralizar o engine do audit com configuração explícita por produto;
- validar por tarball local, publicar releases imutáveis, atualizar os cinco produtos e provar as
  superfícies live.

## Fora de escopo

- criar componentes universais de página, drawer, calendário, card pedagógico ou fluxo de auth;
- mover serviços, Firebase, regras de negócio ou state machines para o design system;
- parametrizar cores, medidas ou CSS livre para preservar exceções históricas;
- adicionar polymorphism, `asChild`, router ou form library ao package;
- redesenhar superfícies aprovadas;
- decompor `AdminPortal`, o portal Student ou `ClassDrawer` no mesmo rollout visual. Esses
  monólitos terão épico local posterior, já usando as novas boundaries;
- publicar uma versão antes de todos os consumidores compilarem e passarem os casos focados contra
  o mesmo tarball local.

## Jornada esperada do desenvolvedor

1. Escolhe `Button`, `IconButton`, `ActionLink` ou um controle de domínio sobre `Pressable` pela
   semântica, não pela aparência desejada.
2. Usa nomes canônicos de variantes, tamanhos e slots sem adapter tradutor.
3. Compõe atoms em molecules como `StatePanel` e `SearchInput` sem importar styles privados.
4. Mantém flows e organisms no produto, com JSX explícito e props pequenas.
5. Recebe feedback do audit ao reintroduzir native button, override canônico, union copiada,
   dependency inversion ou componente paralelo.

## Critérios de sucesso

- o package expõe uma hierarquia documentada e sem dependência ascendente;
- `Button` deixa de carregar responsabilidades icon-only e combinações `tone + variant`;
- um `IconButton` público cobre os três adapters atuais com nome acessível obrigatório;
- adapters de action dos produtos desaparecem ou ficam com responsabilidade local documentada;
- overrides visuais são removidos ou reclassificados como componentes de domínio sobre `Pressable`;
- componentes promovidos possuem pelo menos dois consumidores ou equivalência estrutural comprovada;
- componentes de form compartilhados não dependem de `react-hook-form`;
- o audit central bloqueia as regressões arquiteturais e CSS conhecidas;
- package e cinco produtos passam focused checks, full gates e inspeção visual em 390/1281/2048;
- releases, mains, CI e bundles live apontam para os mesmos artefatos imutáveis;
- nenhum checkout original ou trabalho não relacionado é alterado.
