# Tasks

- [x] [T01 — Baseline, contrato e aprovação](tasks/01-baseline-contract.md)
- [x] [T02 — ActionMenu acessível](tasks/02-action-menu.md)
- [x] [T03 — OperationalList e responsividade](tasks/03-operational-list.md)
- [x] [T04 — Storybook, audits e package candidate](tasks/04-storybook-package.md)
- [x] [T05 — Piloto Admin em Leads](tasks/05-admin-leads-pilot.md)
- [x] [T06 — Segunda adoção Admin em Alunos](tasks/06-admin-students-adoption.md)
- [x] [T07 — Release imutável e produção Admin](tasks/07-release-production.md)
- [x] [T08 — Revisão financeira e handoff](tasks/08-finance-review-handoff.md)

## Ordem de dependência

```text
T01 -> T02 -> T03 -> T04 -> T05 -> T06 -> T07 -> T08
```

Somente uma task fica em andamento. O package não recebe tag antes das duas adoções reais. Filas
financeiras não entram em T02/T03 para evitar que bulk selection e ações de provider inflem o V1.

O épico V1 está concluído. As tarefas posteriores estão separadas em [Próxima onda](next-wave.md) e
não ampliam retroativamente esta checklist.
