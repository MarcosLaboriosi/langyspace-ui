# T05 — Piloto Admin em Leads

## Objetivo

Provar o package em `/leads?area=contato` sem alterar dados, queries ou workflow.

## Trabalho

- instalar candidate no checkout `main` preservando dirty work;
- substituir list header/cards/actions/menu locais por OperationalList;
- manter filters, React Query, pagination, dialogs e mutations;
- mapear `Converter em aluna` como primary, WhatsApp como quick e demais ações como overflow sem
  mudar disponibilidade;
- remover somente source/styles órfãos do piloto;
- atualizar tests e audit markers do Admin.

## Estados e larguras

- default, loading, error, empty, paginated e extreme;
- actions open, disqualify e duplicate;
- 390, 620/768, 1280/1281, 1551/1552 e 2048 px.

## Aceite

- todas as ações e paginação preservadas;
- menu funciona só por teclado e fecha/retorna foco corretamente;
- sem dados reais em fixture/screenshot;
- zero CSS override do recipe compartilhado;
- redução de duplicação medida e registrada.

## Validação

- tests focados de Leads;
- a11y/design-system/layout cases focados;
- `pnpm run validate:ui` Admin completo;
- screenshot review e diff review.
