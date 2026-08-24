# Progresso

## Status

T01–T06 concluídas.

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
- o primeiro full audit do Admin revelou overflow de 42 px no CTA da matrícula; o pattern foi
  simplificado para todo footer de drawer mobile empilhar ações full-width;
- 48 cenários focados da matrícula/drawers e o rerun completo do Admin com 1.794 cenários passaram;
- gates completos: UI 24 testes/18 cenários; Landing 234; Admin 245 testes, 13 fluxos a11y, 45
  design-system e 1.794 layout; Student 540; Teacher 216; Cupom 15 testes/36 layout;
- release `v0.5.1` publicado no commit `6635db1`; validate `32741004154` e release `32741008264`
  passaram; checksum SHA-256 `01dc665404f12d1af1b6180609a6a3d73cca6fbfd9fb19ba726b95d26598fec9`;
- os cinco installs frozen resolvem a URL pública e as políticas de supply chain passaram.
- commits integrados em `main` sem force: Landing `ba72869`, Admin `f435658`, Student `1bc6c9f`,
  Teacher `cca6fcf` e Cupom `aa84a43`;
- os cinco workflows de produção passaram: Landing `32742358243`, Admin `32742360713`, Student
  `32742358961`, Teacher `32742357604` e Cupom `32742358162`;
- canais Firebase live finalizados nas versões Landing `c320e6583d31bbe7`, Admin
  `41faa2f4e63b4236`, Student `af3b5c8fe43b5ad1`, Teacher `1427291dde40b708` e Cupom
  `5b0df99780ba2cd3`;
- os cinco sites públicos responderam HTTP 200 e seus bundles servidos contêm `data-density`.

## Rollback

- reverter o commit consumidor do produto afetado para voltar ao package `v0.5.0`;
- se o defeito estiver no recipe compartilhado, publicar uma nova versão patch imutável em vez de
  substituir o asset `v0.5.1`.

## Próxima subtask

- nenhuma; épico concluído.

## Blockers

Nenhum.

## Veredito visual

Passed: capturas do Teacher em 390/1281 px e do Admin em 390 px foram inspecionadas; as matrizes
completas dos cinco produtos passaram sem overflow, wrap involuntário ou action group quebrado.
