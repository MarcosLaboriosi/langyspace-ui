# T04 — validar o candidato major por tarball local

Status: em andamento.

## Responsabilidade

Produzir um tarball candidato único e provar que ele pode ser integrado antes de publicar.

## Escopo

- full gate do package;
- pack, content inspection, checksum, Node import e prerender;
- instalar o mesmo arquivo local nos cinco consumers;
- registrar incompatibilidades reais como input das tasks T05–T09.

## Conclusão

Tarball candidato reproduzível e nenhum blocker arquitetural desconhecido nos consumers.

## Validação focada

- `pnpm run validate:ui` no package;
- frozen/offline-compatible install quando suportado;
- build inicial dos cinco consumers.
