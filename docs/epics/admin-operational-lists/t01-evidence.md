# Evidência T01 — baseline, contrato e semântica

## Veredito

T01 aprovada. O contrato proposto representa Leads e Alunos sem prop de domínio, adapter, CSS
livre, breakpoint público ou key posicional. A estratégia de uma única table DOM preservou as roles
no Chromium configurado pelo repositório em layout tabular, card de duas colunas e card de uma
coluna.

Isso autoriza iniciar T02 (`ActionMenu`). Não autoriza publicar exports, instalar candidate no
Admin ou considerar o recipe visual aprovado; esses gates pertencem a T03–T07.

## Estado revalidado em 2026-08-28

### UI library

- checkout em `main`, alinhado a `origin/main`;
- alteração preexistente em `.agents/skills/langyspace-ui-workflow/SKILL.md` preservada;
- manifesto continua limitado a `primitive`, `atom` e `molecule`;
- `ActionMenu` e `OperationalList` permanecem candidatas a `layer: molecule`;
- nenhuma dependência, export, API snapshot, bundle budget ou runtime foi alterado na T01.

### Admin

- checkout em `main`, com trabalho paralelo preexistente preservado;
- o baseline de `origin/main` ainda possui 16 tabelas em `AdminPortal` e as duas superfícies de
  Leads inventariadas;
- o working tree atual está unificando `/leads` em `LeadCohortPage` e removendo o switch por
  `area`; esse trabalho ainda não é baseline estável;
- T02/T03 não dependem do nome do item de Lead; T05 deve revalidar o callsite que estiver efetivo
  em `main` antes de instalar o candidate.

## Prova do contrato TypeScript

O artefato privado de T01 foi removido quando T03 o substituiu pelos tipos e testes reais em
`src/molecules/OperationalList`. A fixture histórica compilou no `tsconfig.json` real e cobriu:

A fixture compila no `tsconfig.json` real e cobre:

- generic inference separado para `LeadFixture` e `StudentFixture`;
- key estável derivada do item, nunca do índice;
- primary column com command navigation para Lead;
- primary column com `href`, interception segura e próximo ID visível para Aluno;
- data columns secondary/tertiary, align end e sort controlado;
- primary, quick, overflow e danger actions;
- rejeição TypeScript de quick sem icon e primary danger;
- accessible name estrito por `AccessibleName`.

Os mesmos casos agora vivem em `OperationalList.test.tsx`; não resta contrato duplicado fora do
componente.

## Spike semântico Playwright

O script privado de T01 foi removido quando T03 integrou a checagem de roles do componente real ao
layout audit. O spike histórico usou o Chromium/Playwright já fixado pelo package, sem nova
dependência, e testou duas variantes:

O script usa o Chromium/Playwright já fixado pelo package, sem nova dependência. Ele testa duas
variantes:

- `sortable`: primeiro column header e sort button continuam visíveis no card;
- `static`: `thead` recebe o recipe visually-hidden, sem `display: none`.

### Resultado

| Variante | Container | Row display | Colunas do card | `thead` compact | Overflow |
| -------- | --------: | ----------- | --------------- | --------------- | -------: |
| sortable |    390 px | grid        | 1               | visível         |     0 px |
| sortable |    768 px | grid        | 2               | visível         |     0 px |
| sortable |   1281 px | table-row   | table           | table header    |     0 px |
| static   |    390 px | grid        | 1               | visually-hidden |     0 px |
| static   |    768 px | grid        | 2               | visually-hidden |     0 px |
| static   |   1281 px | table-row   | table           | table header    |     0 px |

Todos os seis cenários expuseram:

- 1 table nomeada;
- 3 rows;
- 3 column headers;
- 2 row headers;
- 4 data cells;
- 2 links de navegação;
- todas as referências `headers` resolvidas para IDs existentes.

No compact estático, posicionar o `thead` absolutamente faz o Chromium computar `display: block`,
mas os três column headers continuam na accessibility tree. Por isso o gate implementável é:
proibir `display: none`, confirmar roles e confirmar associações, não exigir um valor específico de
`display` computado.

## Validação executada

```text
pnpm run typecheck
node scripts/spikes/admin-operational-list-semantics.mjs
pnpm exec prettier --check <arquivos da T01>
```

Todos passaram. Axe, interaction tests, layout audit integrado e screenshot review continuam
blocking quando os componentes reais e suas stories existirem.

## Decisões fechadas

- manter uma única table DOM;
- manter `thead` na árvore acessível em todos os layouts;
- mostrar sortable headers como barra compacta;
- usar visually-hidden para headers estáticos, nunca `display: none`;
- usar IDs determinísticos e `headers` em data/actions cells;
- manter breakpoints privados em 48rem/72rem por container;
- bloquear dual DOM interativo;
- manter a prova no Storybook/layout audit do componente real, que substituiu o spike estático em
  T03.
