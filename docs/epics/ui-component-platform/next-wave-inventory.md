# Inventário da próxima onda

## Escopo medido

O inventário foi repetido em worktrees limpos dos cinco `origin/main`, sem depender dos checkouts de
trabalho. Os SHAs observados foram:

| Produto | SHA            |
| ------- | -------------- |
| Landing | `2c5bc3ac99e0` |
| Admin   | `ae49e0ad13d1` |
| Student | `70caa4969d72` |
| Teacher | `8cff19114515` |
| Cupom   | `fde335645bf4` |

Foram comparados markup, props, estilos, semântica, dependências e callsites das families repetidas,
e não apenas nomes de diretório.

## Decisões

| Family          | Uso real encontrado                    | Decisão                   | Evidência principal                                                                                    |
| --------------- | -------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------ |
| `SectionHeader` | Admin e Teacher                        | promover uma molecule     | mesmo papel de heading + metadata/action; 16 callsites; sem regra de negócio ou asset; API convergente |
| `Title`         | Landing                                | manter local              | três callsites em uma única identidade visual de marketing                                             |
| `Underlined`    | Landing                                | manter local              | dois callsites e decoração ligada à landing                                                            |
| `Feature`       | Student e Teacher                      | manter local              | estrutura semelhante, mas copy, assets e composição pertencem aos fluxos de autenticação               |
| `VerticalLogo`  | nenhuma importação runtime             | remover localmente depois | cópia morta não justifica API pública                                                                  |
| `List` / `Item` | nenhuma composição compartilhada ativa | remover localmente depois | wrappers mortos ou sem contrato semântico estável                                                      |
| global styles   | cinco produtos                         | manter por produto        | reset, fonts, root surfaces e providers têm ownership do app                                           |
| auth shells     | Student e Teacher                      | manter organisms locais   | roteamento, formulário e lifecycle são domínio, não design-system                                      |

## Maturity gate do piloto

`SectionHeader` foi a única family aprovada:

- existe em dois produtos ativos e resolve o mesmo problema de layout;
- recebe conteúdo e ações, mas não conhece query, rota, analytics, loading ou regra de negócio;
- usa heading nativo configurável e preserva props nativas do container;
- expõe apenas `title`, `meta`, `actions`, `headingLevel` e `spacing="default | flush"`;
- não oferece props livres de cor, font-size, margem ou breakpoint;
- depende somente de React, styled-components e tokens da própria library;
- possui unit owner, quatro stories, axe, layout boundary, browser smoke e SSR smoke;
- o package continua independente dos themes de Admin e Teacher.

O contrato aprovado absorve o superset já existente no Admin e substitui o recipe mais estreito do
Teacher. A convergência intencional é para os tokens canônicos de `xl`, `bold`, spacing `8/4` e
wrapping seguro. A diferença anterior de Admin — 30 px versus 32 px no topo, 14 px versus 16 px na
base e font-size 19 px versus 20 px — não representa uma variante de produto válida.

## Migração e prova

- Admin troca duas imports runtime pela export pública e remove quatro arquivos locais mais a suite
  duplicada; os callsites permanecem iguais.
- Teacher troca uma import runtime e remove três arquivos locais; os callsites permanecem iguais.
- Landing, Student e Cupom não recebem dependency churn porque não consomem a nova molecule.
- o tarball candidato foi instalado nos dois consumidores antes da publicação;
- o audit arquitetural dos dois produtos passou sem warning;
- Teacher passou 252 cenários de layout em nove larguras, 14 estados de rota e zero issue;
- Admin passou 13 fluxos de acessibilidade e 45 cenários de design system; o layout audit completo é
  registrado no encerramento da task;
- a baseline Admin possui 15 falhas locais em Node 26 nas três suites que acessam
  `window.localStorage`; as mesmas falhas foram reproduzidas no checkout original sem esta mudança.

Rollback: restaurar os components locais e voltar as duas imports. Nenhuma persistência, payload,
rota ou contrato de domínio muda.
