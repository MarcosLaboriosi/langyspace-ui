# @langyspace/ui

Biblioteca React compartilhada pelos produtos Langy.space. O v1 contém somente um `Button`
pequeno, nativo e explícito.

## Installation

Instale styled-components e fixe sempre um artefato imutável de release:

```bash
pnpm add styled-components@^6.4.0 '@langyspace/ui@https://github.com/MarcosLaboriosi/langyspace-ui/releases/download/v0.4.0/langyspace-ui-0.4.0.tgz'
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
    </>
  )
}
```

### Props

| Prop        | Contract                                            | Default   |
| ----------- | --------------------------------------------------- | --------- |
| `variant`   | `primary`, `secondary`, `tertiary`                  | `primary` |
| `size`      | `sm`, `md`, `lg`                                    | `md`      |
| `fullWidth` | boolean                                             | `false`   |
| `iconStart` | one React node before the label                     | none      |
| `iconEnd`   | one React node after the label                      | none      |
| `shape`     | `pill`, `rounded`                                   | `pill`    |
| `iconOnly`  | square control whose children is the icon           | `false`   |
| `isLoading` | keeps label, sets busy/disabled and renders spinner | `false`   |

Todas as props nativas de `<button>`, `className` e refs são preservadas: elas seguem direto no
spread, sem repasse manual. O `type` default é `button`, nunca `submit` implícito. Para ocupar o
container, prefira a prop explícita:

```tsx
<Button fullWidth>Continuar</Button>
```

Enquanto `isLoading` está ativo o botão fica `disabled` e `aria-busy`, mantém o label e mostra um
único spinner: no lado inicial quando `iconStart` existe, senão no final. O ícone substituído
desaparece; o do outro lado permanece.

Para um controle só de ícone, use `iconOnly` e passe o ícone como children. Ele fica quadrado na
altura do `size`, e o raio pill entrega o círculo sem precisar de prop de forma:

```tsx
<Button aria-label="Tocar áudio" iconOnly>
  <PlayIcon />
</Button>
```

O TypeScript exige `aria-label` nesse modo e recusa `iconStart`/`iconEnd`: sem label visível o ícone
é o conteúdo, e o nome acessível precisa vir de algum lugar.

### Contrato de markup

O botão renderiza `class="lsui-sc-button <classe gerada> <className do consumidor>"`, mais
`data-size` sempre e `data-loading="true"` enquanto carrega. É só isso que é contrato:

| Marca                                               | Para que serve                                              |
| --------------------------------------------------- | ----------------------------------------------------------- |
| `lsui-sc-button`, `lsui-sc-icon`, `lsui-sc-spinner` | ids declarados no source, para seleção em teste e auditoria |
| `data-size`                                         | a auditoria confere a altura mínima esperada por tamanho    |
| `data-loading`                                      | os estilos do próprio botão dependem dele                   |

Não estilize por essas marcas: para composição use `styled(Button)`.

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

Altura, padding, tipografia, raio e os tons neutros pertencem a `size` e `variant`; não replique
essas propriedades no consumidor para conservar diferenças sutis. Estilos locais ficam reservados
para layout externo ou estados realmente contextuais, como `aria-pressed` sobre uma superfície
inversa. Uma necessidade visual repetida em dois produtos deve voltar para decisão da biblioteca.

O componente mantém implementação, estilos e tipos separados:

```text
src/Button/
  index.tsx
  styles.ts
  types.ts
```

O slot de ícone é o componente `Icon`, em `src/Icon/`, porque ele não depende do Button: envolve um
nó qualquer ou mostra o spinner. Ele não é exportado pelo pacote enquanto não houver um segundo uso
real.

### Deliberate limits

- Use links para navegação; o Button v1 não tem `as`, `asChild` nem polymorphism.
- Danger, brand tone, icon-only e tabs continuam locais até existir necessidade transversal.
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
3. Crie e envie a tag idêntica, por exemplo `v0.4.0`.
4. O workflow valida, empacota, calcula SHA-256 e cria o GitHub Release automaticamente.
5. Atualize consumidores explicitamente para o novo URL e lockfile.

O workflow falha se a tag e `package.json#version` divergirem.

## License

UNLICENSED. See `LICENSE`.
