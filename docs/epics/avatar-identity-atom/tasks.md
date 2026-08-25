# Tasks

- [x] [T01 — Inventário, baseline e aprovação](tasks/01-inventory-baseline.md)
- [x] [T02 — Atom Avatar](tasks/02-avatar-atom.md)
- [ ] [T03 — Contratos e package candidato](tasks/03-package-candidate.md)
- [ ] [T04 — Adoção Admin](tasks/04-admin-adoption.md)
- [ ] [T05 — Adoção Teacher](tasks/05-teacher-adoption.md)
- [ ] [T06 — Cleanup Student e revisão final](tasks/06-student-cleanup-final-review.md)
- [ ] [T07 — Release, produção e encerramento](tasks/07-release-production.md)

## Ordem de dependência

```text
T01 -> T02 -> T03 -> T04 -> T05 -> T06 -> T07
```

Somente uma task permanece em andamento. Admin e Teacher são sequenciais para que qualquer
descoberta de API no primeiro consumer seja resolvida no package antes de ampliar a migração.
