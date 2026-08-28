# T07 — Release imutável e produção Admin

## Objetivo

Publicar a versão minor já provada e colocar os dois pilotos em produção com evidência do artefato.

## Trabalho

- confirmar library/Admin limpos no escopo e gates verdes;
- fechar changelog/release evidence, API report, version e checksum;
- publicar tag/release minor e artefato imutável;
- instalar URL imutável no Admin e atualizar lockfile/allowlist aplicável;
- repetir build/package smoke e gates Admin necessários;
- commit/push na `main` somente com escopo explícito;
- acompanhar CI/deploy e verificar rotas, bundle/hash e markers servidos.

## Aceite

- release asset acessível e checksum confere;
- Admin usa URL imutável, não candidate/path local;
- `/leads?area=contato` e `/alunos` retornam e renderizam o artifact novo;
- CI/deploy success ou fallback exato explicitamente autorizado e provado;
- nenhuma regressão observada nos logs/runtime checks aplicáveis.

## Rollback

Reinstalar a versão anterior e restaurar os dois callsites locais em commit reversível. O package
publicado é aditivo e não é apagado.
