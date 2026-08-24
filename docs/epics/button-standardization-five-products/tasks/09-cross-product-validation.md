# T09 — Executar revisão e gates cross-product

## Responsabilidade

Validar o conjunto final como PR multi-repositório antes de qualquer push de consumidor.

## Subtasks

- [x] repetir impacto visual e inventário final;
- [x] rodar frozen install e full gate de cada repo uma vez após checks focados;
- [x] inspecionar screenshots e computed hierarchy/contrast/density;
- [x] comparar handlers, labels, submit/link semantics e accessible names;
- [x] revisar todos os diffs contra origin/main;
- [x] verificar zero secret, log, dead CSS, cast ou fallback especulativo;
- [x] atualizar docs/tasks/progress e registrar veredito visual.

## Conclusão

Todos os acceptance criteria têm evidência local e nenhum repo está bloqueado.

## Validação focada

- seis `validate:ui`/equivalentes;
- busca estática cross-repository;
- `git diff --check` em cada repo.
