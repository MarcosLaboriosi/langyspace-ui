# Refinamento técnico implementável

## Constraints confirmadas no repositório

- React 19 com refs recebidas em props, sem `forwardRef` isolado;
- TypeScript strict, `isolatedModules`, `erasableSyntaxOnly` e declarations pelo `tsc`;
- styled-components sem stylesheet global e sem dependência do ThemeProvider do consumer;
- peers limitados a React, React DOM, react-hook-form e styled-components;
- manifesto público aceita `primitive`, `atom` e `molecule`;
- package smoke compila um consumer externo, browser/SSR e styled composition;
- Storybook bloqueia network externo e o layout runner mede 390/1281/2048 mais boundaries;
- bundle slices existentes são `actions`, `fields`, `identity` e `molecules`.

Consequência: `ActionMenu` e `OperationalList` entram em `src/molecules`. Criar `patterns` exigiria
alterar a taxonomia, manifesto, audits e story sort sem melhorar a API; essa expansão foi removida
do plano.

## Estrutura de arquivos

```text
src/molecules/ActionMenu/
  index.tsx
  styles.ts
  types.ts
  position.ts
  ActionMenu.test.tsx
  ActionMenu.stories.tsx

src/molecules/OperationalList/
  index.tsx
  styles.ts
  types.ts
  normalizeActions.ts
  OperationalList.test.tsx
  OperationalList.stories.tsx
```

`position.ts` e `normalizeActions.ts` permanecem privados e recebem unit coverage por meio do
componente ou teste direto local. Não há novo export secundário.

## Contrato ActionMenu

```ts
import type { ComponentPropsWithRef, ReactNode } from 'react'

export type ActionMenuAlign = 'start' | 'end'
export type ActionMenuSize = 'sm' | 'md'
export type ActionMenuTone = 'neutral' | 'danger'

export interface ActionMenuItem {
  disabled?: boolean
  icon?: ReactNode
  id: string
  isLoading?: boolean
  label: string
  onSelect: () => void
  tone?: ActionMenuTone
}

export interface ActionMenuProps extends Omit<
  ComponentPropsWithRef<'div'>,
  'children'
> {
  align?: ActionMenuAlign
  defaultOpen?: boolean
  items: readonly ActionMenuItem[]
  onOpenChange?: (open: boolean) => void
  open?: boolean
  size?: ActionMenuSize
  triggerLabel: string
}
```

### Controlled/uncontrolled

- `open === undefined`: state interno iniciado por `defaultOpen ?? false`;
- `open !== undefined`: prop é source of truth;
- toda tentativa chama `onOpenChange(next)`;
- trocar de controlled para uncontrolled não é suportado nem recebe sincronização extra;
- `OperationalList` usa controlled para garantir somente um menu aberto por lista;
- uso standalone pode ser uncontrolled.

Não adicionar `onClose`, `onToggle`, `renderTrigger`, `triggerIcon`, coordenadas ou portal target no
V1.

## Markup ActionMenu

```tsx
<Styled.Root ref={ref}>
  <IconButton
    aria-controls={open ? menuId : undefined}
    aria-expanded={open}
    aria-haspopup="menu"
    aria-label={triggerLabel}
    id={triggerId}
  >
    <EllipsisGlyph aria-hidden="true" />
  </IconButton>

  {open && canUseDOM
    ? createPortal(
        <Styled.Menu
          aria-labelledby={triggerId}
          id={menuId}
          role="menu"
          tabIndex={-1}
        >
          {items.map((item) => (
            <Styled.MenuItem
              aria-disabled={item.disabled || item.isLoading || undefined}
              disabled={item.disabled || item.isLoading}
              role="menuitem"
            >
              {item.isLoading ? <Spinner /> : item.icon}
              <span>{item.label}</span>
            </Styled.MenuItem>
          ))}
        </Styled.Menu>,
        document.body,
      )
    : null}
</Styled.Root>
```

O glyph ellipsis é SVG interno sem nova icon dependency. MenuItem compõe `Pressable`, `Spinner` e
um slot privado; não compõe Button porque item de menu não é pill. Quando `items.length === 0`,
o root permanece renderizado para preservar ref/native props, mas trigger e portal são omitidos.

## State e eventos do menu

### Abrir

1. click/Enter/Espaço chama `requestOpen(true)` pelo comportamento nativo do button e pede o
   primeiro item; ArrowDown pede o primeiro e ArrowUp pede o último;
2. popup monta com `visibility: hidden`;
3. layout effect mede trigger/popup e aplica `position: fixed`;
4. popup fica visível;
5. o item enabled solicitado recebe foco; se todos estiverem disabled/loading, o container do menu
   recebe foco para manter os estados perceptíveis e permitir Escape/Tab.

### Selecionar

1. ignorar disabled/loading;
2. solicitar close;
3. focar trigger conectado com `preventScroll`;
4. executar `onSelect` uma vez;
5. Drawer/Dialog aberto pelo callback assume foco no effect próprio.

### Fechar sem seleção

- Escape: fecha, impede propagação e retorna foco;
- Tab/Shift+Tab: fecha, previne o default e move explicitamente para o próximo/anterior tabbable em
  relação ao trigger;
- pointerdown externo: fecha sem restaurar foco, preservando o alvo clicado;
- resize ou scroll capturado fora do popup: fecha; restaura trigger somente se o foco ainda estiver
  no popup;
- unmount: remove listeners sem tentar focar node desconectado.

O helper privado de tabbables usa o mesmo selector/visibility contract já provado por ModalLayer,
mas não cria focus trap. O fechamento recebe um reason interno (`escape`, `selection`, `tab-forward`,
`tab-backward`, `outside`, `viewport`, `programmatic`) para aplicar a política correta sem expor
essa enum na API pública.

### Keyboard no menu

- ArrowDown/ArrowUp circulam entre enabled;
- Home/End vão ao primeiro/último enabled;
- Enter/Espaço deixam o button executar naturalmente;
- nenhum focus trap;
- lista vazia não renderiza trigger; lista não vazia pode abrir mesmo sem item enabled.

Listeners document/window existem somente enquanto aberto. O menu não reutiliza `ModalLayer`, pois
não aplica `aria-modal`, inert, backdrop, focus trap ou body scroll lock.

Scroll interno do próprio menu, necessário quando `maxHeight` é aplicado, não fecha o popup; o
listener ignora events cujo target está contido em `menuRef`.

## Posicionamento

Constantes privadas:

```ts
const viewportGap = 8
const triggerGap = 6
const floatingZIndex = 1200
```

Algoritmo após medir:

1. calcular x preferido por `align`;
2. clamp entre `viewportGap` e `innerWidth - popupWidth - viewportGap`;
3. preferir abaixo do trigger;
4. se não couber abaixo e houver mais espaço acima, fazer vertical flip;
5. limitar `maxHeight` ao espaço disponível e habilitar scroll interno;
6. popup usa `position: fixed`; nenhuma coordenada entra na API.

Testar trigger nos quatro cantos, viewport 390 px, label longa, 200% zoom e dentro de um container
com overflow. `z-index: 1200` fica acima das camadas modais atuais iniciadas em 800; menus devem
fechar antes de abrir outro overlay.

## Contrato OperationalList

A primary column é separada das data columns. Isso garante row header, título navegável e anatomy
sem embrulhar ReactNode arbitrário em um controle.

```ts
import type {
  ComponentPropsWithRef,
  Key,
  MouseEventHandler,
  ReactNode,
} from 'react'
import type { AccessibleName } from '../../foundations/accessibility'

export type OperationalListAlign = 'start' | 'end'
export type OperationalListDensity = 'regular' | 'compact'
export type OperationalListImportance = 'secondary' | 'tertiary'
export type OperationalListSortDirection = 'ascending' | 'descending' | 'none'

export interface OperationalListSort {
  direction: OperationalListSortDirection
  onToggle: () => void
}

export type OperationalListNavigation =
  | {
      href: string
      label: string
      onNavigate?: MouseEventHandler<HTMLAnchorElement>
    }
  | {
      label: string
      onNavigate: () => void
    }

export interface OperationalListPrimaryContent {
  description?: ReactNode
  leading?: ReactNode
  meta?: ReactNode
  navigation?: OperationalListNavigation
  title: ReactNode
}

export interface OperationalListPrimaryColumn<Item> {
  label: string
  render: (item: Item, index: number) => OperationalListPrimaryContent
  sort?: OperationalListSort
}

export interface OperationalListColumn<Item> {
  align?: OperationalListAlign
  id: string
  importance?: OperationalListImportance
  label: string
  render: (item: Item, index: number) => ReactNode
  sort?: OperationalListSort
}

interface OperationalListActionBase {
  disabled?: boolean
  id: string
  isLoading?: boolean
  label: string
  onSelect: () => void
}

export type OperationalListItemAction =
  | (OperationalListActionBase & {
      icon?: ReactNode
      placement: 'primary'
      variant?: 'brand' | 'primary' | 'secondary'
    })
  | (OperationalListActionBase & {
      icon: ReactNode
      placement: 'quick'
    })
  | (OperationalListActionBase & {
      icon?: ReactNode
      placement?: 'overflow'
      tone?: 'neutral' | 'danger'
    })

type NativeRootProps = Omit<
  ComponentPropsWithRef<'div'>,
  'aria-label' | 'aria-labelledby' | 'children'
>

export type OperationalListProps<Item> = NativeRootProps &
  AccessibleName & {
    columns: readonly OperationalListColumn<Item>[]
    density?: OperationalListDensity
    emptyState?: ReactNode
    footer?: ReactNode
    getActions?: (
      item: Item,
      index: number,
    ) => readonly OperationalListItemAction[]
    getItemKey: (item: Item) => Key
    items: readonly Item[]
    primaryColumn: OperationalListPrimaryColumn<Item>
  }
```

### Decisões de tipo

- `AccessibleName`, não `CompatibleAccessibleName`: componente novo rejeita duas fontes de nome;
- quick exige icon no TypeScript;
- primary e quick não aceitam danger;
- primary column é singular por construção;
- `Key` preserva o tipo de identidade aceito pelo React sem criar um alias paralelo;
- `getActions(item, index)` devolve closures prontas; package não injeta item no `onSelect`;
- renderers e `getActions` recebem o índice visível para navegação sequencial; `getItemKey` nunca
  recebe index, impedindo key posicional;
- root aceita props/ref nativas, mas accessible name é movido para a table;
- não há `rowProps`, `classNames`, width, breakpoint, visible, permission ou renderActions.
- data columns preservam a ordem fornecida em todos os layouts; `importance` altera recipe/span,
  nunca CSS `order` ou a sequência de foco/leitura.

## Prova de consumo

### Leads

```tsx
const leadPrimaryColumn = {
  label: 'Pessoa',
  render: (lead: InitialLead) => ({
    description: formatPhone(lead.phoneE164),
    meta: lead.instagramHandle,
    navigation: {
      label: `Abrir cadastro de ${lead.name}`,
      onNavigate: () => onOpenStudent(lead),
    },
    title: lead.name,
  }),
} satisfies OperationalListPrimaryColumn<InitialLead>

const leadColumns = [
  {
    id: 'priority',
    label: 'Prioridade',
    render: (lead: InitialLead) => <LeadPriorityBadge priority={lead.priority} />,
  },
  {
    id: 'source',
    importance: 'tertiary',
    label: 'Origem',
    render: (lead: InitialLead) => getSourceLabel(lead),
  },
  {
    id: 'next-action',
    label: 'Próxima ação',
    render: (lead: InitialLead) => getFollowUpLabel(lead),
  },
] satisfies readonly OperationalListColumn<InitialLead>[]

<OperationalList
  aria-label="Fila inicial de leads"
  columns={leadColumns}
  getActions={(lead) => [
    {
      id: 'convert',
      label: 'Converter em aluna',
      onSelect: () => onOpenEnrollment(lead, 'pago'),
      placement: 'primary',
      variant: 'secondary',
    },
    {
      icon: <MessageCircle aria-hidden="true" />,
      id: 'whatsapp',
      label: `Falar com ${lead.name}`,
      onSelect: () => onOpenCommunication(lead),
      placement: 'quick',
    },
    {
      icon: <CalendarClock aria-hidden="true" />,
      id: 'follow-up',
      label: 'Agendar retorno',
      onSelect: () => openFollowUp(lead),
      placement: 'overflow',
    },
    {
      id: 'discard',
      label: 'Descartar lead',
      onSelect: () => openDisqualify(lead),
      placement: 'overflow',
      tone: 'danger',
    },
  ]}
  getItemKey={(lead) => lead.studentId}
  items={items}
  primaryColumn={leadPrimaryColumn}
/>
```

### Alunos com React Router

```tsx
const studentPrimaryColumn = {
  label: 'Aluno',
  render: (student: AdminPortalStudent, index: number) => ({
    leading: <Avatar initials={student.avatar} />,
    meta: <span className="mono">{student.id}</span>,
    navigation: {
      href: `/alunos/${student.id}`,
      label: `Abrir cadastro de ${student.name}`,
      onNavigate: (event) => {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return
        }
        event.preventDefault()
        onOpenStudent(
          student,
          undefined,
          student.id,
          sortedStudents[index + 1]?.id,
        )
      },
    },
    title: student.name,
  }),
  sort: {
    direction: getStudentSortDirection(studentSort, 'student'),
    onToggle: () => toggleStudentSort('student'),
  },
} satisfies OperationalListPrimaryColumn<AdminPortalStudent>

<OperationalList
  aria-label="Alunos com pagamento confirmado"
  columns={studentColumns}
  density="compact"
  getActions={(student) => [
    {
      icon: <MessageCircle aria-hidden="true" />,
      id: 'whatsapp',
      label: `Falar com ${student.name}`,
      onSelect: () => onWhats(student),
      placement: 'quick',
    },
    {
      icon: <CalendarPlus aria-hidden="true" />,
      id: 'schedule',
      label: 'Agenda',
      onSelect: () => onOpenAgenda(student),
      placement: 'overflow',
    },
    {
      icon: <Archive aria-hidden="true" />,
      id: 'archive',
      label: 'Arquivar aluno',
      onSelect: () => onArchive(student),
      placement: 'overflow',
      tone: 'danger',
    },
  ]}
  getItemKey={(student) => student.id}
  items={sortedStudents}
  primaryColumn={studentPrimaryColumn}
/>
```

Os exemplos comprovam que Router, formatting, status e business actions continuam no Admin. O
package recebe somente nodes, descriptors e callbacks.

## Markup OperationalList

```tsx
<Styled.Root ref={ref} data-density={density} {...rootProps}>
  <Styled.Surface>
    <Styled.Table aria-label={ariaLabel} aria-labelledby={ariaLabelledby}>
      <thead>
        <tr>
          <Styled.ColumnHeader id={primaryHeaderId} scope="col">
            ...
          </Styled.ColumnHeader>
          {columns.map((column) => (
            <Styled.ColumnHeader id={columnHeaderId(column.id)} scope="col">
              ...
            </Styled.ColumnHeader>
          ))}
          {hasAnyActions ? (
            <Styled.ActionsHeader id={actionsHeaderId} scope="col">
              Ações
            </Styled.ActionsHeader>
          ) : null}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <Styled.EmptyRow>
            <Styled.EmptyCell colSpan={columnCount}>
              {emptyState ?? null}
            </Styled.EmptyCell>
          </Styled.EmptyRow>
        ) : (
          rows.map((row) => (
            <Styled.Row key={row.key} data-item-key={String(row.key)}>
              <Styled.PrimaryCell id={row.headerId} scope="row">
                ...
              </Styled.PrimaryCell>
              {row.cells.map((cell) => (
                <Styled.DataCell headers={`${row.headerId} ${cell.headerId}`}>
                  ...
                </Styled.DataCell>
              ))}
              {hasAnyActions ? (
                <Styled.ActionsCell
                  headers={`${row.headerId} ${actionsHeaderId}`}
                >
                  ...
                </Styled.ActionsCell>
              ) : null}
            </Styled.Row>
          ))
        )}
      </tbody>
    </Styled.Table>
  </Styled.Surface>
  {footer}
</Styled.Root>
```

Primary body cell é `<th scope="row">`; demais são `<td>`. Compact labels são spans reais com
`aria-hidden="true"`, escondidos no desktop e exibidos nos cards. Não usar `content: attr(...)`
como única label visual.

IDs de headers partem de um prefixo privado criado com `useId`; `column.id` deve ser único na
lista. Cada data/actions cell declara o row header e column header em `headers`. O estado vazio usa
uma única cell com `colSpan`, portanto a table e seu accessible name continuam presentes mesmo sem
itens. Não há validação runtime de IDs duplicados no V1; a invariância fica no contrato e nos tests.

Title deve ser conteúdo não interativo quando `navigation` existe. Essa constraint é documentada e
coberta nos exemplos; não adicionar runtime traversal/guard.

## Normalização de ações

Para cada item, avaliar `getActions` exatamente uma vez durante a render e normalizar em uma função
pura:

```ts
primary = primeira action placement primary
quick = primeiras duas actions placement quick
overflow =
  overflow explícitas
  + primary excedentes convertidas para neutral
  + quick excedentes convertidas para neutral
```

A ordem relativa dentro de cada placement é preservada. Overflow final move items danger para o
fim, preservando ordem entre danger; o primeiro danger recebe `<div role="separator">` quando há
grupo neutral anterior. `ActionMenu` aplica a mesma separação quando usado standalone.
`hasAnyActions` é derivado dos rows normalizados, permitindo omitir completamente header/cell
quando a lista não tem ações.

`OperationalList` mantém `openMenuKey: Key | null` e passa `open/onOpenChange` ao ActionMenu.
Trocar items fecha o menu se a key aberta não estiver mais presente.

## Sorting

- state permanece no Admin;
- V1 aceita somente uma coluna com direction diferente de `none`; multi-sort não é suportado;
- IDs de data columns são únicos e no máximo um descriptor pode estar ativo; essas invariantes são
  obrigatórias no consumer e não recebem correção silenciosa em runtime;
- header não ordenável é texto dentro de `<th scope="col">`;
- header ordenável contém Pressable com label e glyph interno;
- `<th aria-sort>` recebe direction;
- toggle não assume ciclo; chama `onToggle` exatamente uma vez;
- glyph reflete ascending/descending e permanece reservado em `none`, evitando layout shift;
- keyboard é nativo do button.
- no compact layout, sortable column headers formam uma barra visível e quebrável acima dos cards;
- header não ordenável fica visually-hidden, preservando associação sem criar focus target oculto;
- nenhuma cópia de sort controls é renderizada fora da table.

## Responsividade e semântica

Uma única table DOM é preferida para não duplicar IDs, controles, callbacks ou estado.

### Wide `>= 72rem`

- table layout e header visível;
- row header/data/actions cells normais;
- align end para moeda/números;
- actions width por conteúdo com limite do recipe.

### Compact `< 72rem`

- root estabelece `container-type: inline-size` e descendants usam `@container`;
- surface perde border/shadow global;
- `thead` permanece na árvore acessível;
- quando há sorting, o header row vira uma barra compacta: sortable headers ficam visíveis e os
  demais usam visually-hidden sem controls focáveis;
- quando não há sorting, o `thead` inteiro usa visually-hidden, nunca `display: none`;
- `tbody` vira grid de cards;
- cada `tr` vira grid de duas colunas;
- primary/actions span total;
- labels compactas ficam visíveis;
- abaixo de `48rem`, row vira uma coluna e primary action ocupa largura.

T01 deve fazer browser spike com Playwright/axe e conferir roles table/row/rowheader/cell nas três
larguras. Se browsers suportados perderem semântica ao aplicar `display`, o V1 não usa dual DOM:
cards e adoção Admin ficam bloqueados até existir solução sem duplicar conteúdo interativo. Scroll
tabular serve apenas para manter o spike operável, não satisfaz o aceite visual do V1.

## Styling e tokens

- usar somente `foundations/tokens`, sem `theme` do consumer;
- component IDs explícitos nos roots públicos;
- private constants para 48rem/72rem; não criar breakpoint foundation sem segundo uso;
- header, spacing, typography e radius conforme `ui-ux-refinement.md`;
- no style prop gerado pelo package exceto coordenadas do floating menu;
- `prefers-reduced-motion` remove translate/animation, não feedback de estado;
- consumer pode `styled(OperationalList)` apenas para layout externo, nunca cells/recipe.

## Ref e SSR

- ActionMenu root ref aponta para `HTMLDivElement`;
- OperationalList root ref aponta para `HTMLDivElement`;
- object/callback refs entram em `quality/RefInterop.test.tsx`;
- menu fechado SSR-renderiza somente trigger/root;
- `defaultOpen` no SSR não cria portal até hydration; usar `useSyncExternalStore` como ModalLayer;
- OperationalList SSR contém table e conteúdo completo;
- styled composition preserva component IDs.

## Manifesto, exports e bundle

- duas entradas `layer: 'molecule'` em `quality/component-manifest.ts`;
- títulos `Molecules/Actions/ActionMenu` e `Molecules/Data/OperationalList`;
- root markers `lsui-sc-action-menu` e `lsui-sc-operational-list`;
- popup marker `data-ui-action-menu="true"` não substitui o runtimeMarker;
- root exports de values e todos os types públicos;
- `quality/bundle-entries/molecules.ts` importa ambos;
- budget só muda após medir raw/gzip real, mantendo margem pequena;
- smoke consumer cria uma lista generic tipada e ActionMenu fechado;
- public type test inclui inferência e `@ts-expect-error` para quick sem icon, primary danger e
  accessible names duplicados.

## Tests blocking

### ActionMenu unit/browser

- defaults e props/ref;
- controlled/uncontrolled e callback order;
- zero items omite trigger; todos disabled/loading ainda abrem e focam o menu;
- open focus e roving keyboard;
- disabled/loading skip;
- seleção única e return focus;
- Escape/Tab/outside/scroll/resize;
- cleanup de listeners;
- four-corner positioning, flip, clamp e maxHeight;
- portal, SSR/hydration e reduced motion;
- dois menus independentes; OperationalList garante exclusividade local.

Stories/interactions de conteúdo portaled consultam `canvasElement.ownerDocument.body`, seguindo o
padrão já usado por Dialog; queries restritas ao canvas não conseguem observar o popup. O layout
runner pode usar o marker global `data-ui-action-menu` para medir bounds e exclusividade.

### OperationalList unit/browser

- generic inference, keys e primary row header;
- accessible table name;
- IDs de columns únicos, relação `headers` e empty row com `colSpan`;
- data columns/order/align/importance;
- link/button navigation e callback event;
- title sem navigation;
- sort semantics/toggle;
- somente um `aria-sort` ativo por table;
- action normalization e omit actions column;
- primary/quick/overflow disabled/loading;
- um menu aberto por lista e close ao remover item;
- empty/footer;
- native props/ref/styled composition/SSR;
- roles em wide/medium/narrow;
- conteúdo extremo, 200% zoom e 50 rows sem listeners fechados.

## Layout audit rules

Adicionar regras observáveis, não selectors de story:

- popup visível dentro do viewport;
- no máximo um popup por OperationalList;
- quick actions respeitam altura de IconButton;
- actions cell não intersecta outras cells;
- compact card não excede root;
- primary/action spans corretos por marker;
- table/card não cria page horizontal overflow;
- sort button possui focus indicator;
- reduced motion no popup.

## Sequência de implementação

1. fechar types e `@ts-expect-error` tests;
2. implementar ActionMenu sem integrar no list;
3. fechar keyboard/position/SSR stories;
4. implementar primary column + table wide sem actions;
5. adicionar sorting e data columns;
6. adicionar action normalization e controlled menu;
7. executar semantic responsive spike e somente então ativar cards;
8. fechar stories/audits/manifest/exports;
9. gerar candidate e iniciar pilotos Admin.

Essa ordem impede que layout responsivo masque erros de semântica, tipos ou menu.

## Decisões adiadas

- bulk selection;
- current/selected row;
- row-level tone;
- sticky header/columns;
- virtualization;
- async `onSelect` gerenciado pelo package;
- navigation adapter de React Router;
- links dentro do ActionMenu;
- custom trigger;
- largura/breakpoint/column width públicos.
