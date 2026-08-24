# Inventário de implementação

Baseline: `origin/main` em 24 de agosto de 2026, excluindo `*.test.*` e `*.spec.*`.

Legenda:

- `B`: comando canônico; migrar para Button/wrapper sem recipe duplicado;
- `P`: controle específico; manter componente nomeado sobre Pressable;
- `M`: arquivo misto; classificar cada ocorrência pelo call site;
- `D`: remover se o componente continuar sem consumer.

## Landing — 0 native / 3 styled

| Arquivo                                               | Qt. | Decisão                   |
| ----------------------------------------------------- | --: | ------------------------- |
| `components/layout/How/styles.ts`                     |   1 | P — chip selecionável     |
| `components/layout/LessonShowcaseBottomNav/styles.ts` |   1 | P — navegação do showcase |
| `components/layout/QuizVerbToBeShowcase/styles.ts`    |   1 | P — opção de quiz         |

## Admin — 80 native / 7 styled

| Arquivo                                         | Qt. | Decisão                           |
| ----------------------------------------------- | --: | --------------------------------- |
| `components/base/FilterPills/styles.ts`         |   1 | P                                 |
| `components/base/SegmentedControl/styles.ts`    |   1 | P                                 |
| `components/base/TextButton/styles.ts`          |   1 | P — ação textual específica       |
| `components/layout/AppShell/styles.ts`          |   1 | B — icon/sign-out                 |
| `pages/AdminPage/styles.ts`                     |   1 | B                                 |
| `pages/AdminPortal/AdminGlobalSearch/styles.ts` |   1 | P — resultado clicável            |
| `pages/AdminPortal/GuidedWorkSessionPanel.tsx`  |   5 | M                                 |
| `pages/AdminPortal/InvoiceBatchPanel.tsx`       |   6 | M                                 |
| `pages/AdminPortal/index.tsx`                   |  70 | M — mapear consequência por grupo |

O Admin já possui Button, IconButton, TextButton, FilterPills e SegmentedControl semânticos. Markup
legado deve usar essas primitives antes de criar outro componente. `.pill.pink` não determina
brand sozinho; o papel do comando determina.

## Student — 2 native / 81 styled

### Base e shell

| Arquivo                                              | Qt. | Decisão                     |
| ---------------------------------------------------- | --: | --------------------------- |
| `components/base/Button/styles.ts`                   |   1 | B                           |
| `components/base/IconButton/styles.ts`               |   1 | B                           |
| `components/base/PillButton/styles.ts`               |   1 | D se continuar sem consumer |
| `components/base/FilterPills/styles.ts`              |   1 | P                           |
| `components/base/PhoneField/styles.ts`               |   2 | P                           |
| `components/base/ToastViewport/styles.ts`            |   1 | P                           |
| `components/layout/AppShell/styles.ts`               |   2 | M                           |
| `components/layout/AuthBackButton/styles.ts`         |   1 | B                           |
| `components/layout/AuthSubmitButton/styles.ts`       |   1 | B                           |
| `components/layout/NotificationDrawer/styles.ts`     |   1 | P                           |
| `components/layout/Sidebar/styles.ts`                |   3 | P                           |
| `pages/Login/sections/TokenStep/index.tsx`           |   1 | B — resend textual          |
| `pages/RegisterStudent/sections/TokenStep/index.tsx` |   1 | B — resend textual          |

### Aquisição, plano e pagamento

| Arquivo                                                     | Qt. | Decisão |
| ----------------------------------------------------------- | --: | ------- |
| `pages/ChoosePlan/sections/BrandBar/styles.ts`              |   1 | B       |
| `pages/ChoosePlan/sections/CheckoutDialog/styles.ts`        |   4 | M       |
| `pages/ChoosePlan/sections/CouponControl/styles.ts`         |   2 | B       |
| `pages/ChoosePlan/sections/PlanCard/styles.ts`              |   1 | B       |
| `pages/ChoosePlan/sections/PlanToggle/styles.ts`            |   1 | P       |
| `pages/ChoosePlan/styles.ts`                                |   1 | B       |
| `pages/PublicPlans/styles.ts`                               |   1 | B       |
| `pages/RegisterStudent/sections/PixAutomaticStep/styles.ts` |   1 | B       |
| `pages/StudentPayment/styles.ts`                            |   2 | B       |
| `pages/LegalPage/styles.ts`                                 |   1 | B       |

### Portal e aprendizagem

| Arquivo                                             | Qt. | Decisão |
| --------------------------------------------------- | --: | ------- |
| `components/features/portal/FlashcardsV2.styles.ts` |   5 | M       |
| `components/features/portal/styles.ts`              |  26 | M       |
| `pages/StudentClasses/styles.ts`                    |   2 | M       |
| `pages/StudentHome/styles.ts`                       |   6 | M       |
| `pages/StudentLessons/styles.ts`                    |   4 | P       |
| `pages/StudentLive/styles.ts`                       |   8 | M       |

`B` em arquivos mistos inclui back/close/action/retry/send/done quando o elemento é um comando
canônico. Tabs, cards, story/feed, método selecionável, quiz, flashcard, shadowing, chat row e live
room control são `P`.

## Teacher — 2 native / 68 styled

### Base e shell

| Arquivo                                                | Qt. | Decisão            |
| ------------------------------------------------------ | --: | ------------------ |
| `components/base/Button/styles.ts`                     |   1 | B                  |
| `components/base/PillButton/styles.ts`                 |   1 | B                  |
| `components/base/IconButton/styles.ts`                 |   1 | B                  |
| `components/base/FilterPills/styles.ts`                |   1 | P                  |
| `components/base/PhoneField/styles.ts`                 |   2 | P                  |
| `components/base/ToastViewport/styles.ts`              |   1 | P                  |
| `components/base/AvailabilityDaySelector/styles.ts`    |   1 | P                  |
| `components/base/AvailabilityPeriodSelector/styles.ts` |   1 | P                  |
| `components/layout/AuthBackButton/styles.ts`           |   1 | B                  |
| `components/layout/MobileTeacherHeader/styles.ts`      |   4 | P                  |
| `components/layout/NotificationDrawer/styles.ts`       |   2 | P                  |
| `components/layout/Sidebar/styles.ts`                  |   4 | P                  |
| `pages/Login/sections/TokenStep/index.tsx`             |   1 | B — resend textual |
| `pages/RegisterTeacher/sections/TokenStep/index.tsx`   |   1 | B — resend textual |

`AuthSubmitButton` já usa o package e não aparece no baseline de violations.

### Calendar e aulas

| Arquivo                                                          | Qt. | Decisão |
| ---------------------------------------------------------------- | --: | ------- |
| `components/layout/ClassDrawer/styles.ts`                        |   5 | M       |
| `components/layout/MonthCalendar/styles.ts`                      |   1 | P       |
| `components/layout/WeekCalendar/styles.ts`                       |   2 | P       |
| `pages/Calendar/styles.ts`                                       |   2 | M       |
| `pages/Calendar/components/AvailabilitySettingsDrawer/styles.ts` |   4 | M       |
| `pages/Calendar/components/CalendarAgenda/styles.ts`             |   2 | P       |
| `pages/Calendar/components/SlotActionDrawer/styles.ts`           |   2 | M       |

Close/save/cancel/action padrão são `B`; tabs, students/options/word chips, event/slot, mode toggle e
scrim são `P`.

### Materiais, alunos e preview

| Arquivo                                                    | Qt. | Decisão |
| ---------------------------------------------------------- | --: | ------- |
| `components/layout/MaterialSlideDeck/styles.ts`            |   2 | P       |
| `pages/MaterialPresentation/styles.ts`                     |   2 | P       |
| `pages/Students/components/StudentProfileDrawer/styles.ts` |   6 | M       |
| `pages/StudentLearningPreview/styles.ts`                   |  15 | M       |
| `pages/Today/styles.ts`                                    |   1 | B       |
| `pages/LegalPage/styles.ts`                                |   1 | B       |
| `pages/PublicAvailabilityOverview/styles.ts`               |   2 | P       |
| `pages/PublicTeacherAvailability/styles.ts`                |   1 | P       |

Drawer close/edit/save/cancel e preview primary/done/back são `B`; scrim/tab/cards/options/quiz,
flashcard, shadowing, presentation hit zone e disponibilidade são `P`.

## Cupom — 0 native / 0 styled

`RangeButton` já compõe Button. A única decisão é atualizar o release e adicionar a proteção
estática.

## Cobertura existente e gaps

| Produto | Cobertura atual                                                       | Gap desta migração                                    |
| ------- | --------------------------------------------------------------------- | ----------------------------------------------------- |
| Landing | landing/cupom/SEO/legal em todos os widths                            | nenhum caso novo                                      |
| Admin   | auth, rotas operacionais, overlays, stress e design-system audit      | nenhum caso de rota novo; ampliar matriz da primitive |
| Student | portal protegido, instant handoff, perfil e pagamento                 | auth/cadastro, choose-plan e checkout completo        |
| Teacher | auth, portal, calendar, materiais, alunos, repasses e disponibilidade | previews do aluno, apresentação e drawers específicos |
| Cupom   | relatório normal/stress + redirect failures                           | nenhum caso novo                                      |

## Invariante final

O audit considera violation qualquer `<button` ou `styled.button` nos arquivos acima e em qualquer
novo arquivo de produção. As únicas tags nativas permitidas ficam dentro do package e de fixtures de
teste deliberadas.
