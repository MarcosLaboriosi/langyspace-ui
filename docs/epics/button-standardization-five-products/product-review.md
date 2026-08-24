# Revisão de produto

## Resultado

`aprovado com fronteira explícita entre ação e controle específico`

## Decisões revisadas

### Um Button com muitas props

Rejeitado. Tabs, cards, células de calendário, quiz, flashcards, scrims e rows não são variações do
mesmo botão de ação. Adicionar `selected`, `card`, `tab`, `calendar`, `square`, `compact`, `overlay`
ou valores livres transferiria o domínio dos cinco produtos para a primitive compartilhada.

### Manter todos os estilos locais e trocar apenas a tag base

Rejeitado para comandos canônicos. Isso atenderia a busca estática, mas conservaria exatamente as
diferenças de altura, raio, padding, cor e estado que motivaram a solicitação. É aceitável apenas
para controles específicos compostos sobre `Pressable`.

### Um reset global de button

Rejeitado. O reset não expressa semântica, não impede recipes paralelos e cria dependência de ordem
CSS. A responsabilidade precisa estar nos componentes.

### Pressable compartilhado

Aprovado. Há mais de cem controles reais que precisam de semântica nativa e baseline de interação,
mas não da aparência de um CTA. `Pressable` reduz divergência estrutural sem transformar contexto de
produto em API compartilhada.

### Danger, success e brand

- `danger` é transversal e semanticamente diferente de primary neutra;
- `success` é aprovado apenas para comandos de conclusão positiva explícita, como marcar presença;
- `brand` permanece tone de uma primary, nunca sinônimo de prioridade, sucesso ou urgência;
- nomes por cor são removidos das APIs de botão.

### Preservar dimensões locais

Rejeitado para diferenças leves. 30/32, 36/40, 44/40 e 52/48 não representam necessidades de
produto comprovadas. O custo de manter essas escalas supera qualquer fidelidade histórica. Superfície
de domínio pode ter dimensão própria quando a geometria é parte da função, como célula, card ou row.

## Revisão da experiência

- Primary continua clara e limitada a uma por grupo decisório.
- A cor rosa não é promovida a linguagem universal de ação.
- Danger mantém fricção e verbo destrutivo; não recebe foco inicial em confirmação.
- Success não substitui feedback posterior ao comando.
- Controles densos não recebem padding de CTA só para satisfazer a migração.
- Loading e disabled deixam de variar por portal.
- A migração não altera copy, handler, submit, link, permissão ou fluxo.

## Riscos aceitos

- A aparência de alguns comandos muda de poucos pixels como resultado intencional da
  padronização.
- Wrappers locais continuam existindo para limitar diffs, mas perdem ownership de recipe visual.
- `Pressable` não tenta garantir touch target; o componente específico continua responsável por sua
  geometria e será coberto pelos gates de cada produto.

## Follow-ups recusados neste épico

- tokens compartilhados de formulário, tabs, chips ou cards;
- pacote de ícones;
- theming cross-product;
- ButtonLink público;
- redesign de páginas ou redução de quantidade de ações de negócio.
