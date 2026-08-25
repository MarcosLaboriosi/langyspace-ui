# T13 — Catálogo, rollout e encerramento

## Objetivo

Disponibilizar a plataforma ao time e fechar a execução com provas do mesmo commit.

## Passos

1. build estático do catálogo e artifact em PR;
2. configurar GitHub Pages de `main` se aprovado/disponível;
3. separar jobs de feedback sem reduzir o aggregate release gate;
4. atualizar README com arquitetura, workflow e link do catálogo;
5. executar full `validate:ui` e inspecionar screenshots;
6. publicar package minor somente se runtime/API mudou;
7. instalar tarball imutável nos consumers aplicáveis;
8. executar CI/deploy e verificar catalog/package/bundles servidos;
9. atualizar progress, decisions e follow-ups.

## Evidence final

- source SHA e catalog SHA;
- CI jobs e artifacts;
- story/a11y/interaction/layout counts;
- tarball SHA-256 e API report quando aplicável;
- consumer commits/workflows/URLs/bundle markers quando aplicável;
- visual verdict único.

## Done

- catálogo acessível e sem dados reais;
- todos os gates verdes;
- docs refletem a API publicada;
- releases/deploys ocorreram somente nas surfaces alteradas;
- rollback e próximo owner registrados.

## Rollback

Pages/workflow pode ser revertido sem package release. Runtime volta ao tarball imutável anterior;
deploys de products seguem seus runbooks e SHAs comprovados.

## Resultado

Concluído. Catálogo, package `1.1.0`, CI agregado, dois consumers aplicáveis e os dois Hostings estão
publicados e comprovados em `../release-evidence.md`. Landing, Student e Cupom não sofreram churn
porque não possuem callsite runtime do piloto.
