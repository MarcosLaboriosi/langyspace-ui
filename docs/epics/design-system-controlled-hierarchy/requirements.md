# Requisitos

## Hierarquia e dependências

- FR-01: o package organiza código em `foundations`, `primitives`, `atoms` e `molecules`;
- FR-02: uma camada só pode importar a própria camada ou uma camada inferior;
- FR-03: styles privados não podem ser importados por outro componente;
- FR-04: helpers internos sem API pública permanecem internos e não são promovidos para satisfazer
  artificialmente a taxonomia;
- FR-05: os exports públicos continuam disponíveis pelo entrypoint raiz do package;
- FR-06: component IDs existentes permanecem estáveis para SSR/hidratação.

## Foundations

- FR-07: tokens compartilhados possuem nomes semânticos, valores fechados e tipos derivados;
- FR-08: actions, status, focus, motion, spacing, radius e typography comuns não dependem de um
  componente concreto;
- FR-09: produtos podem estender foundations com tokens de domínio sem copiar a foundation inteira;
- FR-10: nenhuma prop pública recebe cor, radius, altura, shadow, keyframe ou CSS livre;
- FR-11: `GlobalStyles` compartilhado pode ser consumido sem substituir regras específicas do
  produto e sem duplicar resets idênticos.

## Actions

- FR-12: `Button` representa ação rotulada e aceita somente `variant`, `size`, `density`,
  `fullWidth`, `iconStart`, `iconEnd`, `isLoading` e props nativas compatíveis;
- FR-13: `ButtonVariant` é uma union fechada com `primary | secondary | tertiary | brand | danger |
success | inverse`; `inverse` cobre a recorrência comprovada de actions sobre superfícies escuras
  e `tone` deixa de existir;
- FR-14: `Button` não aceita `iconOnly` ou `shape`;
- FR-15: `IconButton` é um atom público separado, recebe exatamente um glyph, exige
  `aria-label` ou `aria-labelledby`, e aceita `variant`, `size`, `shape` e `isLoading`;
- FR-16: `IconButtonVariant` usa nomes semânticos
  `neutral | subtle | brand | success | danger | inverse`;
- FR-17: `ActionLink` continua anchor nativo com `href`, sem loading, disabled, icon-only,
  polymorphism ou router;
- FR-18: `ActionLink` usa a mesma taxonomia aplicável de actions sem importar tipos de `Button`;
- FR-19: `Pressable` continua a base de tabs, segmented controls, media controls, cards e outros
  controles de domínio;
- FR-20: loading preserva label e ícone esquerdo e substitui somente o slot direito pelo Spinner;
- FR-21: loading icon-only substitui o glyph pelo Spinner sem perder o nome acessível;
- FR-22: `density="compact"` representa densidade real e não uma coleção arbitrária de overrides;
- FR-23: tamanhos canônicos são 32, 40 e 48 px; diferenças de 42/44 px convergem quando não houver
  requisito funcional documentado.

## Componentes de estado e status

- FR-24: `StatusChip` usa tones semânticos `neutral | info | success | warning | danger | brand`;
- FR-25: nomes de cor locais como `pink`, `green`, `grey`, `amber` e `ink` são mapeados por
  significado no callsite, não mantidos como API pública;
- FR-26: `StatePanel` é a molecule base de `empty | error | loading | partial` e possui
  acessibilidade por estado;
- FR-27: `EmptyState` e `LoadingState` são wrappers pequenos de `StatePanel`, sem recipe paralelo;
- FR-28: `Spinner` permanece decorativo; `StatePanel` ou o container fornece status acessível;
- FR-29: estilo de produto comprovadamente diferente permanece local até existir equivalência
  visual e semântica em pelo menos dois consumidores.

## Fields, filtros e autenticação

- FR-30: atoms de input recebem props nativas e não conhecem `react-hook-form`;
- FR-31: `FieldRoot` possui label, hint, error, ids e `aria-describedby`; adapters de register ficam
  no produto;
- FR-32: `CompoundControl` é dono exclusivo de border, background, radius e focus-within;
- FR-33: `SearchInput` compõe `CompoundControl` e `IconButton` e mantém nome acessível e clear focus;
- FR-34: `FilterPills` e `SegmentedControl` permanecem componentes separados quando seleção múltipla
  e escolha exclusiva tiverem semânticas distintas;
- FR-35: `AuthTokenDigits` possui somente dígitos, foco, paste, backspace e `onTokenChange`;
- FR-36: `AuthTokenDigits` não conhece resend, service, navigation, copy do flow ou Firebase;
- FR-37: `AuthNotice` recebe children e tone semântico e preserva props nativas úteis;
- FR-38: headers, steps e state machines de autenticação continuam explícitos e locais.

## Products e adapters

- FR-39: Landing mantém um boundary local somente se ele acrescentar responsabilidade;
- FR-40: Admin, Student e Teacher usam os nomes canônicos `iconStart` e `iconEnd`;
- FR-41: adapters que apenas renomeiam props ou variants são removidos;
- FR-42: controles pedagógicos/media da Landing deixam de herdar o recipe de `Button` quando
  sobrescrevem sua aparência integral;
- FR-43: o seletor de período do Cupom vira controle segmentado local sobre `Pressable` ou molecule
  compartilhada, não um `Button` reestilizado;
- FR-44: descendant selectors não podem alterar altura, padding, radius ou aparência de um action
  canônico sem exceção exata e documentada;
- FR-45: organisms e páginas continuam locais mesmo quando usam os mesmos atoms.

## Audit e governança

- FR-46: o engine do audit pertence ao package e recebe configuração/allowlist por consumidor;
- FR-47: o audit bloqueia native button ownership, spinner local de espera, motion sem owner,
  import privado, dependency inversion e union canônica copiada;
- FR-48: o audit detecta wrappers ou descendant selectors que sobrescrevem propriedades canônicas
  de actions;
- FR-49: exceções exigem caminho, selector/componente, motivo e owner exatos;
- FR-50: fixtures negativas temporárias provam cada regra e são removidas após o teste;
- FR-51: o audit não substitui unit tests, accessibility checks ou inspeção visual.

## Não funcionais

- NFR-01: React e styled-components permanecem as únicas runtime/peer dependencies necessárias;
- NFR-02: package continua importável e renderizável diretamente em Node/SSR;
- NFR-03: nenhuma migração depende de production data ou rede externa nos testes visuais;
- NFR-04: APIs públicas permanecem pequenas, fechadas e documentadas com exemplos simples;
- NFR-05: não são introduzidos barrels de feature, factories genéricas ou prop forwarding inseguro;
- NFR-06: styled-components mantém component IDs estáveis e imports compatíveis com SSR;
- NFR-07: layouts aprovados permanecem equivalentes em normal, stress e reduced motion;
- NFR-08: trabalho não relacionado nos checkouts originais permanece intacto;
- NFR-09: releases são imutáveis, verificadas por checksum e instaladas com lockfile congelado;
- NFR-10: cada subtask executa focused validation antes do gate completo.

## Edge cases

- label longa em botão não colide com ícones ou Spinner;
- icon-only preserva square geometry em flex/grid apertado;
- `aria-labelledby` continua válido quando o label vive fora do IconButton;
- loading não remove `aria-label`, não permite double submit e não desloca o footer de drawers;
- reduced motion remove animação sem apagar o indicador;
- status longo permanece atômico e fornece valor completo quando truncado intencionalmente;
- empty/loading/error continuam legíveis sem icon, description ou action opcionais;
- field com hint e error combina ambos em `aria-describedby`;
- SearchInput clear devolve foco ao input;
- token paste parcial/completo, backspace e modo controlado/não controlado permanecem funcionais;
- um componente local pode usar tokens compartilhados sem virar export público;
- apps ainda na release anterior continuam funcionando durante a publicação do novo artefato.

## Aceitação

- AC-01: inventory antes/depois prova as duplicações removidas e exceções preservadas;
- AC-02: unit/type tests cobrem todos os contratos públicos e combinações inválidas;
- AC-03: package passa audit, lint, format, typecheck, tests, build, tarball, Node/SSR e layout;
- AC-04: cada consumidor compila contra o mesmo tarball local antes da publicação;
- AC-05: focused tests e layout cases passam para cada superfície migrada;
- AC-06: `validate:ui` completo passa uma vez por package/produto após focused checks;
- AC-07: screenshots de 390, 1281 e 2048 px são inspecionados, além dos boundaries locais afetados;
- AC-08: nenhum override canônico não documentado permanece;
- AC-09: documentação e exemplos refletem a API final, sem aliases de migração;
- AC-10: release pública, frozen installs, commits, CI e produção são provados nos SHAs esperados;
- AC-11: o épico termina com diffs limpos e progress sem próxima task ambígua.
