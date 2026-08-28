# Refinamento UI/UX

## Princípio de experiência

A lista operacional deve responder três perguntas em menos de uma varredura visual:

1. **quem ou o que é este registro?**
2. **qual é o estado ou a próxima decisão?**
3. **qual é a ação mais provável agora?**

Informação secundária existe para confirmar a decisão, não para competir com identidade, estado e
ação. O componente organiza a hierarquia; o Admin continua decidindo o conteúdo.

## Anatomia canônica

```text
Desktop amplo
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│ IDENTIDADE       PRÓXIMA AÇÃO       STATUS       CONTEXTO       VALOR       AÇÕES          │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│ Avatar Nome      Ícone + título     Chip         Professora     R$ 224      [Primária] [•][⋯]│
│        metadado  descrição curta    apoio        recorrência    vencimento                  │
└─────────────────────────────────────────────────────────────────────────────────────────────┘

Tablet / container médio
┌────────────────────────────────────────────────────────────┐
│ Avatar Nome e metadado                         Status      │
│                                                            │
│ PRÓXIMA AÇÃO                 CONTEXTO                       │
│ Ícone + título               Professora / recorrência      │
│ descrição                                                  │
│                                                            │
│ VALOR                        INFORMAÇÃO SECUNDÁRIA          │
├────────────────────────────────────────────────────────────┤
│ [Ação primária]                                [•] [•] [⋯] │
└────────────────────────────────────────────────────────────┘

Mobile estreito
┌──────────────────────────────┐
│ Avatar Nome          Status  │
│        metadado              │
│                              │
│ PRÓXIMA AÇÃO                 │
│ título + descrição           │
│                              │
│ CONTEXTO                     │
│ valor                        │
│                              │
│ [Ação primária — largura]    │
│ [•] [•]                  [⋯] │
└──────────────────────────────┘
```

## Hierarquia

### Primary

- primeira coluna/célula da leitura;
- identidade ou identificador operacional;
- título em `sm/semibold`, uma linha no desktop e até duas no card;
- metadado em `xs`, muted, com wrap seguro para e-mail/ID;
- quando existe navegação, o título é link/button real e ganha affordance no hover/focus;
- Avatar é decorativo quando o nome textual está adjacente.

### Secondary

- estado, próxima ação, professora, plano, vencimento ou valor;
- label reaparece no card em `2xs/bold`, uppercase e muted;
- conteúdo pode ocupar duas colunas no tablet;
- status usa `StatusChip` e texto; cor nunca é a única pista.

### Tertiary

- IDs, fonte, observação curta e apoio diagnóstico;
- nunca é removido por breakpoint; apenas muda de ordem e densidade;
- valores técnicos podem usar mono, mas continuam copiáveis e quebram linha;
- conteúdo com mais de duas frases deve abrir detalhe/drawer, não expandir a lista indefinidamente.

## Densidade

| Propriedade                    |    `regular` |    `compact` |
| ------------------------------ | -----------: | -----------: |
| header mínimo                  |        44 px |        40 px |
| padding vertical de cell       |        16 px |        12 px |
| padding horizontal             |        16 px |        12 px |
| altura esperada de row simples |        72 px |        60 px |
| quick action                   | `md` / 40 px | `sm` / 32 px |
| gap entre ações                |         8 px |         6 px |

Altura é mínima, nunca fixa. Conteúdo traduzido, zoom e fonte maior podem crescer sem clipping.
`compact` é para filas densas de consulta; não pode ser usado para esconder excesso de conteúdo.

## Superfície e estados visuais

- desktop: surface branca, header muted, divisores sutis e sem shadow por row;
- cards: border subtle, radius card e shadow somente subtle;
- hover ajuda leitura, mas não muda cursor da row para pointer;
- `:focus-within` destaca o card/row sem substituir o focus ring do controle ativo;
- ação/estado danger não pinta a row inteira; usa chip, ícone e copy localizada;
- seleção em lote e current guided item não entram no V1;
- disabled reduz contraste apenas do controle, não do conteúdo do registro;
- loading mantém label e largura do comando.

## Navegação

- nenhuma `<tr>` recebe `onClick`, `tabIndex` ou handler de Espaço/Enter;
- `href` gera link nativo e preserva abrir em nova aba/copiar endereço;
- drawer/modal usa botão real;
- o título da primary cell é o alvo preferencial;
- no card, a primary area exibe chevron discreto somente quando navegável;
- hover/focus sublinha ou realça o título, não a surface inteira;
- ações secundárias nunca dependem de `stopPropagation`.

## Modelo de ações

O array possui três intenções fechadas:

### `primary`

- no máximo uma por item;
- Button rotulado, usado para a próxima decisão importante (`Converter em aluna`, `Marcar paga`);
- desktop/tablet fica na faixa de ações; mobile ocupa a largura disponível;
- pode ter ícone, loading e disabled;
- nunca usa tone danger.

### `quick`

- no máximo duas por item;
- IconButton com label obrigatório (`WhatsApp`, `Copiar link`, `Abrir detalhe`);
- exige ícone;
- neutral por padrão; comandos destrutivos não são quick;
- excesso é movido para overflow preservando ordem.

### `overflow`

- label sempre visível no menu;
- aceita neutral ou danger;
- contém ações de menor frequência, explicação maior ou risco destrutivo;
- primeiro danger recebe separator automático;
- trigger só aparece quando há pelo menos uma ação overflow.

Ordem visual: `primary → quick → overflow`. A disponibilidade continua derivada pelo Admin; a UI
library não recebe `visibleWhen`, permission ou regra de domínio.

## ActionMenu

- trigger ellipsis com `aria-haspopup="menu"` e `aria-expanded`;
- popup de 208–320 px, padding 6 px, radius 12 px, shadow popover;
- item mínimo de 40 px (`compact`) ou 44 px (`regular`);
- ícone 16 px, label quebra linha sem truncar o sentido;
- abre alinhado ao fim por default e faz flip para permanecer no viewport;
- motion de 120–150 ms com opacity/translate; sem translate em reduced motion;
- primeiro foco no primeiro item disponível;
- setas/Home/End navegam; Escape fecha e retorna ao trigger;
- Tab/Shift+Tab fecha e move para o próximo/anterior controle relativo ao trigger, sem trap;
- click externo e resize fecham; scroll não pode deixar popup destacado do trigger;
- somente um menu da mesma lista fica aberto.

## Responsividade por container

| Container        | Apresentação   | Regra                                            |
| ---------------- | -------------- | ------------------------------------------------ |
| `>= 72rem`       | table          | header visível, cells alinhadas, ações à direita |
| `48rem–71.99rem` | card 2 colunas | primary e actions ocupam largura completa        |
| `< 48rem`        | card 1 coluna  | leitura vertical e primary action full-width     |

Nenhuma coluna some. O consumer fornece a ordem semântica; ela não muda entre layouts.
`importance` controla somente ênfase/span, nunca CSS `order` ou visibilidade. O breakpoint é privado
e canônico; páginas não passam pixels.

Quando existem colunas ordenáveis, seus headers formam uma barra compacta visível acima dos cards.
Headers não ordenáveis continuam semanticamente associados, mas visualmente ocultos. Não existe
controle de sort invisível ou inacessível no mobile.

## Conteúdo e copy

- labels de ação começam com verbo: `Abrir cadastro`, `Copiar link`, `Arquivar aluno`;
- evitar `Detalhe`, `Ação` ou ícone sem contexto;
- label acessível de quick action inclui o objeto quando necessário: `Falar com Ana`;
- estado vazio pertence ao recorte atual e oferece uma recuperação concreta;
- contagem usa live region somente quando filtros/paginação alteram o resultado;
- IDs não devem ser a primeira informação salvo quando o ID é o objeto operacional;
- valores monetários alinham ao fim no desktop e exibem moeda completa;
- datas ambíguas incluem contexto (`Vence 28 ago`, não apenas `28/08`).

## Estados da lista

| Estado             | Tratamento                                                   |
| ------------------ | ------------------------------------------------------------ |
| loading inicial    | `LoadingState`; não renderizar rows parciais como completos  |
| error              | `StatePanel` com retry e sem dados potencialmente incorretos |
| empty base         | mensagem de fila concluída/sem registros                     |
| filtered empty     | preservar filtros e oferecer `Limpar filtros`                |
| pagination loading | manter itens atuais e loading no footer                      |
| action loading     | bloquear apenas o comando afetado e manter row legível       |
| stale/refresh      | status fora da lista; não substituir conteúdo abruptamente   |

## Matriz de Storybook

| Story                  | Objetivo visual/UX                            | Interaction               |
| ---------------------- | --------------------------------------------- | ------------------------- |
| `DefaultLeads`         | identidade, status, primary/quick/overflow    | abrir cadastro            |
| `DenseStudents`        | sete informações e compact density            | navegação primária        |
| `Sortable`             | `aria-sort`, affordance e ciclo de direção    | click/teclado no header   |
| `ActionHierarchy`      | 1 primary, 2 quick e overflow                 | callbacks e ordem         |
| `DangerOverflow`       | separator e contraste danger                  | keyboard completo         |
| `DisabledAndLoading`   | estabilidade de layout                        | itens ignorados pelo foco |
| `NarrowCards`          | 2 colunas → 1 coluna                          | ações sem overlap         |
| `LongLocalizedContent` | nomes, e-mails e labels extensos              | menu dentro do viewport   |
| `NoActions`            | lista sem coluna/faixa vazia                  | navegação preservada      |
| `Empty`                | composição com StatePanel                     | recovery action           |
| `FiftyRows`            | densidade/performance, sem screenshot gigante | um menu aberto por vez    |

## Critérios de aprovação visual

- identidade, estado e ação primária reconhecíveis sem abrir detalhe;
- nenhuma ação importante depende de tooltip ou menu escondido;
- zero corte, overlap ou scroll horizontal em 390 px;
- cards mantêm ordem de leitura e labels de coluna;
- controls preservam tamanho mínimo e focus ring em 200% zoom;
- popup nunca sai do viewport nem fica atrás de card/overlay;
- conteúdo extremo não muda a largura da coluna de ações;
- screenshots 390, 768, 1281 e 2048 demonstram a mesma hierarquia, não apenas ausência de overflow.
