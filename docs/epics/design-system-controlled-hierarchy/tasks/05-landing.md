# T05 — migrar Landing

Status: concluída.

## Responsabilidade

Adotar a API final e classificar os controles promocionais/pedagógicos sem alterar o layout.

## Escopo

- migrar brand/action props e remover override do submit;
- converter media controls específicos para components locais sobre Pressable;
- preservar ActionLink semântica, Hero, Header, sticky e footer;
- ampliar audit para wrappers/descendant overrides da Landing.

## Conclusão

Zero recipe canônico reimplementado e todos os controles especiais possuem owner local explícito.

## Validação focada

- build SSR/prerender;
- `landing` e `trial-access-loading` mais showcases em 390/1281/2048;
- screenshots de header, form e media controls.

## Evidência

- dois ActionLinks brand usam o variant direto e o submit usa o Button brand sem reimplementar
  recipe;
- footer adotou IconButton inverse; quiz, flashcard, áudio, back e translation toggle são controles
  locais sobre Pressable;
- overrides descendentes de altura, padding, fonte e nowrap foram removidos de Hero/Header;
- audit local agora bloqueia props antigas em attrs, recipe em styled wrappers e recipe em
  descendant selectors;
- build client + SSR + prerender passou;
- `validate:ui` passou com 270 cenários em 15 fixtures e nove larguras;
- screenshots em 390/1281/2048 de Hero/header, form loading, showcases, CTA/footer foram
  inspecionados; a inconsistência inicial do contorno inverse foi corrigida no atom e revalidada.
