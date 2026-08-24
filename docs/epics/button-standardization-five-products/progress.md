# Progresso

## Status

Planejamento, T01 e T02 completos; T03 em andamento.

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

## Em andamento

- T03 — publicar o release imutável.

## Próxima subtask

T03.1 — atualizar package/lockfile para `0.5.0`, revisar e commitar o artefato validado.

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

## Veredito visual

Pendente até T09. O trabalho não pode ser marcado complete antes de `Visual gate review: passed` ou
um blocker explícito.
