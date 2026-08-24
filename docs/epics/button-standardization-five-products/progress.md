# Progresso

## Status

T01–T10 completos. Épico entregue em produção.

## Impacto visual

`direct` — botões e controles interativos em rotas públicas/autenticadas dos cinco produtos. A
cobertura e os gaps estão em `epic.md`, `requirements.md` e `technical-plan.md`.

## Baseline Git

| Repo               | Baseline `origin/main` | Worktree original                                                                                     |
| ------------------ | ---------------------- | ----------------------------------------------------------------------------------------------------- |
| langyspace-ui      | `212bd56`              | main limpo                                                                                            |
| langyspace         | `0f2415a`              | main limpo                                                                                            |
| langyspace-admin   | `c99b17d`              | main limpo                                                                                            |
| langyspace-student | `85561be`              | main limpo                                                                                            |
| langyspace-teacher | `563e8af`              | branch `fix/trial-lead-notifications`, atrás de main, com dois arquivos de Functions não relacionados |
| langyspace-cupom   | `3a469c4`              | branch existente preservada                                                                           |

As implementações usam worktrees isolados sob
`/private/tmp/langyspace-button-standardization.x9I71f/`.

## Concluído

- skill/references obrigatórias e AGENTS dos consumidores lidos;
- rollout anterior e contrato Admin reutilizados;
- visual impact classificado como direct;
- seis origins atualizados e worktrees isolados criados;
- contagens de botão e versões do package registradas;
- rotas/audits existentes inspecionados e gaps de Student/Teacher identificados;
- product plan, requirements, product review, technical plan e technical review concluídos;
- tarefas dependency-ordered criadas e criticamente revisadas.
- T01 — baseline reproduzível e matriz por arquivo/família registrados em `inventory.md`; Prettier e
  `git diff --check` passaram.
- T02 — Pressable, danger/success, brand tone, types, README, package smoke e showcase implementados.
  O gate completo passou com 23 testes e 18 cenários em nove larguras. Screenshots normal/stress em
  390, 1281 e 2048 foram inspecionadas em
  `.local/layout-audit/2026-08-24T10-52-05.748Z`.
- T03 — package commit `5f90da2`, `main` e tag `v0.5.0` publicados. CI `32719094767` e release
  `32719109673` passaram. Tarball público checksum
  `dc787dca0d0bb190b417e880d4efd98f652e5bcc5ce8b677e258f66289b7a1d0`; smoke externo Node/SSR/Vite
  passou.
- T04 — Landing atualizada para `v0.5.0`; ChipButton, BottomNavItem, Quiz Option e o SpeedOption
  descoberto pelo novo audit usam Pressable. Audit estático, lint, build SSR/prerender e 234
  cenários de layout passaram. Screenshots gerais 390/1281/2048 e contextos How/Shadowing/Quiz em
  390/1281 foram inspecionados. Commit local `fd1d232`.
- T05 — Admin atualizado para `v0.5.0`; commands `.pill`, ícones e links passam por PortalAction e
  controles específicos usam Pressable. Tamanhos locais 28/30/36 foram removidos em favor de
  32/40. Audit estático, 245 testes, 13 fluxos WCAG A/AA, 45 cenários do design system e 1.794
  cenários de layout passaram. Matrícula, professora e lote foram inspecionados em 390/1281/2048.
  Commit local `2aa3649`.
- T06 — Student atualizado para `v0.5.0`; Button/IconButton/AuthSubmit/AuthBack compõem o package,
  PillButton morto foi removido e controles específicos usam Pressable. O audit prova zero
  declaração nativa em 318 arquivos. 438 testes, build e 540 cenários de layout passaram; login,
  cadastro, planos, checkout, portal e pagamento foram inspecionados em 390/1281/2048. Commit local
  `b3035c4`.
- T07 — Teacher atualizado para `v0.5.0`; Button/IconButton e PillButton compõem o package, inclusive
  o link semântico do Meet via Pressable. O audit prova zero declaração nativa em 493 arquivos. As
  52 suítes de frontend passaram com 262 testes, além de build e 198 cenários de layout; login,
  cadastro, calendário, início e alunos foram inspecionados em 390/1281/2048. Commit local
  `c19e953`.
- T08 — Cupom atualizado para `v0.5.0`; RangeButton permanece uma variação contextual do Button e o
  audit anti-regressão entrou no gate. 15 testes, build e 36 cenários de layout passaram; o seletor
  pressed/unpressed foi inspecionado em 390/1281/2048. Commit local `b64b4ab`.
- T09 — revisão cross-product concluída. Os seis lockfiles passaram no install congelado do pnpm;
  os cinco audits finais cobrem 1.122 arquivos de produção e provaram zero declaração nativa. Todos
  os diffs passaram `git diff --check`, usam o tarball `v0.5.0` com SRI e não adicionam segredo,
  cast de contrato, fallback ou log fora do audit. Handlers, labels, submit/link semantics,
  accessible names e screenshots críticos foram revisados contra `origin/main`.
- T10 — as seis `main`s foram atualizadas sem force. Os cinco workflows de produto passaram e os
  canais `live` do Firebase servem HTTP 200 com o mesmo asset gerado pelo respectivo workflow. Os
  quatro consumidores pnpm precisaram alinhar `minimumReleaseAgeExclude` para o pacote privado
  `@langyspace/ui@0.5.0`; a correção foi validada com pnpm 11.2.2 antes dos reruns verdes.

  | Produto | `main`                                     | Workflow      | Firebase version   | Asset servido       |
  | ------- | ------------------------------------------ | ------------- | ------------------ | ------------------- |
  | Landing | `fd1d23221abe46ede07c85e35a629c53d83aa0a7` | `32728550211` | `77c193819160d1fe` | `index-BmbxC3Os.js` |
  | Admin   | `21e3bb89d5237b45882805ac89120f96acd58447` | `32729256309` | `bdbc2c0cc63bd03a` | `index-9FGKMI-6.js` |
  | Student | `8c9df45f36b13f204b06458c78d8f921ed5428ab` | `32729256502` | `bfef5cc139b5e531` | `index-BQtghKfa.js` |
  | Teacher | `470983ce133a7387b6d247a3154163d37a9a963a` | `32729257191` | `7bc9bc03b7399c72` | `index-DYAFAt8s.js` |
  | Cupom   | `bcb6f73a83ce8ca2ae2ecbd81782a222c2c14d75` | `32729256850` | `f0831d20f489f930` | `index-DC2GwhT0.js` |

  Rollback permanece disponível pelo commit anterior de cada `main` e pelo histórico de releases
  do canal `live` do Firebase. As branches/worktrees originais de Landing, Admin, Student e Teacher
  foram preservadas; somente o checkout local limpo de Cupom recebeu fast-forward.

## Em andamento

Nenhuma subtask.

## Próxima subtask

Nenhuma. O épico está completo.

## Blockers

Nenhum.

## Descobertas

- O package já avançou a `v0.4.1` com `iconOnly` e `shape="rounded"`, mas consumidores estão em
  `v0.2.1`, `v0.4.0` ou `v0.4.1`.
- Landing e Admin receberam migrações parciais em 24 de agosto; Student/Teacher ainda têm bases
  locais completas.
- Admin já documentou a taxonomia primary/secondary/danger/ghost e brand tone; o novo contrato deve
  alinhar-se a ela, não criar vocabulário paralelo.
- As palettes de Admin/Student/Teacher compartilham os mesmos neutros, brand, success e danger.
- Landing SSR exige package + styled-components na mesma coleta de styles e explicit component ids.
- Cupom já não possui button nativo fora do package.
- O gate estático precisa ignorar button de fixture em testes, mas bloquear produção.
- `styled(Pressable)` no Button gera duas classes de regra SSR, uma da base e outra do recipe. O smoke
  exige as duas e verifica que ambas aparecem no CSS coletado.
- O audit da Landing encontrou um quarto botão nativo, o seletor de velocidade do Shadowing, que a
  busca inicial não capturou. Ele foi migrado como controle específico em vez de virar variante do
  Button.
- No Admin, manter 32/40 px revelou quatro composições sem espaço responsivo. O ajuste correto foi
  permitir wrap/stack nos rodapés e cabeçalhos, não reintroduzir tamanhos 28/30/36 px. O primeiro
  start do Vite também pode ficar ocioso antes do Chromium; uma execução diagnóstica mínima aqueceu
  o servidor sem alterar o gate.

## Veredito visual

Visual gate review: passed — os gates automatizados somam 2.802 cenários de layout sem problemas
geométricos, e as capturas críticas em 390/1281/2048 preservam hierarquia, contraste, densidade,
semântica e estados dos controles nos cinco produtos.
