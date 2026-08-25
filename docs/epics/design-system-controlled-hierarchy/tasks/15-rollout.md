# T15 — revisar, publicar e provar produção

Status: pendente.

## Responsabilidade

Executar review final, publicar artefatos imutáveis e provar os cinco produtos em produção.

## Escopo

- revisar requirements, diffs, dead code, docs e inventory final;
- full gate do package e dos cinco consumers;
- screenshot review em 390/1281/2048 e boundaries afetados;
- publicar major/minor aprovados, checksum e public download smoke;
- atualizar dependências imutáveis, commits convencionais, pushes sem force e CI;
- provar readiness/traffic, HTTP routes e markers dos bundles live.

## Conclusão

Todos os critérios de aceite possuem evidência atual e não existe próxima task ambígua.

## Validação focada

- seis `validate:ui` finais;
- package tarball/Node/SSR smoke;
- CI/Hosting e served-bundle proof por produto.
