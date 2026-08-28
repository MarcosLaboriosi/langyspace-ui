# Evidência T04 — catálogo, package e candidate

## Veredito

T04 aprovada. `ActionMenu` e `OperationalList` foram abertos juntos no entrypoint público,
manifesto, slice de molecules, API report, README e smokes de package/browser/SSR. O candidate local
foi empacotado, reinstalado pelo arquivo exato e recebeu checksum.

Isso autoriza iniciar T05 no Admin. Nenhum arquivo do Admin foi alterado, nenhuma versão foi
publicada e nenhuma tag/release foi criada. O package continua com metadata `1.3.0` somente para o
candidate local; a versão minor final será fechada na T07 depois dos dois pilotos.

## Surface pública

Exports adicionados:

- values: `ActionMenu` e `OperationalList`;
- cinco tipos de `ActionMenu`;
- onze tipos de `OperationalList`.

O API report aprovado contém 27 values, 79 types e 96 declarations. O diff deliberado ficou
restrito a:

- `dist/index.d.ts`;
- quatro declarations de `ActionMenu`;
- quatro declarations de `OperationalList`;
- dois values e dezesseis types no entrypoint report.

Não houve remoção, rename ou alteração de export anterior. A mudança permanece aditiva/minor.

## Manifesto e catálogo

As duas entries usam `layer: molecule` e apontam para owners, tests e stories reais:

- `ActionMenu`: `Molecules/Actions/ActionMenu`, marker `lsui-sc-action-menu`;
- `OperationalList`: `Molecules/Data/OperationalList`, marker
  `lsui-sc-operational-list`.

O manifesto voltou a corresponder a todos os 26 values públicos que são componentes. As seis
stories de menu e onze stories de lista já cobrem keyboard, disabled/loading, danger, sorting,
empty, conteúdo longo, narrow containers e cinquenta rows.

## Contratos públicos e smokes

`quality/PublicTypeContracts.test.tsx` agora prova pelo entrypoint:

- inferência e composição de `OperationalListProps<Item>`;
- quick action válida exige icon;
- quick sem icon é rejeitada;
- primary danger é rejeitada;
- `aria-label` e `aria-labelledby` simultâneos são rejeitados.

`quality/RefInterop.test.tsx` cobre object/callback refs e styled composition dos dois componentes
importados do root.

O consumer vazio do tarball agora:

- importa e renderiza `ActionMenu` fechado;
- infere o item genérico de `OperationalList` a partir de `items`;
- compila columns, primary content, navigation e quick action;
- confirma os dois runtime markers no bundle;
- confirma zero CSS asset e ausência de ThemeProvider;
- SSR-renderiza menu/lista e coleta os estilos de seus component IDs.

O tarball mantém somente `audit`, `dist`, `LICENSE`, `README.md` e `package.json`; source, Storybook,
tests, quality e scripts não vazaram.

## README

A documentação pública recebeu:

- exemplo completo de lista de Leads com primary/quick/overflow/danger;
- exemplo de lista ordenável e state controlado;
- regras de ownership, navigation, action normalization e container responsiveness;
- exemplo standalone de `ActionMenu`;
- limites explícitos: sem router adapter, permission DSL, CSS global ou ThemeProvider.

## Bundle medido

| Slice     | Raw anterior | Raw atual | Gzip anterior | Gzip atual | Budget raw | Budget gzip |
| --------- | -----------: | --------: | ------------: | ---------: | ---------: | ----------: |
| library   |       52.552 |    77.780 |        11.832 |     17.209 |     82.000 |      18.200 |
| molecules |       37.762 |    63.856 |         9.077 |     14.389 |     67.500 |      15.200 |

Os slices actions, fields e identity não mudaram. Os novos budgets preservam aproximadamente
5–6% de margem sobre a medida real; nenhuma dependência runtime foi adicionada e nenhum audit foi
enfraquecido.

## Candidate local

```text
path: .local/candidates/admin-operational-lists/langyspace-ui-1.3.0.tgz
size: 53.270 bytes
sha256: 0abeff3f795a6051d293bc7e0506edd82cd1b0ea75569e6325d9eb1d01fc65c0
```

O diretório `.local` é ignorado pelo Git. O smoke reinstalou esse arquivo exato por URL `file://`,
executou import ESM, audit CLI, SSR/CSS collection e build TypeScript/Vite. O consumer gerou um
único asset JS de 318,28 kB raw / 98,48 kB gzip e nenhum CSS asset.

Esse checksum identifica somente o candidate local de T05/T06. T07 deverá gerar o artifact minor
final e registrar seu próprio checksum; não deve promover este path local como release.

## Validação

### Focada

- lint e Prettier passaram;
- typecheck passou;
- 29 unit/public-contract/ref/manifest tests passaram;
- 17 Storybook interaction/a11y tests da family passaram;
- API report e bundle budgets passaram;
- local tarball e candidate-file smokes passaram.

### `pnpm run validate:ui`

- architecture audit: 123 production files;
- 59 test files e 214 tests;
- coverage global: 96,38% statements, 92,59% branches, 99,54% functions e 98,06% lines;
- coverage `ActionMenu`: 96,82% statements, 94,44% branches e 100% functions/lines;
- coverage `OperationalList`: 100% statements/functions/lines e 87,64% branches;
- build, API, bundle, package consumer, audit CLI e SSR smoke passaram;
- layout global: 942 cenários, 105 stories e zero issues.

## Revisão visual

Foram inspecionadas as capturas finais:

- `DefaultLeads` em 390, 1281 e 2048 px;
- `Sortable` em 390 px;
- `NarrowCards` em 1281 px;
- `ActionMenu/StressLongLabels` em 390 px;
- `ActionMenu/Default` em 2048 px.

A hierarquia, cards de uma/duas colunas, table ampla, sort compacto, action targets, conteúdo longo,
separator danger e popup bounds permaneceram corretos. Não houve corte, overlap, scroll horizontal,
perda de role ou inconsistência de foco.

## Handoff para T05

T05 deve revalidar o callsite de Leads que estiver efetivo na `main` do Admin antes de editar,
instalar o candidate pelo path/checksum acima e migrar somente o piloto de Leads. Preservar todo o
trabalho paralelo do Admin, não criar branch/worktree e não iniciar Alunos antes do aceite do
piloto.
