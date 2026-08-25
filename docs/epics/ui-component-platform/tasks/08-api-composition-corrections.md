# T08 — Correções de API e composição

## Objetivo

Resolver os contracts implícitos ou contraditórios encontrados na investigação.

## Subtasks independentes

- T08.1: combinar/deduplicar `aria-describedby`;
- T08.2: decidir e implementar disabled/invalid ownership de CompoundControl;
- T08.3: modelar SearchInput clear action sem default de idioma;
- T08.4: aplicar AccessibleName/ChoiceOption contracts;
- T08.5: fechar AuthTokenDigits length/focus/keyboard;
- T08.6: remover external spacing de AuthNotice e decidir fonte info;
- T08.7: manter um único owner de `title` no StatusChip.

## Regra de execução

Cada subtask começa com failing unit/story/type test, usa o menor diff e possui commit próprio.
Antes de fechar types, buscar todos os callsites nos cinco products e instalar tarball candidate
quando houver risco de source incompatibility.

## Checks

- focused unit/type/story/a11y
- screenshots do component e composição relevante
- package + SSR smoke
- consumer typecheck/build aplicável

## Done

- contracts não dependem de disciplina silenciosa do consumidor;
- copy localizada permanece no owner;
- nenhum breaking change acidental;
- regressão visual/a11y bloqueada.

## Resultado

- T08.1: `mergeIdRefs` combina consumer + FieldRoot IDs, normaliza whitespace e deduplica sem apagar
  hint/error;
- T08.2: CompoundControl fornece disabled/invalid/size por context interno aos TextInput,
  SelectInput e TextareaInput do package; a story prova que o filho não precisa duplicar estado;
- T08.3: `SearchInputClearAction` modela o contract estrito e todos os callsites novos do catálogo
  fornecem copy explícita; os props v1 e o fallback anterior permanecem compatíveis até major;
- T08.4: `AccessibleName` e `AccessibleChoiceOption` modelam os contracts estritos e runtime tests
  provam custom labels; os props v1 permissivos foram deliberadamente preservados depois da revisão
  SemVer;
- T08.5: `AuthTokenLength` documenta 4/6, os fluxos reais teacher/student usam seis dígitos, e o
  component ganhou ArrowLeft/ArrowRight/Home/End, resize sem ressuscitar dígitos e autofocus
  explicitamente testado; `length: number` permanece no prop v1 até major;
- T08.6: AuthNotice perdeu margem externa, info voltou à fonte herdada e somente conteúdo `<code>`
  usa mono; before/after em 390 confirmou spacing mais consistente;
- T08.7: StatusChip mantém `title` somente no root, usando copy explícita ou texto primitivo como
  fallback para ellipsis;
- cada correção começou com test vermelho e foi commitada isoladamente; a revisão final adicionou
  compat contracts para impedir major silencioso;
- source search nos quatro products não encontrou callsite dos contracts novos com ambos os nomes,
  custom label sem copy ou Search clear sem label; os produtos ainda consomem releases 0.4–0.6 e a
  migração de próxima onda pertence à T12;
- 25 unit files/70 tests, 63 story/axe tests, architecture/lint/format/typecheck, package
  build/SSR e 60 cenários de layout focados passaram;
- bundle passou de 37,69/8,20 kB para 38,84/8,51 kB por context/keyboard helpers de runtime.

## Rollback

Reverter uma subtask por vez; manter re-exports/compat type quando necessário até release major.
