# Requisitos

## Requisitos funcionais

### R01 — Conteúdo

`Avatar` deve exigir `initials: string` e renderizá-las como fallback permanente, inclusive quando
uma imagem válida estiver visualmente sobreposta.

### R02 — Imagem opcional

`imageUrl?: string` deve renderizar uma imagem decorativa com `alt=""`, `object-fit: cover` e
ocupação integral do círculo.

### R03 — Falha de imagem

Quando a imagem falhar, ela deve sair do DOM e as iniciais devem permanecer visíveis. Uma nova URL
deve ter uma nova tentativa sem exigir remount ou efeito sincronizador.

### R04 — Escala fechada

O atom deve aceitar somente:

- `xs`: 24 px;
- `sm`: 32 px;
- `md`: 40 px, default;
- `lg`: 56 px;
- `xl`: 64 px.

Os valores formam a única escala pública. As diferenças legadas de 30/36/38/52/60 px não viram
aliases ou props.

### R05 — Tons semânticos

O atom deve aceitar somente:

- `neutral`, default, para pessoas em listas e tabelas;
- `brand`, para destaque de identidade;
- `inverse`, para superfícies escuras.

`accent` e `muted` dos products convergem respectivamente para `brand` e `neutral`.

### R06 — Elemento e props nativas

O root deve ser um `span` e preservar `className`, `data-*`, ARIA handlers e `ref` aceitos por
`ComponentPropsWithRef<'span'>`. `color` não entra na API pública.

### R07 — Semântica acessível

O avatar deve ser decorativo por default com `aria-hidden="true"`, pois todos os callsites atuais
possuem nome textual adjacente. O consumidor pode sobrescrever props nativas quando um caso futuro
provar outra semântica, sem prop paralela `decorative`.

### R08 — Composição externa

O atom não pode conhecer click, upload, rota, menu, badge, presence, status, teacher/student ou
derivação de iniciais. Interatividade envolve o atom em um Button/Pressable pertencente ao
consumer.

### R09 — Adoção Admin

Os dez callsites Admin devem importar `Avatar` do entrypoint público, mapear os mesmos nomes de
props e remover os quatro arquivos locais. `Avatar` entra em `canonicalComponents` e uma regra
Admin bloqueia a antiga import local.

### R10 — Adoção Teacher

Os oito callsites Teacher devem importar `Avatar` do entrypoint público, mapear `accent -> brand` e
deixar o default `muted -> neutral`. Os três arquivos locais devem ser removidos. `Avatar` entra em
`canonicalComponents` e uma regra Teacher bloqueia a antiga import local.

### R11 — Limpeza Student

Os três arquivos locais do Student devem ser removidos porque não possuem import runtime. Student
não deve receber `@langyspace/ui@1.2.0` somente por causa da remoção.

### R12 — Products sem consumo

Landing e Cupom não recebem mudança de source, dependency ou deploy forçado. A ausência de consumo
deve ficar registrada no inventário.

## Requisitos não funcionais

### R13 — Atomic Design

`Avatar` pertence a `src/atoms/Avatar`. Ele depende apenas de foundations e não importa outro atom,
molecule, product theme, lucide, router ou provider.

### R14 — Styled-components

Source segue `index.tsx`, `styles.ts`, `types.ts`; estilos ficam em styled-components com
`componentId` estável `lsui-sc-avatar`; tests/stories usam nomes `Avatar.test.tsx` e
`Avatar.stories.tsx`.

### R15 — Tokens

Cor, radius, typography e spacing devem usar `foundations/tokens`. Dimensões singulares ficam em
um recipe privado tipado do atom; não é criado token global só para espelhar cinco valores.

### R16 — API pequena

Não adicionar `shape`, `bordered`, `fallback`, `status`, `badge`, `editable`, `onImageError`,
`imageAlt`, `name`, `maxInitials`, `loading`, `color` ou numeric size.

### R17 — Package

Manifesto, exports, declarations, public API report, ESM, browser consumer, SSR/CSS smoke e bundle
budgets devem cobrir o novo atom. O tarball não pode conter stories, tests ou quality tooling.

### R18 — SemVer

A export nova é minor. O release candidato é `1.2.0`; consumers usam somente o tarball imutável do
GitHub Release e seu checksum.

### R19 — Performance

O atom não realiza fetch, preloading ou observer. Estado guarda no máximo a URL que falhou. O novo
slice não pode ultrapassar o budget ajustado com justificativa medida.

### R20 — Privacidade e segurança

Stories e fixtures usam dados sintéticos e imagens data URL. Nenhum nome, foto, URL assinada ou
dado real aparece no catálogo público ou artifacts.

### R21 — Compatibilidade

O component deve renderizar em React 19, browser Vite, import ESM direto, styled composition e SSR
sem acessar `window`, `document` ou efeitos obrigatórios.

### R22 — Rollback

Antes do release, cada consumer deve ser validado contra o mesmo tarball candidato. Depois do
release, rollback restaura os sources locais e a dependency `1.1.0`; nenhum dado precisa de
migração.

## Estados e edge cases

| Caso                     | Comportamento esperado                                     |
| ------------------------ | ---------------------------------------------------------- |
| uma inicial              | centralizada sem mudança de diâmetro                       |
| duas iniciais            | default comum                                              |
| três iniciais            | contida no círculo sem overflow                            |
| string longa sem espaço  | clipped pelo círculo; não amplia layout                    |
| `imageUrl` vazio/ausente | somente iniciais                                           |
| imagem válida            | cobre as iniciais visualmente                              |
| imagem falha             | imagem removida e iniciais visíveis                        |
| URL muda após falha      | nova URL é tentada                                         |
| `aria-hidden={false}`    | override nativo preservado                                 |
| container estreito       | avatar não encolhe; texto adjacente assume truncation/wrap |
| surface escura           | `inverse` mantém contraste                                 |

## Matriz visual e de cobertura

| Superfície          | Estados                                          | Larguras                                 |
| ------------------- | ------------------------------------------------ | ---------------------------------------- |
| Storybook Avatar    | default, sizes, tones, image, fallback, stress   | 390, 1281, 2048                          |
| Admin shell         | inverse account avatar + long adjacent e-mail    | 390, 1281, 2048                          |
| Admin global search | resultados cheios/empty, nomes e IDs longos      | 390, 1281, 2048                          |
| Admin finance       | table, charge drawer, subscription drawer        | 390, 1281, 2048 e breakpoints existentes |
| Teacher Hoje        | lista cheia + drawer de presença + perfil `xl`   | 390, 1281, 2048                          |
| Teacher Alunos      | tabela/lista stress                              | 390, 1281, 2048                          |
| Teacher shell       | sidebar, mobile header, foto e initials fallback | 390, 1281, 2048                          |

## Critérios de aceitação

1. API e recipe atendem R01–R08 sem props extras.
2. Unit, story/axe, interaction aplicável, layout, coverage, API, bundle e package smokes passam.
3. Admin e Teacher compilam sem local Avatar e sem adapter.
4. Student compila sem os arquivos mortos e sem dependency churn.
5. Os audits bloqueiam reintrodução da import local e override cosmético do recipe.
6. Os audits medem width=height, círculo, overflow e size declarada do marker público.
7. Screenshots representativas preservam alinhamento e hierarquia apesar da escala canônica.
8. CI, release, catálogo e deploys aplicáveis passam no mesmo conjunto de commits comprovados.
