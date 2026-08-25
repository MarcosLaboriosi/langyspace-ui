# T09 — migrar Cupom

Status: concluída.

## Responsabilidade

Adotar o package major e representar o seletor de período pela semântica correta.

## Escopo

- substituir RangeButton reestilizado por segmented control sobre Pressable;
- manter import direto quando não houver reutilização local;
- preservar relatório e redirect states sanitizados.

## Conclusão

Cupom não usa Button como base de seleção e não ganha adapter vazio.

## Validação focada

- tests, build e button-system audit;
- report normal/stress e segmented selection em 390/1281/2048.

## Evidência

- 15 testes e build de produção passaram;
- o full `validate:ui` passou com 36 cenários em nove larguras, sem problemas geométricos;
- o audit seleciona 30d e confirma uma única opção `aria-pressed`;
- o estado 30d revelou e corrigiu overflow mobile no owner do painel, sem reduzir a asserção.
