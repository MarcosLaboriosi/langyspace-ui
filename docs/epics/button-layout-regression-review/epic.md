# Revisão de regressões de layout do sistema de botões

## Problema

O rollout `@langyspace/ui@0.5.0` padronizou a origem dos botões, mas a validação anterior não
protegeu todas as composições reais. No Teacher, o rodapé de presença do `ClassDrawer` passou de
uma linha para duas porque o `PillButton` local de 40 px mudou de 14 px/16 px horizontal para o
recipe `md` de 16 px/20 px. O audit registrou a rota `/`, mas permaneceu no loading e nunca abriu o
drawer. No Admin, uma compensação responsiva permite que labels de ação quebrem dentro do botão,
produzindo alturas diferentes no mesmo grupo.

## Objetivo

Corrigir as regressões e fechar o gap de cobertura sem desfazer o design system. O contrato deve
expressar densidade comprovada como uma variação semântica limitada; os produtos devem ser donos da
composição responsiva de grupos de ação; labels de comando devem permanecer atômicas.

## Impacto visual

`direct` — métricas e composição de botões em drawers e grupos de ação do Teacher e Admin mudam. Os
demais três produtos entram como controles de regressão porque consomem o mesmo recipe.

### Superfícies e estados

- Teacher: `/` e `/calendario`, `ClassDrawer`, presença, falta, remarcação e confirmação de falta;
- Admin: `/professoras`, ação de aula experimental, drawers com duas e com três ou mais ações;
- Student: `/pagamento`, checkout e edição de perfil como controles do recipe regular;
- Landing: CTA, exemplos, quiz e shadowing como controles de `Button` e `Pressable`;
- Cupom: seletor de período pressed/unpressed;
- estados: normal, disabled, loading, label longa, icon start e grupos densos;
- larguras: 390, 576/720 quando a composição muda, 1281 e 2048 px.

## Regras de decisão

1. Diferença recorrente e legítima do mesmo comando vira prop restrita no `Button`.
2. Composição responsiva pertence ao container local, não a props de geometria do botão.
3. Diferença histórica sem função é removida em favor do recipe canônico.
4. Controle de domínio continua componente próprio sobre `Pressable`.

## Escopo

- adicionar uma densidade compacta comprovada ao `Button`, sem altura/padding livres;
- impedir quebra interna acidental de labels de ação;
- restaurar o rodapé de presença do Teacher e criar fixture síncrona que realmente abre o drawer;
- substituir wrap interno por composição responsiva explícita nos grupos problemáticos do Admin;
- reexecutar e inspecionar os gates dos cinco produtos;
- preparar release corretivo, integração e produção somente após os gates.

## Fora de escopo

- alterar fluxos, copy, regras de negócio, Firebase, Functions ou dados;
- reduzir globalmente o recipe regular usado pelo Student;
- criar props livres de height, padding, font-size, radius ou `css`;
- redesenhar controles específicos que não exibem evidência de regressão.

## Critérios de sucesso

- as três ações do rodapé de presença do Teacher formam uma linha no drawer largo e uma pilha
  deliberada no mobile, sem linha órfã;
- nenhuma label de ação auditada quebra dentro do botão;
- o grupo de ações da professora no Admin usa uma composição uniforme em 390 px;
- o design mock do Teacher entrega estado pronto sem rede e o audit abre o `ClassDrawer`;
- os recipes regulares do Student, Landing e Cupom permanecem visualmente equivalentes;
- package tests/SSR/build e `validate:ui` dos produtos afetados passam;
- screenshots 390/1281/2048 e os boundaries 576/720 são inspecionados;
- mudanças não relacionadas nos worktrees originais permanecem intactas.
