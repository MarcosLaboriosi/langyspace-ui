# T13 — adotar auth, field e filter components

Status: concluída.

## Responsabilidade

Migrar duplicações comprovadas preservando state machines e adapters de formulário nos produtos.

## Escopo

- Student/Teacher AuthNotice e AuthTokenDigits;
- Admin field/compound/search where equivalent;
- filter/segmented consumers nos três portais e Cupom;
- retirar arquivos duplicados somente após zero imports.

## Conclusão

Flows continuam explícitos e locais, enquanto comportamento visual/interativo está centralizado.

## Resultado

- Student e Teacher importam `AuthNotice` e `AuthTokenDigits` diretamente do package; as máquinas
  de estado de login/cadastro, resend, Firebase e navegação continuam nos produtos;
- o Admin removeu os componentes locais de field, compound, search, filter e segmented e manteve
  `FilterSelect` somente como composição de domínio sobre `CompoundControl`;
- o Cupom substituiu `RangeSelector` local por `SegmentedControl` com valores numéricos, surface
  inverse e shape pill;
- o `ChoiceValue` público aceita `string | number`, sem casts ou tipos de domínio dentro do package;
- o `FilterPills` responsivo do Teacher foi preservado localmente porque distribui itens por
  breakpoint e ainda não existe contrato repetido para essa decisão;
- fixtures determinísticas `login-token` validam o OTP compartilhado nos dois portais sem rede.

## Validação focada

- auth and form focused tests;
- login/register/search/filter states em mobile/dense/wide;
- builds e accessibility checks aplicáveis.

## Evidência

- package: 46 testes, audit de 67 arquivos, lint, format, typecheck, build, tarball/Node/SSR smoke e
  36 cenários de layout em nove larguras;
- Admin: 236 testes, lint, build, 13 fluxos WCAG, 45 cenários do design system e 1.820 cenários de
  layout em dois lotes determinísticos após o processo único atingir somente o timeout de 15 min;
- Student: testes focados de login/cadastro, caso OTP isolado, build e 648 cenários de layout;
- Teacher: testes focados de login/cadastro, build e 252 cenários de layout;
- Cupom: 15 testes, build e 36 cenários de layout;
- capturas de auth, fields, filters e range foram inspecionadas em 390/1281/2048 sem overflow,
  corte, alteração de geometria ou perda de hierarquia.
