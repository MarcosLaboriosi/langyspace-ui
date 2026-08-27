# Requisitos

## Requisitos funcionais

### RF01 — API controlada

- `Dialog` e `Drawer` recebem `open`, `onClose`, `title`, `closeLabel` e `children`.
- `description` e `footer` são opcionais.
- `size` aceita somente `sm | md | lg`.
- `dismissal` aceita somente `escape-and-backdrop | escape-only | explicit-only | blocked`.
- refs opcionais cobrem foco inicial, retorno e fallback sem expor o stack.
- props nativas seguras do panel podem carregar ids, classes de layout e `data-*`, sem permitir
  substituir `role`, `aria-modal`, `aria-labelledby` ou os owners internos.

### RF02 — Composição controlada

- `ModalLayer` permanece interno e contém somente infraestrutura compartilhada.
- `Dialog` fixa `kind="dialog"`; `Drawer` fixa `kind="drawer"`.
- organisms locais continuam responsáveis por conteúdo, tabs, formulários, estado assíncrono,
  queries, navegação e copy.
- título aceita `ReactNode` para metadado contextual sem criar props de domínio.

### RF03 — Acessibilidade modal

- panel usa `role="dialog"`, `aria-modal="true"` e título visível ligado por `aria-labelledby`.
- descrição, quando presente, usa `aria-describedby`.
- abertura move foco por prioridade: ref explícita, marker inicial, primeiro tabbable e panel.
- Tab e Shift+Tab circulam na camada superior.
- app root e layers inferiores ficam `inert` enquanto houver modal aberto.
- scroll do body permanece bloqueado até a última camada fechar.
- fechamento restaura foco para ref explícita, trigger conectado, fallback ou `main`.

### RF04 — Dismissal e stack

- somente a camada superior responde a Escape e backdrop.
- backdrop fecha apenas quando pointer down e pointer up ocorrem no backdrop.
- `blocked` desabilita o close e ignora Escape/backdrop.
- `explicit-only` ignora Escape/backdrop, mas preserva ações explícitas do fluxo.
- Dialog filho pode abrir sobre Drawer sem liberar scroll, app root ou layer pai.

### RF05 — Geometria canônica

- Dialog é centralizado em desktop e bottom sheet em mobile.
- Drawer usa placement lógico `end`, altura total no desktop e tela inteira no mobile.
- `sm | md | lg` controlam apenas larguras canônicas; não existem props de pixels.
- body é o único scroll owner; header e footer permanecem visíveis.
- footer quebra ações sem overflow e ocupa largura disponível no mobile.
- safe areas superior/inferior são respeitadas.

### RF06 — Migração dos consumers

- Admin substitui os componentes base locais pela export pública e migra shells modais legados
  qualificados sem mover regras de domínio.
- Teacher migra os seis drawers modais identificados.
- Student migra NotificationDrawer, ProblemReportDrawer e CheckoutDialog; o checkout continua sendo
  um organism local reutilizado por suas rotas atuais.
- overlays não modais listados em `epic.md` permanecem locais e não recebem `role="dialog"` novo.

## Requisitos não funcionais

- package sem dependência de theme ou asset do consumer;
- sem dependência runtime nova além de `react-dom` como peer compatível com React 19;
- SSR não acessa `document` durante render server-side;
- package mantém `sideEffects: false`, tree shaking e budgets revisados;
- nenhum dado real, login ou request externo entra em stories/audits;
- nenhuma mudança em payload, backend, Firestore, Functions ou analytics;
- implementação usa styled-components, tokens da library e nomes semânticos;
- testes seguem `Component.test.tsx` e stories co-localizadas.

## Decisões de padronização

### Diferenças descartadas

- backdrop entre 0,32, 0,42, 0,46 e 0,56;
- widths livres como 28 rem, 32 rem, 36 rem e 92 vw;
- radius e shadows levemente distintos;
- padding de header/body/footer por portal;
- close button circular versus rounded e ícones de 16/17 px;
- `svh` versus `dvh` quando não há razão de produto.

Essas diferenças não expressam domínio e convergem para o recipe do package.

### Variações mantidas por prop

- kind por components públicos distintos (`Dialog` e `Drawer`);
- size semântico;
- política de dismissal;
- título/descrição/footer e foco explícito.

### Responsabilidades mantidas locais

- labels e ações de negócio;
- tabs e seções internas;
- estado de submit/loading/error/success;
- fechar ou navegar após resultado confirmado;
- decidir quando `dismissal="blocked"` é necessário.

## Edge cases

- `open=false` não cria portal, listener ou lock;
- render SSR com `open=true` não lança erro;
- ausência de `#overlay-root` usa `document.body` sem setup obrigatório;
- trigger desmontado não recebe foco;
- zero tabbables mantém o foco no panel;
- tabbable oculto, disabled, inert ou `aria-hidden` é ignorado;
- camada intermediária desmontada fora de ordem não libera o documento;
- callbacks novos durante re-render não deixam listener stale;
- títulos e valores não quebráveis não causam overflow horizontal;
- footer vazio não cria owner visual;
- submit bloqueante não permite close acidental.

## Critérios de aceite

1. Todos os requisitos RF01–RF06 possuem teste ou evidência visual determinística.
2. O public API report registra apenas `Dialog`, `Drawer` e tipos relacionados; `ModalLayer` não é
   exportado.
3. O package passa unit, story/axe/play, layout, browser/SSR/package smoke, coverage e bundle.
4. Os três consumers compilam com o mesmo candidate tarball antes da publicação.
5. Nenhum consumer mantém infraestrutura própria de trap, body lock ou stack.
6. Exceções semânticas permanecem listadas e não são forçadas para a family modal.
7. Todos os audits visuais passam nas larguras aplicáveis e as screenshots críticas são revisadas.
8. Release, commits, pushes, workflows e bundles servidos são comprovados antes do encerramento.
