# T08 — executar gates e revisão visual

Status: concluída.

## Responsabilidade

Provar funcionalidade, arquitetura, SSR e equivalência visual antes do release.

## Escopo

- revisar requirements e critérios de aceite completos;
- rodar package lint/unit/type/build/package/SSR/layout;
- rodar focused checks e depois `validate:ui` completo dos cinco produtos;
- executar installs frozen contra tarball local;
- inspecionar screenshots em todas as larguras e reduced motion;
- revisar diffs e worktrees originais.

## Checklist

- [x] AC-01 a AC-08 comprovados;
- [x] nenhum gate repetido sem mudança relevante;
- [x] screenshots e contagens registradas;
- [x] zero warning SSR/hydration;
- [x] visual-impact classification repetida contra o diff final.

## Conclusão

Todos os gates passam e a revisão visual explícita aprova equivalência e acessibilidade.

## Validação focada

- comandos definidos por cada `package.json`/AGENTS;
- `git diff --check` e revisão por repo;
- inspeção 390, boundaries, 1281, 2048 e reduced motion.
