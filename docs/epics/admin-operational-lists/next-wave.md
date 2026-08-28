# Próxima onda — tarefas propostas

## Boundary

Estas tarefas são follow-ups do rollout, não reabrem a condição de conclusão do épico V1. Cada uma
exige autorização própria para alterar o Admin. Nenhuma delas autoriza nova versão do package,
deploy ou mutation financeira.

## NW01 — Assinaturas com o contrato V1

Status: `ready`.

### Objetivo

Migrar somente a tabela ativa de Assinaturas para `OperationalList` usando
`@langyspace/ui@1.4.0`, sem alterar API pública, queries, filtros, drawer ou operações financeiras.

### Dependências

- release imutável `v1.4.0` instalada no Admin;
- callsite `AssinaturasView` estável no `HEAD`;
- fixtures das filas e do drawer disponíveis nos tests/audits atuais.

### Escopo

- primary column `Assinatura`, com status, ID e modo de pagamento;
- columns `Aluno`, `Plano / troca`, `Cobrança` e `Operação`;
- `Ver assinatura` como navegação command explícita;
- WhatsApp como quick action e `Aluno` no overflow;
- estado vazio dentro da table compartilhada;
- remoção somente dos selectors comprovadamente órfãos dessa tabela.

### Estados visuais

- default e conteúdo longo;
- filas `ativas`, `troca_pendente`, `pagamento_pendente` e demais filtros existentes;
- loading e error da leitura mensal;
- empty e filtered empty;
- menu aberto, drawer aberto e retorno de foco;
- 390, 768, 1281, 1551, 1552 e 2048 px.

### Aceite

- nenhuma row inteira clicável; alvo `Ver assinatura` é explícito;
- nenhuma regra de cobrança ou plano sai do Admin;
- tests focados, a11y, layout e screenshots passam;
- `validate:ui` Admin passa ou bloqueio externo é isolado e provado;
- diff não modifica Cobranças, Repasses ou o package.

## Backlog dependency-ordered

| Task | Escopo                                                    | Dependência                                    | Contrato esperado                |
| ---- | --------------------------------------------------------- | ---------------------------------------------- | -------------------------------- |
| NW02 | três tabelas de Repasses                                  | NW01 confirma nova adoção financeira           | V1 sem alteração                 |
| NW03 | `Receber agora` e `Contas a pagar`                        | NW02 estabiliza navegação financeira           | V1 sem alteração                 |
| NW04 | Despesas, Influencers e Planos, um callsite por task      | NW03                                           | V1 sem alteração                 |
| NW05 | Professoras, allowlist e tabelas de detalhe, uma por task | paralelo após NW01                             | V1 sem alteração                 |
| NW06 | Marketing                                                 | revisão visual própria do funil inline         | V1 sem alteração provável        |
| NW07 | Cobranças                                                 | spike aprovado em `bulk-selection-proposal.md` | nova minor somente se necessária |

Agenda não entra neste backlog de `OperationalList`; precisa de pattern separado para calendário,
janelas e fila temporal.
