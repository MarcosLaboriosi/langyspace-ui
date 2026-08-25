# T01 — congelar inventário e cobertura

Status: concluída.

## Responsabilidade

Transformar o diagnóstico inicial em baseline reproduzível antes de alterar componentes.

## Escopo

- criar worktrees isolados dos seis repositórios a partir das mains confirmadas;
- classificar as 14 ocorrências locais em espera, loading standalone, motion de domínio ou outro;
- localizar/adicionar fixtures sanitizadas para cada superfície afetada;
- registrar computed size, posição, cor, accessible status e motion atuais.
- registrar o submit do Landing como divergência confirmada: copy pontilhada e seta mantida.

## Checklist

- [x] baseline por arquivo e callsite;
- [x] allowlist candidata com motivo e owner;
- [x] matriz de rotas/estados/larguras;
- [x] focused cases e fixtures localizados;
- [x] worktrees originais verificados antes da implementação.

## Conclusão

Cada ocorrência de rotação possui decisão explícita e existe cobertura determinística para a
migração de loading. O inventário de links ocorre em T04, imediatamente antes de ActionLink; o de
adapters ocorre em T06, evitando bloquear a prioridade de loading confirmada pelo usuário.

## Validação focada

- `pnpm run test:button-system` nos cinco consumidores;
- execução focada dos casos de layout inventariados;
- inspeção de screenshots baseline em 390/1281 e nos boundaries afetados.
