# Evidência T05 — piloto Admin em Leads

## Veredito

T05 aprovada no escopo de Leads. O candidate local foi instalado no Admin e a implementação ativa
de `/leads`, `LeadCohortPage`, passou a compor `OperationalList` e `ActionMenu` pelo package. Queries,
carregamento de páginas, filtros, dialogs, mutations e callbacks de produto permaneceram no Admin.

O checkout continuou em `main`, sem branch/worktree, commit, publicação, deploy ou escrita de
produção. Alterações paralelas que surgiram durante a execução foram preservadas sem edição pela
T05, inclusive o épico `admin-person-operational-profile` e mudanças em `AdminPortal/index.tsx`,
`styles.ts` e contratos do service.

## Candidate instalado

```text
path: ../langyspace-ui/.local/candidates/admin-operational-lists/langyspace-ui-1.3.0.tgz
sha256: 0abeff3f795a6051d293bc7e0506edd82cd1b0ea75569e6325d9eb1d01fc65c0
package metadata: 1.3.0
```

`package.json` e `pnpm-lock.yaml` apontam deliberadamente para o tarball local durante os pilotos.
O import ESM confirmou `ActionMenu` e `OperationalList` disponíveis no arquivo instalado. T07 ainda
deve substituir esse path pelo artifact minor imutável publicado.

## Composição efetiva

A lista ativa recebeu:

- primary column `Lead`, com nome navegável para o cadastro, email e ID;
- column `Contato` com telefone;
- column `Estágio` com status e explicação;
- column `Acompanhamento` com status e próxima orientação;
- `Converter em aluna` como primary action somente quando o workflow já permitia;
- WhatsApp contextual como quick action somente quando já estava disponível;
- cadastro, workflow, experimental, links de cadastro/pagamento e reenvio no overflow;
- `Descartar lead` com `tone="danger"`, normalizado por último pelo package.

O nome também é a navegação primária acessível, mas `Abrir cadastro` continua no overflow para
preservar a ação explícita anterior. Nenhuma regra de elegibilidade, callback ou efeito foi movido
para a UI library.

## Estados e comportamento preservados

Foram mantidos:

- `useAdminPortalStudentCohort('lead')` e flatten das páginas;
- carregamento automático de `fetchNextPage` e estados pending/error/empty;
- filtros por busca, categoria e workflow, inclusive limpeza;
- abertura de comunicação, cadastro e enrollment com o mesmo return context;
- registro de contato, retorno, descarte e duplicidade pelos mesmos requests;
- abertura/cópia/reenvio de cadastro e cópia de pagamento com a disponibilidade anterior;
- redirects das URLs legadas de Leads/pré-cadastro.

O teste novo abre o overflow apenas pelo teclado, move foco com ArrowDown/End, fecha com Escape e
confirma retorno ao trigger. O audit a11y também cobre entrada no menu, retorno ao trigger, abertura
do dialog e restauração após Escape.

## Redução de duplicação

`LeadCohortPage/styles.ts` caiu de 211 para 90 linhas: menos 121 linhas, redução de 57,3%. Foram
removidos `List`, `LeadCard`, `Person`, `Detail`, `Actions`, `ActionMenu` e `MenuAction` locais. O
diff runtime somando page e styles teve redução líquida de 106 linhas.

Restaram somente wrappers de conteúdo de célula e estilos dos filtros/dialog, sem seletor contra
`OperationalList`, component IDs, action slots ou breakpoints do recipe compartilhado. Portanto o
piloto possui zero CSS override do componente da library.

## Tests e audits

### Focados

- 7 tests de Leads passaram no Node 24, cobrindo rota unificada, conversão, WhatsApp, links,
  reenvio, workflow, keyboard/focus e redirect legado;
- a11y focado passou em 3 fluxos de Leads, WCAG A/AA e focus entry/restoration;
- layout focado passou em 160 cenários, 8 larguras, modos normal/stress e zero issues;
- o audit leu 112 tabelas, 8.240 células, 100 account footers, 100 avatars e 224 compound controls;
- larguras cobertas: 390, 620, 768, 1280, 1281, 1551, 1552 e 2048 px;
- estados cobertos: default, loading, error, empty, paginated, extreme, contato legado, menu aberto,
  descarte e duplicidade.

O layout audit foi atualizado para reconhecer os markers reais de `OperationalList`, row headers e
cells, status chips e popup do `ActionMenu`. Headers não ordenáveis visualmente ocultos no modo card
são tratados como a exceção documentada do recipe, sem retirar as verificações de conteúdo,
overflow ou viewport.

### Gates amplos

- architecture audit passou com 142 production files;
- lint passou;
- build TypeScript/Vite passou; bundle principal 1.385,33 kB raw / 370,86 kB gzip;
- a11y completo passou em 25 fluxos;
- design-system audit passou em 45 cenários, zero issues.

`pnpm run validate:ui` não concluiu por dois bloqueios fora da T05:

1. o Node 26 local remove `window.localStorage` sem storage file e produziu falhas em cascata; a
   execução foi repetida no Node 24 temporário, sem alterar a máquina;
2. no Node 24, 315/316 tests passaram. O único teste que falhou foi
   `links an experimental enrollment to an existing student with the same phone`, reproduzido
   isoladamente por ausência do campo `DD/MM/AAAA` em um fluxo de matrícula alterado em paralelo.

Os gates posteriores foram executados individualmente e passaram. O layout global, iniciado
separadamente, percorreu todas as larguras até parte de 1280 px sem issue, mas atingiu o timeout de
segurança de 900 s antes do resumo final. A matriz específica completa da T05 passou conforme os
números acima. T07 deve exigir novamente o gate integral depois que o fluxo paralelo estiver
estável.

## Revisão visual

Foram inspecionadas as capturas finais em 390, 1281 e 2048 px para default/extreme, empty, menu
aberto e duplicidade. O resultado apresenta:

- cards de uma coluna em mobile, duas colunas no container intermediário e tabela no amplo;
- primary action dominante, WhatsApp compacto e overflow consistente;
- labels de campos recuperadas no modo card;
- conteúdo extremo quebrando sem scroll horizontal;
- menu dentro do viewport, danger separado e foco visível;
- dialog de duplicidade sem colisão e com ações seguras em largura total no mobile;
- nenhum dado real nas fixtures/capturas.

## Handoff para T06

T06 pode adotar o mesmo candidate em Alunos sem reinstalar ou publicar versão. Deve revalidar o
callsite ativo e preservar o trabalho paralelo do Admin. O teste de matrícula e o timeout do gate
global permanecem dívida de integração para nova verificação antes de T07, não autorização para
alterar o fluxo fora do escopo de Alunos.
