# Progresso

## Status

T01–T04 concluídas. T05 em andamento.

## Baseline

| Repo               | `origin/main` |
| ------------------ | ------------- |
| langyspace-ui      | `64e6644`     |
| langyspace         | `fd1d232`     |
| langyspace-admin   | `21e3bb8`     |
| langyspace-student | `8c9df45`     |
| langyspace-teacher | `470983c`     |
| langyspace-cupom   | `bcb6f73`     |

Worktrees isolados permanecem em `/private/tmp/langyspace-button-standardization.x9I71f/`. O checkout
original do Teacher continua intocado com trabalho não relacionado.

## Concluído

- impacto visual classificado como `direct`;
- screenshot do Teacher localizado no `ClassDrawer` e comparado a `563e8af`;
- regressão de métricas do `PillButton md` confirmada: 14/16 para 16/20;
- audit do Teacher provado incompleto: a rota ficava em loading e não abria drawer;
- Admin comparado a `c99b17d`; quebra interna de label identificada no grupo de professora;
- Landing, Student e Cupom revisados como controles sem a mesma regressão de métricas;
- requisitos, plano técnico, revisão crítica e tarefas dependency-ordered registrados.
- package `v0.5.1` implementa density compacta sem alterar o recipe regular;
- 24 testes, typecheck, build, package/SSR smoke e oito cenários focados de layout passaram;
- capturas do showcase em 390 px confirmam as métricas compactas sem alterar as variantes regulares.
- Teacher usa density compacta no `PillButton`; o footer fica em linha no drawer largo e em pilha
  uniforme até 900 px;
- o design mock de Today agora resolve sem rede e o audit abre `Rafael Souza`, prova as três ações e
  também detectou/corrigiu o Meet truncado sem valor completo;
- 15 testes focados, build e 16 cenários do drawer em 390/576/901/1281 passaram; capturas 390/1281
  foram inspecionadas.
- Admin removeu overrides de métricas/cores dos `.pill`, que agora usam o recipe compacto do
  package; labels continuam atômicas;
- ações da professora empilham em mobile e footers com 3+ ações usam pilha determinística, enquanto
  grupos de duas ações permanecem inalterados;
- sete testes focados, build e 32 cenários em 390/641/721/1281 passaram; professora e cobrança em
  390 foram inspecionadas.

## Em andamento

- T05 — validar os cinco produtos.

## Próxima subtask

- T06 — integrar e verificar produção.

## Blockers

Nenhum.

## Veredito visual

Pendente até os gates e a inspeção das capturas corrigidas.
