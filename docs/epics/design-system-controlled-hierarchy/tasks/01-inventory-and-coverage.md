# T01 — congelar inventário e cobertura visual

Status: concluída.

## Responsabilidade

Registrar o baseline atual e transformar todo risco visual/arquitetural em decisão por callsite e
caso determinístico antes de alterar código.

## Escopo

- congelar SHAs, dependências, duplicações, adapters, overrides e descendant selectors;
- classificar cada wrapper em canonical, layout-only ou controle de domínio;
- mapear rotas, states, stress content, breakpoints e fixtures existentes/faltantes;
- registrar components candidatos e condição objetiva de promoção.

## Conclusão

Inventário e matriz de cobertura versionados, sem callsite ou estado afetado sem decisão.

O baseline confirmou 22 wrappers totais, 16 visual overrides, 115 arquivos idênticos em
Student/Teacher e os components promovidos/rejeitados. `inverse` entrou por dois callsites reais;
`shape` saiu de Button porque não existe uso rotulado nos produtos. Os gaps de cobertura viraram
subtasks explícitas em `visual-coverage.md`.

## Validação focada

- `pnpm run test:button-system` nos seis worktrees;
- smoke dos casos de layout focados já existentes, sem alterar assertions;
- worktrees originais comparados antes/depois.

Evidência:

- seis button-system audits passaram, cobrindo 17/99/190/325/492/21 production files;
- package 4, Landing 4, Admin 6, Student 4, Teacher 4 e Cupom 4 cenários focados passaram em 390 px;
- nenhuma assertion, fixture ou source file de produto foi alterado durante o baseline.
