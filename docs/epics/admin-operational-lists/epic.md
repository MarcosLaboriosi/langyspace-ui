# Épico: listas operacionais do Admin na UI library

## Contexto

O Admin concentra a maior densidade operacional da Langy.space. O portal ativo possui 16 tabelas,
duas listas de Leads e várias listas especializadas. A apresentação responsiva, navegação e grupos
de ações são repetidos dentro de um `AdminRoot` de mais de sete mil linhas de CSS.

A UI library já oferece Button, IconButton, Avatar, StatusChip, SearchInput, FilterPills,
SectionHeader, StatePanel, Dialog e Drawer. Falta o pattern que organiza esses elementos em filas
operacionais consistentes.

## Problema

- tabela desktop e card mobile são reconstruídos por página;
- labels de colunas são duplicados em `data-label`;
- navegação de linha varia entre mouse-only, teclado artesanal e botão explícito;
- ações rápidas, rotuladas e overflow não possuem regra comum;
- existem dois menus locais, com contratos de foco/teclado incompletos;
- ações condicionais fazem algumas linhas crescerem sem limite;
- corrigir responsividade exige alterações extensas em CSS global do portal.

## Objetivo

Publicar `ActionMenu` e `OperationalList` como contratos product-agnostic, validar com Leads e Alunos,
e criar um caminho seguro para migrar as demais filas sem absorver domínio, routing ou data fetching.

```text
Admin data/query/rules
        |
        v
OperationalList -----> primary navigation descriptor
        |              primary action
        |              quick actions
        |              overflow actions
        v
ActionMenu + Button/IconButton + semantic HTML + tokens
```

## Impacto visual

`direct`. O recipe, espaçamento, comportamento responsivo, foco e apresentação das ações mudam nas
listas adotadas. As primeiras rotas são `/leads?area=contato` e `/alunos`; os estados obrigatórios
são default, loading, error, empty, paginated, actions open, long content, dense rows e filtered
empty. As larguras representativas são 390, 768, 1281, 1551, 1552 e 2048 px.

## Escopo

- inventário e baseline das listas ativas;
- contratos públicos de `ActionMenu` e `OperationalList`;
- semântica, focus management e responsive cards;
- Storybook completo, unit/interaction/a11y/layout tests;
- API report, manifest, bundle/package/SSR smokes e README;
- tarball candidato instalado no Admin;
- piloto em Leads e segunda validação em Alunos;
- rollout posterior por ondas, condicionado ao veredito do piloto.

## Fora de escopo

- data grid enterprise;
- fetch, cache, filtros, paginação ou estado de URL;
- regras de cobrança, matrícula, agenda, professora ou repasse;
- seleção em lote de cobranças no primeiro release;
- migração do `AdminPage` não roteado;
- forçar agenda, calendário ou marketing a usar uma estrutura inadequada;
- adoção em Teacher, Student, Landing ou Cupom sem callsite comprovado.

## Resultado esperado

- ações descritas por arrays tipados, sem `className` ou markup repetido;
- navegação explícita e semanticamente correta, sem pseudo-link em `<tr>`;
- um único recipe tabela/card e labels móveis derivados das colunas;
- hierarquia previsível de identidade, estado/contexto e ação primária;
- duas rotas reais adotando o package antes do release;
- documentação suficiente para implementar uma lista nova sem copiar CSS do Admin;
- redução mensurável de markup/styles nos callsites migrados;
- decisão documentada para cada família restante: migrar, estender depois ou manter local.

## Métricas

| Medida                          |     Baseline |                     Meta inicial |
| ------------------------------- | -----------: | -------------------------------: |
| tabelas ativas no AdminPortal   |           16 | 2 callsites migrados antes do V1 |
| implementações locais de menu   |            2 |         0 nos callsites adotados |
| padrões de ativação de linha    |            4 |   1 navegação primária explícita |
| stories da family               |            0 |                       11 ou mais |
| issues de axe/layout no package | desconhecido |                                0 |
| props de domínio ou CSS livre   |   0 desejado |                                0 |

## Condição de conclusão

O épico conclui quando o package imutável estiver publicado, Leads e Alunos estiverem servindo a
versão aprovada, os gates e screenshots estiverem verdes e houver um veredito por escrito para a
migração financeira. A publicação dos componentes, sozinha, não conclui o épico.

## Documentos de decisão

- [Discovery](discovery.md)
- [Requisitos](requirements.md)
- [Refinamento UI/UX](ui-ux-refinement.md)
- [Refinamento técnico](technical-refinement.md)
- [Revisão crítica](review.md)
- [Revisão técnica](technical-review.md)
- [Plano técnico](technical-plan.md)
- [Evidência T01](t01-evidence.md)
- [Evidência T02](t02-evidence.md)
- [Evidência T03](t03-evidence.md)
- [Evidência T04](t04-evidence.md)
- [Evidência T05](t05-evidence.md)
- [Evidência T06](t06-evidence.md)
- [Evidência T07](t07-evidence.md)
- [Evidência T08](t08-evidence.md)
- [Proposal de bulk selection](bulk-selection-proposal.md)
- [Próxima onda](next-wave.md)
- [Tasks](tasks.md)
