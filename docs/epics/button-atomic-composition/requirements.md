# Requisitos

## Spinner

- FR-01: o package expõe `Spinner` por `@langyspace/ui`;
- FR-02: `Spinner` vive em `src/Spinner/{index.tsx,styles.ts,types.ts}` e tem testes próprios;
- FR-03: o atom usa styled-components, `currentColor` e recipe independente de `ThemeProvider`;
- FR-04: `size="inherit" | "sm" | "md" | "lg"` usa respectivamente `1em`, 16, 20 e 24 px,
  com `inherit` como default; diferenças locais de 15/19/22 px convergem para essa escala;
- FR-05: a animação contínua para com `prefers-reduced-motion: reduce`, preservando um indicador
  estático compreensível;
- FR-06: o spinner é decorativo e `aria-hidden`; o componente/container consumidor fornece
  `aria-busy`, `role="status"` e a copy acessível quando necessários;
- FR-07: `className`, ref e props nativas compatíveis com `<span>` são preservados, exceto
  `aria-hidden`, `aria-label`, `aria-labelledby` e `role`, que não podem quebrar o contrato
  decorativo;
- FR-08: duração, border e keyframes não são props públicas.

## Button e Icon

- FR-09: `Icon` recebe e envolve somente um `ReactNode`; ele não decide loading;
- FR-10: `Button` mantém `iconStart` e substitui `iconEnd` por `Spinner` durante loading; quando não
  há `iconEnd`, cria o Spinner no mesmo slot direito;
- FR-11: loading continua preservando label, accessible name, `aria-busy`, `disabled` e bloqueio de
  interação duplicada;
- FR-12: o Spinner ocupa sempre o fim; loading nunca migra para o slot inicial;
- FR-13: em `iconOnly`, o Spinner substitui o único ícone sem perder o nome acessível;
- FR-14: markup público, component IDs e saída SSR permanecem estáveis ou recebem migração explícita;
- FR-15: `Button` compõe o componente `Pressable`, não importa diretamente sua implementação em
  `Pressable/styles`.

## ActionLink

- FR-16: o package expõe `ActionLink` como componente nativo de `<a>` separado do `Button`;
- FR-17: `ActionLink` compartilha size, density, shape e os variants `primary | secondary |
tertiary`; `tone="brand"` continua restrito a primary; danger e success ficam fora porque um link
  não deve fingir executar uma ação destrutiva/conclusiva sem caso comprovado;
- FR-18: `ActionLink` aceita children, `href`, icon start/end, full width, props nativas, className e
  ref;
- FR-19: o componente não aceita `as`, `asChild`, `to`, tipo genérico de elemento ou dependência de
  React Router;
- FR-20: loading e disabled não entram no v1 sem callsite real; links atualmente ativos não ganham
  uma semântica falsa de disabled;
- FR-21: links icon-only, chips, Meet icon, WhatsApp flutuante e links com visual de domínio ficam
  locais até evidência específica;
- FR-22: links externos continuam declarando `target` e `rel` no consumidor; o package não altera
  destino silenciosamente.

## Adoção dos produtos

- FR-23: uma animação local só migra para `Spinner` quando representa espera/loading;
- FR-24: animações de live, áudio, gravação ou progresso contínuo permanecem locais, recebem reduced
  motion e entram em allowlist documentada;
- FR-25: loaders substituídos mantêm dimensões, posição, cor, accessible status e layout;
- FR-26: links só migram para `ActionLink` quando reproduzem o recipe canônico; CTAs deliberadamente
  especiais preservam componente local;
- FR-27: Landing usa o re-export local de `Button` como boundary de aplicação; imports diretos do
  package em styles são avaliados e normalizados sem criar wrapper vazio adicional;
- FR-28: Admin, Student e Teacher derivam tipos de adapters de `@langyspace/ui` em vez de copiar
  unions canônicas;
- FR-29: `TextButton`, `AuthSubmitButton` e `IconButton` permanecem quando estreitam semântica ou
  adicionam layout real;
- FR-30: variantes históricas `pink`, `green`, `solid`, `ghost` são migradas para nomes semânticos
  quando o adapter não precisa mantê-las; remoções têm busca completa de callsites e testes;
- FR-31: Cupom não recebe novo wrapper ou atom local sem necessidade concreta;
- FR-32: o submit do `TrialLessonForm` mantém a copy `Acessar meus flashcards`, passa
  `isLoading={isSubmitting}` e fornece a seta por `iconEnd`; ele não troca a copy por reticências.

## Audits e qualidade

- FR-33: `audit-button-system` continua bloqueando `<button>` e `styled.button` nativos;
- FR-34: o audit bloqueia novos spinner/keyframes de espera fora do atom, com allowlist por arquivo e
  justificativa para motion de domínio;
- FR-35: o package testa que nenhum componente importa outro atom por seu arquivo `styles`;
- FR-36: os produtos têm uma política verificável para import direto versus adapter local;
- FR-37: fixtures cobrem loading em botão, loading standalone, link interno/externo, label longa,
  ícones e reduced motion;
- FR-38: audits não selecionam somente por implementação; assertions de comportamento e geometria
  continuam prioritárias;
- FR-39: nenhuma assertion é enfraquecida para aceitar mudança visual não aprovada.

## Não funcionais

- NFR-01: zero CSS global e zero dependência nova de runtime;
- NFR-02: React e styled-components permanecem peer dependencies do package;
- NFR-03: imports de styled-components no package preservam a forma compatível com SSR já provada;
- NFR-04: bundle e SSR smoke não introduzem warning de hidratação ou class mismatch;
- NFR-05: consumidores mantêm frozen install e o mesmo artefato imutável;
- NFR-06: worktrees originais e mudanças não relacionadas permanecem intactos;
- NFR-07: remoções de adapters são incrementais e não forçam refactor de domínio no mesmo diff.

## Edge cases

- loading sem ícone declarado ainda mostra um Spinner no fim;
- loading com ícones nos dois lados preserva o inicial e substitui somente o ícone final;
- loading sem ícone final cria o Spinner à direita sem remover o ícone inicial;
- botão icon-only loading conserva `aria-label`/`aria-labelledby`;
- reduced motion remove rotação sem remover o indicador;
- label longa pode quebrar quando o recipe permite, sem deslocar o spinner para fora do controle;
- `ActionLink` sem `href` falha no contrato TypeScript;
- `ActionLink` externo preserva `rel`, `target` e accessible name do consumidor;
- styled composition preserva className/ref tanto no Button quanto no ActionLink;
- um spinner de live permitido não pode ser confundido com loading por nome genérico ou allowlist
  ampla.

## Aceitação

- AC-01: unit tests provam o contrato de Spinner, Icon, Button e ActionLink;
- AC-02: type tests rejeitam props polimórficas, ActionLink sem href e combinações sem accessible
  name;
- AC-03: package lint, typecheck, unit, build, package/SSR smoke e layout audit passam;
- AC-04: inventário antes/depois prova a retirada de spinners de espera duplicados;
- AC-05: focused tests e audits passam em cada superfície migrada;
- AC-06: `validate:ui` completo passa uma vez por consumidor afetado após os focused checks;
- AC-07: screenshots em 390, boundaries relevantes, 1281 e 2048 px são inspecionados;
- AC-08: reduced motion é verificado por teste ou audit determinístico, não apenas por leitura de CSS;
- AC-09: release imutável tem checksum, install frozen e smoke direto antes da integração;
- AC-10: CI/Hosting e bundles live comprovam o mesmo patch nos cinco produtos;
- AC-11: documentação pública e guidance dos produtos explicam atom, adapters e exceções.
