# Requisitos

## Regras de decisão

Toda implementação encontrada no inventário deve passar, nesta ordem, por uma das três decisões:

1. **Comando canônico:** se a função é iniciar, confirmar, cancelar, voltar, tentar novamente ou
   concluir uma decisão, usar `Button` e sua prop semântica.
2. **Controle específico:** se a superfície é parte do domínio — tab, chip selecionável, card/row,
   célula de calendário, opção de quiz, scrub/hit zone, scrim ou item de navegação — manter um
   componente próprio composto sobre `Pressable`. Não adicionar prop ao `Button`.
3. **Diferença sem justificativa:** se dois controles representam a mesma decisão e diferem apenas
   alguns pixels, raio, padding, peso, cor aproximada ou hover, eliminar a diferença e manter o
   recipe canônico.

## Contrato funcional compartilhado

### Button

- FR-01: continuar nativo por padrão, com `type="button"`, ref e atributos nativos encaminhados;
- FR-02: manter `primary`, `secondary` e `tertiary`;
- FR-03: adicionar `danger` para confirmação destrutiva e `success` para conclusão positiva
  explícita já comprovada em mais de um portal;
- FR-04: adicionar `tone="brand"` somente para `variant="primary"`; brand não comunica sucesso nem
  urgência;
- FR-05: manter `sm`, `md` e `lg` em 32, 40 e 48 px; não criar `xs`, `xl` ou altura arbitrária;
- FR-06: manter `pill` e `rounded`; não criar raio por valor;
- FR-07: manter `fullWidth`, `iconStart`, `iconEnd`, `iconOnly` e `isLoading`;
- FR-08: `iconOnly` continua exigindo nome acessível por tipo;
- FR-09: `isLoading` mantém label, bloqueia interação, define busy e troca apenas o slot de ícone;
- FR-10: o estilo não depende de `ThemeProvider` do consumidor.

### Pressable

- FR-11: renderizar `<button>` nativo com `type="button"` por padrão, props/ref/className nativos;
- FR-12: fornecer apenas baseline de box model, herança tipográfica, cursor, disabled, focus-visible
  e reduced motion;
- FR-13: não fornecer tamanho, shape, variante, cor, layout ou estado selecionado;
- FR-14: aceitar composição por `styled(Pressable)` sem atributo interno vazar ao DOM;
- FR-15: ter `componentId` estável e smoke de SSR/prerender equivalente ao `Button`.

## Vocabulário de ação

| Papel              | API compartilhada                | Uso aprovado                           | Rejeitado                 |
| ------------------ | -------------------------------- | -------------------------------------- | ------------------------- |
| principal neutra   | `variant="primary"`              | salvar, continuar, confirmar           | `solid`, `black`          |
| alternativa        | `variant="secondary"`            | cancelar, voltar, atualizar            | alturas locais            |
| baixa ênfase       | `variant="tertiary"`             | limpar, mostrar mais, voltar inline    | `ghost` visual local      |
| institucional      | `variant="primary" tone="brand"` | matrícula/conversão aprovada           | `pink` como nome público  |
| destrutiva         | `variant="danger"`               | excluir, cancelar, recusar             | `red`, `danger-solid`     |
| conclusão positiva | `variant="success"`              | marcar presença/concluir fato positivo | `green` como nome público |

- Um grupo decisório possui no máximo uma primary visível, incluindo primary brand.
- `success` só representa uma ação cujo resultado positivo é o próprio comando; não pinta qualquer
  próximo passo de verde.
- Danger de baixa ênfase pode permanecer em componente local específico sobre `Pressable`; não se
  cria combinação irrestrita de variant/tone para um caso isolado.
- Navegação continua semântica de link. Wrappers locais podem renderizar a aparência canônica como
  `<a>`, mas o pacote não ganha uma prop polimórfica pública sem necessidade adicional.

## Normalização visual obrigatória

- N-01: 30/31/33 px convergem para `sm` 32 px;
- N-02: 36/38/42/44 px usados como botão de ação convergem para `md` 40 px;
- N-03: 50/52/56 px usados como botão de ação convergem para `lg` 48 px;
- N-04: raio quase-pílula converge para `pill`; cards/rows/tabs mantêm geometria própria sobre
  `Pressable`;
- N-05: raio de 10/11/12/13 px em botão de ação retangular converge para `rounded` 12 px;
- N-06: paddings, gaps, font size/weight, border, focus, disabled e motion de ação pertencem ao
  pacote e não são replicados no consumidor;
- N-07: `xs` local de icon button converge para `sm`; controles que realmente precisam de área
  menor permanecem um componente específico, não um `IconButton` canônico;
- N-08: nomes por cor (`pink`, `green`, `solid`) deixam APIs públicas de botão em favor do papel;
- N-09: estilos locais de composição podem controlar apenas posição, margin, largura contextual,
  grid/flex ownership e estado de domínio não representado pela API.

## Matriz de componentes específicos

Estes grupos usam `Pressable`, preservando componente e semântica próprios:

| Produto | Grupos                                                                                                                                                                       |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Landing | chips de exemplos, navegação inferior do showcase e opções de quiz                                                                                                           |
| Admin   | filter pills, segmented control, text action, resultado de busca, rows de seleção, tabs, calendário, menu e superfícies operacionais densas                                  |
| Student | tabs, filter chips, cards/feed/story, rows de método/menu, quiz, flashcard, shadowing, chat, scrub/close layers, telefone, notificação e upload de avatar                    |
| Teacher | disponibilidade, tabs, calendário, aula/evento, rows/opções/chips do drawer, material/presentation hit zones, notificação, telefone, toast, scrims e preview de aprendizagem |
| Cupom   | nenhum novo caso; range já é composição contextual do `Button`                                                                                                               |

Um item da tabela não autoriza um componente genérico de domínio no pacote. Cada controle mantém um
nome local que descreve sua responsabilidade.

## Requisitos por consumidor

- FR-16: Landing migra os três `styled.button` restantes e fixa o release final;
- FR-17: Admin substitui 80 `<button>` e sete `styled.button`, usando as primitives semânticas já
  existentes e removendo classes `.pill`, `.ico-btn`, `.link-btn` e equivalentes quando ficarem sem
  uso;
- FR-18: Student migra dois `<button>` e 81 `styled.button`, consolidando seus componentes base;
- FR-19: Teacher migra dois `<button>` e 68 `styled.button`, consolidando seus componentes base;
- FR-20: Cupom atualiza o artefato e prova que continua sem botão nativo fora do pacote;
- FR-21: wrappers de compatibilidade podem permanecer quando evitam diffs amplos de call site, mas
  devem delegar recipe visual ao pacote;
- FR-22: todos os produtos recebem auditoria estática versionada que ignora fixtures de teste e
  falha para `<button>`/`styled.button` novos em produção.

## Acessibilidade e comportamento

- NFR-01: botão icon-only exige `aria-label` ou `aria-labelledby` específico ao alvo;
- NFR-02: foco visível deve atingir superfícies claras e escuras sem depender só de cor;
- NFR-03: controles clicáveis continuam semanticamente botões; `role="button"` em container só
  permanece onde a semântica composta exigir e tiver teclado equivalente;
- NFR-04: disabled é reservado a indisponibilidade real; loading usa `isLoading`;
- NFR-05: labels não escapam do viewport nem são truncadas sem nome completo acessível;
- NFR-06: touch targets canônicos mantêm 32/40/48 px e icon-only permanece quadrado;
- NFR-07: reduced motion remove deslocamento não essencial;
- NFR-08: handlers, submit behavior, destinos, permissões e ordem de foco permanecem equivalentes.

## Cobertura visual

- AC-01: Landing mantém os casos existentes, que já cobrem todas as rotas afetadas;
- AC-02: Admin mantém layout + accessibility + design-system audits, que cobrem rotas, overlays e
  estados densos do inventário;
- AC-03: Student adiciona casos sanitizados para autenticação/cadastro, escolha de plano e checkout
  quando ausentes no audit atual;
- AC-04: Teacher adiciona casos sanitizados para previews do aluno, apresentação de material e
  drawers relevantes quando ausentes no audit atual;
- AC-05: Cupom mantém report normal/stress e fallbacks de redirect;
- AC-06: todos os audits bloqueiam rede externa e não leem nem escrevem produção;
- AC-07: screenshots 390/1281/2048 são inspecionadas; Teacher inclui 390x667 se o gate continuar
  produzindo caso compacto.

## Aceitação de entrega

- AC-08: package lint, format, typecheck, unit, build, package smoke e layout audit passam;
- AC-09: tarball público imutável contém as exports e não embute React/styled-components;
- AC-10: os cinco installs frozen resolvem o mesmo URL e checksum;
- AC-11: busca estática final encontra zero violações de produção;
- AC-12: testes focados provam mapeamentos, loading, icon-only, links locais e variantes semânticas;
- AC-13: builds e `validate:ui` dos cinco produtos passam;
- AC-14: diffs não contêm mudanças de negócio, Firebase, copy não necessária ou trabalho alheio;
- AC-15: cada `main` remoto contém seu commit e o workflow de Hosting termina com sucesso;
- AC-16: rotas públicas respondem 200, bundles servidos contêm o marker da versão nova e não
  contêm recipes de botão legado removidos;
- AC-17: o veredito final é `Visual gate review: passed` somente depois da inspeção humana das
  screenshots, não apenas pelo exit code.
