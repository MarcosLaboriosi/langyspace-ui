# Plano técnico

## Baseline confirmada

| Repo               | `origin/main` | Spinners locais por `rotate(360deg)` |
| ------------------ | ------------- | ------------------------------------ |
| langyspace-ui      | `fd3fb3e`     | 1 interno em `Icon/styles.ts`        |
| langyspace         | `ba72869`     | 0                                    |
| langyspace-admin   | `f435658`     | 3                                    |
| langyspace-student | `1bc6c9f`     | 3                                    |
| langyspace-teacher | `cca6fcf`     | 8                                    |
| langyspace-cupom   | `aa84a43`     | 0                                    |

Os cinco `test:button-system` passam e cobrem 99/191/318/493/21 arquivos respectivamente. O gate
prova ausência de `<button>` e `styled.button` nativos, mas não inspeciona spinner, ActionLink,
recipe duplicado, reduced motion ou tipos copiados.

## Arquitetura atual

```text
Pressable/styles ──> Button
                       └── Icon(isLoading)
                               └── Spinner styled interno

Produtos ──> Button compartilhado/adapters
         ├── spinners locais com keyframes
         └── anchors locais com recipes de botão
```

Problemas:

- `Button` importa a implementação styled de `Pressable`, não o componente;
- `Icon` acumula wrapper de glyph e decisão de loading;
- `Spinner` não tem componente, tipos ou API pública próprios;
- adapters copiam unions e podem divergir da versão instalada;
- o caminho de link do Teacher `PillButton` replica variantes, tamanhos, foco e loading;
- audits sintáticos não protegem a arquitetura pretendida.

## Arquitetura proposta

```text
Pressable ──> Button ──> Icon
                 └─────> Spinner

actionRecipe ──> Button
             └─> ActionLink

Produtos ──> adapters locais estreitos
         ├── Spinner para espera
         ├── ActionLink para CTA por href
         └── Pressable para controles de domínio
```

## Package: Spinner

- criar `src/Spinner/index.tsx`, `styles.ts`, `types.ts` e `index.test.tsx`;
- usar `span`, `currentColor`, círculo de border e `1em` como default;
- oferecer a union `inherit | sm | md | lg`, mapeada para `1em`, 16, 20 e 24 px; convergir os usos
  locais de 15/19/22 px em vez de manter diferenças sem função;
- manter `aria-hidden="true"` como invariant e documentar que status/copy pertencem ao container;
- manter component ID explícito e named imports de styled-components para SSR;
- mover keyframes e reduced-motion para o atom;
- exportar componente e tipos pelo entrypoint público.

## Package: Button e Icon

- remover `isLoading` de `IconProps`;
- `Button` calcula o conteúdo de cada slot e passa `<Spinner />` como node do `Icon`;
- aplicar a decisão de produto: loading preserva start e substitui sempre end; sem end declarado,
  renderizar Spinner no slot direito;
- preservar label e regras icon-only;
- mudar `Button/styles.ts` para compor `Pressable` pelo entrypoint do atom;
- manter `data-loading`, component IDs e selectors compatíveis;
- atualizar README, showcase, unit tests, type tests, package/SSR smoke e layout audit.

## Package: recipe e ActionLink

- extrair somente fragments realmente comuns para um módulo privado `src/actionRecipe.ts` ou pasta
  interna equivalente; ele não é export público;
- compartilhar height, spacing, typography, radius, variants, tone, density, focus e reduced motion;
- manter `Button` dono de disabled/loading e `ActionLink` dono de semântica de anchor;
- criar `src/ActionLink/{index.tsx,styles.ts,types.ts,index.test.tsx}`;
- exigir `href` e oferecer somente children, iconStart/iconEnd, size, density, fullWidth, shape, tone,
  variants primary/secondary/tertiary e props nativas de anchor;
- manter danger/success fora do link; `tone="brand"` permanece restrito a primary;
- não incluir icon-only, disabled, loading ou polymorphism no v1 porque os callsites aprovados têm
  label e estão sempre ativos;
- garantir className/ref e SSR component ID estável.

## Classificação das animações locais

Antes da migração, cada ocorrência entra em uma destas classes:

| Classe                   | Decisão                                                          |
| ------------------------ | ---------------------------------------------------------------- |
| espera de rede/submissão | usar `Spinner`                                                   |
| loading standalone       | `Spinner` dentro de container status/copy                        |
| progresso de domínio     | manter local, renomear semanticamente e adicionar reduced motion |
| skeleton/shimmer         | fora do Spinner; manter componente de estado                     |
| ícone decorativo animado | manter somente com justificativa e reduced motion                |

Uma allowlist deve conter caminho, selector, motivo e owner. Não usar regex ampla por diretório.

## Migração por produto

### Landing

- migrar o submit do `TrialLessonForm` para `isLoading`, label estável e `iconEnd`, eliminando a copy
  pontilhada `Criando seu acesso...`;
- adicionar fixture/interaction que mantém a submissão em andamento e inspeciona label, spinner,
  seta ausente, busy/disabled e alinhamento;
- avaliar English Classes, Final CTA, sticky CTA e 404 contra `ActionLink`;
- migrar somente links que usam o recipe canônico; links de campanha com visual deliberadamente
  próprio ficam locais;
- normalizar imports pelo re-export `components/base/Button` quando não houver necessidade de
  consumir o package diretamente em styles.

### Admin

- migrar `LoadingState`, busca global e `.button-spinner` de submissão;
- manter `StatePanel` como dono de `role/status`, title e description;
- derivar `ButtonProps` do package e manter o mapa local `ghost -> tertiary` somente enquanto houver
  callsites;
- preservar `TextButton` e `IconButton` por terem semântica/tema local real;
- adicionar focused cases de loading e reduced motion ao audit existente.

### Student

- classificar spinners de CouponControl, CheckoutDialog e StudentLive;
- migrar os dois loaders de checkout; manter motion de live apenas quando não representar espera;
- avaliar links pós-pagamento e suporte para `ActionLink`;
- derivar tipos do adapter compartilhado e migrar aliases `pink/green` apenas com busca completa;
- preservar Auth components e controles do portal sobre Pressable.

### Teacher

- classificar e migrar spinners de Students, Today, Payouts, preview, SlotActionDrawer,
  NotificationDrawer, ClassDrawer e PillButton;
- substituir o caminho `<a>` do `PillButton` por `ActionLink` e manter os links de Meet/material;
- migrar callsites de variantes de aparência para semântica antes de retirar aliases;
- preservar controles de calendário, cards, tabs e rows sobre Pressable;
- garantir que o audit abra os drawers reais já cobertos pelo design mock.

### Cupom

- atualizar somente a dependência e executar controle de regressão;
- não criar wrapper de Spinner/ActionLink sem callsite.

## Import boundaries

- package: atoms só importam outros atoms pelos entrypoints, nunca por `*/styles`;
- produtos com adapter: features importam `components/base/Button`; apenas o adapter importa
  `@langyspace/ui` Button;
- styles de controles específicos podem importar `Pressable` diretamente enquanto ele for o atom
  base aprovado;
- Cupom pode importar diretamente por não possuir layer de base reutilizável;
- exceções existentes são inventariadas e removidas por produto, sem alias global ou barrel novo.

## Audits e testes

### Package

- unit: Spinner, Icon puro, Button loading, ActionLink props/ref/markup;
- type: accessible name, href obrigatório, ausência de polymorphism e combinações semânticas;
- architecture: nenhum import de `../*/styles` entre atoms;
- browser: normal/stress, reduced motion, long labels e styled composition;
- Node: import, render e prerender com uma e duas instâncias de styled-components.

### Consumidores

- ampliar `audit-button-system.mjs` com inventário de keyframes/spinner e import boundary;
- manter allowlists pequenas em dados explícitos dentro do script;
- focused layout por superfície migrada antes do full gate;
- rodar `pnpm run validate:ui` completo uma vez após focused checks;
- inspecionar 390 px, cada boundary afetado, 1281 px e 2048 px;
- reduced motion deve ser exercido via `page.emulateMedia({ reducedMotion: 'reduce' })` e computed
  animation, não por snapshot textual.

## Sequência de integração

1. congelar inventário e fixtures em worktrees isolados;
2. implementar Spinner e refactor interno no package;
3. validar consumidores contra tarball local e migrar spinners;
4. implementar ActionLink/recipe e validar SSR;
5. migrar links aprovados e retirar o caminho duplicado do PillButton;
6. normalizar adapters, tipos e import boundaries;
7. fortalecer audits e executar os gates completos;
8. publicar patch/minor conforme API pública, verificar checksum e frozen installs;
9. commits por repo, ancestry checks, pushes sem force, CI/Hosting e prova dos bundles live.

## Migração e compatibilidade

- adicionar Spinner/ActionLink é mudança minor; remover aliases públicos/localmente usados exige
  migração no mesmo rollout e não altera SemVer do package se não forem parte da API pública;
- component IDs existentes do Button permanecem; novos atoms recebem IDs próprios;
- o asset de release é imutável e nunca substituído;
- rollback de consumidor volta ao release anterior; rollback do package exige nova versão, não
  edição do asset publicado.

## Riscos e mitigação

| Risco                                           | Mitigação                                                        |
| ----------------------------------------------- | ---------------------------------------------------------------- |
| Spinner mudar alinhamento/tamanho               | baseline de computed geometry e screenshots antes/depois         |
| remover rotação de motion legítimo              | classificação por ocorrência e allowlist justificada             |
| ActionLink virar Button polimórfico             | componente anchor separado e props deliberadamente menores       |
| recipe compartilhado criar dependência circular | módulo privado sem imports de componentes                        |
| adapters quebrarem callsites históricos         | derivar tipos primeiro, migrar aliases depois, focused typecheck |
| imports diretos proliferarem novamente          | audit de boundary com exceções explícitas                        |
| SSR voltar a falhar                             | named styled import e smoke Node/prerender antes do release      |
| rollout alterar cinco produtos sem necessidade  | Cupom e superfícies sem uso ficam controles, não recebem código  |

## Revisão crítica

- Product: o usuário percebe consistência de loading e ação, não a taxonomia interna; portanto a
  equivalência visual é requisito, e a reorganização de pastas sozinha não é sucesso.
- Tech Lead: rejeitado exportar `Icon` apenas para justificar Spinner; Spinner possui 14 evidências
  próprias e merece atom público independente.
- Senior Engineering: rejeitado colocar `isLoading`, `disabled`, `as` e router no ActionLink v1; os
  callsites comprovados não exigem esse contrato.
- QA: o audit atual é insuficiente; reduced motion e drawers/checkout reais precisam de casos
  determinísticos, não apenas busca estática.
- UX: aprovado manter a copy do comando durante loading e trocar somente o slot direito; rejeitado
  usar reticências como indicador ou mover o Spinner para o slot esquerdo.
- Accessibility: Spinner permanece decorativo; o status acessível continua no Button/StatePanel ou
  container, evitando múltiplos anúncios.
- Performance: não adicionar dependência; reutilizar styled-components e Lucide somente onde o
  motion for de domínio.
- Operação: publicar e integrar somente depois dos seis gates locais; nenhum worktree original é
  usado para staging.

## Decisões aprovadas

- atom público `Spinner`;
- atom público e separado `ActionLink`;
- recipe visual privado compartilhado;
- adapters locais somente por semântica/layout real;
- audits de arquitetura mais reduced motion;
- rollout incremental em worktrees isolados, com todos os produtos no mesmo artefato.
