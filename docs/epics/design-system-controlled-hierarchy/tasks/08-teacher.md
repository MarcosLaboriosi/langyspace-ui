# T08 — migrar Teacher

Status: concluída.

## Responsabilidade

Adotar actions canônicas preservando calendário, attendance drawer, previews e auth.

## Escopo

- migrar Button/IconButton e revisar a responsabilidade restante de PillButton;
- remover aliases e traduções de prop;
- proteger footer do ClassDrawer e controls do calendário;
- ampliar fixtures de auth/icon-only quando faltante.

## Conclusão

Teacher não replica action recipe e a quebra original do drawer permanece ausente.

## Validação focada

- action/PillButton tests e changed-file lint;
- Today, attendance drawer, Students, Payouts, preview e auth em 390/1281/2048;
- build e screenshot inspection.

## Evidência

- 47 testes focados de Button, IconButton, PillButton, auth, Payouts, previews e drawer passaram;
- layout audit focado passou em 64 cenários nas larguras 390/1280/1281/2048;
- o full `validate:ui` passou com build e 216 cenários, sem problemas geométricos;
- o footer de presença foi inspecionado em mobile e desktop sem reproduzir a quebra original.
