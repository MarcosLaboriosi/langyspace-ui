# T08 — migrar Teacher

Status: pendente.

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
