# T14 — centralizar o audit arquitetural

Status: pendente.

## Responsabilidade

Substituir engines copiados por uma regra central versionada com config local pequena.

## Escopo

- CLI/engine público ou executable estável no package;
- configs por produto para boundaries, motion e exceptions;
- detectar native ownership, copied unions, private imports, layer inversion e visual overrides;
- provar mensagens com fixtures negativas temporárias.

## Conclusão

Seis produtos executam o mesmo engine e mantêm somente decisões específicas locais.

## Validação focada

- fixtures positivas e negativas de cada regra;
- `test:button-system`/novo nome em todos os repos;
- format/lint dos configs.
