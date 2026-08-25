# Decisões de componentes de estado

## Promovidos na T10

| Componente   | Camada   | Contrato compartilhado                                                                 |
| ------------ | -------- | -------------------------------------------------------------------------------------- |
| StatusChip   | atom     | tone semântico, dois sizes, indicator e iconStart decorativos, native span props       |
| StatePanel   | molecule | empty/error/loading/partial, acessibilidade por estado e conteúdo opcional             |
| EmptyState   | molecule | wrapper de StatePanel que fixa somente `state="empty"`                                 |
| LoadingState | molecule | wrapper de StatePanel que fixa Spinner decorativo e o contrato acessível de carregando |

Admin foi a referência visual porque já possuía tones semânticos e a composição completa. Os
tokens foram internalizados no package para não exigir ThemeProvider do consumidor. O label do
StatusChip é o único owner de ellipsis: indicator e icon não encolhem, e o texto completo permanece
no DOM.

## Rejeitados nesta promoção

| Candidato                                       | Decisão        | Motivo                                                                           |
| ----------------------------------------------- | -------------- | -------------------------------------------------------------------------------- |
| StatusChipSkeleton do perfil Student            | manter local   | skeleton representa carregamento e largura simulada, não um status semântico     |
| LoadingState inline de NotificationDrawer       | manter local   | estado compacto dentro de uma lista; não possui equivalência com painel bordered |
| banners de BillingWorkspace                     | manter local   | anúncio contextual de bloco, não chip atômico                                    |
| copy, retry handlers e regras de status         | manter produto | business meaning continua no callsite; package não conhece domínio               |
| organisms, drawers, cards e grids de resultados | manter produto | estrutura, densidade e fluxo pertencem às surfaces dos portais                   |

A T11 decide a adoção por callsite. Nenhum estilo local será removido quando a comparação visual e
semântica não provar equivalência.
