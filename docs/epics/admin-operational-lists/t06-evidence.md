# Evidência T06 — segunda adoção Admin em Alunos

## Veredito

T06 aprovada no escopo de `/alunos`. A lista ativa passou a compor `OperationalList` pelo mesmo
candidate já validado em Leads, sem mover filtros, ordenação, estados mensais de pagamento,
recorrência, navegação ou drawers para a UI library.

O checkout permaneceu em `main`, conforme orientação explícita, sem branch/worktree, commit,
publicação, tag, deploy ou escrita de produção. O trabalho paralelo do épico
`admin-person-operational-profile`, inclusive mudanças nos mesmos arquivos amplos do Admin, foi
preservado.

## Candidate reutilizado

```text
path: ../langyspace-ui/.local/candidates/admin-operational-lists/langyspace-ui-1.3.0.tgz
sha256: 0abeff3f795a6051d293bc7e0506edd82cd1b0ea75569e6325d9eb1d01fc65c0
package metadata: 1.3.0
```

T06 não reinstalou, republicou nem alterou o contrato do artifact. Nenhuma prop específica de aluno
foi adicionada a `OperationalList` ou `ActionMenu`.

## Composição efetiva

A lista de Alunos recebeu:

- primary column `Aluno`, com avatar, ID e nome como navegação explícita para o cadastro;
- columns `Próxima ação`, `Status`, `Professora / recorrência`, `Plano / cobrança` e `Contato`;
- descriptors controlados para as cinco ordenações já existentes no Admin;
- WhatsApp contextual como quick action;
- `Agenda` e `Arquivar aluno` no overflow compartilhado, com arquivo em danger;
- empty state filtrado dentro da table semântica do componente;
- densidade `compact` e os recipes responsivos por container da library.

Não existe mais `onClick`, `onKeyDown`, cursor ou `tabIndex` na row. O botão do nome é o único alvo
de navegação primária. A restauração de contexto reconhece a key pública da row genérica e devolve o
foco ao botão do nome; quando um aluno deixa a fila, o próximo botão visível recebe foco.

## Domínio preservado no Admin

Continuaram no consumer:

- `useAdminPortalStudentCohort('aluno')`, paginação e merge da competência mensal;
- filtros operacionais, status, professora, plano, nível e busca sensível fora da URL;
- sort e desempates de aluno, próxima ação, status, professora e cobrança;
- classificação de pagamento em dia, vence hoje, atrasado, cancelado e não verificado;
- conteúdo e tone da próxima ação;
- presença de professora e recorrência ativa;
- apresentação de plano, mensalidade, fonte, vencimento e próxima cobrança;
- callbacks de cadastro, WhatsApp, agenda, professora e arquivamento;
- drawers, return context, recents e restauração de scroll/foco.

## CSS e auditoria

Foram removidos somente selectors sem callsite da tabela anterior: `sort-head`, `student-row`,
`student-cell`, colunas `stu-col-*` e recipes responsivos associados a `#card-main`. Os estilos dos
nodes de domínio — próxima ação, status, professora, contato e mensalidade — permaneceram no Admin.
Seletores genéricos usados por outras tabelas e o trabalho paralelo de perfil não foram alterados.

O layout audit passou a reconhecer também headers individuais visualmente ocultos do recipe
ordenável. Em cards, somente headers não ordenáveis ficam fora da apresentação visual; sort headers,
row headers, cells, labels compactas e associations continuam sendo lidos e validados.

## Tests e gates

### Focados

- 24 tests de Alunos passaram no Node 24, cobrindo filas, competência mensal, ordenação, filtros,
  estados, navegação, drawers, menu e restauração de foco;
- uma regressão final de 5 tests passou após os ajustes de foco e accessible names;
- o teste confirma que a row não possui `tabIndex` e clicar nela não abre o cadastro;
- a11y focado passou em 6 fluxos de Alunos, incluindo menu por ArrowDown/Escape;
- matriz principal passou em 120 cenários: 10 estados, 6 larguras, normal/stress e zero issues;
- matriz do overflow passou em 12 cenários nas mesmas 6 larguras e zero issues;
- larguras cobertas: 390, 768, 1281, 1551, 1552 e 2048 px;
- estados cobertos: default, pagamento em dia, atrasado, vence hoje, cancelado, loading, error,
  empty, filtered empty, extreme e overflow aberto.

### Gates amplos

- architecture audit passou com 142 production files;
- lint, Prettier e `git diff --check` passaram;
- build TypeScript/Vite passou; bundle principal 1.378,80 kB raw / 370,08 kB gzip;
- a11y completo passou em 27 fluxos, WCAG A/AA e focus entry/restoration;
- design-system audit passou em 45 cenários, zero issues.

`pnpm run validate:ui`, executado no Node 24 temporário sem alterar a máquina, avançou por
architecture e lint, mas parou em 315/316 tests. A única falha continua fora da T06:
`links an experimental enrollment to an existing student with the same phone` procura o placeholder
`DD/MM/AAAA`, ausente no fluxo de matrícula experimental alterado em paralelo. Os gates posteriores
foram executados individualmente e passaram.

## Revisão visual before/after

Baseline:

```text
langyspace-admin/.local/admin-layout-audit/2026-08-28T08-50-15.982Z
```

Resultado principal:

```text
langyspace-admin/.local/admin-layout-audit/2026-08-28T09-05-23.574Z
```

Overflow aberto:

```text
langyspace-admin/.local/admin-layout-audit/2026-08-28T09-14-01.635Z
```

Foram inspecionadas capturas before/after em 390, 1281 e 2048 px, além do overflow aberto nas três
larguras representativas. O resultado apresenta:

- card de uma coluna no mobile, com conteúdo extremo quebrando sem scroll horizontal;
- cards de duas colunas no container intermediário, com contato e cobrança completos;
- tabela ampla no desktop, mantendo densidade e alinhamento entre cells;
- sort controls em barra única nos recipes de card;
- WhatsApp e overflow separados da navegação do cadastro;
- menu com Agenda em foco, danger separado e popup dentro do viewport, inclusive em 390 px;
- loading, error, empty e filtered empty sem superfície ou espaçamento duplicado.

## Handoff para T07

T07 pode preparar a release imutável dos dois pilotos, mas deve repetir o gate integral depois da
estabilização do teste paralelo de matrícula. Não publicar, trocar o path local, commitar, enviar ou
fazer deploy sem autorização explícita e sem checksum/artefato verificáveis.
