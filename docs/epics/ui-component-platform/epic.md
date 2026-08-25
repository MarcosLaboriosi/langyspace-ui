# Épico: plataforma de componentes da Langyspace UI

## Contexto

O rollout `design-system-controlled-hierarchy` colocou `@langyspace/ui@1.0.0` em produção nos
cinco produtos e comprovou a primeira hierarquia de foundations, primitives, atoms e molecules.
Essa etapa resolveu a fragmentação inicial de botões e promoveu 19 exports de componentes, mas a
biblioteca ainda opera como um pacote pequeno: um showcase de 457 linhas, onze suites com nome
`index.test.tsx`, cobertura agrupada de componentes diferentes e scripts de qualidade que precisam
conhecer manualmente cada selector.

O próximo salto não é adicionar muitos componentes. É criar uma plataforma em que adicionar,
entender, revisar e remover um componente seja previsível. A hierarquia deve continuar controlada,
os callsites dos produtos devem permanecer simples e cada variação pública precisa ter evidência
visual, comportamental e de acessibilidade.

## Problema

Hoje a biblioteca possui bons contratos locais, mas não uma unidade de ownership repetível por
componente:

- não existe story isolada nem documentação executável por componente;
- testes como `FieldRoot/index.test.tsx` cobrem seis componentes, dificultando descobrir o owner de
  uma falha e enxergar lacunas de cobertura;
- `Showcase.tsx` e `audit-layout.mjs` crescem por edição central e seletores hard-coded;
- fundamentos compartilhados de fields, choices e accessible names estão em camadas acima ou
  repetidos;
- alguns contratos de composição estão implícitos, como a combinação de `aria-describedby`, a
  propagação de `disabled` em `CompoundControl` e o limite válido de `AuthTokenDigits`;
- os smokes de pacote/SSR não renderizam todos os exports públicos;
- o README de 425 linhas, o showcase e os smokes repetem inventários manuais que podem divergir;
- não existe um critério versionado de maturidade e promoção para a próxima leva de componentes.

## Objetivo

Transformar a Langyspace UI em uma plataforma de componentes escalável, com uma unidade canônica
por componente e uma trilha simples de implementação:

```text
foundation -> primitive -> atom -> molecule -> composition de produto
                    |          |          |
                    +---- story + test + contract + audit ----+
```

O resultado deve permitir que um engenheiro descubra a API, estados, restrições, exemplos e
evidências de um componente sem abrir um app consumidor ou um arquivo central enorme.

## Resultado esperado

- Storybook React/Vite no próprio repositório, com stories co-localizadas e build estático;
- cada componente público com story, teste nomeado, owner, estados e contrato acessível explícitos;
- nomes semânticos como `Button.test.tsx`, sem alterar a convenção enxuta de source
  `index.tsx`/`styles.ts`/`types.ts`;
- showcase atual mantido apenas como oracle temporário e removido quando houver paridade comprovada;
- layout/a11y/interaction audits dirigidos por stories ou metadata, sem cadastro duplicado por
  selector em vários scripts;
- foundations de fields, choices, accessible names, focus e motion no layer correto;
- tokens suficientes para expressar recipes compartilhados sem liberar valores cosméticos livres;
- package e SSR smokes gerados/validados contra um manifesto público único;
- processo de promoção baseado em evidência de uso nos produtos, não em uma lista aspiracional;
- catálogo visual publicável e verificável pelo time antes de cada release.

## Princípios de produto e engenharia

1. Implementação simples no consumidor é a principal medida de sucesso.
2. Uma diferença visual só vira prop quando representa uma variação semântica reutilizável.
3. Componentes específicos de fluxo ou domínio permanecem nos produtos sobre primitives.
4. Diferenças cosméticas sem valor convergem para o recipe do design system.
5. Atomic Design orienta ownership e dependências; não justifica wrappers vazios.
6. Stories documentam estados; testes provam contratos; screenshots provam geometria. Nenhuma
   dessas evidências substitui as outras.
7. Acessibilidade e reduced motion fazem parte da API, não são uma etapa final.
8. Todo componente público deve ser renderizável isoladamente, em SSR e por um consumidor real.
9. O pacote não importa regras, copy, router, Firebase ou estado de domínio dos produtos.
10. Uma abstração pode ser removida quando simplifica ownership e não reduz reutilização real.

## Impacto visual

`direct`. A execução futura altera a forma de visualizar e testar todos os componentes e inclui
correções de recipes e contratos. Cada task com impacto visual deve cobrir estado normal, stress,
focus-visible, disabled/loading quando aplicável, reduced motion, 390/1281/2048 e os boundaries
específicos do componente.

## Escopo

- convenções de arquivo, teste, story e metadata;
- Storybook, docs, controls, a11y e interaction tests;
- decomposição do showcase e do audit de layout;
- auditoria de API/composição das foundations, primitives, atoms e molecules atuais;
- correções pequenas comprovadas pela investigação;
- tokens e recipes necessários aos componentes existentes;
- qualidade de pacote, SSR, API surface, release e catálogo;
- modelo de maturidade e pipeline para novos componentes;
- inventário da próxima onda nos cinco produtos, executado somente depois da plataforma base.

## Fora de escopo

- promover organisms, pages, auth flows ou componentes acoplados a Firebase/router;
- redesenhar a identidade visual ou criar theming livre;
- aceitar props de cor, radius, padding ou dimensão arbitrária;
- trocar styled-components;
- mover automaticamente toda duplicação dos produtos para o package;
- refatorar ref/forwardRef sem prova de compatibilidade React 19 + styled-components + consumers;
- contratar Chromatic ou outro SaaS como requisito inicial;
- publicar pacote, ativar GitHub Pages ou fazer deploy durante a fase de planejamento.

## Métricas de sucesso

| Medida                               | Baseline           | Meta                                              |
| ------------------------------------ | ------------------ | ------------------------------------------------- |
| Components públicos                  | 19                 | 100% em manifesto, story, teste e smoke           |
| Stories                              | 0                  | pelo menos uma por estado/variação pública válida |
| Suites                               | 11 agrupadas       | ownership 1:1 e nomes semânticos                  |
| Setup repetido nas suites            | 11 arquivos        | um setup central                                  |
| Showcase central                     | 457 linhas         | removido após paridade                            |
| Layout audit central                 | 422 linhas         | runner genérico + assertions pequenas             |
| Componentes omitidos dos dois smokes | 3 confirmados      | zero                                              |
| Contratos a11y automáticos por story | inexistentes       | blocking para todos os components aplicáveis      |
| Visual baseline comparável           | screenshots ad hoc | estados isolados e artifacts determinísticos      |
| Gate para promoção                   | implícito          | checklist/maturity score versionado               |

## Dependências

- `@langyspace/ui@1.0.0` e o épico anterior permanecem a baseline funcional;
- Storybook deve usar o builder React/Vite e coexistir com Vitest 4, Vite 8 e React 19;
- a estratégia de publicação do catálogo depende de confirmar GitHub Pages no repositório
  público; até lá, o artifact estático de CI é o fallback aprovado;
- mudanças de API breaking exigem épico/release major separado; este épico prioriza correções
  aditivas ou internas.

## Critério de conclusão

O épico termina quando a biblioteca puder adicionar um novo component sem editar inventários
paralelos, quando cada export atual tiver evidência isolada e quando o catálogo estático e todos os
gates passarem no mesmo commit candidato. O rollout em produtos só ocorre para mudanças de runtime
necessárias e deve usar tarball imutável, gates locais e prova dos bundles servidos.
