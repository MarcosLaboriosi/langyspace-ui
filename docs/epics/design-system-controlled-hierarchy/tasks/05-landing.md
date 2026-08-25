# T05 — migrar Landing

Status: em andamento.

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
