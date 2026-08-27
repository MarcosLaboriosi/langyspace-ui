# T01 — Baseline, inventário e cobertura

## Responsabilidade

Fechar a lista de overlays qualificados, as exceções semânticas e a cobertura visual antes de
alterar runtime.

## Subtasks

- [x] registrar SHAs e confirmar worktrees isolados clean;
- [x] enumerar definitions e callsites por portal;
- [x] classificar cada surface como Dialog, Drawer ou fora da family;
- [x] mapear states/routes/widths e gaps de audit;
- [x] rodar focused baselines de overlay nos quatro repositórios;
- [x] registrar screenshots baseline representativas.

## Done

- inventário sem shell ambíguo;
- cobertura faltante vira tarefa explícita;
- baseline verde ou falha preexistente reproduzida e delimitada.

## Validação

- comandos de audit focados existentes;
- `git status --short` nos quatro worktrees;
- inspeção de screenshots 390/1281/2048.
