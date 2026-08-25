# T11 — Audit engine e governance

## Objetivo

Fazer o sistema escalar por contracts acionáveis, sem transformar governance em burocracia.

## Passos

1. uma fixture positiva/negativa por rule atual;
2. adicionar rule ID, path, line e remediation;
3. criar aliases/formatting fixtures que exponham limites de regex;
4. usar AST somente nas rules que falharem nessas fixtures;
5. adicionar completeness de test/story/manifest e layer boundaries;
6. tipar exceptions com owner/reason/expiry;
7. criar maturity/deprecation checklist;
8. validar CLI empacotado no consumer.

## Maturity gate

O candidate recebe decisão sobre reuso, semântica, API reduction, recipe, a11y, story/test, package,
migration e rollback. A falha em qualquer item essencial mantém o component local.

## Done

- rules possuem tests isolados;
- mensagens são acionáveis;
- nenhum rewrite AST abrangente sem necessidade;
- novo public component incompleto falha CI;
- components locais de domínio não precisam entrar no manifesto.

## Resultado

- 12 rule IDs estáveis expõem diagnostics estruturados e strings v1 compatíveis;
- aliases, multiline imports/unions, cada rule, config inválida e fixture positiva são cobertos;
- exceptions possuem tipos públicos e expiry opcional compatível; a própria library exige expiry;
- `CONTRIBUTING.md` formaliza ownership, maturity gate, component shape, deprecation e checks;
- package consumer compila o tipo `AuditConfig` e executa o CLI publicado.

## Rollback

Rules novas começam focused/advisory quando necessário e viram blocking somente sem falso positivo.
