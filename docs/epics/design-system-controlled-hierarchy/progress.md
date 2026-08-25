# Progresso

## Status

Planejamento, refinamento de produto, refinamento técnico, breakdown, revisão crítica e execução
concluídos. T01 a T15 concluídas; o épico está em produção.

## Baseline

| Repo               | Branch                                   | Base      |
| ------------------ | ---------------------------------------- | --------- |
| langyspace-ui      | `codex/design-system-hierarchy-20260825` | `4038675` |
| langyspace         | `codex/design-system-hierarchy-20260825` | `d73ebaa` |
| langyspace-admin   | `codex/design-system-hierarchy-20260825` | `93bb68b` |
| langyspace-student | `codex/design-system-hierarchy-20260825` | `a4fb6da` |
| langyspace-teacher | `codex/design-system-hierarchy-20260825` | `51f9904` |
| langyspace-cupom   | `codex/design-system-hierarchy-20260825` | `a461f52` |

Worktree root: `/private/tmp/langyspace-design-system-hierarchy.YMowcs`.

## Concluído

- impacto visual classificado como `direct`;
- SHAs e dependência 0.6.0 confirmados após fetch das seis origins;
- checkouts originais auditados e preservados;
- duplicações, volumes de uso, adapters, wrappers e limitações do audit medidos novamente;
- arquitetura alvo, API final, estratégia de release/rollback e promoções condicionais definidas;
- surfaces, states, stress content, widths e fixtures existentes mapeados no plano;
- plano criticamente revisado sob produto, arquitetura, engenharia, QA, UX, acessibilidade,
  performance e operação;
- T01 confirmou `inverse` como variação real em surfaces escuras e confirmou que `shape` não possui
  nenhum uso de produto em Button rotulado;
- 15 tasks dependency-ordered documentadas.
- T01 concluiu `inventory.md` e `visual-coverage.md` com decisão por wrapper, descendant selector,
  component candidato, surface, state, width e fixture;
- os seis button-system audits baseline passaram em 17/99/190/325/492/21 production files;
- 26 cenários visuais focados baseline passaram em 390 px: package 4, Landing 4, Admin 6, Student 4,
  Teacher 4 e Cupom 4.
- T02 materializou `foundations`, `primitives`, `internal` e `atoms` sem alterar a API existente,
  markup ou component IDs;
- tokens tipados agora alimentam recipe, focus e motion; o entrypoint ganhou somente o export
  aditivo `tokens`;
- o audit do package agora bloqueia dependências de camada invertidas;
- 30 testes unitários, lint, typecheck, build, tarball com Node/SSR smoke e quatro cenários visuais
  em 390 px passaram após a movimentação.
- T03 removeu os eixos redundantes `tone`, `shape` e `iconOnly` do Button e publicou IconButton como
  atom separado com accessible-name union;
- Button loading mantém label e start icon e substitui o slot direito; IconButton loading substitui
  somente o glyph; ambos usam o Spinner primitive;
- 31 testes unitários, audit, lint, typecheck, build, tarball/Node/SSR smoke e 12 cenários visuais em
  390/1281/2048 px passaram com a API final;
- screenshots mobile normal/stress e desktop foram inspecionados sem overflow, corte ou perda de
  contraste.
- T04 promoveu a versão do candidato para 1.0.0 e o full `validate:ui` passou com 36 cenários em
  nove larguras;
- o tarball único possui SHA-256
  `a6e00b71f1784fbd1efc1c983c1581815cd98135920ee755fdb931c303421093` e foi instalado nos cinco
  worktrees;
- Cupom compilou sem mudança; Landing, Admin, Student e Teacher falharam somente em referências à
  API removida, registradas em `candidate-incompatibilities.md`.
- a primeira inspeção do Footer da Landing revelou perda do contorno do IconButton inverse; a
  correção foi feita no atom, o full gate repetido e o tarball/checksum renovados antes das demais
  migrações.
- T05 migrou actions canônicas da Landing e converteu os controles pedagógicos específicos para
  Pressable, sem adapter de variant;
- o audit da Landing agora bloqueia attrs removidos e recipe visual em wrappers/descendant
  selectors;
- o full gate da Landing passou com build client/SSR/prerender e 270 cenários visuais em 15 fixtures
  e nove larguras; Hero/header, form loading, showcases e CTA/footer foram inspecionados em
  390/1281/2048.
- T06 removeu os adapters tradutores de Button/IconButton do Admin, migrou slots e variants para a
  API pública e manteve PortalAction/TextButton somente como boundaries de produto explícitas;
- o audit do Admin agora bloqueia props removidas, `IconButton size="xs"` e recipe visual paralelo
  em wrappers canônicos;
- o full gate do Admin passou com 245 testes, 13 fluxos de acessibilidade, 45 cenários do design
  system e 1.820 cenários de layout; login, leads, alunos, busca e drawers foram inspecionados em
  390/1281/2048 e validados também nos boundaries 620/1280, sem problemas geométricos.
- T07 removeu os adapters tradutores e aliases `pink`/`green` de Button/IconButton no Student;
  AuthSubmitButton permanece como composição de layout, mas expõe diretamente `iconStart` e
  `iconEnd` do atom;
- wrappers canônicos do Student mantêm somente layout contextual; home dark hero, planos, checkout,
  cupom e IconButton success/inverse usam variants públicos sem recipe paralelo;
- 133 testes focados e o full gate com 630 cenários de layout passaram; home, live-reserve-loading,
  planos/checkout, handoff e auth foram inspecionados em 390/1281/2048 e os boundaries 768/1280
  também passaram sem problemas geométricos.
- T08 removeu os adapters simples de Button/IconButton no Teacher e preservou PillButton como
  boundary real de densidade compacta entre Button e ActionLink, agora com slots/variants públicos;
- aliases `pink`/`green`, `tone`, `icon` e `iconPosition` foram removidos das actions; calendário,
  attendance, Payouts, previews e auth mantêm somente layout ou comportamento de domínio;
- 47 testes focados e o full gate do Teacher com 216 cenários passaram; Today, drawer de presença,
  Students, Payouts, calendário e auth foram inspecionados em 390/1281/2048, sem a quebra original
  do footer e sem problemas geométricos.
- T09 substituiu o RangeButton reestilizado do Cupom por RangeSelector local sobre Pressable, com
  seleção exclusiva via `aria-pressed` e sem criar adapter de Button;
- o audit visual agora seleciona 30 dias e prova que existe somente uma opção ativa; essa cobertura
  revelou overflow de 744 px no gráfico mobile, corrigido no owner do grid com `min-width: 0`;
- 15 testes, build e o full gate do Cupom com 36 cenários passaram; relatório normal/stress,
  seleção 30d e redirects sanitizados foram validados em nove larguras sem problemas geométricos.
- T10 promoveu StatusChip semântico e a família StatePanel/EmptyState/LoadingState sem copy ou
  regras de produto; icon, description e action são opcionais e o container é o owner do status
  acessível;
- o stress mobile revelou overflow real em StatusChip longo; o label interno agora contém ellipsis
  sem retirar o texto completo do DOM, mantendo indicator e icon fixos;
- 37 testes, audit, lint, format, typecheck, build, tarball/Node/SSR smoke e o full gate do package
  com 36 cenários passaram; normal/stress em 390/1281/2048 foram inspecionados sem problemas de
  layout, hierarquia, contraste ou densidade.
- T11 removeu os adapters duplicados de estado no Admin, Student e Teacher e resolveu aliases de
  cor para tones semânticos nos callsites, mantendo regras de negócio nos produtos;
- skeleton de status, banners contextuais e loading inline permaneceram locais porque não são
  equivalentes ao atom/painel compartilhado;
- package, builds, testes focados e gates completos passaram, incluindo 1.820 cenários no Admin,
  630 no Student e 234 no Teacher, todos sem problemas geométricos.
- T12 promoveu auth, field, compound/search, filter e segmented components com APIs native-first e
  variações semânticas fechadas; adapters de form e state machines continuam fora do package;
- uma tentativa de reutilizar alturas de actions em fields foi bloqueada pelos testes e corrigida
  com tokens de família separados antes da adoção;
- 45 testes, audit de 67 production files, build, tarball/Node/SSR smoke e 12 cenários focados em
  390/1281/2048 passaram; screenshots normal/stress confirmaram hierarquia e contenção.
- T13 removeu AuthNotice/AuthTokenDigits duplicados de Student/Teacher e os componentes locais
  equivalentes de fields/search/filter/segmented do Admin; state machines e adapters de domínio
  continuam locais;
- Cupom usa SegmentedControl compartilhado com valores numéricos; ChoiceValue foi ampliado para
  `string | number` sem casts, e o FilterPills responsivo do Teacher permaneceu boundary local;
- fixtures `login-token` cobrem o OTP compartilhado sem rede e validam grupo, seis inputs e labels
  individuais;
- package passou 46 testes e full gate; Admin passou 236 testes, 13 fluxos WCAG, 45 cenários do
  design system e 1.820 cenários de layout; Student, Teacher e Cupom passaram builds e 648/252/36
  cenários respectivamente;
- auth, fields, filters e range foram inspecionados em 390/1281/2048 sem overflow, corte, mudança de
  geometria ou regressão de hierarquia;
- o mesmo candidato local 1.0.0 possui SHA-256
  `1ae7f97337ef3896877438b33133217afae394bfa51dfe1677f912e5e1fa8613`.
- T14 substituiu os seis engines copiados por `@langyspace/ui/audit` e pelo executable
  `langyspace-ui-audit`; cada produto mantém somente config explícito de boundaries, motion e
  exceções;
- dez fixtures negativas provam native ownership, spinner, motion, private import, copied union,
  layer inversion, visual overrides e os metadados obrigatórios das exceções;
- o audit central encontrou e removeu o min-height redundante do quiz do Teacher; o segmented
  financeiro do Admin foi confirmado como controle de domínio sobre Pressable e documentado por
  selector, razão e owner;
- o package passou full gate e smoke do CLI no tarball; o mesmo engine auditou 99/149/307/477/20
  arquivos nos cinco consumidores, todos com configs formatados;
- o candidato local 1.0.0 com o executable público possui SHA-256
  `8a1d7ff63bd412cf3ae1efde7a7442e48450515d01bb87552436f5e0076d6ceb`.
- T15 publicou `@langyspace/ui@1.0.0` em release público imutável; o tarball oficial possui SHA-256
  `b64791ed236da7d018898e46785c33a29528eb7862541dd6bed20146c01a048f` e passou smoke remoto de
  import, CLI, SSR e Vite;
- os seis gates finais passaram: package 36, Landing 270, Admin 1.820, Student 648, Teacher 252 e
  Cupom 36 cenários visuais, além dos testes, builds, acessibilidade e audits específicos;
- a revisão dos screenshots em 390/1281/2048 confirmou o footer de presença mobile, auth/OTP,
  forms, estados, filtros, segmented controls e showcases sem overflow, corte ou perda de ação;
- o runner Linux encontrou 6 px de texto mascarado em `Ordering coffee`; os gaps do cabeçalho foram
  ajustados com tokens, e a repetição integral do gate passou localmente e no CI;
- os consumers foram publicados em Landing `2c5bc3a`, Admin `ae49e0a`, Student `70caa49`, Teacher
  `8cff191` e Cupom `fde3356`; os workflows `32887914621`, `32887652635`, `32887658437`,
  `32887665155` e `32887670681` concluíram com sucesso;
- `https://langy.space`, `https://admin.langy.space`, `https://student.langy.space`,
  `https://teacher.langy.space` e `https://cupom.langy.space` responderam HTTP 200 e serviram,
  respectivamente, `index-Cxf_v9T6.js`, `index-BdTUEimx.js`, `index-CVkiMW9G.js`,
  `index-DVReTccE.js` e `index-BtzyAuoX.js`, todos com markers semânticos do design system;
- os SHA-256 dos bundles servidos são, na mesma ordem,
  `a4cc8b0654f94fd22d567cc91a4502dfec42ba2589ce0d26ba1920e74bd2d477`,
  `63bef6691e01296e1a522f0fc924dd2ca8709187880fac57ad7e564545792eb9`,
  `359c78a0817781c51e78f67476f600980b1c87a5048c109332d6694c0769aeb0`,
  `d25d54afb72764a655d50f0ce990f4f11aa662d9a320b4f4d80f29a91f78bc43` e
  `69857be155f7c27223c25121060bb55698d55b7a77aea2be361fe2180e0e12c7`.

## Próxima subtask

Nenhuma. O rollout está concluído e comprovado em produção.

## Blockers

Nenhum.

## Descobertas para as próximas tasks

Nenhuma descoberta arquitetural pendente neste épico.

## Veredito visual atual

Passed: os seis gates finais, a inspeção dos screenshots e os cinco bundles live confirmam a
hierarquia compartilhada sem a regressão original nem novos problemas geométricos.
