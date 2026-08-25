# Cobertura visual

## Riscos transversais

- labels longas, nomes completos, emails/URLs/tokens sem quebra e status atômicos;
- normal, hover, active, focus-visible, disabled, loading e reduced motion;
- actions com zero, um e dois ícones; icon-only com aria-label e aria-labelledby;
- flex/grid apertado, footers com três ações e grupos com densidade máxima;
- empty, loading, error e partial com/sem description/action;
- fields vazio/focused/filled/error e compound control sem double surface;
- auth token vazio, parcial, completo, paste e error;
- filtros com counts, disabled, scroll/wrap e seleção exclusiva;
- mobile 390, boundaries locais, 1280/1281 e desktop 2048.

## Package

Cobertura existente: Button, ActionLink, Spinner, stress e reduced motion em nove larguras.

Adicionar:

- matrix de IconButton variants/sizes/shapes/loading/accessibility;
- Button/ActionLink variant brand/inverse e ausência de props removidas;
- computed geometry 32/40/48 e no layout shift durante loading;
- StatusChip e StatePanel cobertos em todos os tones/states, conteúdo opcional e stress; Auth,
  Field e Filter entram quando a T12 confirmar cada promoção;
- type fixtures negativas e Node/SSR render das novas camadas.

## Landing

Cobertura existente: `landing`, `trial-access-loading`, coupon states e stress em nove larguras.

Adicionar/estender:

- interação/focus de Hero CTA e footer IconButton;
- controles das três showcases, audio playing e translation pressed;
- assertions de variant canônico e ausência de override visual;
- capturas 390/1281/2048; 768/1280 para Hero/header/sticky.

## Admin

Cobertura existente: login, leads/alunos normal/empty/error/extreme/loading, global search, enrollment,
drawers e design-system audit em 390, 768, 920/921, 1024, 1200, 1280/1281 e desktops.

Adicionar/estender:

- IconButton sm/rounded/subtle/danger/loading na design-system fixture;
- GuidedWorkSessionPanel após convergir xs para sm;
- Leads menu/footer sem descendant recipe e action height canônico;
- component candidates de state/field/filter em empty/focused/filled/error;
- capturas 390/1281/2048; 620/640/1280 para leads/drawers.

## Student

Cobertura existente: login/cadastro, home, aulas, lições, vocabulário, planos, pagamento, perfil,
live-reserve-loading, checkout e handoff em nove larguras.

Adicionar/estender:

- deterministic auth token/error step, não apenas shell de login/cadastro;
- inverse action na home e IconButton brand/success;
- StatusChip/state mappings quando adotados;
- auth paste/focus em component tests;
- capturas 390/1281/2048; 768/1280 para home/plans/payment.

## Teacher

Cobertura existente: login/cadastro, Today, attendance drawer, calendário, materiais, Students,
Payouts e public availability em nove larguras.

Adicionar/estender:

- deterministic auth token/error step;
- IconButton brand/success and rounded usage;
- StatusChip/state semantic mapping;
- Students/Payouts standalone loading after StatePanel adoption;
- preserve attendance action group geometry at 390/1281/2048;
- 720/900/1280 para drawers/calendário quando aplicável.

## Cupom

Cobertura existente: relatório normal/stress e redirect fallbacks em nove larguras.

Adicionar:

- clicar cada opção de período e validar exatamente um `aria-pressed=true`;
- keyboard focus-visible e atomic labels `7d/30d/90d`;
- capturas 390/1281/2048 e 768/1280 para o header do relatório.

## Segurança das fixtures

- usar somente design mocks e report IDs sanitizados versionados;
- bloquear requests externos no browser;
- não ler ou escrever Firebase/Functions/produção;
- não capturar secrets, tokens reais ou dados pessoais.
