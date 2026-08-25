# Revisão crítica do plano

## Product

### Objeção

O plano poderia gastar muito tempo em tooling sem entregar components novos.

### Resolução

T03 é uma spike com go/no-go e T04–T06 migram valor existente. T12 usa a plataforma em uma family
piloto, mas não cria quota artificial. O ganho de produto é reduzir regressão e tempo de decisão nos
próximos components.

## Tech lead

### Objeção

Manifesto, stories, README e entrypoint podem virar quatro fontes de verdade.

### Resolução

O entrypoint continua a API. O manifesto guarda apenas quality metadata e é comparado ao entrypoint.
Stories demonstram estados e README fica limitado a installation/arquitetura/usage. Smokes validam a
surface; não cadastram components silenciosamente.

## Senior React engineering

### Objeção

Padronizar `forwardRef` por aparência de clean code pode quebrar typings ou styled extension.

### Resolução

O plano substituiu refactor por spike React 19 + styled-components + declarations + SSR + consumer.
Manter dois patterns documentados é aceitável se a compatibilidade justificar.

### Objeção

Separar cada wrapper em uma suite pode gerar muitos testes cerimoniais.

### Resolução

Wrappers recebem contract tests pequenos de defaults/export/markup e a matriz fica no owner base.
Ownership 1:1 não significa duplicar a implementation suite.

## Design system architecture

### Objeção

Atomic Design pode incentivar mover qualquer duplicação para o package.

### Resolução

R16/R29/R30 exigem semântica, reuso, API reduction e evidence. Organisms/flows permanecem locais e
T12 pode terminar sem export nova.

### Objeção

Renomear também todos os `index.tsx` para `Button.tsx` tornaria busca mais explícita.

### Resolução

Rejeitado nesta fase. O diretório já nomeia o source, imports `./Button` continuam simples e o
benefício seria principalmente cosmético. Testes/stories precisam do nome porque aparecem soltos em
reports e discovery.

## QA

### Objeção

Story render e axe não detectam regressão geométrica; remover o showcase cedo perderia o gate que já
encontrou bugs reais.

### Resolução

T06 roda runners antigo/novo em paralelo e remove o showcase somente com paridade das assertions e
36 scenarios. Screenshots continuam com inspeção manual.

### Objeção

Coverage percentage pode premiar tests superficiais.

### Resolução

T10 mede primeiro, separa critical contract coverage e só então propõe thresholds graduais. O
manifesto cobra presença; behavior matrix cobra qualidade.

## UX/UI

### Objeção

Normalizar os styles suspeitos pode apagar diferenças legítimas de density e context.

### Resolução

T09 exige before/after stories e callsite evidence. Literais não viram automaticamente tokens e
divergências não convergem sem reason. Segmented wrapping permanece uma decisão aberta para teste
em narrow containers.

## Accessibility

### Objeção

XOR de accessible name pode ser type purity sem melhoria real; `aria-label` e `aria-labelledby`
juntos ainda funcionam no browser.

### Resolução

O objetivo é reduzir ambiguity e manter uma fonte autoritativa. A correção de maior impacto é
separada: `aria-describedby` cumulativo recebe failing behavior test e prioridade alta.

### Objeção

Clonar children para propagar disabled pode alterar refs/handlers.

### Resolução

O plano proíbe clone genérico como default e obriga comparar context versus slots tipados.

## Performance

### Objeção

Storybook e addons podem tornar install e CI mais lentos; entrypoint único pode prejudicar
tree-shaking.

### Resolução

T03 mede tempo e separa artifact; T10 mede consumers reais antes de propor subpath exports. O tarball
e runtime graph não incluem tooling.

## Security/privacy

### Objeção

Publicar Pages em repo público pode expor fixtures, copy ou dados internos.

### Resolução

Stories usam somente dados sintéticos, bloqueiam rede e passam review de artifact. Pages é task
operacional separada; artifact de CI é fallback.

## Operations/release

### Objeção

Um épico de tooling não deveria forçar release/deploy dos cinco products.

### Resolução

Catalog/test renames não alteram package version. Package minor e product deploy só acontecem se
T08/T09/T12 mudarem runtime/API. Cada surface alterada recebe sua própria prova.

## Simplificações aplicadas depois da revisão

- Storybook virou spike antes da migração completa;
- Chromatic saiu do critical path;
- `index.tsx` permanece como convenção de source;
- manifesto foi limitado a metadata de quality, fora do runtime;
- AST ficou seletiva, não rewrite total;
- coverage e bundle thresholds exigem baseline antes de bloquear;
- showcase só é removido no fim da migração do runner;
- candidate pilot ficou limitado a uma family e aceita no-go;
- release/deploy ficaram condicionados a runtime change.

## Veredito da revisão

Plano aprovado para execução incremental. A próxima unidade segura é T01: baseline e component
manifest, sem runtime ou impacto visual.
