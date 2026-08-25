# T11 — adotar components de estado nos produtos

Status: em andamento.

## Responsabilidade

Remover duplicações de status/empty/loading sem apagar diferenças reais de produto.

## Escopo

- mapear cada color alias para semântica no callsite;
- migrar Admin, Student e Teacher em lotes por component;
- preservar style local quando a equivalência falhar e documentar a decisão;
- atualizar cases de loading/empty/error/status.

## Conclusão

Duplicações aprovadas saem dos produtos e nenhuma prop cosmética é criada para forçar adoção.

## Validação focada

- tests das surfaces migradas;
- status/empty/loading screenshots em 390/1281/2048;
- product builds e focused audits.
