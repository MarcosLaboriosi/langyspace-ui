# Requisitos

## Funcionais

### ActionMenu

- aceitar lista ordenada de ações com `id`, `label`, `icon`, `tone`, `disabled`, `isLoading` e
  callback;
- renderizar label visível dentro do menu e nome acessível no trigger;
- separar visualmente o primeiro item destrutivo sem exigir `className` do consumer;
- abrir pelo trigger, fechar por Escape, click externo, seleção e desmontagem;
- mover foco para o primeiro item disponível, navegar com setas/Home/End e retornar foco ao
  trigger;
- ArrowDown/ArrowUp no trigger abrem no primeiro/último item disponível;
- impedir seleção duplicada quando disabled/loading;
- aceitar alinhamento inicial/final sem coordenadas livres;
- não depender de Lucide, Radix, React Router ou theme do consumer.

### OperationalList

- ser genérico em `Item` e exigir key estável;
- fornecer índice visível a renderers/actions, mas nunca permitir key derivada implicitamente do
  índice;
- exigir `primaryColumn` singular com leading, title, description, meta e navigation opcionais;
- aceitar data columns com `id`, `label`, renderer, alinhamento e importância responsiva fechados;
- aceitar direção/controlador de sort opcional por coluna, sem possuir o estado de ordenação;
- suportar uma única coluna ordenada por vez; multi-sort permanece fora do V1;
- aceitar navegação primária por item como link nativo ou comando callback;
- aceitar `getActions(item, index)` e dividir ações entre uma primary action rotulada, até duas quick
  actions e overflow;
- usar labels das colunas como labels dos cards compactos sem duplicação no callsite;
- aceitar `emptyState` e `footer` como slots, sem conhecer lifecycle de fetch;
- oferecer densidades `regular` e `compact` comprovadas pelas superfícies atuais;
- manter header, rows e cells nativos quando estiver em modo tabular;
- manter table nomeada e empty state dentro de uma cell com `colSpan` mesmo sem itens;
- associar data/actions cells a row/column headers por IDs determinísticos;
- não tornar a linha inteira um pseudo-link no V1.

## Acessibilidade

- nomes acessíveis obrigatórios para lista, navegação primária e trigger do menu;
- `aria-sort` correto e botão real no header quando uma coluna for ordenável;
- headers ordenáveis permanecem visíveis no compact layout; nenhum controle focável é apenas
  visualmente oculto;
- link real quando há `href`; botão real quando a navegação abre drawer/comando;
- sem handlers de teclado artesanais em `<tr>`;
- foco visível e ordem coerente em tabela e cards;
- ações de ícone com target mínimo canônico e label sempre disponível;
- menu com roving focus, Escape e retorno de foco;
- conteúdo, label e status não podem depender somente de cor;
- axe sem violações nas stories e no piloto Admin;
- primary body cell usa `<th scope="row">`; data cells usam `<td>`;
- uma única table DOM preserva IDs, controls, callbacks e estado.

## Responsividade

- o container, e não o viewport global, decide quando a lista vira cards;
- usar table em `>= 72rem`, cards de duas colunas entre `48rem–71.99rem` e cards de uma coluna
  abaixo de `48rem`;
- nenhuma largura arbitrária é prop pública;
- nenhuma coluna desaparece; `primary` permanece no topo e `secondary`/`tertiary` recebem labels
  explícitos;
- actions ocupam faixa própria no card e nunca sobrepõem conteúdo;
- primary action ocupa a largura disponível no mobile; quick actions e overflow permanecem em uma
  segunda linha estável;
- conteúdo longo quebra ou trunca somente conforme recipe documentado;
- nenhum scroll horizontal na story de cards em 390 px;
- tabela pode continuar tabular em containers largos sem min-width fixa do Admin.
- cards só entram no V1 depois de roles table/row/rowheader/cell comprovados no browser; dual DOM
  interativo não é fallback aceitável.

## Ownership

Permanece na UI library:

- markup, recipe, layout responsivo, foco e teclado;
- distribuição primary/quick/overflow;
- semântica de menu, link, botão, table e card;
- tokens e markers para teste/auditoria.

Permanece no Admin:

- dados, query, filtros, paginação, sorting state e seleção em lote;
- construção de rota/query/drawer e analytics;
- quais ações existem e quando estão disponíveis;
- copy, status, identidade, valores e regras financeiras;
- loading/error/empty description e mutações.

## Compatibilidade e package

- exports de source, declarations, README, manifest e `quality/public-api.json` mudam juntos;
- mudança é minor SemVer;
- candidate tarball passa no Admin antes do tag;
- `check:api`, bundle budget, SSR/browser smoke e package smoke são blocking;
- ambos os componentes entram como `layer: molecule`; nenhuma taxonomia nova é criada;
- não existe import de CSS nem requisito de ordem de import;
- styled component IDs públicos são usados apenas por teste/auditoria, não para overrides.

## Fora de escopo V1

- virtualização;
- drag-and-drop/reordenação;
- edição inline;
- tree grid, agrupamento ou colunas redimensionáveis;
- seleção em lote;
- sticky header/columns;
- server-side data source;
- persistência de preferências;
- menu contextual por clique direito;
- calendário, kanban ou funil.

## Critérios de aceite

- stories DefaultLeads, DenseStudents, Sortable, ActionHierarchy, DangerOverflow,
  DisabledAndLoading, NarrowCards, LongLocalizedContent, NoActions, Empty e FiftyRows aprovadas;
- unit tests cobrem contrato genérico, semântica, ações, navegação e edge cases;
- interaction tests cobrem teclado do menu e sort/navegação;
- layout audit cobre 390, 768, 1280, 1440, 1536, 1551, 1552, 2048 e reduced motion quando
  marcado como boundary;
- piloto de Leads e segunda adoção em Alunos passam `validate:ui` e screenshot review;
- zero classes `stu-table`, `responsive-data-table`, `row-menu` e `row-actions` nos callsites
  migrados;
- nenhuma regressão de rota, paginação, ação, menu, empty/loading/error ou layout;
- revisão final decide explicitamente se filas financeiras podem migrar com a mesma API.
