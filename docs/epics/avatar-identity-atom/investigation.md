# Investigação

## Método

O inventário usou somente os cinco `origin/main` montados em worktrees limpos. Nomes iguais foram
apenas ponto de partida; a decisão comparou imports runtime, JSX, types, markup, styled recipes,
semântica, state, assets e dependências.

Arquivos gerados, tests e declarations não contaram como callsite runtime. `DesignSystemAudit` do
Admin conta como consumer visual porque faz parte do gate versionado, embora não seja rota de
produção.

## Contagem

| Product | Avatar files | Runtime imports | Runtime JSX | Situação |
| ------- | -----------: | --------------: | ----------: | -------- |
| Landing |            0 |               0 |           0 | ausente  |
| Admin   |            4 |               3 |          10 | ativo    |
| Student |            3 |               0 |           0 | morto    |
| Teacher |            4 |               7 |           9 | ativo    |
| Cupom   |            0 |               0 |           0 | ausente  |

Além dos 99 lines do diretório Avatar Teacher, a inspeção do drawer encontrou um recipe
`ProfileAvatar` de 52 px no próprio `styles.ts`. Ele não aparecia na busca por nome de component e
foi reclassificado como o nono callsite visual da mesma family.

## Contratos atuais

### Admin

- root `span`;
- `initials`, `imageUrl?`, `size=md`, `tone=neutral`;
- sizes `xs | sm | md | lg` em 24/36/40/56 px;
- tones `neutral | brand | inverse`;
- `aria-hidden=true` por default;
- failed URL guard recupera automaticamente quando a URL muda;
- local test cobre quatro sizes/tones e image fallback.

### Teacher

- root `div`;
- `initials`, `imageUrl?`, `size=md`, `tone=muted`;
- sizes `sm | md | lg | xl` em 30/38/52/60 px;
- tones `accent | muted`;
- image failure usa boolean + effect de reset;
- sem owner test do Avatar.

### Student

- cópia anterior do Teacher sem image support;
- zero import runtime;
- sizes/tone iguais ao Teacher;
- remover é mais simples que promover ou instalar package.

## Callsites ativos

### Admin — 10

- account footer inverse no shell;
- três resultados na busca global;
- identity do drawer de cobrança;
- aluno e professora na tabela de cobranças;
- identity do drawer de assinatura;
- aluno na tabela de assinaturas;
- amostra brand no DesignSystemAudit.

### Teacher — 9

- avatar de professora no sidebar;
- avatar compacto e avatar expandido no mobile header;
- aluno em ClassRow;
- aluno em Hoje;
- aluno em Alunos;
- identity `lg` no overview do ClassDrawer;
- identity `xl` no perfil do ClassDrawer.
- identity `lg` artesanal no StudentProfileDrawer.

Todos possuem texto de identidade adjacente ou um botão externo com accessible name. O círculo é
decorativo; não deve repetir o nome para screen readers.

## Diferenças classificadas

| Diferença                   | Classificação             | Decisão                   |
| --------------------------- | ------------------------- | ------------------------- |
| `span` versus `div`         | acidente                  | `span` inline canônico    |
| `neutral` versus `muted`    | mesmo significado         | `neutral`                 |
| `brand` versus `accent`     | mesmo significado         | `brand`                   |
| `inverse` somente Admin     | variação semântica válida | manter prop               |
| `xl` somente Teacher        | tamanho semântico válido  | manter prop               |
| 30/32/36 px em `sm`         | variação cosmética        | convergir 32 px           |
| 38/40 px em `md`            | variação cosmética        | convergir 40 px           |
| 52/56 px em `lg`            | variação cosmética        | convergir 56 px           |
| 60/64 px em `xl`            | escala incompleta         | convergir 64 px           |
| boolean + effect de erro    | complexidade evitável     | failed URL guard          |
| decorative default só Admin | gap de a11y               | tornar default da library |

## Candidates rejeitados

### ToastViewport

O shell visual é quase idêntico, mas Teacher possui `notification`, title, actionPath, actionLabel e
select versus dismiss. Os props dependem diretamente de `useTeacherStore`/`useStudentStore`. Antes
de promover seria necessário desenhar um toast data contract, ownership de queue/timers e motion;
isso é um épico de feedback, não o segundo atom.

### PhoneField

Os sources divergem em paste/cursor preservation, errors, disabled behavior e tipos `PhoneCountry`
importados de cada product. A promoção exigiria mover formatters e catálogo de países, ampliando
escopo para uma molecule de domínio auth/profile.

### SearchField e FilterToolbar

Somente Teacher usa essas cópias. Student mantém source morto. A library já expõe `SearchInput`; a
próxima decisão correta é um cleanup/convergência no Teacher, não uma export nova sem dois
consumers.

### Logos, auth shells e Feature

Embora Student/Teacher compartilhem nomes, assets, copy, route lifecycle e product identity são
owners reais. Continuam compositions/organisms locais.

### VerticalLogo, List, Item e Chip

Zero imports runtime nos products onde os diretórios existem. Devem ser removidos em cleanups
locais; dead code não passa o maturity gate.

## Acessibilidade

- Avatar não é uma imagem informativa nos callsites atuais; o nome já existe ao lado;
- `aria-hidden=true` no root remove iniciais e imagem decorativa da árvore;
- `alt=""` evita nome acessível duplicado se o root for desocultado sem ajuste;
- interatividade/focus permanecem no Button externo;
- circle/background não são a única fonte de status ou decisão.

## Visual baseline necessária

As mudanças geométricas são pequenas, mas afetam densidade. A baseline deve capturar:

- Admin account footer, busca global, cobrança table/drawer e assinatura table/drawer;
- Teacher sidebar/mobile header, Today rows, Students list e ClassDrawer;
- 390/1281/2048, mais a matriz completa existente no gate final;
- initials 1/2/3 chars, nome longo adjacente, photo success e fallback.

## Conclusão

Avatar passa o maturity gate porque reduz source e vocabulário, mantém uma responsabilidade nativa
estável e deixa consumers mais simples. A promoção é condicionada à prova visual; se 32/40/56/64
quebrar uma composição, a correção deve ocorrer no recipe canônico ou no layout externo — não por
um alias legado por produto.
