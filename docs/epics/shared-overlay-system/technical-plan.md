# Plano técnico

## Baseline verificada

| Repositório     | `origin/main` | Estado do worktree isolado |
| --------------- | ------------- | -------------------------- |
| `langyspace-ui` | `cc1cdfe`     | clean                      |
| Admin           | `9d685c4`     | clean                      |
| Teacher         | `226bccd`     | clean                      |
| Student         | `ee243e7`     | clean                      |

Root isolado: `/private/tmp/langyspace-next-component.s0jagm`. Os checkouts originais não serão
editados.

O package está em `1.2.0`; Admin e Teacher consomem `1.2.0`, Student ainda consome `1.0.0`. O
release desta family será minor e todos os três consumers migrados fixarão o mesmo artefato.

## Inventário qualificado

### Admin

- implementação base existente: `ModalLayer`, `Dialog`, `Drawer`;
- consumers base já ativos: Leads, busca global, comunicação, cobrança e confirmações;
- shells legados: matrícula, slot da professora, aula, assinatura, marketing, repasse e operações
  auxiliares com markup `.scrim/.drawer/.confirm`.

### Teacher

- `NotificationDrawer`;
- `ClassDrawer`;
- `AvailabilitySettingsDrawer`;
- `SlotActionDrawer`;
- `StudentProfileDrawer`;
- `ProblemReportDrawer`.

### Student

- `NotificationDrawer`;
- `ProblemReportDrawer`;
- `CheckoutDialog`, usado em ChoosePlan e StudentPayment.

### Excluídos após revisão semântica

- progress/loading overlays;
- exercise/feedback overlays;
- MobileTeacherHeader profile sheet;
- guided session/painéis persistentes;
- menus/backdrops de menus.

## Arquitetura

```text
foundations/tokens
      |
      v
internal/ModalLayer
  index.tsx       portal, foco, stack e composição
  stack.ts        inert e scroll lock com referência
  styles.ts       backdrop/panel/header/body/footer
  types.ts        contrato interno
      |
      +--> molecules/Dialog
      +--> molecules/Drawer
                |
                +--> organisms locais dos três portais
```

`ModalLayer` não entra no entrypoint. `Dialog` e `Drawer` são molecules públicas pequenas que fixam
o kind e reaproveitam os mesmos tipos comportamentais.

## Contrato de render

- portal target: `#overlay-root` quando presente, senão `document.body`;
- SSR: sem DOM, o component retorna `null` e não registra efeitos;
- app owner para inert: `#root` quando presente;
- marker do backdrop: `data-ui-modal-backdrop="true"`;
- marker do panel: `data-ui-modal-layer="dialog|drawer"`;
- `data-size` permite audit sem expor CSS livre;
- body recebe children e é o único owner de scroll;
- title aceita `ReactNode`; descrição e footer são slots simples;
- close usa o `IconButton` já público e glyph CSS interno, evitando nova dependência de ícones.

## API pública

```ts
type OverlayDismissal =
  'blocked' | 'escape-and-backdrop' | 'escape-only' | 'explicit-only'

type OverlaySize = 'sm' | 'md' | 'lg'

interface OverlayShellProps {
  children: ReactNode
  closeLabel: string
  description?: ReactNode
  dismissal?: OverlayDismissal
  fallbackFocusRef?: RefObject<HTMLElement | null>
  footer?: ReactNode
  initialFocusRef?: RefObject<HTMLElement | null>
  onClose: () => void
  open: boolean
  panelProps?: OverlayPanelProps
  returnFocusRef?: RefObject<HTMLElement | null>
  size?: OverlaySize
  title: ReactNode
}
```

`DialogProps` e `DrawerProps` compartilham esse shape. Não haverá prop de placement, animation,
color, radius, padding, arbitrary width, header renderer ou body renderer nesta versão.

## Recipe visual

- backdrop: neutral 950 com alpha canônico 0,42 e blur discreto;
- Dialog widths: 24/31/42,5 rem;
- Drawer widths: 24/36/44 rem;
- desktop Dialog centralizado; Drawer no logical end e altura de viewport;
- mobile até 640 px: Dialog bottom sheet; Drawer full-screen;
- surface branca, border default, focus ring do package;
- header/body `spacing.5`; footer `spacing.4/5`;
- footer vira coluna full width no mobile;
- `100dvh` para a região modal e safe-area padding em header/footer.

O Drawer mobile diverge do recipe Admin atual, que vira bottom sheet, e converge para os shells
Teacher/Student full-screen. Essa é uma decisão sem prop: drawers operacionais densos precisam do
viewport completo; dialogs continuam bottom sheet.

## Migração

### Package

1. adicionar tokens estritamente necessários;
2. portar e generalizar stack/ModalLayer do Admin;
3. criar public molecules, tests e stories;
4. integrar manifesto, entrypoint, public API, smokes e budgets;
5. gerar candidate tarball `1.3.0` e comprovar checksum.

### Admin

1. instalar candidate;
2. substituir imports dos base wrappers pelo package;
3. remover base `ModalLayer/Dialog/Drawer` quando sem consumer;
4. migrar shells `.drawer/.confirm` um por vez, preservando conteúdo local;
5. manter `panelProps` apenas para ids/data hooks; remover overrides de width/radius/padding;
6. remover recipes legados somente após zero consumer.

### Teacher

1. migrar primeiro Notification e ProblemReport;
2. migrar AvailabilitySettings e SlotAction;
3. migrar StudentProfile e ClassDrawer por último por densidade;
4. manter sections/tabs/fields locais e eliminar apenas Scrim/Drawer/Header/Body/Footer duplicados.

### Student

1. migrar Notification e ProblemReport;
2. migrar CheckoutDialog mantendo cálculo, formulário e mutação locais;
3. mapear `isSubmitting` para `dismissal="blocked"`;
4. remover focus trap/body lock manual do checkout.

## Estratégia visual e fixtures

### Library

- stories: Default, Sizes, DismissalStates, LongContent, LongFooter e Stacked;
- play tests: initial focus, Escape, backdrop, blocked e nested stack;
- layout em 390/768/1281/2048, motion normal/reduced, altura curta e conteúdo extremo;
- screenshots de Dialog/Drawer/stack em mobile, dense e wide.

### Admin

Cobertura existente já exercita Leads, busca, matrícula, cobrança, comunicação, aula, professora,
assinaturas e repasse. O audit será atualizado para buscar markers do package e para cobrir qualquer
shell legado migrado ainda ausente. Conteúdo adversarial existente será preservado.

### Teacher

Cobertura existente de ClassDrawer será preservada. Serão adicionados estados determinísticos para
notificações, disponibilidade/slot, perfil do aluno e reporte de problema quando não houver caso
versionado. Screenshots em 390/1281/2048 e boundary denso existente.

### Student

Checkout normal/error/email já possui casos. Serão adicionados estados de notificações e reporte de
problema. Screenshots em 390/1281/2048 e boundary denso existente.

## Validation ladder

1. unit tests focados de ModalLayer/Dialog/Drawer;
2. story/axe/play e layout focado;
3. typecheck, lint, build, manifest/API/package/bundle/SSR/browser;
4. `validate:ui` completo da library uma vez no candidate final;
5. instalar o mesmo candidate nos três consumers;
6. focused component/route tests por portal;
7. build e audits focados;
8. `validate:ui` completo e inspeção de screenshots por portal;
9. release imutável `v1.3.0` e comparação de conteúdo com candidate;
10. trocar specs locais pelo URL de release sem alterar conteúdo;
11. commits Conventional Commits, push fast-forward para `main`, workflows e Hosting;
12. HTTP, asset hash e marker servido.

## Riscos e mitigação

| Risco                                | Mitigação                                                           |
| ------------------------------------ | ------------------------------------------------------------------- |
| mudança de geometria quebra layout   | before/after focado, markers e screenshots em quatro larguras       |
| rich drawer perde hierarquia         | conteúdo permanece local; package possui somente owners estruturais |
| foco regressa em navegação/stack     | tests de trigger removido, duas camadas e desmontagem fora de ordem |
| SSR acessa DOM                       | guard explícito e smoke `open=true`                                 |
| consumer depende de theme próprio    | styles usam apenas tokens importados da library                     |
| API cresce para acomodar legado      | sem props visuais livres; exceção fica local ou fora da family      |
| release passa package e falha portal | candidate idêntico validado em três consumers antes do tag          |
| worktree do usuário é afetado        | implementação e staging somente nos worktrees isolados              |

## Revisão crítica

### Produto

O resultado padroniza shell e comportamento sem homogeneizar conteúdo ou fluxo. Cards, menus e
activity overlays foram removidos do escopo por semântica, apesar de semelhança visual.

### Tech Lead

O Admin é a seed comprovada; não será criado outro gerenciador de stack. `react-dom` vira peer
explícito. A API fecha variantes por significado e mantém `ModalLayer` interno.

### Senior React

Foco e lock ficam em um owner; effects são idempotentes, listeners observam callbacks atuais e o
portal não quebra context. Refs não exigem `forwardRef` isolado.

### QA e acessibilidade

Cada política de dismissal, stack, conteúdo extremo e breakpoint possui caso determinístico.
Geometria verde não substitui inspeção de hierarquia, contraste e densidade.

### Decisão final

Plano aprovado para execução na ordem descrita. Se um organism exigir prop puramente visual, a
migração desse organism para, o plano é revisado e a exceção não entra automaticamente na API.
