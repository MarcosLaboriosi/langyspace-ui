# T06 — Cleanup Student e revisão final

## Responsabilidade

Remover a cópia morta do Student e revisar o conjunto como uma mudança única antes de publicar.

## Checklist

- [x] provar novamente que Student possui zero imports/callsites;
- [x] remover somente os três arquivos Avatar;
- [x] manter package/lock/allowlist intactos;
- [x] rodar audit, lint/build e gate UI do Student;
- [x] revisar diffs UI/Admin/Teacher/Student contra todos os requirements;
- [x] confirmar Landing/Cupom sem mudanças;
- [x] remover logs e assets temporários do diff;
- [x] atualizar progress com evidências do candidate.

## Resultado

Foram removidas 77 linhas mortas sem dependency churn. Architecture/build e o gate oficial com 648
cenários passaram. O lint completo expôs 15 erros anteriores fora do diff; eles estão registrados
na evidência e não foram mascarados nem misturados a este cleanup.

## Done

Não resta implementação local, todos os consumers aplicáveis estão verdes e o diff está pronto
para release sem decisão aberta.

## Validação focada

- Student focused build/audit e full UI gate aplicável;
- `git diff --check` em quatro repos;
- comparação de package checksum instalado nos dois consumers runtime;
- inspeção dos screenshots finais.
