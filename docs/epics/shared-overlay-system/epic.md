# Sistema compartilhado de overlays

## Problema

Admin, Teacher e Student recriam a mesma infraestrutura modal em pelo menos 21 shells: backdrop,
drawer/dialog, foco inicial, Escape, scroll lock, nome acessível e retorno de foco. As diferenças de
largura, raio, padding, breakpoint e política de fechamento cresceram sem significado de produto.
Há também diferenças funcionais: alguns shells contêm Tab e restauram foco, outros apenas escutam
Escape, e alguns não possuem nome acessível.

O Admin já possui uma implementação local robusta de `ModalLayer -> Drawer/Dialog`, porém ela não
pertence ao package e os outros portais continuam repetindo comportamento e CSS.

## Objetivo

Publicar uma fundação de overlay em `@langyspace/ui` e fazer com que todos os dialogs e drawers
modais qualificados dos três portais componham essa fundação, preservando conteúdo e regras de
domínio locais e convergindo diferenças visuais sem significado.

## Impacto visual

`direct`: DOM, geometria, foco, backdrop, scroll, breakpoint mobile, header, body, footer e ações de
fechamento dos overlays serão alterados.

### Superfícies afetadas

- Admin: busca global, Leads, matrícula, comunicação, cobrança, assinatura, agenda/aula,
  professora, marketing, repasse, operações em lote e confirmações filhas;
- Teacher: notificações, aula/presença, disponibilidade, ação de horário, perfil do aluno e reporte
  de problema;
- Student: notificações, checkout/alteração de plano e reporte de problema;
- library: catálogo isolado de `Dialog` e `Drawer`, incluindo stack.

### Estados e conteúdo de risco

- fechado, aberto, Escape, backdrop, explicit-only e blocked durante mutação;
- uma camada e Dialog filho sobre Drawer;
- título/descrição longos, body vazio e body extenso;
- loading, error, empty, success e formulários densos mantidos pelos organisms locais;
- footer com uma, duas ou mais ações e labels longas;
- trigger presente, removido por navegação e fallback de foco;
- 390 px, 768 px, boundary denso 1280/1281 px e desktop 2048 px, incluindo altura curta e safe
  areas mobile.

## Escopo

- criar `Dialog` e `Drawer` públicos como molecules;
- criar `ModalLayer` interno como owner único de portal, stack, inert, scroll lock, foco e dismissal;
- adicionar tokens mínimos de overlay e sombras somente quando já comprovados pelos três portais;
- adicionar unit tests, stories, axe, interaction tests, SSR/browser/package smoke, manifesto, API e
  bundle gate;
- lançar uma versão minor imutável do package;
- migrar os shells modais qualificados em Admin, Teacher e Student;
- remover componentes/styles locais apenas quando ficarem sem consumer;
- ampliar os audits determinísticos onde o estado migrado ainda não possui cobertura;
- validar, commitar, atualizar `main`, publicar Hostings e provar os bundles servidos.

## Fora de escopo

- menus, popovers, tooltips e profile action sheets;
- loading/progress overlays sem interação modal;
- exercise/feedback overlays pertencentes a atividades;
- guided work session e painéis persistentes;
- mover fetch, submit, route state, store, copy ou regras de domínio para o package;
- animações novas ou redesign de conteúdo interno;
- criar props livres de cor, radius, width, padding, z-index ou breakpoint.

## Jornada esperada

1. A pessoa abre um Drawer ou Dialog por um gatilho do portal.
2. O overlay recebe nome acessível e foco inicial previsível.
3. Tab permanece na camada superior; a página e layers inferiores ficam inertes.
4. Escape, backdrop e botão de fechar respeitam a política da operação.
5. Em mutação insegura, o shell permanece aberto e comunica o estado pelo conteúdo local.
6. Ao fechar, o foco retorna ao gatilho ainda conectado ou a um fallback seguro.
7. Desktop e mobile apresentam geometria canônica sem corte, overflow ou ação fora da viewport.

## Critérios mensuráveis de sucesso

- zero implementação independente de focus trap, body scroll lock ou overlay stack nos consumers
  migrados;
- zero drawer/dialog modal qualificado com `role="dialog"` fora do package, exceto exceção local
  documentada e auditada;
- API pública limitada a comportamento e slots comprovados;
- todos os components públicos possuem owner test/story/browser/SSR no manifesto;
- library e três consumers passam builds, testes focados e `validate:ui` completos;
- screenshots mobile/dense/wide são inspecionadas para cada family de surface;
- package e consumers usam o mesmo tarball imutável e os bundles servidos correspondem aos builds
  dos commits publicados;
- alterações locais não relacionadas nos checkouts originais permanecem intactas.
