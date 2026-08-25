# Progresso

## Status

Planejamento, refinamento de produto, refinamento técnico, breakdown e revisão crítica concluídos.
T01, T02 e T03 concluídas. T04 é a única task em andamento.

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

## Próxima subtask

T04.1 — gerar um único tarball local da API major candidata e validar os cinco consumidores contra
o mesmo artefato antes de iniciar qualquer migração de produto.

## Blockers

Nenhum.

## Descobertas para as próximas tasks

- o único uso produtivo explícito de `IconButton size="xs"` converge para `sm`; PortalAction também
  deve parar de traduzir a class `sm` para xs;
- quais StatusChip color aliases representam brand versus info/neutral no contexto do dado;
- se FilterPills e SegmentedControl têm keyboard semantics equivalentes nos consumidores;
- se os AuthTokenDigits atuais possuem divergências recentes além das props nativas do Teacher;
- quais descendant selectors tocam actions canônicas versus controles de domínio.

## Veredito visual atual

Bloqueado até a implementação e os gates: este documento mapeia o impacto, mas nenhuma superfície
foi alterada ou validada nesta branch ainda.
