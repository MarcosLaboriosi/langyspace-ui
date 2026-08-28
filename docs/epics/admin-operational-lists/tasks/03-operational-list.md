# T03 — OperationalList e responsividade

## Objetivo

Implementar a lista operacional genérica sobre HTML semântico, navigation descriptor e ActionMenu.

## Trabalho

- criar a molecule sem alterar `ComponentLayer`/Storybook taxonomy;
- implementar generic items/keys, índice visível, `primaryColumn`, data columns, sort controlado e
  importance;
- implementar navigation link/command somente no title da primary row header;
- renderizar primary, quick e overflow determinísticos;
- implementar density e container-query responsive recipe;
- derivar labels compactos dos headers;
- gerar IDs determinísticos e associar cells a row/column headers;
- transformar sortable headers em barra compacta sem duplicar controls;
- manter empty state em uma cell com `colSpan` e compor footer sem lifecycle interno;
- adicionar markers e tests de roles/layout.

## Aceite

- Leads e Alunos fixtures usam a mesma API;
- nenhuma linha usa click/keydown artesanal;
- table roles permanecem válidos em layout amplo e compacto;
- um único table DOM; dual markup interativo é proibido;
- no máximo uma primary e duas quick actions; danger sempre no overflow;
- sem overflow/sobreposição em conteúdo extremo;
- package funciona sem ThemeProvider e sem CSS import.

## Validação

- unit/generic inference;
- browser roles/axe;
- stories DefaultLeads, DenseStudents, Sortable, ActionHierarchy, DangerOverflow,
  DisabledAndLoading, Empty, NarrowCards, LongLocalizedContent, NoActions e FiftyRows;
- layout audit focado em todas as boundary widths.
