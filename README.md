# @langyspace/ui

Biblioteca React compartilhada pelos produtos Langy.space. Expõe `Button` para comandos rotulados,
`IconButton` para comandos de glyph único, `ActionLink` para navegação com aparência de ação,
`Pressable` para controles específicos, `Spinner` para espera e pequenas composições semânticas de
status e estado de conteúdo.

## Installation

Instale styled-components e fixe sempre um artefato imutável de release:

```bash
pnpm add styled-components@^6.4.0 '@langyspace/ui@https://github.com/MarcosLaboriosi/langyspace-ui/releases/download/v1.0.0/langyspace-ui-1.0.0.tgz'
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

### Contrato de markup

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
    IconSlot/
  atoms/
    ActionLink/
    Button/
    IconButton/
  molecules/
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

```bash
pnpm install --frozen-lockfile
pnpm run lint
pnpm test
pnpm run build
pnpm run test:package
pnpm run validate:ui
```

O showcase local abre com `pnpm exec vite`. A auditoria bloqueia rede externa e cobre os modos
normal/stress nas larguras de aceitação dos produtos.

## Release

1. Atualize a versão em `package.json` usando SemVer.
2. Faça merge em `main` somente após CI verde.
3. Crie e envie a tag idêntica, por exemplo `v0.5.0`.
4. O workflow valida, empacota, calcula SHA-256 e cria o GitHub Release automaticamente.
5. Atualize consumidores explicitamente para o novo URL e lockfile.

O workflow falha se a tag e `package.json#version` divergirem.

## License

UNLICENSED. See `LICENSE`.
