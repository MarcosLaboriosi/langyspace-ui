# Inventário de loading

Baseline: 2026-08-25, a partir das mains registradas em `progress.md`.

## Decisão de produto

- o label do comando permanece estável;
- o ícone inicial permanece visível;
- loading substitui sempre o slot direito por um Spinner;
- sem ícone direito declarado, o Spinner é criado nesse slot;
- reticências não são indicador de loading;
- icon-only continua substituindo o único glyph pelo Spinner.

## Package e Landing

| Superfície                | Estado atual                                          | Decisão                                       |
| ------------------------- | ----------------------------------------------------- | --------------------------------------------- |
| `langyspace-ui/Icon`      | Icon decide loading e hospeda Spinner interno         | extrair atom; Icon vira wrapper puro          |
| `langyspace-ui/Button`    | com `iconStart`, Spinner migra para a esquerda        | preservar start; Spinner sempre à direita     |
| Landing `TrialLessonForm` | troca label por `Criando seu acesso...` e mantém seta | label estável, `isLoading`, seta em `iconEnd` |

O caso `trial-access-loading` já mantém a Promise pendente e gera screenshots em 390/1281/2048 px.

## Ocorrências locais de rotação

Todas as 14 ocorrências representam espera. Não existe exceção de `rotate(360deg)` a manter nesta
baseline; a allowlist inicial fica vazia.

| Produto | Arquivo                                  | Uso                                   | Migração                                        |
| ------- | ---------------------------------------- | ------------------------------------- | ----------------------------------------------- |
| Admin   | `components/base/LoadingState/styles.ts` | loading standalone                    | `Spinner size="lg"`                             |
| Admin   | `AdminGlobalSearch/styles.ts`            | busca pendente                        | `Spinner size="md"`                             |
| Admin   | `AdminPortal/styles.ts`                  | refresh, identidade, submit e detalhe | Button loading ou Spinner por contexto          |
| Student | `StudentLive/styles.ts`                  | reserva, mensagens e envio pendentes  | Button/Spinner; manter outros keyframes de live |
| Student | `CouponControl/styles.ts`                | aplicação de cupom                    | remover spinner child; usar Button `isLoading`  |
| Student | `CheckoutDialog/styles.ts`               | criação de checkout                   | Button `isLoading` no slot direito              |
| Teacher | `Students/styles.ts`                     | carregamento da lista                 | `Spinner size="lg"`                             |
| Teacher | `PillButton/styles.ts`                   | loading do caminho anchor/button      | Button/Spinner; ActionLink será tratado depois  |
| Teacher | `Today/styles.ts`                        | carregamento da agenda                | `Spinner size="lg"`                             |
| Teacher | `Payouts/styles.ts`                      | carregamento de repasses              | `Spinner size="lg"`                             |
| Teacher | `StudentLearningPreview/styles.ts`       | carregamento de vocabulário           | `Spinner size="lg"`                             |
| Teacher | `SlotActionDrawer/styles.ts`             | mutação de disponibilidade            | Spinner no slot direito                         |
| Teacher | `NotificationDrawer/styles.ts`           | carregamento de notificações          | `Spinner size="lg"`                             |
| Teacher | `ClassDrawer/styles.ts`                  | confirmação/mutação pendente          | Button loading canônico                         |

## Cobertura

- package showcase: normal, ícone esquerdo, ícone direito, dois ícones, sem ícone e icon-only;
- Landing `/`: `trial-access-loading`, normal/stress, 390/1281/2048;
- Admin: LoadingState, busca, refresh, identidade, submit e detalhe nos casos existentes;
- Student: coupon e checkout em testes de componente; StudentLive ganhou a fixture determinística
  `live-reserve-loading` após a revisão confirmar que não havia cobertura de navegador existente;
- Teacher: design mock de Today/drawers e rotas de Students, Payouts e preview;
- motion: `page.emulateMedia({ reducedMotion: 'reduce' })` mais computed `animation-name/duration`.

## Worktrees

- package/épico: `/private/tmp/langyspace-button-atomic-epic.zNMyMj/langyspace-ui`;
- Landing: `/private/tmp/langyspace-loading-right-slot.u52hEM/langyspace`;
- checkouts originais permanecem fora de staging e implementação.
