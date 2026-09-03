# @langyspace/ui

Biblioteca React compartilhada pelos produtos Langy.space. Expõe `Button` para comandos rotulados,
`IconButton` para comandos de glyph único, `ActionLink` para navegação com aparência de ação,
`Pressable` para controles específicos, `Spinner` para espera, `Avatar` para identidade visual e
pequenas composições semânticas de status, estado de conteúdo, fields, filtros e autenticação.
`Dialog` e `Drawer` completam essa base com um shell modal único para os portais. `ActionMenu` e
`OperationalList` organizam ações e filas operacionais densas sem absorver dados, rotas ou regras
dos produtos.

## Installation

Instale styled-components e fixe sempre um artefato imutável de release:

```bash
pnpm add styled-components@^6.4.0 '@langyspace/ui@https://github.com/MarcosLaboriosi/langyspace-ui/releases/download/v1.4.0/langyspace-ui-1.4.0.tgz'
```

Não existe import de CSS. O Button injeta seus estilos com styled-components e funciona sem
ThemeProvider. Não é necessário `.npmrc`, token npm ou token GitHub para instalar o release público.

### SSR e prerender

Os componentes publicados declaram `componentId` explícito, então o mesmo `class` sai do render de
servidor e do browser mesmo quando as duas execuções carregam instâncias diferentes de
styled-components.

Para que o CSS do Button também apareça no HTML prerenderizado, o build de servidor precisa carregar
o pacote na mesma instância que coleta os estilos. Em Vite, mantenha a biblioteca junto de
styled-components:

```ts
export default defineConfig({
  ssr: {
    noExternal: ['styled-components', '@langyspace/ui'],
  },
})
```

Sem isso o botão continua correto depois da hidratação, mas o HTML prerenderizado sai sem as regras
dele e o consumidor mostra um botão sem estilo até o JavaScript carregar.

## Button

```tsx
import { Button } from '@langyspace/ui'

export function Actions() {
  return (
    <>
      <Button variant="primary">Continuar</Button>
      <Button variant="secondary">Cancelar</Button>
      <Button variant="tertiary">Agora não</Button>
      <Button variant="brand">Nova matrícula</Button>
      <Button variant="danger">Excluir acesso</Button>
      <Button variant="success">Marcar presença</Button>
      <Button variant="inverse">Agora não</Button>
      <Button density="compact">Remarcar aula</Button>
    </>
  )
}
```

### Props

| Prop        | Contract                                                                    | Default   |
| ----------- | --------------------------------------------------------------------------- | --------- |
| `variant`   | `primary`, `secondary`, `tertiary`, `brand`, `danger`, `success`, `inverse` | `primary` |
| `size`      | `sm`, `md`, `lg`                                                            | `md`      |
| `density`   | `regular`, `compact`                                                        | `regular` |
| `fullWidth` | boolean                                                                     | `false`   |
| `iconStart` | one React node before the label                                             | none      |
| `iconEnd`   | one React node after the label                                              | none      |
| `isLoading` | keeps label, sets busy/disabled and renders spinner                         | `false`   |

Todas as props nativas de `<button>`, `className` e refs são preservadas: elas seguem direto no
spread, sem repasse manual. O `type` default é `button`, nunca `submit` implícito. Para ocupar o
container, prefira a prop explícita:

```tsx
<Button fullWidth>Continuar</Button>
```

Use `density="compact"` somente em grupos operacionais densos que mantêm as alturas canônicas. Em
`md`, o recipe compacto preserva 40 px e usa fonte 14 px com padding horizontal de 16 px. Um botão
regular não deve virar compacto para esconder um problema de composição: quando as ações não cabem,
o container escolhe explicitamente linha, grid ou pilha no breakpoint do produto.

O recipe permite quebra para preservar conteúdo extremo e localização. Grupos operacionais com
labels curtas e atômicas devem evitar a quebra na sua composição e trocar de linha para pilha no
breakpoint do produto.

Enquanto `isLoading` está ativo o botão fica `disabled` e `aria-busy`, mantém o label e mostra um
único Spinner no slot final. O ícone inicial permanece; o ícone final é substituído durante a espera
ou o slot é criado quando ele não existia. Loading nunca troca o texto do comando por reticências.

`Button` é sempre rotulado e pill. Para um controle só de ícone, use o atom próprio `IconButton`:

```tsx
<IconButton aria-label="Tocar áudio">
  <PlayIcon />
</IconButton>
```

## IconButton

`IconButton` aceita exatamente um glyph por `children`, exige `aria-label` ou `aria-labelledby` e
mantém as mesmas alturas canônicas do Button. `shape` aceita `circle` (default) ou `rounded`;
`variant` aceita `neutral`, `subtle`, `brand`, `success`, `danger` e `inverse`. Não existem props de
cor, raio ou dimensão livre.

```tsx
<IconButton aria-label="Excluir aula" variant="danger">
  <TrashIcon />
</IconButton>
```

Durante `isLoading`, o glyph é substituído por um único Spinner, o nome acessível é preservado e o
controle fica busy/disabled para impedir envio duplicado.

## Avatar

`Avatar` representa uma identidade de forma decorativa, com iniciais sempre disponíveis e imagem
opcional. Ele não deriva iniciais, abre perfil, faz upload nem comunica status.

```tsx
import { Avatar } from '@langyspace/ui'

<Avatar initials="MF" />
<Avatar imageUrl={teacherPhotoUrl} initials="MF" size="lg" tone="brand" />
<Avatar initials="AD" size="sm" tone="inverse" />
```

`size` aceita `xs`, `sm`, `md`, `lg` e `xl`; `tone` aceita `neutral`, `brand` e `inverse`. O root é
um `span` decorativo por default e aceita props nativas/ref. Se um avatar futuro for a única fonte
de identidade, o consumer pode passar `aria-hidden={false}`, `role="img"` e `aria-label`; nos
callsites atuais o nome textual adjacente permanece o owner acessível.

Não envolva comportamento dentro do atom. Upload, menu ou navegação usam um Button/Pressable
externo. Não estilize diâmetro, radius, cor ou typography por `styled(Avatar)`; escolha o size/tone
semântico ou ajuste somente o layout do container.

## Mensagens

`MessageBubble` renderiza uma mensagem recebida ou enviada sem conhecer participantes, backend ou
locale. O produto formata o horário e fornece a copy de status:

```tsx
<MessageBubble timestamp="10:30">Tudo certo para a aula?</MessageBubble>
<MessageBubble
  side="outgoing"
  status="sending"
  statusLabel="Enviando"
  timestamp="10:31"
>
  Tudo certo, professora.
</MessageBubble>
```

`MessageComposer` é controlado e mantém rede, retry, trim e limpeza do rascunho no consumer. Copy e
ícone também pertencem ao produto:

```tsx
<MessageComposer
  error={sendError}
  helperText="A professora responde assim que puder."
  onSubmit={sendMessage}
  onValueChange={setMessage}
  placeholder="Escreva uma mensagem"
  submitIcon={<SendIcon aria-hidden="true" />}
  submitLabel="Enviar mensagem"
  textareaLabel="Mensagem para a professora"
  value={message}
/>
```

O composer usa limite default de 1.000 caracteres, expõe contador e bloqueia submit vazio,
acima do limite, disabled ou loading. Enter continua criando linha na textarea; Tab leva ao botão
de envio, preservando a semântica nativa do formulário.

## Dialog e Drawer

Os dois componentes compartilham portal, stack, bloqueio de scroll, `inert`, trap e retorno de foco,
Escape e backdrop. O produto fornece apenas conteúdo e decisões semânticas; width, radius, header,
body e footer pertencem à biblioteca.

```tsx
import { Button, Dialog, Drawer } from '@langyspace/ui'

<Dialog
  closeLabel="Fechar confirmação"
  footer={<Button onClick={confirm}>Confirmar</Button>}
  onClose={close}
  open={open}
  title="Confirmar decisão"
>
  Revise os dados antes de continuar.
</Dialog>

<Drawer
  closeLabel="Fechar notificações"
  description="Atualizações recentes"
  onClose={close}
  open={open}
  size="sm"
  title="Notificações"
>
  {notificationList}
</Drawer>
```

`size` aceita `sm`, `md` e `lg`. `dismissal` aceita `escape-and-backdrop` (default), `escape-only`,
`explicit-only` e `blocked`; use `blocked` durante mutações que não podem ser interrompidas. O
`Dialog` vira bottom sheet no mobile e o `Drawer` ocupa o viewport inteiro. Não recrie scrim,
listener de Escape, scroll lock ou focus trap no consumer.

## Listas operacionais

`OperationalList<Item>` organiza uma fila fornecida pelo produto. O consumer continua responsável
por buscar, filtrar, ordenar e paginar dados, além de decidir copy, navegação e ações. A biblioteca
renderiza uma única table semântica e, pela largura do próprio container, apresenta table ampla,
cards de duas colunas ou cards de uma coluna.

### Lista de Leads

```tsx
import {
  OperationalList,
  type OperationalListColumn,
  type OperationalListPrimaryColumn,
} from '@langyspace/ui'

const primaryColumn = {
  label: 'Pessoa',
  render: (lead: Lead) => ({
    description: lead.phone,
    navigation: {
      label: `Abrir cadastro de ${lead.name}`,
      onNavigate: () => openLead(lead),
    },
    title: lead.name,
  }),
} satisfies OperationalListPrimaryColumn<Lead>

const columns = [
  {
    id: 'status',
    label: 'Status',
    render: (lead: Lead) => <StatusChip>{lead.status}</StatusChip>,
  },
  {
    id: 'next-action',
    importance: 'secondary',
    label: 'Próxima ação',
    render: (lead: Lead) => lead.nextAction,
  },
] satisfies readonly OperationalListColumn<Lead>[]

<OperationalList
  aria-label="Fila inicial de leads"
  columns={columns}
  getActions={(lead) => [
    {
      id: 'convert',
      label: 'Converter em aluna',
      onSelect: () => convertLead(lead),
      placement: 'primary',
      variant: 'secondary',
    },
    {
      icon: <MessageIcon aria-hidden="true" />,
      id: 'message',
      label: `Falar com ${lead.name}`,
      onSelect: () => messageLead(lead),
      placement: 'quick',
    },
    {
      id: 'archive',
      label: 'Arquivar lead',
      onSelect: () => archiveLead(lead),
      placement: 'overflow',
      tone: 'danger',
    },
  ]}
  getItemKey={(lead) => lead.id}
  items={leads}
  primaryColumn={primaryColumn}
/>
```

A primeira ação `primary` e até duas `quick` ficam visíveis; excesso e ações `overflow` entram no
`ActionMenu`. Ações danger formam o último grupo do menu. Quick exige icon no TypeScript; primary e
quick não aceitam danger. A lista controla somente qual menu está aberto, nunca o lifecycle das
mutações.

### Lista ordenável

```tsx
const sortablePrimaryColumn = {
  ...primaryColumn,
  sort: {
    direction: studentSort.direction,
    onToggle: () => setStudentSort(toggleDirection(studentSort)),
  },
} satisfies OperationalListPrimaryColumn<Student>

<OperationalList
  aria-label="Alunos com pagamento confirmado"
  columns={studentColumns}
  density="compact"
  getItemKey={(student) => student.id}
  items={sortedStudents}
  primaryColumn={sortablePrimaryColumn}
/>
```

Sorting é controlado: a lista publica `aria-sort` e chama `onToggle`, mas não reordena os itens.
Somente uma coluna pode ter direction diferente de `none`. Navegação primária usa link nativo quando
recebe `href` e button quando recebe um command callback; a `<tr>` nunca vira pseudo-link.

`ActionMenu` também pode ser usado sozinho. Ele exige nome acessível no trigger, aceita items
neutral/danger, suporta controlled/uncontrolled, setas, Home/End, Escape e retorno de foco. Não
possui custom trigger, router adapter, backdrop ou focus trap.

```tsx
<ActionMenu
  items={[
    { id: 'open', label: 'Abrir cadastro', onSelect: openStudent },
    {
      id: 'archive',
      label: 'Arquivar cadastro',
      onSelect: archiveStudent,
      tone: 'danger',
    },
  ]}
  triggerLabel="Mais ações do aluno"
/>
```

Não existe import de CSS nem dependência de ThemeProvider. Status, Avatar e glyphs são nodes do
consumer; React Router, permissões, analytics e regras de domínio continuam fora do package.

## Contrato de markup

Button e IconButton renderizam os component IDs estáveis abaixo. Button mantém `data-size` e
`data-density`; ambos usam `data-loading="true"` somente enquanto aguardam. É só isso que é
contrato:

| Marca                                                                      | Para que serve                                              |
| -------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `lsui-sc-button`, `lsui-sc-icon-button`, `lsui-sc-icon`, `lsui-sc-spinner` | ids declarados no source, para seleção em teste e auditoria |
| `data-size`                                                                | a auditoria confere a altura mínima esperada por tamanho    |
| `data-density`                                                             | identifica o recipe regular ou compacto no Button           |
| `data-loading`                                                             | os estilos do próprio controle dependem dele                |

Não estilize por essas marcas: para composição use `styled(Button)`.

## ActionLink

Use `ActionLink` quando a ação canônica navega por `href`. Ele renderiza um `<a>` nativo e
compartilha com Button somente o recipe de tamanho, densidade, forma, hierarquia, foco e motion.

```tsx
import { ActionLink } from '@langyspace/ui'

export function NavigationActions() {
  return (
    <>
      <ActionLink href="/cadastro" iconEnd={<ArrowRight />} variant="brand">
        Começar agora
      </ActionLink>
      <ActionLink href="/planos" variant="secondary">
        Ver planos
      </ActionLink>
      <ActionLink
        href="https://meet.google.com/example"
        rel="noopener noreferrer"
        target="_blank"
      >
        Abrir Meet
      </ActionLink>
    </>
  )
}
```

`href` é obrigatório. `variant` aceita somente `primary`, `secondary`, `tertiary` e `brand`; danger,
success e inverse são comandos, não destinos comprovados. O componente também aceita `size`,
`density`, `fullWidth`, `iconStart`, `iconEnd` e props nativas de anchor. É sempre pill. Loading,
disabled, icon-only, router e polymorphism não fazem parte desta API. Links especiais como WhatsApp
flutuante, chips e ícones sem label continuam componentes de produto.

## Spinner

Use o atom exportado quando a espera não pertence a um Button. O container continua responsável
pelo status acessível e pela copy; o Spinner é sempre decorativo, usa `currentColor` e respeita
`prefers-reduced-motion`.

```tsx
import { Spinner } from '@langyspace/ui'

export function LoadingState() {
  return (
    <div aria-live="polite">
      <Spinner size="md" /> Carregando aulas
    </div>
  )
}
```

`size` aceita `inherit` (default, `1em`), `sm` (16 px), `md` (20 px) e `lg` (24 px).

## Status e estados de conteúdo

`StatusChip` comunica significado com os tons fechados `neutral`, `info`, `success`, `warning`,
`danger` e `brand`. O produto escolhe o significado no callsite; nomes cosméticos como `pink`,
`green` ou `grey` não fazem parte da API. `indicator` e `iconStart` são adornos visuais e o texto
completo continua no DOM e em `title`, mesmo quando o label precisa usar ellipsis em um container
estreito.

```tsx
<StatusChip indicator tone="success">
  pagamento confirmado
</StatusChip>
```

`StatePanel` compõe os estados `empty`, `error`, `loading` e `partial` e é responsável pelos
atributos acessíveis correspondentes. `icon`, `description` e `action` são opcionais; `title` e
`state` são obrigatórios. `EmptyState` e `LoadingState` são wrappers pequenos sobre a mesma
molecule, sem recipe visual paralelo. O Spinner de `LoadingState` permanece decorativo enquanto o
container expõe `role="status"`, `aria-live="polite"` e `aria-busy="true"`.

```tsx
<EmptyState title="nenhum aluno encontrado" />
<LoadingState title="carregando alunos" />
<StatePanel
  action={<Button onClick={reload}>tentar novamente</Button>}
  description="confira sua conexão"
  state="error"
  title="não foi possível carregar"
/>
```

## Fields e busca

Inputs são native-first e não conhecem `react-hook-form`. `FieldRoot` conecta label, hint e error ao
control por `id`, `aria-invalid` e `aria-describedby`. Para produtos que já usam
`react-hook-form`, `ControlledField` é o adapter opcional de `FieldRoot` + `TextInput`.

```tsx
<FieldRoot label="Nome" hint="Use o nome completo" error={errors.name?.message}>
  <TextInput {...register('name')} />
</FieldRoot>

<FormProvider {...form}>
  <ControlledField
    label="E-mail"
    name="email"
    rules={{ required: 'Informe seu e-mail' }}
    type="email"
  />
</FormProvider>
```

`TextInput`, `SelectInput` e `TextareaInput` aceitam props e refs nativas. `CompoundControl` é o
único owner de border/background/focus quando ícone, input e ação formam uma surface. `SearchInput`
compõe esse contrato e, quando `onClear` existe, devolve o foco ao input depois de limpar.

```tsx
<SearchInput
  aria-label="Buscar aluno"
  clearLabel="Limpar busca"
  value={query}
  onChange={(event) => setQuery(event.target.value)}
  onClear={() => setQuery('')}
/>
```

## Filtros e seleção

`FilterPills` modela filtros em buttons pressionáveis e aceita `sm | md`, counts e overflow
`scroll | wrap`. `SegmentedControl` modela escolha exclusiva e aceita as surfaces semânticas
`light | inverse` e shapes `rounded | pill`. As duas APIs exigem nome acessível do grupo e recebem
options tipadas; nenhuma conhece query params ou regra de produto.

```tsx
<SegmentedControl
  aria-label="Período"
  options={rangeOptions}
  value={range}
  onChange={setRange}
/>
```

## Cabeçalhos de seção

`SectionHeader` organiza título, metadata curta e uma ação opcional sem conhecer a página ou o
domínio. O heading nativo defaults para `h2`; use `headingLevel` somente para respeitar a hierarquia
real do documento. `spacing="flush"` remove apenas o espaço superior quando o container já possui
padding próprio.

```tsx
<SectionHeader
  actions={<Button size="sm">Ver detalhes</Button>}
  headingLevel={3}
  meta="4 itens"
  spacing="flush"
  title="Fila operacional"
/>
```

O component pode quebrar title/meta/action em linhas estreitas. Copy e actions continuam sob
ownership do produto; não há props livres de tipografia ou spacing.

## Autenticação

`AuthNotice` é um aviso pequeno com tones `error | info` e props nativas de parágrafo.
`AuthTokenDigits` possui somente dígitos, sanitização, paste, backspace, foco e estado
controlled/uncontrolled. Copy, resend, Firebase, navegação e state machine ficam no produto.

```tsx
<AuthTokenDigits
  aria-label="Código de confirmação"
  digitLabel="Dígito"
  idPrefix="login-token"
  length={6}
  value={token}
  onTokenChange={setToken}
/>
```

`0.3.0` trocou `icon` mais `iconPosition` por `iconStart` e `iconEnd`, o que aceita um ícone de cada
lado e elimina a prop que só existia para modificar outra. Removeu também as classes `lsui-button`,
`lsui-button__icon` e `lsui-button__spinner`, que duplicavam os ids acima, e os atributos
`data-variant`, `data-full-width` e `data-icon-position`, que nenhum estilo, ferramenta ou produto
consumia. Testes que selecionavam por eles devem usar os ids `lsui-sc-*` ou, de preferência,
asserções de comportamento.

Quando a composição precisar de largura específica, margem ou posicionamento, use `styled(Button)`.
O `className` gerado é encaminhado até o botão nativo:

```tsx
import styled from 'styled-components'
import { Button } from '@langyspace/ui'

const CheckoutButton = styled(Button)`
  width: 12rem;
`
```

Altura, padding, tipografia, raio e cor pertencem aos contratos fechados de `size`, `variant` e, no
IconButton, `shape`; não replique essas propriedades no consumidor para conservar diferenças sutis.
Estilos locais ficam reservados para layout externo ou estados realmente contextuais. Uma
necessidade visual repetida em dois produtos deve voltar para decisão da biblioteca.

O pacote cresce em uma única direção: foundations alimentam primitives, primitives e helpers
internos alimentam atoms, e atoms podem compor molecules. O entrypoint público mantém imports de
consumo simples, sem expor a localização física de cada camada:

```text
src/
  foundations/
    actions/
    tokens.ts
  primitives/
    Pressable/
    Spinner/
  internal/
    FieldControlContext/
    IconSlot/
  atoms/
    ActionLink/
    AuthNotice/
    Avatar/
    Button/
    IconButton/
    SelectInput/
    StatusChip/
    TextareaInput/
    TextInput/
  molecules/
    ActionMenu/
    AuthTokenDigits/
    CompoundControl/
    ControlledField/
    FieldRoot/
    FilterPills/
    OperationalList/
    SearchInput/
    SectionHeader/
    SegmentedControl/
    StatePanel/
```

Cada componente mantém `index.tsx`, `styles.ts` e `types.ts` próximos quando essas responsabilidades
existem. O slot de ícone é o helper interno `IconSlot`: envolve um nó opcional sem decidir estado e
é compartilhado por Button e ActionLink, mas não é exportado enquanto não houver uso direto real
nos produtos. Tokens são públicos para composições locais que precisem respeitar as mesmas
foundations; recipes e estilos continuam privados.

## Pressable

Use `Pressable` quando a superfície é um controle específico — tab, card clicável, opção de quiz,
célula de calendário, row ou scrim — e não uma variação do botão de ação:

```tsx
import { Pressable } from '@langyspace/ui'
import { styled } from 'styled-components'

const LessonTab = styled(Pressable)`
  min-height: 2.5rem;
  padding: 0 1rem;
  border-radius: 0.75rem;
`
```

`Pressable` preserva props/ref, usa `type="button"` por padrão e fornece somente baseline de box
model, tipografia herdada, cursor, disabled e focus-visible. Geometria, seleção e visual de domínio
pertencem ao componente local. Não use Pressable para conservar uma versão quase igual do Button.

### Deliberate limits

- Use ActionLink para navegação canônica; Button não tem `as`, `asChild` nem polymorphism.
- Tabs, cards, calendário, quiz e outros controles de domínio continuam locais sobre Pressable.
- Danger, success e brand só representam os papéis semânticos documentados; não são props de cor.
- Uma nova variação exige uso real em dois produtos ou uma decisão de produto explícita.

## Development

Requirements: Node 24 and pnpm 10.33.2.

O catálogo publicado fica em <https://marcoslaboriosi.github.io/langyspace-ui/>. Ele é gerado pelo
mesmo SHA que passou no gate agregado de CI; PRs também produzem um artifact estático revisável.

```bash
pnpm install --frozen-lockfile
pnpm run lint
pnpm test
pnpm run test:coverage
pnpm run build
pnpm run check:api
pnpm run test:bundle
pnpm run test:package
pnpm run validate:ui
```

O catálogo local abre com `pnpm run storybook`. `pnpm run test:storybook` executa render,
interações e axe em Chromium; `pnpm run test:layout` constrói o catálogo, bloqueia rede externa e
audita cada story em movimento normal/reduzido nas larguras globais e boundaries declaradas por
metadata.

### Audit arquitetural

O package publica o mesmo engine usado pelos cinco produtos. Cada consumidor mantém somente um
config local com source roots, boundaries e exceções exatas; toda exceção exige path, motivo, owner
e expiração, e overrides descendentes exigem também o selector. Configs v1 antigas sem expiração
recebem warning de compatibilidade; a própria library já usa o modo estrito.

```js
import { defineAuditConfig } from '@langyspace/ui/audit'

export default defineAuditConfig({
  root: import.meta.dirname,
  allowedDirectButtonImports: [
    {
      owner: 'Product UI',
      path: 'src/components/base/Button/index.tsx',
      reason: 'layout-only composition',
      expiresAt: '2027-08-25',
    },
  ],
})
```

```bash
langyspace-ui-audit scripts/button-system.audit.config.mjs
```

O engine devolve diagnostics estruturados com rule ID, path, line e remediation. Ele bloqueia
ownership nativo fora de Pressable, spinner local, motion não classificado,
imports privados, unions copiadas, inversão de camada e overrides visuais do recipe canônico. Os
layout audits continuam locais porque conhecem rotas, fixtures e densidade de cada produto.

O maturity gate, regras de componentização e política de depreciação estão em `CONTRIBUTING.md`.

## Release

1. Atualize a versão em `package.json` usando SemVer.
2. Faça merge em `main` somente após CI verde.
3. Crie e envie a tag idêntica, por exemplo `v0.5.0`.
4. O workflow valida, empacota, calcula SHA-256 e cria o GitHub Release automaticamente.
5. Atualize consumidores explicitamente para o novo URL e lockfile.

O workflow falha se a tag e `package.json#version` divergirem.

## License

UNLICENSED. See `LICENSE`.
