# Evidência T08 — revisão financeira e handoff

## Veredito

T08 concluída sem alteração de runtime. A revisão do `HEAD` versionado do Admin confirmou que 15 das
16 tabelas originais cabem em `OperationalList` sem mudança pública; Cobranças é a única exceção por
seleção em lote. As listas ativas de Leads e Alunos já estão em produção, enquanto `LeadsPage` é um
componente legado fora do runtime e deve ser removido em cleanup independente.

O package permanece exatamente em `@langyspace/ui@1.4.0`. Nenhuma capability hipotética, mutation
financeira, operação de provider ou deploy foi executado nesta task.

## Resultado mensurável dos pilotos

| Medida                                       |                  Resultado |
| -------------------------------------------- | -------------------------: |
| redução líquida em Leads                     |                 106 linhas |
| redução líquida em Alunos                    |                 250 linhas |
| redução líquida combinada                    |                 356 linhas |
| CSS de Leads                                 | 211 para 90 linhas, -57,3% |
| menus locais removidos dos pilotos           |                          2 |
| tests focados dos pilotos                    |                  31 passed |
| cenários de layout dos pilotos               |           292, zero issues |
| regressões funcionais/a11y/layout observadas |                          0 |

Os números de source comparam os quatro callsites antes/depois do commit de adoção `fcc80d9`:
`LeadCohortPage/index.tsx`, `LeadCohortPage/styles.ts`, `AdminPortal/index.tsx` e
`AdminPortal/styles.ts`. Eles não atribuem ao package compartilhado uma economia fictícia; medem
somente a duplicação retirada do consumer.

O esforço de implementação caiu para descriptors de columns/actions e wrappers de conteúdo de
domínio. Não restou menu local, breakpoint do recipe, `data-label` manual ou row pseudo-link nos dois
pilotos. O Admin continua responsável por data, filtros, paginação, sort, dialogs, drawers e
mutations.

## Revisão dos 18 callsites

A matriz completa e atualizada está em `discovery.md`. Resultado agregado:

- 2 adotados e comprovados em produção: Alunos e `LeadCohortPage`;
- 14 tabelas restantes podem migrar com o V1 sem nova API;
- 1 tabela, Cobranças, aguarda decisão de bulk selection;
- 1 lista legada, `LeadsPage`, não está montada e deve ser removida, não migrada.

Entre as dez tabelas financeiras, nove cabem no contrato atual. Assinaturas é a próxima adoção
recomendada por ser um único callsite, sem bulk, com navegação command, quick action e overflow já
representáveis.

## Limites e regressões

Limites intencionais mantidos no package:

- sem seleção em lote, paginação, fetch, filtro ou sessão guiada;
- sem domínio de invoice, assinatura, professora, repasse ou calendário;
- sem row inteira clicável, CSS arbitrário ou breakpoint público;
- sem virtualização ou expansão de row, pois nenhum piloto exigiu.

Não houve regressão observada nos pilotos após a release. Os timeouts do layout global Admin foram
repetidos isoladamente com sucesso e não produziram issue geométrica. Os workflows Admin falharam
antes dos steps de execução; a produção foi provada pelo fallback Hosting, rotas, bundle/hash e
markers registrados na T07.

## Bulk selection

`bulk-selection-proposal.md` registra o caso real de Cobranças, a boundary product-agnostic e o spike
blocking. O documento não altera a API. Limite de 20, elegibilidade, locks, persistência e
reconciliação continuam no Admin.

## Agenda e marketing

- Agenda: `pattern diferente`. Calendário, janelas por professora e fila temporal dependem de
  agrupamento por data/horário e não devem ser achatados em tabela responsiva.
- Marketing: `migrar com V1`, mas em task própria. Identidade, link, funil, valor e ações cabem em
  primary/data columns; a revisão visual deve preservar a leitura sequencial do funil inline.

## Próxima onda

`next-wave.md` abre o backlog posterior sem reabrir o escopo V1. NW01 cobre apenas Assinaturas, com
dependências, estados, larguras e critérios explícitos. Cobranças fica por último e depende do spike
de seleção.

## Prova visual herdada

Visual gate review: passed — `/leads?area=contato` e `/alunos`, estados default, loading, error,
empty, filtered empty, paginated, long content e menus abertos; screenshots inspecionadas em 390,
1281 e 2048 px e matrizes adicionais em 768, 1551 e 1552 px, sem issue geométrica.

Como a T08 alterou somente documentação, não existe nova superfície renderizada a capturar. O
veredito se apoia na release efetivamente servida e nas evidências T05–T07, não em intenção local.
