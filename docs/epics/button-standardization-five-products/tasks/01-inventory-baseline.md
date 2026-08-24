# T01 — Fechar inventário e baseline

## Responsabilidade

Converter o levantamento inicial em baseline reproduzível e confirmar cobertura/estado Git antes de
qualquer código de aplicação.

## Subtasks

- [x] registrar SHA, branch, status e pin de cada repositório;
- [x] registrar contagem e arquivos de `<button>`/`styled.button` de produção;
- [x] classificar cada família como Button, Pressable ou normalização;
- [x] mapear rotas/estados e gaps de Student/Teacher;
- [x] validar consistência entre epic, requirements, plano e tarefas;
- [x] formatar/revisar docs e atualizar progress.

## Conclusão

Baseline e decisões não deixam ocorrência sem destino, e nenhum app code foi alterado.

## Validação focada

- `rg` estático nos seis repositórios;
- `pnpm exec prettier --check docs/epics/button-standardization-five-products/**/*.md`.
