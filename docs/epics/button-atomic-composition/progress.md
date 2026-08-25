# Progresso

## Status

Épico concluído. T01 a T09 foram implementadas, validadas, publicadas e provadas em produção.

## Baseline

| Repo               | `origin/main` |
| ------------------ | ------------- |
| langyspace-ui      | `fd3fb3e`     |
| langyspace         | `ba72869`     |
| langyspace-admin   | `f435658`     |
| langyspace-student | `740d7a6`     |
| langyspace-teacher | `cca6fcf`     |
| langyspace-cupom   | `aa84a43`     |

O épico foi criado no worktree isolado
`/private/tmp/langyspace-button-atomic-epic.zNMyMj/langyspace-ui`. Checkouts originais não foram
editados.

## Concluído

- impacto visual futuro classificado como `direct`;
- diagnóstico consolidado: 14 spinners locais em Admin/Student/Teacher;
- limitação do audit atual comprovada nos cinco produtos;
- responsabilidades de Spinner, Icon, Button, ActionLink, adapters e Pressable separadas;
- ActionLink aprovado como atom separado; polymorphism e router rejeitados;
- animações locais divididas em espera versus motion de domínio;
- superfícies, estados, larguras, fixtures e estratégia de reduced motion mapeados;
- requisitos funcionais/não funcionais, edge cases e critérios de aceite definidos;
- plano revisado sob produto, arquitetura, engenharia, QA, acessibilidade, performance e operação;
- nove tasks pequenas e dependency-ordered documentadas.
- decisão de produto confirmada: loading preserva o label e o ícone esquerdo e substitui sempre o
  slot direito por Spinner;
- divergência do Landing localizada no submit do `TrialLessonForm`, que usa
  `Criando seu acesso...` e mantém a seta.
- inventário fechado: as 14 ocorrências de `rotate(360deg)` representam espera/loading; as demais
  animações de StudentLive são motion de domínio e não entram no Spinner;
- fixture `trial-access-loading` cobre o submit pendente em 390/1281/2048 e inspeciona slot direito,
  label estável, busy/disabled e geometria;
- `Spinner` público criado com escala `inherit | sm | md | lg`, `currentColor`, invariant decorativo
  e fallback de reduced motion;
- `Icon` voltou a ser wrapper puro e `Button` agora preserva start e usa sempre o slot final para
  loading, inclusive sem `iconEnd` declarado;
- package validado com 25 testes, lint, format, typecheck, build, tarball/SSR smoke e 36 cenários de
  layout nas nove larguras em motion normal/reduzido;
- submit do Landing migrou de `Criando seu acesso...` mais seta para label estável, `isLoading` e
  `iconEnd`;
- gate completo do Landing passou com button-system audit, lint, build/SSR/prerender e 234 cenários
  visuais sem problema geométrico; capturas focadas foram inspecionadas em 390/1281/2048.
- Admin não possui mais `rotate(360deg)` local: LoadingState, busca global, reconciliação, refresh,
  identidade, submit de matrícula e detalhe usam `Spinner`/`isLoading` canônicos com label estável;
- Admin passou em 110 testes focados, lint, build, button-system audit e 16 cenários visuais focados
  em 390/1281; capturas de loading e busca foram inspecionadas.
- Student não possui mais spinner local em cupom, checkout, chat ou reserva: ações Button mantêm o
  label, StudentLive preserva o ícone de vídeo à esquerda e renderiza o `Spinner` público à direita;
  `livePulse` e `liveRaise` permanecem como motion de domínio com reduced motion existente;
- a revisão encontrou que StudentLive não tinha fixture de navegador, apesar da premissa inicial do
  inventário; foi adicionado `live-reserve-loading`, isolado por `VITE_STUDENT_DESIGN_MOCK`, sem
  chamadas externas e sem efeito em produção;
- Student passou em 30 testes focados, build, button-system audit e seis cenários visuais da reserva
  pendente em 390/1281/2048, incluindo stress text; as três capturas foram inspecionadas e ficaram
  sem overflow ou mudança de geometria. O lint completo segue com 15 erros preexistentes do React
  Compiler fora deste diff (incluindo um `setState` já existente no efeito de StudentLive).
- Teacher não possui mais `rotate(360deg)` de espera nem `LoaderCircle` local: oito superfícies usam
  `Spinner`/`isLoading`; ícones contextuais permanecem à esquerda e o indicador ocupa o último slot;
- Teacher passou em 37 testes focados (o primeiro run expôs e corrigiu a ausência de ambiente jsdom
  e cleanup no teste legado de PillButton), ESLint dos arquivos alterados, build, button-system audit
  e 24 cenários visuais em 390/1281/2048; as capturas de drawer e repasses foram inspecionadas;
- o lint completo do Teacher permanece bloqueado por 22 erros preexistentes fora do diff, entre
  Functions e regras `set-state-in-effect`; nenhum arquivo alterado aparece nesse resultado;
- a allowlist pós-migração contém apenas motion de domínio de StudentLive e das sessões pedagógicas
  do preview; toda rotação de espera nos três consumidores agora pertence ao package e já possui
  fallback de `prefers-reduced-motion`.
- `ActionLink` público criado como anchor nativo com `href` obrigatório e API limitada a recipe,
  ícones e props de navegação; type tests rejeitam disabled, loading, icon-only, danger, brand
  secondary e polymorphism;
- Button e ActionLink compartilham um recipe privado sem dependência circular de runtime; o
  component ID do Button foi preservado e ActionLink recebeu `lsui-sc-action-link`;
- 30 testes focados dos cinco atoms passaram; lint, typecheck, build, package/SSR smoke e 12
  cenários de layout do package em 390/1281/2048, motion normal/reduzido e stress passaram;
- o inventário classificou cinco CTAs do Landing, o retorno do StudentHandoff e o caminho anchor do
  PillButton para migração; links inline, floating WhatsApp, Meet icon-only e relatórios ficam
  locais por semântica de produto.
- Landing migrou Header, English Classes, Final CTA, sticky mobile e 404; recipes duplicados foram
  removidos e diferenças sutis de hover, fonte e sombra convergiram para o padrão do package;
- Landing passou em build com SSR/prerender e 12 cenários focados de landing/SEO em
  390/1281/2048; capturas mobile normal e desktop com stress foram inspecionadas;
- StudentHandoff migrou os dois retornos para `ActionLink secondary lg`; quatro testes, build e 12
  cenários de verification/error em 390/1281/2048 passaram e as capturas foram inspecionadas;
- o caminho anchor do Teacher PillButton agora compõe `ActionLink`, não aceita loading, disabled ou
  success, preserva `href/target/rel` e os links Meet/material; três testes, build e 12 cenários de
  Today/ClassDrawer passaram, com capturas 390/1281 equivalentes;
- nenhum callsite aprovado usava router, portanto a migração não introduziu full reload.
- os adapters de Button/IconButton/PillButton agora derivam variantes, escalas, tons e densidades
  dos tipos públicos do package; as features respeitam o boundary local de cada produto;
- Admin removeu o alias `ghost` e Teacher removeu `solid`, `ghost`, `pink` e `green` do PillButton;
  os call sites usam a taxonomia canônica `variant` + `tone`;
- o inventário de adapters documenta as responsabilidades preservadas e confirma que Cupom não
  ganhou um wrapper sem reutilização.
- os cinco consumidores agora bloqueiam native/styled button, spinner local, motion sem owner,
  bypass do boundary e unions canônicas copiadas; o package também bloqueia ownership de Pressable,
  Spinner e styles privados entre atoms;
- fixtures negativas temporárias comprovaram cada mensagem e foram removidas; os seis audits passam
  no código aceito;
- o layout audit do package valida `animationName` computado do Spinner em motion normal e reduzido.
- o package 0.6.0 passou audit arquitetural, lint, format, typecheck, 30 testes, build, tarball/Node
  import/SSR smoke e 36 cenários visuais em nove larguras; 390, 1281 stress/reduced e 2048 foram
  inspecionados;
- Landing passou o gate completo com SSR/prerender e 234 cenários; Admin passou lint, 245 testes,
  build, 13 fluxos WCAG, 45 cenários de design system e 1.794 cenários de layout;
- no Admin, Node 26 exigiu `--no-experimental-webstorage` somente durante Vitest para não substituir
  o localStorage do jsdom; os audits Vite/Playwright passaram sem essa flag;
- Student passou build e 558 cenários, Teacher passou build e 216 cenários e Cupom passou 15 testes,
  build e 36 cenários; todos os button-system audits passaram;
- a revisão final inspecionou o submit do Landing, loading do Admin, reserva live do Student, drawer
  de presença do Teacher em 390/1281, repasses em 2048 e relatório do Cupom em 1281 stress; a quebra
  original do footer do drawer não se reproduz e as três ações permanecem alinhadas em desktop;
- o diff final continua de impacto visual `direct`; não há overflow, mudança de geometria, warning de
  hidratação ou regressão de hierarquia nas capturas aprovadas.
- a release pública `v0.6.0` foi publicada a partir de `6fe2500`; o tarball de 11.201 bytes tem
  SHA-256 `d4035636a72e2d892f60cf71124edeafab880a55fd4f075c4e741b670386aef2` e passou por
  inspeção de conteúdo, Node import e prerender depois do download público;
- Landing `d73ebaa`, Admin `d7af28e`, Student `f48a3d8`, Teacher `177cb5a` e Cupom `a461f52`
  usam a URL imutável do mesmo tarball, passaram frozen install com a política de supply chain do
  pnpm 11 e foram enviados para `main` sem force;
- os runs finais `32835473786` (UI CI), `32835485297` (release), `32836796401` (Landing),
  `32836969477` (Admin), `32836971341` (Student), `32836974119` (Teacher) e `32836975983`
  (Cupom) concluíram com sucesso nos SHAs esperados;
- as cinco rotas públicas responderam HTTP 200. Landing serve `index-Crmp2sqi.js`, Admin
  `index-BwHy6Xrj.js`, Student `index-BJviWSRB.js`, Teacher `index-DiX-7tRA.js` e Cupom
  `index-BbgbKG57.js`; todos os bundles servidos contêm `lsui-sc-spinner` e
  `lsui-sc-action-link`;
- os seis worktrees de rollout terminaram limpos e iguais a `origin/main`; o checkout original do
  Teacher preservou exclusivamente os dois arquivos sujos preexistentes e não relacionados.

## Próxima task

Nenhuma. O épico está fechado.

## Blockers

Nenhum.

## Descobertas a confirmar em T01

- quais CTAs do Landing são visualmente canônicos versus deliberadamente promocionais;
- quais aliases locais ainda são API interna necessária antes de removê-los.

## Veredito visual do épico

Passed: gates completos dos cinco produtos e do package, inspeção focada em 390/1281/2048 e prova
dos bundles live não encontraram overflow, mudança de geometria ou regressão da quebra original do
drawer de presença.
