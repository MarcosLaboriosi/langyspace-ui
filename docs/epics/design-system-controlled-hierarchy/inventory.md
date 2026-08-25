# Inventário baseline

Baseline: 2026-08-25, a partir das origins registradas em `progress.md`.

## Volumes

| Component       | Landing | Admin | Student | Teacher | Cupom | Total |
| --------------- | ------: | ----: | ------: | ------: | ----: | ----: |
| Button          |       1 |    55 |       4 |       3 |     0 |    63 |
| IconButton      |       0 |    16 |       2 |      12 |     0 |    30 |
| ActionLink      |       2 |     0 |       2 |       1 |     0 |     5 |
| Spinner         |       0 |     5 |       5 |      11 |     0 |    21 |
| StatusChip      |       0 |    21 |       0 |      14 |     0 |    35 |
| EmptyState      |       0 |     0 |      10 |      24 |     0 |    34 |
| StatePanel      |       0 |    21 |       0 |       0 |     0 |    21 |
| LoadingState    |       0 |     5 |       0 |       0 |     0 |     5 |
| FilterPills     |       0 |     6 |       0 |       2 |     0 |     8 |
| AuthNotice      |       0 |     0 |       9 |      11 |     0 |    20 |
| AuthTokenDigits |       0 |     0 |       2 |       2 |     0 |     4 |

Student/Teacher possuem 115 arquivos TS/TSX byte-identical. Os três portais possuem 27, incluindo
GlobalStyles/theme typing e os components Feature, Item, List, Title, Underlined e VerticalLogo.

## Contratos confirmados

- nenhum produto usa `shape` em Button rotulado; todos os usos reais são icon-only;
- `inverse` é necessário em Button e IconButton para actions comprovadas sobre surface escura;
- `IconButton size="xs"` tem um callsite produtivo explícito no GuidedWorkSessionPanel e é
  geometricamente idêntico ao `sm` atual; deve convergir para `sm`;
- Student e Teacher possuem AuthTokenDigits byte-identical;
- Admin já possui a taxonomia semântica desejada de StatusChip;
- FilterPills representa filtros por buttons com `aria-pressed`; SegmentedControl representa uma
  escolha exclusiva compacta. Continuam contracts distintos;
- loading, Spinner e ActionLink do épico anterior permanecem corretos.

## Wrappers de actions

Classificação:

- `canonical`: remover diferença/alias e usar prop pública;
- `layout`: wrapper pode permanecer somente para position, margin, width responsivo ou grid/flex;
- `domain`: não é Button canônico; criar componente local sobre Pressable;
- `icon`: migrar para IconButton público.

| Produto | Arquivo/component            | Classe           | Decisão                                                 |
| ------- | ---------------------------- | ---------------- | ------------------------------------------------------- |
| Landing | LegalPage BackButton         | layout           | manter fixed position e remover qualquer recipe futuro  |
| Landing | Footer SocialButton          | icon             | IconButton `inverse`; copiar email continua ação button |
| Landing | FinalCta Action              | layout           | manter somente `position: relative`                     |
| Landing | StickyMobileCta Action       | canonical        | usar `fullWidth`, remover wrapper                       |
| Landing | Flashcard CircleButton       | domain           | Showcase navigation control sobre Pressable             |
| Landing | Flashcard AudioButton        | domain           | MediaControl local com playing state                    |
| Landing | Shadowing BackButton         | domain           | Showcase navigation control sobre Pressable             |
| Landing | Shadowing TranslationToggle  | domain           | Toggle local com `aria-pressed`                         |
| Landing | TrialLessonForm Submit       | canonical/layout | `variant="brand"`; wrapper conserva só margin           |
| Landing | Quiz CircleButton            | domain           | Showcase navigation control sobre Pressable             |
| Landing | Header NavLink               | layout           | nowrap permitido sem alterar recipe                     |
| Admin   | Leads LeadPrimaryAction      | canonical        | compact/md canônico; retirar 44 px e font 12            |
| Admin   | Leads DialogAction           | canonical        | retirar 44 px mobile e usar size canônico               |
| Student | Payment PlanAction           | layout           | manter flex responsivo e props canônicas                |
| Student | Home Pill/PillSolid          | canonical        | remover aliases vazios e usar Button direto             |
| Student | Home MeetButton              | canonical        | Button `variant="brand"` direto                         |
| Student | Home SecondaryAction         | canonical        | Button `variant="inverse"`                              |
| Student | Coupon ApplyButton           | canonical        | remover nowrap/svg override após stress check           |
| Student | PlanCard ChooseButton        | layout           | manter regra dinâmica e margin; usar variant final      |
| Student | AppShell PaymentAlertPrimary | layout           | manter grid/width responsivo                            |
| Cupom   | CouponMetrics RangeButton    | domain           | SegmentedControl com `aria-pressed` sobre Pressable     |

Existem 22 wrappers totais; 16 alteram propriedades visuais canônicas. Wrappers classificados como
layout não podem definir height, padding, gap, typography, border, color, background, radius, focus
ou motion do action.

## Descendant selectors

| Surface                       | Decisão                                                               |
| ----------------------------- | --------------------------------------------------------------------- |
| Landing Hero Actions          | width/arrow motion local; gap/padding/font/nowrap convergem ao Button |
| Landing showcase frames       | mover font/tap-highlight para controls locais ou remover redundância  |
| Admin Portal root             | remover baseline de button já possuído por Pressable                  |
| Admin Leads ActionMenu        | mover recipe para MenuAction/TextButton explícito                     |
| Admin Leads Footer            | retirar min-height 42 de children buttons                             |
| Student SectionHead           | manter typography somente em component local explicitamente nomeado   |
| Student quiz/flashcard frames | remover baselines redundantes; controls de domínio ficam explícitos   |
| Student QuizDoneActions       | width layout permitido; min-height 44 converge                        |
| Student SpeedControl          | domain segmented control sobre Pressable                              |
| Teacher preview frames        | mesma decisão de Student, validada separadamente                      |
| Teacher ClassDrawer footer    | flex/width/nowrap são layout e preservam a correção aprovada          |
| Teacher ProblemReport actions | width mobile é layout permitido                                       |

## Component promotion

| Candidate                    | Decisão T01                            | Evidência                                                     |
| ---------------------------- | -------------------------------------- | ------------------------------------------------------------- |
| IconButton                   | promover agora                         | 30 usos e três adapters                                       |
| StatusChip                   | promover                               | 35 usos; Admin já semantic-first                              |
| StatePanel family            | promover                               | 21 StatePanel, 34 EmptyState, 5 LoadingState                  |
| AuthNotice                   | promover                               | 20 usos e estrutura comum                                     |
| AuthTokenDigits              | promover                               | quatro usos e implementation byte-identical                   |
| FieldRoot/native inputs      | promover condicional                   | Admin possui accessibility/composition madura                 |
| CompoundControl/SearchInput  | promover condicional                   | single-surface contract comprovado no Admin                   |
| FilterPills                  | manter separado por size; avaliar atom | 8 usos, APIs/styles divergentes mas semântica igual           |
| SegmentedControl             | promover se Cupom/Admin convergirem    | escolha exclusiva comprovada em dois produtos                 |
| Title/List/Item/VerticalLogo | adiar                                  | duplicação exata, mas baixo ganho versus risco desta migração |
| Product organisms            | rejeitar                               | business flow, router/state e layouts específicos             |

## Audit baseline

- package: 63 linhas;
- Landing: 99;
- Admin: 103;
- Student: 119;
- Teacher: 111;
- Cupom: 100;
- total: 595 linhas.

O audit atual bloqueia native button, wait spinner, motion sem owner, import boundary e union copiada.
Ele não bloqueia styled canonical override, descendant override, layer inversion além de private
styles, aliases vazios ou components duplicados.
