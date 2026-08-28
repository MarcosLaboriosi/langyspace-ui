# Progresso — espaçamento de contador no FilterPills

## Estado atual

Correção e cobertura local concluídas. O rollout está autorizado e pronto para versionar a library.

## Concluído

- diagnóstico confirmou `gap` inerte por ausência de layout flex no item;
- recipe compartilhado corrigido sem mudança de API;
- teste e Storybook cobrem `Todos: 175`;
- teste unitário: 3/3;
- story test focado: 5/5;
- `pnpm run validate:ui`: 214 tests, 942 cenários, 105 stories, zero issue;
- capturas de 390 e 1281 px inspecionadas; matriz também passou em 2048 px;
- plano revisado como Produto, Tech Lead, Engenharia e QA.

## Próxima subtask

T03 — atualizar package para `1.4.1`, executar checks de package, revisar e enviar o commit da
library para `main`.

## Blockers

Nenhum. O workflow Admin tem histórico atual de falha antes de iniciar steps; há autorização para
fallback exato de `hosting:admin` caso se repita após o novo commit.

## Preservação de worktree

As alterações paralelas em `.agents/skills/langyspace-ui-workflow/SKILL.md` e no equivalente do
Admin não pertencem a este rollout e permanecerão fora de staging/commits.
