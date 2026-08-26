# T04 — Adoção Admin

## Responsabilidade

Substituir os dez callsites Admin pelo package candidato sem adapter ou regressão de densidade.

## Checklist

- [x] instalar o tarball candidato com lockfile imutável;
- [x] migrar AdminPortal, AdminGlobalSearch e DesignSystemAudit;
- [x] remover os quatro arquivos locais de Avatar;
- [x] adicionar policy contra import local e recipe override;
- [x] adicionar assertion do marker para diâmetro, círculo, overflow e flex-shrink;
- [x] garantir allowlist pnpm para `1.2.0` no release final;
- [x] validar shell, global search, cobranças e assinaturas;
- [x] comparar screenshots before/after em 390/1281/2048;
- [x] abandonar ou corrigir o package se qualquer callsite ficar mais complexo.

## Resultado

Dez callsites migrados sem adapter; 113 linhas líquidas removidas. O focused gate passou com 36
cenários e 348 leituras do marker. O runner serial completo atingiu seu safety timeout; os quatro
shards oficiais passaram antes do deploy no workflow `32916231773`.

## Done

Admin usa import público direto, zero source local e zero issue visual/a11y no gate aplicável.

## Validação focada

- architecture audit e rule fixture;
- tests/lint/build;
- accessibility e design-system audits;
- layout cases `inicio,busca-global,busca-global-vazia,cobrancas,cobrancas-drawer,assinaturas`;
- full `pnpm run validate:ui` uma vez.
