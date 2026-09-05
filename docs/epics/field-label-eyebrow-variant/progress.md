# Progresso — variante eyebrow para labels de campo

## Estado atual

Implementação e validação local concluídas. A publicação da UI Library e o deploy do Student foram
explicitamente autorizados; o candidate `1.5.1` está em preparação.

## Concluído

- impacto classificado como direto;
- baseline visual anterior e CSS computado foram confirmados;
- consumidores de `FieldRoot` e `ControlledField` foram inventariados;
- mudança global foi rejeitada para preservar Teacher e Admin;
- contrato opt-in, cobertura, riscos e sequência de integração foram revisados.
- `FieldRoot` agora aceita `labelVariant="eyebrow"` sem alterar o default;
- `ControlledField` repassa a variante;
- stories de ambos os componentes cobrem a variante e preservam o nome acessível;
- 5 testes unitários focados, 9 testes Storybook focados, typecheck, build, ESLint e `check:api`
  passaram;
- o snapshot público foi atualizado somente para a nova prop/tipo e declarations afetadas.
- o package smoke e o SSR smoke passaram com o tarball local;
- o cadastro Student consumiu o tarball e aplicou `labelVariant="eyebrow"` em nome, data de
  nascimento, e-mail, CPF e Instagram;
- o teste focado Student passou com 23 testes e o build passou;
- `pnpm run validate:ui` passou na library com 1.014 cenários/113 stories e no Student com 846
  cenários, ambos com zero problemas geométricos;
- as capturas de cadastro em 390, 1281 e 2048 px foram inspecionadas;
- a comparação de CSS computado confirmou igualdade exata do label com o baseline anterior: cor
  `rgb(107, 107, 107)`, 12 px, peso 600, tracking 0,96 px, line-height 18 px, uppercase e gap de
  12 px até o controle.

Visual gate review: passed — variante e cadastro Student aprovados em 390, 1281 e 2048 px, com
equivalência exata do label anterior e zero problemas geométricos.

## Próxima tarefa

T04 — publicar o candidate `1.5.1`, integrar o artefato imutável no Student e comprovar o deploy.

## Bloqueadores

Nenhum.

## Descobertas

- o gap atual de `FieldRoot` é 8 px e o baseline Student tinha 12 px entre label e controle;
- o `PhoneField` Student já mantém o label eyebrow;
- o default atual é consumido por Teacher e Admin e não deve mudar.
- o gate amplo da library registrou um `console.error` intermitente na story preexistente de
  `ActionMenu`, mas concluiu aprovado; testes focados e mudança de fields não dependem dela.
