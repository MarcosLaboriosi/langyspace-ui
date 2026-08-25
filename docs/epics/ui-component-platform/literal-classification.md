# Classificação de tokens e recipes

## Regra de decisão

Um valor entra em `tokens` somente quando representa uma decisão semântica reutilizada por mais de
uma family. Geometria que define a identidade de um único component fica como constant privada no
seu `styles.ts`. Valores estruturais de CSS, como uma borda de `1px`, continuam junto da recipe. Um
literal divergente sem intenção de produto é corrigido, não abstraído.

Props públicas não são uma quarta categoria: `color`, `radius`, `spacing`, `padding` e `height`
livres fariam o consumer reconstruir a recipe. O architecture audit agora rejeita essas props e
obriga uma variant semântica fechada ou ownership local.

## Resultado da revisão

A busca reproduzível sobre production `styles.ts`, `recipe.ts` e `tokens.ts` usa valores com unidade
`rem`/`px` ou `rgba(...)`. Depois das correções, as 86 ocorrências ficam classificadas assim:

| Classe                                  | Ocorrências | Decisão                                                                 |
| --------------------------------------- | ----------: | ----------------------------------------------------------------------- |
| Definições de foundations               |          40 | Escalas e cores públicas, com propósito documentado no Storybook        |
| Recipe compartilhada de actions         |           8 | Bordas estruturais da family, sem novo token de `1px`                   |
| Recipes privadas de component/primitive |          34 | Geometria singular; constants nomeadas quando o significado não é óbvio |
| Bordas estruturais locais               |           4 | `1px` pertence à recipe de Compound, Filter, Segmented e StatePanel     |

A medição bruta de 196 registrada na investigação incluía também tests e outros arquivos TS/TSX.
Ela era um sinal de revisão, não uma meta de substituição. A classificação acima usa apenas owners
de style em produção para não contar assertions de teste como dívida de token.

## Decisões por family

| Surface                     | Antes                                           | Decisão                                                                 |
| --------------------------- | ----------------------------------------------- | ----------------------------------------------------------------------- |
| FilterPills `sm`/`md`       | `sm` tinha fonte maior que `md`                 | escala monotônica: `xs` em `sm`, `sm` em `md`; alturas de `control`     |
| CompoundControl `lg`        | wrapper 3rem/rounded, input 3.5rem/control      | wrapper e field compartilham `field.height.lg` e `radius.control`       |
| SegmentedControl narrow     | uma escolha exclusiva podia quebrar em 2 linhas | track única com scroll horizontal; nenhuma prop cosmética/wrap nova     |
| Segmented active background | ternário retornava o mesmo valor                | branch removido; active usa uma recipe única                            |
| Inverse surfaces            | alphas `.18`, `.2` e `.72` soltos               | roles `borderSubtle`, `surfaceSubtle` e `contentMuted`                  |
| Status/counter tiny text    | `0.6875rem` duplicado                           | token tipográfico `2xs`, restrito a metadata curta                      |
| StatePanel fill/compact     | números sem nome                                | recipe privada nomeada; não há segunda family que justifique tokens     |
| Neutral 300/400             | mesmo hexadecimal                               | 300 é canonical; 400 permanece alias deprecated para compatibilidade v1 |

## Evidência de consumers

Os cinco products foram buscados pelos components focais. Os callsites mais densos estão no Admin:
filters, busca, estados de lista e período de relatório. Teacher e Student ainda mantêm adapters
locais de FilterPills. Nenhum callsite fornece dimensões livres; portanto as correções preservam a
API e convergem recipes que os products já tratam como fechadas.

As stories `FilterPills/Sizes`, `CompoundControl/Sizes`,
`SegmentedControl/NarrowLongLabels` e `StatePanel/Filled` registram a comparação visual. A largura
estreita comprovou a quebra em duas linhas do SegmentedControl antes da correção; a policy de track
única preserva o gestalt de escolha exclusiva e continua acessível por scroll.
