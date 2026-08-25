# T01 — Inventário, baseline e aprovação

## Responsabilidade

Congelar a verdade dos cinco products, escolher no máximo uma family e provar que o plano é menor
que as implementações locais.

## Checklist

- [x] registrar SHAs e worktrees isolados;
- [x] contar imports, callsites e linhas por candidate;
- [x] comparar markup, props, recipe, semantics e lifecycle;
- [x] mapear rotas, estados, conteúdo extremo e larguras;
- [x] confirmar fixtures/audits existentes e gaps;
- [x] escrever epic, requirements, technical plan, tasks e progress;
- [x] revisar o plano como Product, Tech Lead, React, QA, UX, a11y, performance e operations;
- [x] capturar baseline visual focada de Admin/Teacher antes do runtime change.

## Done

Uma única family está aprovada pelo maturity gate, os no-go estão explicados, o gate visual é
executável e o próximo passo não depende de decisão aberta.

## Validação focada

- Prettier nos documentos;
- `git diff --check`;
- audits baseline focados em 390/1281/2048 com screenshots.

## Resultado

Concluído. Admin passou 36 cenários focados e Teacher 18, todos em 390/1281/2048 e zero issue. A
inspeção visual cobriu busca global, tabelas/drawers financeiros, account footer, shell mobile e
desktop, Today rows, attendance drawer e Students. O plano foi aprovado com dois gaps convertidos
em trabalho obrigatório: assertion de geometria do marker Avatar e cenário Teacher para a tab de
perfil que exercita `xl`.
