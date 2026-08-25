# T06 — normalizar adapters e import boundaries

Status: concluída.

## Responsabilidade

Eliminar drift de tipos e deixar explícito quando um adapter local merece existir.

## Escopo

- derivar tipos locais de `@langyspace/ui` com `Pick`/`Omit` em vez de copiar unions;
- inventariar adapters, aliases e imports diretos por produto antes de remover qualquer boundary;
- migrar aliases de aparência/cor quando não forem contrato necessário;
- preservar TextButton, AuthSubmitButton e IconButton com responsabilidades comprovadas;
- remover wrappers sem comportamento após migração completa dos callsites;
- normalizar imports conforme boundary descrito no plano;
- não criar layer local no Cupom sem reutilização real.

## Checklist

- [x] cada adapter possui responsabilidade documentável;
- [x] zero union canônica copiada manualmente;
- [x] aliases removidos têm busca completa e teste;
- [x] features não contornam o adapter do próprio produto;
- [x] Pressable continua disponível para domínio.

## Conclusão

Adapters são estreitos e derivativos; não existe segunda API paralela do Button por acidente.

## Validação focada

- typecheck/build por produto;
- tests de Button/IconButton/PillButton/Auth components;
- busca estática de imports e aliases antigos.
