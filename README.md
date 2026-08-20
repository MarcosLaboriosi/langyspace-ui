# @langyspace/ui

Biblioteca React compartilhada pelos produtos Langy.space. O v1 contém somente um `Button`
pequeno, nativo e explícito.

## Installation

Instale styled-components e fixe sempre um artefato imutável de release:

```bash
pnpm add styled-components@^6.4.0 '@langyspace/ui@https://github.com/MarcosLaboriosi/langyspace-ui/releases/download/v0.2.0/langyspace-ui-0.2.0.tgz'
```

Não existe import de CSS. O Button injeta seus estilos com styled-components e funciona sem
ThemeProvider. Não é necessário `.npmrc`, token npm ou token GitHub para instalar o release público.

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

| Prop           | Contract                                            | Default   |
| -------------- | --------------------------------------------------- | --------- |
| `variant`      | `primary`, `secondary`, `tertiary`                  | `primary` |
| `size`         | `sm`, `md`, `lg`                                    | `md`      |
| `fullWidth`    | boolean                                             | `false`   |
| `icon`         | one React node                                      | none      |
| `iconPosition` | `start`, `end`                                      | `end`     |
| `isLoading`    | keeps label, sets busy/disabled and renders spinner | `false`   |

Todas as props nativas de `<button>`, `className` e refs são preservadas. O `type` default é
`button`, nunca `submit` implícito. Para ocupar o container, prefira a prop explícita:

```tsx
<Button fullWidth>Continuar</Button>
```

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
3. Crie e envie a tag idêntica, por exemplo `v0.2.0`.
4. O workflow valida, empacota, calcula SHA-256 e cria o GitHub Release automaticamente.
5. Atualize consumidores explicitamente para o novo URL e lockfile.

O workflow falha se a tag e `package.json#version` divergirem.

## License

UNLICENSED. See `LICENSE`.
