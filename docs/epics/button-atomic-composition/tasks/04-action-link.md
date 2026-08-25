# T04 — criar ActionLink e recipe compartilhado

Status: concluída.

## Responsabilidade

Oferecer um anchor canônico sem tornar Button polimórfico.

## Escopo

- extrair recipe privado compartilhado por Button e ActionLink;
- inventariar links com aparência canônica e separar CTAs deliberadamente específicos;
- criar pasta, componente, styles, types e testes de ActionLink;
- exigir href e preservar native anchor props, className e ref;
- suportar somente ícones, size, density, shape, tone, variant e full width comprovados;
- manter loading, disabled, icon-only, router e polymorphism fora do v1;
- documentar links apropriados e exceções.

## Checklist

- [x] Button permanece visual/semanticamente equivalente;
- [x] ActionLink renderiza `<a>` e exige href;
- [x] recipe não cria dependência circular;
- [x] type tests rejeitam props fora de escopo;
- [x] SSR/prerender e styled composition passam.

## Conclusão

Button e ActionLink compartilham recipe, mas mantêm semântica e APIs distintas.

## Validação focada

- unit/type tests de Button e ActionLink;
- package lint/build/test/package smoke;
- layout normal/stress de variantes e labels longas.
