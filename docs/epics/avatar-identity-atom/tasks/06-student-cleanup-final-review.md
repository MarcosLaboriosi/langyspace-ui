# T06 — Cleanup Student e revisão final

## Responsabilidade

Remover a cópia morta do Student e revisar o conjunto como uma mudança única antes de publicar.

## Checklist

- [ ] provar novamente que Student possui zero imports/callsites;
- [ ] remover somente os três arquivos Avatar;
- [ ] manter package/lock/allowlist intactos;
- [ ] rodar audit, lint/build e gate UI do Student;
- [ ] revisar diffs UI/Admin/Teacher/Student contra todos os requirements;
- [ ] confirmar Landing/Cupom sem mudanças;
- [ ] remover logs, assets temporários e branches mortas;
- [ ] atualizar progress com evidências do candidate.

## Done

Não resta implementação local, todos os consumers aplicáveis estão verdes e o diff está pronto
para release sem decisão aberta.

## Validação focada

- Student focused build/audit e full UI gate aplicável;
- `git diff --check` em quatro repos;
- comparação de package checksum instalado nos dois consumers runtime;
- inspeção dos screenshots finais.
