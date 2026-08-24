# Requisitos

## Contrato compartilhado

- FR-01: `Button` oferece `density="regular" | "compact"`, com `regular` como default compatível;
- FR-02: `compact` preserva alturas canônicas 32/40/48 e reduz somente tipografia/padding por recipe;
- FR-03: `compact md` usa 40 px, fonte 14 px e padding horizontal 16 px;
- FR-04: density não aceita número, token de consumidor ou valor por produto;
- FR-05: o recipe preserva conteúdo extremo; grupos operacionais com labels curtas e atômicas
  evitam quebra interna e resolvem overflow na composição;
- FR-06: loading, icon-only, disabled, variantes, tones, shapes e refs permanecem compatíveis;
- FR-07: a saída SSR continua independente de `ThemeProvider` e com IDs estáveis.

## Composição responsiva

- FR-08: grupos não dependem de `flex-wrap` para decidir hierarquia;
- FR-09: cada grupo declara linha, grid ou pilha por breakpoint e mantém ordem DOM;
- FR-10: ao empilhar no mobile, ações equivalentes ocupam largura uniforme;
- FR-11: desktop não cria uma ação principal órfã em segunda linha por diferença de poucos pixels;
- FR-12: copy completa e accessible name permanecem inalterados.

## Teacher

- FR-13: `PillButton` usa density compacta para o caso md historicamente compacto;
- FR-14: o footer de presença não faz wrap acidental e empilha em viewport estreito;
- FR-15: confirmação de falta conserva hierarquia e espaçamento;
- FR-16: design mock de `/` resolve dados locais sincronamente e não aguarda Firebase;
- FR-17: layout audit abre uma aula elegível e inspeciona o grupo de presença.

## Admin

- FR-18: ações legacy `.pill` migram para density compacta quando representam o recipe compacto;
- FR-19: regras locais deixam de sobrescrever métricas pertencentes ao package;
- FR-20: ações da professora empilham uniformemente no mobile, sem label em duas linhas;
- FR-21: drawers com múltiplas ações usam composição explícita, preservando grupos de duas ações;
- FR-22: fixtures atuais continuam sanitizadas e sem rede externa.

## Controles de regressão

- FR-23: Student mantém o recipe `regular` e suas métricas atuais;
- FR-24: Landing mantém CTA e controles específicos sem alteração visual injustificada;
- FR-25: Cupom mantém o seletor de período e seu estado pressed;
- FR-26: icon buttons não mudam nesta correção sem evidência concreta de quebra.

## Aceitação

- AC-01: unit tests provam default regular, compact md e label atômica;
- AC-02: package lint, typecheck, unit, build, SSR/package smoke e layout audit passam;
- AC-03: Teacher e Admin focused audits falham antes e passam depois nos casos adicionados;
- AC-04: `validate:ui` completo passa uma vez em cada produto alterado;
- AC-05: checks focados dos três controles não alterados passam;
- AC-06: inspeção visual cobre 390, boundaries de composição, 1281 e 2048;
- AC-07: diffs não incluem backend, copy ou dados;
- AC-08: release e produção só avançam após checksum, installs frozen, CI e bundle evidence.
