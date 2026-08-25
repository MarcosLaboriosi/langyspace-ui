# T03 — migrar spinners dos produtos

Status: concluída.

## Responsabilidade

Substituir loaders duplicados pelo atom sem apagar motion de domínio.

## Escopo

- testar consumidores contra tarball local do package;
- migrar Admin `LoadingState`, busca e submissão;
- migrar Student cupom/checkout e decidir StudentLive pela classificação T01;
- migrar loaders elegíveis nas oito superfícies Teacher;
- adicionar reduced motion às exceções locais aprovadas;
- migrar o submit do Landing para o `isLoading` canônico e cobrir visualmente a submissão pendente.
- manter Cupom como controle quando não houver callsite.

## Checklist

- [x] zero keyframe de espera duplicado;
- [x] allowlist contém somente motion de domínio;
- [x] containers preservam status/copy acessível;
- [x] geometria e cores equivalentes;
- [x] focused tests/audits por produto.

## Subtarefas

- [x] Landing: manter `Acessar meus flashcards`, substituir a seta final por Spinner e provar
      geometria estável em 390/1281/2048;
- [x] Admin: migrar loading state, busca e submissão;
- [x] Student: migrar cupom/checkout, chat/live e criar fixture de reserva pendente;
- [x] Teacher: migrar as oito superfícies elegíveis;
- [x] exceções de motion: documentar allowlist e reduced motion.

## Conclusão

Todo spinner de espera vem do package; exceções locais são semânticas, reduzidas e auditáveis.

## Validação focada

- tests das superfícies alteradas;
- build dos três consumidores alterados;
- focused layout em 390/1281 e reduced motion;
- inventário antes/depois anexado a `progress.md`.
