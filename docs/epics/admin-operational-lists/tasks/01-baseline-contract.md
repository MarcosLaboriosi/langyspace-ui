# T01 — Baseline, contrato e aprovação

Status: concluída em 2026-08-28. Evidência: [t01-evidence.md](../t01-evidence.md).

## Objetivo

Congelar a evidência do Admin e fechar o menor contrato público antes de escrever runtime.

## Trabalho

- reler handoff/progress e conferir `main` dos dois repositórios sem sobrescrever dirty work;
- enumerar cada tabela/lista ativa, rota, estado, largura, ação e navegação;
- marcar candidatas de V1, ondas futuras e exclusões;
- validar a API proposta com fixtures tipadas de Leads e Alunos;
- resolver union de primary/quick/overflow, link/command navigation e sortable column;
- provar table/row/rowheader/cell em 390/768/1281 com browser spike; se falhar, registrar fallback
  tabular com scroll e bloquear cards;
- confirmar ambos os exports como `layer: molecule`, sem alterar a taxonomia do manifesto;
- revisar bundle/dependency constraints;
- atualizar discovery, requirements, review e technical review com o veredito.

## Aceite

- Leads e Alunos compilam conceitualmente com `primaryColumn`, data columns e actions, sem casts nem
  adapters;
- zero prop de domínio, CSS livre, breakpoint livre ou bulk selection;
- roles da apresentação compacta têm estratégia aprovada;
- API final e exemplos recebem aprovação de produto, design system, React e accessibility;
- progress aponta T02 como próxima task.

## Validação

- `pnpm run typecheck`;
- `node scripts/spikes/admin-operational-list-semantics.mjs`;
- `pnpm exec prettier --check docs/epics/admin-operational-lists/**/*.md quality/spikes scripts/spikes`;
- links relativos dos documentos e tasks válidos;
- diff review restrito ao épico.
