# T04 — Adoção Admin

## Responsabilidade

Substituir os dez callsites Admin pelo package candidato sem adapter ou regressão de densidade.

## Checklist

- [ ] instalar o tarball candidato com lockfile imutável;
- [ ] migrar AdminPortal, AdminGlobalSearch e DesignSystemAudit;
- [ ] remover os quatro arquivos locais de Avatar;
- [ ] adicionar policy contra import local e recipe override;
- [ ] adicionar assertion do marker para diâmetro, círculo, overflow e flex-shrink;
- [ ] garantir allowlist pnpm para `1.2.0` no release final;
- [ ] validar shell, global search, cobranças e assinaturas;
- [ ] comparar screenshots before/after em 390/1281/2048;
- [ ] abandonar ou corrigir o package se qualquer callsite ficar mais complexo.

## Done

Admin usa import público direto, zero source local e zero issue visual/a11y no gate aplicável.

## Validação focada

- architecture audit e rule fixture;
- tests/lint/build;
- accessibility e design-system audits;
- layout cases `inicio,busca-global,busca-global-vazia,cobrancas,cobrancas-drawer,assinaturas`;
- full `pnpm run validate:ui` uma vez.
