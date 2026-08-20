# Shared UI Button v1

## Problem

Os cinco produtos Langy.space mantêm botões React semelhantes em repositórios separados:

- `langyspace`;
- `langyspace-admin`;
- `langyspace-student`;
- `langyspace-teacher`;
- `langyspace-cupom`.

Isso duplica contrato, acessibilidade, loading e estilos básicos. Uma correção pequena precisa ser
repetida e pode divergir entre produtos. Ao mesmo tempo, uma biblioteca ampla ou um componente com
muitas flags criaria uma nova fonte de complexidade antes de existir uso comprovado.

## Objective

Entregar a infraestrutura mínima de uma biblioteca React compartilhada e uma primeira versão de
`Button`, publicá-la automaticamente como release versionada no GitHub, instalar a mesma versão nos
cinco produtos e levar uma integração segura de cada produto a produção.

## Product decision

O v1 contém um componente e um contrato estreito:

```tsx
<Button variant="primary">Continuar</Button>
<Button variant="secondary">Cancelar</Button>
<Button variant="tertiary">Agora não</Button>
```

Os únicos eixos adicionais são tamanho, largura total, um ícone opcional com posição e loading.
Esses eixos já existem em mais de um produto e evitam wrappers locais apenas para comportamento
básico. Variações destrutivas, brand tones, icon-only e polymorphism ficam locais até haver evidência
de reutilização em pelo menos dois produtos.

### Composition refinement — 2026-08-20

Diferenças sutis de altura, tipografia, raio ou tom neutro não criam novas variantes e não devem ser
reaplicadas por consumidores. `variant` e `size` são a fonte única da aparência e geometria interna.

Necessidades reais de composição permanecem pequenas e explícitas:

- `fullWidth` quando a ação ocupa todo o container;
- `className` ou `styled(Button)` para layout externo, como largura específica, margem ou posição;
- uma classe local para um estado contextual que o primitive não possui, como `aria-pressed` em um
  seletor sobre fundo inverso.

O consumidor não deve sobrescrever altura, padding, tipografia, raio ou tons de uma variante apenas
para preservar uma diferença histórica. Se a mesma necessidade visual aparecer em dois produtos,
ela volta para decisão de produto antes de ampliar o componente.

### Styled-components refinement — 2026-08-20

O Button compartilhado deve usar a mesma tecnologia de styling preferida pelos produtos: todo o
estilo do primitive fica em `styles.ts` com `styled-components`. Não existe `button.css`, export de
stylesheet nem import global obrigatório no consumidor.

O componente passa a usar a estrutura explícita:

```text
src/Button/
  index.tsx
  styles.ts
  types.ts
```

`types.ts` concentra a API TypeScript pública e os transient props internos. `className`, props
nativas e ref continuam chegando ao botão, permitindo `styled(Button)` para composição externa sem
ampliar o contrato visual.

## Scope

- Criar o repositório público `MarcosLaboriosi/langyspace-ui` e o pacote `@langyspace/ui`.
- Construir ESM e declarações TypeScript com React e styled-components como peers externos.
- Implementar `Button` com `primary`, `secondary` e `tertiary`; `sm`, `md` e `lg`; `fullWidth`;
  `icon`/`iconPosition`; `isLoading`; props nativas e ref.
- Incluir testes de comportamento, showcase determinístico e auditoria visual local.
- Validar pull requests/main e gerar `.tgz` + checksum automaticamente ao publicar uma tag `v*`.
- Consumir um URL imutável de GitHub Release nos cinco lockfiles.
- Integrar uma superfície real e já auditada de cada produto.
- Executar gates visuais e promover os cinco produtos a Firebase Hosting pela automação existente.
- Publicar `0.2.1` com `styled-components` como peer externo, estrutura separada de componente,
  estilos e tipos, sem artefato CSS.
- Remover o import global legado nos cinco produtos; instalar o peer no Cupom e manter os quatro
  peers já existentes.

## Out of scope

- Migrar todos os botões existentes.
- Criar um design system completo, Storybook, Figma library ou catálogo de dezenas de componentes.
- Publicar no npm ou GitHub Packages no v1.
- Suportar links, `asChild`, polymorphic `as`, icon-only, danger, success ou temas/providers.
- Atualizar automaticamente os cinco consumidores quando uma nova versão for criada.
- Alterar fluxos de negócio, contratos Firebase ou dados de produção.

## User journeys

### Product user

1. A pessoa abre uma das cinco aplicações.
2. O botão integrado mantém a hierarquia e o comportamento já esperado naquele contexto.
3. Foco, disabled e loading continuam claros e acessíveis.

### Library maintainer

1. Altera um componente pequeno no repositório da biblioteca.
2. CI valida tipos, testes, build e layout.
3. Publica uma tag SemVer.
4. O workflow cria um release com pacote instalável e checksum.
5. Cada produto escolhe explicitamente quando atualizar o URL versionado.

## Visual impact classification

`direct`. O componente muda código renderizado, interação e estilos. As superfícies v1 são:

| Produto              | Superfície                            | Estados                                                          | Extremos                                   | Larguras                                           |
| -------------------- | ------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------ | -------------------------------------------------- |
| Library showcase     | matriz de Button                      | variantes, tamanhos, ícone, disabled, loading, foco, label longa | label longa com espaços e token sem quebra | 390, 768, 1280, 1281, 1440, 1536, 1551, 1552, 2048 |
| `langyspace`         | `/`, CTA do Hero                      | normal, hover/foco, stress copy                                  | CTA dentro do Hero e conteúdo longo        | gate versionado completo                           |
| `langyspace-admin`   | `/login`, submit                      | normal, disabled/loading, erro de formulário                     | label + ícone em card estreito             | gate versionado completo                           |
| `langyspace-student` | `/perfil/editar`, ações do formulário | primary, secondary, disabled/loading                             | label, ícone e formulário denso            | gate versionado completo                           |
| `langyspace-teacher` | `/login`, submit de autenticação      | normal, disabled/loading                                         | mobile baixo, desktop e copy longa         | gate versionado completo                           |
| `langyspace-cupom`   | `/relatorio/:id`, seletor de período  | tertiary, pressed/unpressed, foco                                | três controles em header responsivo        | gate versionado completo                           |

As fixtures existentes são locais/sanitizadas e bloqueiam rede externa. A showcase da biblioteca é
uma nova fixture local. Nenhum gate pode autenticar, comprar, escrever ou ler produção.

## Success criteria

- `@langyspace/ui@0.1.0` existe como artefato imutável de GitHub Release com checksum.
- O pacote instala sem token em checkout local e GitHub Actions.
- Os cinco `package.json` e lockfiles resolvem exatamente o mesmo artefato.
- Cada produto renderiza o `Button` compartilhado em uma superfície real e auditada.
- API pública tem somente os eixos aprovados e documentação de quando não usar o componente.
- CI da biblioteca e os cinco gates `validate:ui` passam.
- Screenshots representativos são inspecionados em mobile, boundary denso e desktop largo.
- Os cinco commits de integração chegam a `main`, os workflows de Hosting concluem e os sites são
  verificados sem depender de dados de produção.

## Outcome

Completed on 2026-08-20. `@langyspace/ui@0.1.0` is available as an immutable public GitHub Release
tarball with checksum, the same artifact is locked in all five products, and one deliberately small
Button surface is live in each production Firebase Hosting site. All library and consumer gates
passed, representative screenshots were inspected, and production HTTP/assets were verified
without authentication or product-data access.

The epic was reopened on 2026-08-20 for Task 10: normalize the two remaining consumer compositions
that duplicated subtle Button metrics, document the extension boundary, revalidate Teacher and
Cupom, and promote only those consumer changes to production. The package runtime contract remains
`0.1.0`; no mutable release artifact will be changed.

Task 10 is complete. Teacher and Cupom now inherit the canonical `lg`/`sm` geometry and typography,
retain only external layout/contextual selection locally, and are live at commits `6d910f6` and
`02024fb`. The full visual gates and representative screenshot reviews passed, both Hosting
workflows succeeded, and the deployed assets were verified directly.

The epic was reopened again for the styled-components `0.2.1` migration. This work is incomplete
until the immutable release is published, all five lockfiles consume it without the legacy CSS
import, every visual gate passes, and all five Hosting sites are verified in production.

The initial `v0.2.0` artifact passed the browser consumer smoke but the Landing integration exposed
a Node SSR interop failure in styled-components' default import. It remains immutable and will not
be promoted. `v0.2.1` uses the named `styled` export and adds a direct Node import smoke before the
same five-consumer rollout resumes.
