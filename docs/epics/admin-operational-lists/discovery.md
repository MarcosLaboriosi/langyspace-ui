# Discovery: listas operacionais do Admin

## Pergunta

Qual é o menor contrato que pode sair do Admin e entrar em `@langyspace/ui` sem transformar a
biblioteca em um espelho do domínio nem criar um data grid genérico difícil de manter?

## Escopo observado

O inventário foi feito no checkout atual de `langyspace-admin` e `langyspace-ui`, preservando as
alterações locais existentes. Nenhum arquivo runtime, dado, rota ou ambiente foi alterado.

O `AdminPortalApp` é a aplicação roteada. `src/pages/AdminPage` contém uma tabela de scaffold, mas
não está montado em `src/routes/index.tsx`; ele não é candidato de migração nem deve influenciar a
API pública.

### Revalidação da T01

Em 2026-08-28, `origin/main` manteve as 16 tabelas e as duas superfícies de Leads abaixo. O working
tree do Admin possui trabalho paralelo que substitui o switch `/leads?area=...` por uma
`LeadCohortPage` unificada. Como essa alteração ainda não é baseline estável, ela foi preservada e
não alterou o contrato da library. O callsite exato do primeiro piloto deve ser revalidado em T05.

## Baseline

| Família                           |                                                          Uso ativo encontrado | Implementação atual                        |
| --------------------------------- | ----------------------------------------------------------------------------: | ------------------------------------------ |
| tabelas no `AdminPortal`          |                                                                            16 | `<table>` + classes globais em `AdminRoot` |
| listas de Leads                   |                                                                             2 | grids/cards locais e incompatíveis         |
| listas operacionais não tabulares |                                               agenda, prioridades e marketing | cards/rows específicos                     |
| menu por array                    |                                            1 `RowMenu` reutilizado localmente | `icon`, `label`, `onSelect`, `className`   |
| segundo menu de ações             |                                                              1 em `LeadsPage` | markup, state e styles próprios            |
| grupos inline de ações em tabela  | alunos, professoras, cobranças, assinaturas, repasses, despesas e influencers | `row-actions` + `stopPropagation` manual   |

As 16 tabelas ativas cobrem alunos, detalhes de professora, professoras, repasses, cobranças,
assinaturas, despesas, influencers e planos. Algumas são simples; cobranças adiciona seleção em
lote, sessão guiada e ações condicionais.

## Padrões convergentes

### Estrutura

- cabeçalho com colunas e, em alguns casos, ordenação;
- identidade principal com Avatar, nome e metadado;
- células secundárias com label, valor, status e contexto;
- última coluna reservada a ações;
- estado vazio, loading e erro já resolvidos por `StatePanel`/`LoadingState`;
- tabela desktop que vira cards em containers menores;
- `data-label` repetido para recriar o nome da coluna no card responsivo.

### Ações

- ações rápidas só de ícone;
- comandos rotulados inline quando são a próxima operação importante;
- overflow para comandos secundários e destrutivos;
- callbacks e condições pertencem ao Admin;
- o label já é necessário para `title`, `aria-label` ou item visível no menu.

A sugestão de array `{ icon, label, onSelect }` já foi validada no próprio produto pelo `RowMenu`.
O problema atual é que o tipo se chama `StudentMenuAction`, usa `className` para tom destrutivo e
não possui contrato completo de foco, Escape, navegação por teclado ou retorno de foco.

### Navegação

Há quatro comportamentos diferentes:

1. linha clicável com Enter/Espaço e proteção explícita do target (`alunos`, `cobranças`);
2. linha clicável apenas por mouse (`professoras`, `repasses`, `assinaturas`);
3. botão explícito `Abrir cadastro` (`LeadCohortPage`);
4. cards sem navegação primária, apenas comandos (`LeadsPage`).

O package não deve depender de React Router nem construir URLs. Ele pode renderizar uma ação
primária semanticamente correta a partir de um descriptor `href` ou `onNavigate`; o Admin continua
dono de rota, query params, drawers, histórico e contexto de retorno.

## Divergências que não devem virar props agora

- percentuais livres de largura por coluna;
- breakpoints diferentes por página;
- cores/classes do Admin (`pink`, `warn-text`, `stu-*`);
- seleção em lote e limite de invoice;
- sessão guiada de cobranças;
- paginação e React Query;
- regra de próxima ação, status, cobrança, recorrência ou prioridade;
- templates de pessoa, plano, professora ou invoice;
- calendário, agenda e funil de marketing.

## Decisão

Criar duas peças públicas e product-agnostic, com o Admin como único piloto inicial:

1. `ActionMenu`, molecule controlada por descriptors semânticos;
2. `OperationalList`, molecule tipada para primary/data columns, navegação, ações
   primary/quick/overflow e transformação responsiva canônica.

`OperationalList` compõe primitives existentes, mas não busca, filtra, ordena, pagina nem interpreta
itens. O consumer entrega React nodes para as células e callbacks para interações.

## Piloto recomendado

O primeiro consumer deve ser `LeadsPage?area=contato`:

- exercita cards responsivos, ações rotuladas e menu overflow;
- possui paginação, loading, erro e vazio externos ao componente;
- não adiciona sorting, bulk selection ou click de linha no primeiro corte;
- permite validar a API antes da tabela mais densa de alunos.

Depois do piloto, alunos valida colunas ordenáveis, ação primária e conteúdo extremo. Somente então
as filas financeiras entram na migração.

## Maturity gate

A family entra no package apenas se o piloto provar simultaneamente:

- redução real de markup/styles no Admin;
- nenhuma prop de domínio ou CSS arbitrário;
- semântica de tabela/lista preservada em desktop e mobile;
- ações e navegação funcionais somente por teclado;
- API pequena o suficiente para ser explicada com dois exemplos;
- story/audit capazes de detectar overflow, sobreposição, target pequeno e menu fora do viewport;
- nenhum adapter local que recrie o componente antigo.

Se a segunda lista exigir condicionais de produto dentro do package ou uma coleção de escape hatches,
o resultado do piloto permanece local no Admin e a promoção é rejeitada.

## Evidência de fechamento da T01

O contrato TypeScript e a estratégia semântica responsiva foram aprovados em
[t01-evidence.md](t01-evidence.md). A aprovação cobre o shape e o Chromium configurado no package;
não substitui Storybook, axe, layout audit ou pilotos reais.
