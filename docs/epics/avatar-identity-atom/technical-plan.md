# Plano técnico

## Baseline

| Repositório     | `origin/main` observado |
| --------------- | ----------------------- |
| `langyspace-ui` | `f91f74b0b2fc`          |
| Landing         | `2c5bc3ac99e0`          |
| Admin           | `a627cb8a2159`          |
| Student         | `70caa4969d72`          |
| Teacher         | `89a4c79a8a32`          |
| Cupom           | `fde335645bf4`          |

Todos foram montados em worktrees isolados sob
`/private/tmp/langyspace-next-component.s0jagm`. Os checkouts originais de Landing, Admin e Student
possuem trabalho não relacionado e não serão usados para implementação ou release.

## Escolha da family

O maturity gate pontua o candidato por uso real, responsabilidade, redução de API, compatibilidade
visual, acessibilidade e risco de migração.

| Family                      |             Uso ativo | Decisão          | Motivo                                                                           |
| --------------------------- | --------------------: | ---------------- | -------------------------------------------------------------------------------- |
| Avatar                      |  Admin 10 + Teacher 8 | promover         | atom sem domínio, API convergente e 257 linhas locais removíveis                 |
| ToastViewport               | Student 2 + Teacher 1 | manter local     | tipos, ações e lifecycle pertencem aos stores; notification diverge de dismiss   |
| PhoneField                  | Student 3 + Teacher 2 | manter local     | formatter, country catalog, cursor/paste/error contracts divergem por produto    |
| SearchField                 |             Teacher 2 | convergir depois | Student copy morta; package já possui SearchInput e não há dois consumers ativos |
| FilterToolbar               |             Teacher 2 | manter local     | wrapper de layout com um único consumer ativo                                    |
| Logo/auth shells            |     Student + Teacher | manter local     | assets, routing, copy e lifecycle do produto                                     |
| VerticalLogo/List/Item/Chip |                  zero | cleanup futuro   | dead code não justifica API pública                                              |

## Arquitetura proposta

```text
src/foundations/tokens
          |
          v
src/atoms/Avatar
  index.tsx             behavior/fallback e markup
  styles.ts             recipe fechado
  types.ts              API pública
  Avatar.test.tsx       contrato unitário
  Avatar.stories.tsx    catálogo e fixtures
          |
          +-> src/index.ts
          +-> quality/component-manifest.ts
          +-> public API, browser/SSR/package/bundle gates
```

O atom não compõe `Pressable`: Avatar não é ação. Consumers que permitem editar/abrir perfil
mantêm o Button/Pressable externo e passam Avatar como child.

## Contrato TypeScript

```ts
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type AvatarTone = 'neutral' | 'brand' | 'inverse'

export interface AvatarProps extends Omit<
  ComponentPropsWithRef<'span'>,
  'color'
> {
  imageUrl?: string
  initials: string
  size?: AvatarSize
  tone?: AvatarTone
}
```

O `ref` via props segue o pattern React 19 já validado na library. Não será introduzido
`forwardRef` isoladamente.

## Markup e estado

`failedImageUrl: string | null` guarda exatamente a URL que falhou. `shouldShowImage` é verdadeiro
quando `imageUrl` existe e difere da falha. Esse modelo recupera automaticamente quando a URL muda
e evita `useEffect` apenas para sincronizar estado.

```tsx
<Styled.Avatar aria-hidden={ariaHidden} data-size={size} data-tone={tone} ...>
  {initials}
  {shouldShowImage ? <Styled.Image alt="" src={imageUrl} onError={...} /> : null}
</Styled.Avatar>
```

As iniciais permanecem no DOM para fallback imediato. O root aplica `overflow: hidden`, círculo e
`flex-shrink: 0` para que conteúdo extremo não altere a geometria.

## Recipe

### Tamanhos

| Size | Diâmetro | Font      | Convergência                         |
| ---- | -------- | --------- | ------------------------------------ |
| xs   | 1.5rem   | 0.6875rem | Admin 24 px permanece                |
| sm   | 2rem     | 0.75rem   | Admin 36 -> 32; Teacher 30 -> 32     |
| md   | 2.5rem   | 0.875rem  | Admin 40 permanece; Teacher 38 -> 40 |
| lg   | 3.5rem   | 1.125rem  | Admin 56 permanece; Teacher 52 -> 56 |
| xl   | 4rem     | 1.25rem   | Teacher 60 -> 64                     |

As diferenças são normalizadas porque não carregam significado de domínio. A inspeção visual é
blocking antes de release.

### Tons

- `neutral`: content default, surface muted, border default;
- `brand`: status brand foreground/background, border transparente;
- `inverse`: neutral 0 sobre neutral 950, border transparente.

As cores coincidem com os palettes atuais de Admin/Teacher e não exigem ThemeProvider do consumer.

## Stories e fixtures

Stories mínimas:

1. `Default`;
2. `Sizes`;
3. `Tones` em surfaces clara e escura;
4. `WithImage` usando data URL sanitizada;
5. `ImageFailure` com play aguardando fallback;
6. `Stress` com três/mais caracteres, flex row e texto adjacente longo.

Network externo continua bloqueado pelo runner. Boundaries declaram 390/1281/2048 e narrow
container quando aplicável.

## Tests

- defaults, data attributes, root `span` e decorative semantics;
- props nativas e object/callback ref;
- cinco sizes e três tones expostos sem valores livres;
- image render com `alt=""`;
- error remove image e mantém iniciais;
- URL nova depois de failure é tentada;
- SSR render com e sem imagem;
- browser smoke e styled composition;
- contract test do manifesto e public API report.

## Manifesto, API e bundle

Adicionar `Avatar` como atom não interativo com marker `lsui-sc-avatar`, test/story owners e
browser/SSR complete. Atualizar o API report somente pelo comando oficial depois dos typings
estabilizarem. Medir os slices atuais; ajustar apenas o budget de library/atoms necessário ao delta
real e manter margem pequena.

## Migração dos consumers

### Admin

1. instalar tarball candidato `1.2.0` e atualizar `minimumReleaseAgeExclude`;
2. substituir imports locais por import público em AdminPortal, AdminGlobalSearch e
   DesignSystemAudit;
3. manter `xs/md/lg`, mapear nenhum tone e aceitar `sm` canônico;
4. remover `src/components/base/Avatar`;
5. adicionar `Avatar` a `canonicalComponents` e `ADMIN_UI_003` para import local;
6. rodar focused Avatar tests removidos via package tests, build, a11y, design-system e layout.

### Teacher

1. instalar o mesmo tarball candidato e atualizar `minimumReleaseAgeExclude`;
2. substituir seis imports locais por import público;
3. mapear `tone="accent"` para `tone="brand"`; omitir `muted` porque `neutral` é default;
4. remover `src/components/base/Avatar`;
5. adicionar `Avatar` a `canonicalComponents` e `TEACHER_UI_003`;
6. validar shell, Hoje, Alunos e drawer em todas as larguras do audit.

### Student

Remover os três arquivos sem import. Não alterar package.json, lockfile, allowlist ou runtime. Rodar
audit, lint/build e o gate visual somente para comprovar que o bundle/rotas permanecem equivalentes.

### Landing e Cupom

Somente evidência de ausência de callsite; nenhuma mutação.

## Cobertura visual

### Library

O story runner executa todos os componentes em 390/1281/2048, motion normal/reduced e boundaries.
Screenshots de Sizes, Tones, ImageFailure e Stress são inspecionadas.

### Admin

- shell `inicio`;
- `busca-global` e `busca-global-vazia`;
- `cobrancas`, `cobrancas-drawer`, `assinaturas` e drawers relacionados;
- DesignSystemAudit;
- widths completas existentes, com screenshots 390/1281/2048.

### Teacher

- `inicio`, `inicio-drawer-presenca` e `alunos`;
- novo case `inicio-drawer-aluno`, que abre a aula e seleciona a tab `Aluno` para exercitar `xl`;
- sidebar desktop e mobile header;
- default/stress em nove widths;
- screenshots 390/1281/2048.

Fixtures existentes já contêm identities sintéticas e stress de nomes. Os audits genéricos não
observam diâmetro/círculo do atom; Admin e Teacher devem adicionar assertion obrigatória para o
marker `lsui-sc-avatar`: width=height, radius circular, overflow hidden, `flex-shrink: 0` e diâmetro
igual ao `data-size` declarado.

## Validation ladder

1. format/typecheck/unit Avatar;
2. story/axe/layout focado Avatar;
3. manifest/API/bundle/package smokes;
4. full `validate:ui` da library uma vez no candidato;
5. tarball candidato instalado nos três worktrees aplicáveis;
6. audit/build/test/layout focado por consumer;
7. full `validate:ui` por consumer alterado;
8. review de diff e screenshots;
9. release `v1.2.0` com checksum;
10. instalar URLs imutáveis, commit/push fast-forward e aguardar workflows;
11. verificar HTTP, bundle filename/hash e marker servido.

## Release e produção

O package é publicado primeiro a partir de um commit já verde. Admin e Teacher substituem o
tarball candidato pelo URL exato da GitHub Release, sem alteração de conteúdo/checksum. Student não
consome a nova versão. Pushes em `main` acionam os workflows existentes; somente Hosting é esperado
porque não há Functions, rules ou dados alterados.

## Riscos e mitigação

| Risco                                   | Mitigação                                                               |
| --------------------------------------- | ----------------------------------------------------------------------- |
| normalização muda alinhamento           | before/after screenshots e assertions de diâmetro por size              |
| imagem quebrada fica invisível          | failing unit/play test do fallback antes do source                      |
| props crescem para cobrir legado        | API fechada e migration mapping explícito                               |
| atom vira botão/profile                 | proibir click/upload/status e manter composição no product              |
| novo tag bloqueado pelo pnpm policy     | atualizar `minimumReleaseAgeExclude` junto da dependency                |
| package passa browser e falha SSR       | smoke ESM + SSR obrigatório antes do tag                                |
| checkouts do usuário se misturam        | worktrees isolados e staging por paths explícitos                       |
| commit documental final cria loop de CI | evidência operacional fecha no mesmo commit ou não repete runtime gates |

## Rollback

Reverter os commits de Admin/Teacher e restaurar o tarball `1.1.0`; restaurar os arquivos mortos no
Student somente se algum import não detectado aparecer no build. O release `1.2.0` permanece
imutável e não precisa ser apagado. Não há migration de dado ou rollback backend.
