# Inventário de overlays

## Método

Os três `origin/main` foram comparados por markup, role/ARIA, behavior, styles e runtime callsites.
Nomes `Overlay`, `Drawer` e `Dialog` sem semântica modal não foram contados automaticamente.

## Admin

### Seed compartilhável

- `components/base/ModalLayer`: portal, stack, inert, scroll lock, trap, retorno e dismissal;
- `components/base/Dialog` e `components/base/Drawer`: geometrias públicas locais atuais;
- cinco component tests e 45 cenários isolados já verdes.

### Consumers da seed local

- AdminGlobalSearch;
- Leads dialog;
- BillingChargeDrawer;
- StudentCommunicationDrawer;
- confirmações de cobrança, repasse, rejeição e arquivamento.

### Shells legados qualificados

- EnrollmentDrawer;
- TeacherSlotDrawer;
- AdminClassDrawer;
- SubscriptionDrawer;
- SubscriptionDateChangeModal;
- ExpenseModal;
- MarketingShortLinkModal;
- MarketingDetailDrawer;
- RepasseDrawer;
- ConfirmPayoutPaymentModal;
- InvoiceBatchPanel dialog.

## Teacher

| Organism                   | Family | Cobertura baseline             |
| -------------------------- | ------ | ------------------------------ |
| NotificationDrawer         | Drawer | gap de route state             |
| ProblemReportDrawer        | Drawer | gap de route state             |
| AvailabilitySettingsDrawer | Drawer | gap de interaction             |
| SlotActionDrawer           | Drawer | gap de interaction             |
| StudentProfileDrawer       | Drawer | gap de interaction             |
| ClassDrawer                | Drawer | `inicio-drawer-presenca/aluno` |

## Student

| Organism            | Family        | Cobertura baseline                                 |
| ------------------- | ------------- | -------------------------------------------------- |
| NotificationDrawer  | Drawer        | gap de route state                                 |
| ProblemReportDrawer | Drawer        | gap de interaction                                 |
| CheckoutDialog      | Dialog        | três casos checkout                                |
| ExerciseOverlay     | exceção local | activity mode full-screen, não shell Dialog/Drawer |

`ExerciseOverlay` mantém role modal e precisa continuar com um teste próprio, mas sua geometria de
sessão imersiva não entra na family. Ele não replica backdrop/header/body/footer nem política de
dismissal dos shells compartilhados.

## Padrões explicitamente fora da family

- MobileTeacherHeader ProfileSheet: action sheet/menu curto;
- registration/progress overlays: status bloqueante sem decisão modal;
- flashcard feedback/coming-soon overlays: camada da atividade;
- menu backdrops Admin: menu/popover;
- guided work session: painel persistente.

## Baseline executada

- Admin `pnpm run test:design-system`: 45 cenários, zero issue;
- Teacher ClassDrawer em 390/1281/2048: 12 cenários, zero issue;
- Student checkout normal/email/error em 390/1281/2048: 18 cenários, zero issue;
- screenshots mobile/dense/wide dos três repos inspecionadas.

## Conclusão

A seed Admin é promovida ao package. Variações de conteúdo permanecem nos organisms; variações de
behavior e geometria ficam limitadas à API aprovada. Os gaps de route state entram nas tasks dos
respectivos consumers antes do gate final.
