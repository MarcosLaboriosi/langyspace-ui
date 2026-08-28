# Plano técnico — espaçamento de contador no FilterPills

## Solução

Mover o `gap` para o recipe comum de `Item` e declarar `display: inline-flex`, `align-items: center`
e `justify-content: center`. Isso ativa o espaçamento nativo entre o label e `Count` sem introduzir
wrapper ou mudar o contrato JSX.

## Arquivos

### Library

- `src/molecules/FilterPills/styles.ts` — recipe visual;
- `src/molecules/FilterPills/FilterPills.test.tsx` — regressão do layout interno;
- `src/molecules/FilterPills/FilterPills.stories.tsx` — fixture `Todos: 175`;
- `package.json` — patch version;
- este epic — decisão, execução e evidência.

### Admin

- `package.json` e `pnpm-lock.yaml` — URL imutável e resolução de `v1.4.1`.

## Contratos e dados

Nenhuma mudança de tipo, prop, export, acessibilidade, dado ou API. `counts` continua sendo um mapa
opcional e a accessible name permanece `label: count`.

## Validação

1. Teste unitário e story focados.
2. `pnpm run validate:ui` da library e inspeção em 390/1281/2048 px.
3. CI de `main`, tag anotada, workflow de release, download anônimo e SHA-256.
4. Instalação frozen, testes focados, build e `validate:ui` Admin conforme custo/risco.
5. Workflow de deploy; se a falha de infraestrutura anterior se repetir antes dos steps, build local
   e deploy explícito `hosting:admin`.
6. HTTP 200 nas rotas Admin, comparação do bundle remoto com o build local e confirmação de marker
   do `FilterPills` servido.

## Rollback

Reverter o commit de dependência do Admin para `v1.4.0` e republicar `hosting:admin`. A release
`v1.4.1` permanece imutável e não é apagada.

## Revisão crítica

- Produto: corrige exatamente a legibilidade reportada, sem redesenho.
- Tech Lead: o defeito pertence ao recipe compartilhado; override no Admin criaria drift.
- Engenharia: `inline-flex` é a menor correção e torna efetivo o `gap` já pretendido.
- QA: a fixture reproduz o valor reportado e cobre tamanhos, estados e overflow.
- Segurança/operação: somente package público e Hosting Admin mudam; não há backend ou dado.

Parecer: plano aprovado para execução em ordem library → release → Admin → produção.
