# Revisão técnica

## Contrato fechado

O contrato completo e implementável está em [technical-refinement.md](technical-refinement.md). As
decisões centrais são:

- ambos os componentes são molecules; nenhuma camada nova entra no manifesto;
- `ActionMenu` suporta controlled/uncontrolled para `OperationalList` coordenar um único menu;
- `OperationalList` separa `primaryColumn` das data columns;
- a primary cell é `<th scope="row">` e possui anatomy própria de leading/title/description/meta;
- navegação pertence ao título da primary cell e é link/button real;
- `AccessibleName` estrito nomeia a table;
- actions formam union discriminado primary/quick/overflow;
- root props/ref seguem React 19 e styled composition;
- não existem props de row, CSS, width, breakpoint, permission ou adapter de router.

Qualquer ampliação desse shape precisa ser justificada por callsite observado e reabrir esta revisão.

## Decisões fechadas antes da implementação

### Navigation type

`MouseEventHandler` deve ser importado como type e o union de navegação precisa manter narrowing
claro. O callback de link recebe o evento para React Router poder `preventDefault`; o `href`
permanece fallback real.

### Quick action sem ícone

Uma ação `placement="quick"` sem ícone é inválida porque não pode virar `IconButton`. O union
discriminado falha no TypeScript; não há fallback ou warning runtime.

### Quantidade de quick actions

O V1 documenta máximo de uma primary action e duas quick actions. Excedentes vão para overflow
preservando ordem. Como TypeScript não expressa bem esses limites em arrays dinâmicos, o component
normaliza deterministicamente e unit tests provam a ordem. Ações danger sempre vão para overflow;
uma primary action danger é inválida.

### Hierarquia visual de ações

Primary action renderiza Button rotulado; quick action renderiza IconButton; overflow renderiza
item rotulado no ActionMenu. Em card abaixo de `48rem`, primary ocupa a largura disponível e os
demais comandos ficam em uma segunda linha. O component não infere importância pela ordem do array.

### Menu positioning

O menu usa portal em `document.body`, `position: fixed`, medição por `getBoundingClientRect`,
flip/clamp e close em resize/scroll. Reutilizar `ModalLayer` não é correto porque menu não bloqueia
page nem usa modal stack. Nenhuma dependência runtime nova entra no V1.

### Close reasons e foco

Escape/seleção restauram trigger; outside preserva o alvo clicado; Tab/Shift+Tab movem para o
tabbable adjacente ao trigger; viewport change restaura somente se o foco estiver no popup. A enum
de reasons é privada e não amplia a API.

### Controlled versus uncontrolled

`ActionMenu` aceita `open`, `defaultOpen` e `onOpenChange`. Standalone pode ser uncontrolled;
`OperationalList` controla o menu pela item key. Loading/disabled continuam controlados pelo
consumer. Erro/mutação posterior é apresentado pelo produto.

### Responsive semantics

Antes de fechar o recipe, browser tests confirmam table/row/rowheader/cell nas três larguras. Se
`display: grid/block` alterar a árvore acessível em browser suportado, não aceitar suppression nem
dual DOM com controles duplicados: cards e adoção Admin ficam bloqueados. Scroll tabular pode ser
usado somente no spike técnico, não como aprovação visual do V1.

### Interactive content em cells

`primaryColumn.render` retorna anatomy tipada e a library envolve somente `title` no link/button.
Leading, description e meta não são embrulhados. Não existe click handler no row nem runtime DOM
inspection. Data columns podem conter controles legítimos.

## Markers e auditabilidade

Markers mínimos:

- `lsui-sc-action-menu` no root público;
- `data-ui-action-menu` no popup;
- `lsui-sc-operational-list` no root;
- `data-density` no list root;
- `data-column-importance` nas cells;
- `data-action-placement` nos action containers.

Markers não são CSS API para consumers. Servem a unit, Storybook layout e audits dos produtos.

## Bundle e dependências

- nenhuma dependência runtime nova no baseline;
- medir library e slice `molecules` já existente;
- menu deve ser lazy only por render condicional, sem dynamic import;
- render de 50 rows não pode criar listeners globais por menu fechado;
- listeners de resize/scroll existem somente enquanto um menu estiver aberto.

## Compatibilidade

É uma adição minor. A API report deve registrar exports e declarations. `README` recebe dois
exemplos: lista de Leads e lista ordenável. Package/browser/SSR smoke inclui generic inference e
render sem ThemeProvider.

## Veredito técnico

A abordagem é implementável sem dependency ou taxonomia nova. A
[evidência da T01](t01-evidence.md) provou a semântica responsiva no Chromium configurado em seis
cenários e autorizou T02. Storybook/axe/layout e os pilotos continuam blocking para o V1. Bulk
selection, selected/current row, row tone, sticky behavior e row activation permanecem bloqueados.
