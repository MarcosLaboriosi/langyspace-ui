# Composição atômica do ecossistema de ações

## Problema

O `@langyspace/ui` centraliza `Button` e `Pressable`, mas a composição de loading e de links com
aparência de botão ainda está fragmentada. O spinner é uma implementação interna de `Icon`, enquanto
Admin, Student e Teacher mantêm 14 arquivos com animações locais de rotação. A maioria não replica a
política de `prefers-reduced-motion` do package. Links de ação do Landing, Student e Teacher também
repetem partes do recipe de botão. Os audits atuais bloqueiam somente `<button>` e `styled.button`
nativos, portanto aprovam essas duplicações.

## Objetivo

Criar atoms pequenos e semânticos para loading e links de ação, reduzir adapters históricos e
fortalecer os audits, preservando o visual aprovado e o uso de styled-components. O resultado deve
ser simples de compor, sem transformar `Button` em um componente polimórfico ou prop-heavy.

## Impacto visual

`direct` — a implementação futura substituirá spinners, recipes de links e alguns adapters em
estados visíveis de loading, foco, hover, disabled e reduced motion.

### Superfícies e estados

- package: showcase de `Button`, `Spinner`, `ActionLink`, ícones e loading;
- Landing: submit do `TrialLessonForm`, CTAs de English Classes, Final CTA, sticky mobile e 404;
- Admin: `LoadingState`, busca global e submissões do portal;
- Student: cupom, checkout, live chat, auth e links pós-pagamento;
- Teacher: Today, Students, Payouts, notificações, drawers do calendário e `ClassDrawer`;
- Cupom: controle de regressão do `Button`, sem abstração nova sem uso comprovado;
- estados: normal, hover, focus-visible, loading, disabled, reduced motion, ícone inicial/final,
  label longa, link interno e link externo;
- larguras: 390 px, boundaries de 640/720/900 px, 1281 px e 2048 px.

## Princípios de decisão

1. Uma diferença legítima e recorrente do mesmo atom vira prop fechada, nunca valor CSS livre.
2. Semântica diferente vira componente diferente: link de ação não é prop polimórfica de `Button`.
3. Controle específico de produto continua local sobre `Pressable`.
4. Recipe, motion e acessibilidade comuns pertencem ao package.
5. Compatibilidade histórica só permanece quando protege callsites reais e tem plano de retirada.
6. Atomic design organiza responsabilidades; não autoriza criar wrappers sem comportamento próprio.

## Escopo

- criar `Spinner` público, decorativo e reutilizável, com current color e reduced motion;
- separar loading de `Icon` e compor `Button` com `Icon + Spinner`;
- migrar spinners locais que representam espera, mantendo animações de domínio explicitamente
  justificadas;
- criar `ActionLink` nativo para links visualmente canônicos, compartilhando o recipe de ação;
- migrar somente links comprovadamente equivalentes ao botão e retirar o caminho duplicado do
  `PillButton`;
- derivar tipos de adapters a partir do contrato compartilhado e reduzir aliases de cor/aparência;
- ampliar audits para impedir reintrodução de spinner, recipe e imports paralelos;
- validar, publicar versão imutável, atualizar os cinco produtos e provar produção.

## Fora de escopo

- adicionar `as`, `asChild`, polymorphism genérico ou dependência de React Router ao package;
- criar `ActionGroup`, loader de página, skeleton ou componente universal de estado;
- substituir animações de áudio, gravação ou live que não representam espera de rede;
- redesenhar CTAs, alterar copy, navegação, Firebase, Functions ou regras de negócio;
- mover componentes de domínio para o package apenas porque dois produtos têm nomes parecidos;
- criar props livres de tamanho, cor, duração, border, radius ou keyframes.

## Jornada esperada

1. Um produto usa `Button isLoading` e recebe label preservada, busy/disabled e o Spinner canônico
   sempre no slot direito.
2. Um estado de espera fora de botão compõe `Spinner` com um container que fornece status e copy.
3. Um CTA baseado em `href` usa `ActionLink`, sem fingir ser `<button>` e sem repetir o recipe.
4. Tabs, rows, cards e controles de domínio continuam sobre `Pressable` local.
5. O audit bloqueia uma nova implementação paralela antes do merge.

## Critérios de sucesso

- `Spinner` tem pasta, componente, styles, types, testes e export público próprios;
- `Icon` não conhece `isLoading`; `Button` mantém label/accessible name, preserva o ícone esquerdo e
  substitui o ícone direito pelo indicador;
- zero spinner local de espera permanece fora do package; exceções de domínio têm allowlist e
  reduced motion;
- `ActionLink` cobre os links canônicos comprovados sem polymorphism e sem dependência de router;
- `PillButton` deixa de manter um recipe completo separado para `<a>`;
- adapters locais derivam tipos compartilhados e usam nomes semânticos quando migrados;
- os audits dos cinco produtos detectam as classes de duplicação descritas no épico;
- package SSR/prerender smoke e todos os `validate:ui` afetados passam;
- screenshots representativas confirmam equivalência visual e estados de motion/foco;
- release, mains e cinco produções usam o mesmo artefato imutável sem tocar trabalho alheio.
