# @langyspace/ui

Biblioteca React compartilhada pelos produtos Langy.space. O v1 contém somente um `Button`
pequeno, nativo e explícito.

## Installation

Fixe sempre um artefato imutável de release:

```bash
pnpm add '@langyspace/ui@https://github.com/MarcosLaboriosi/langyspace-ui/releases/download/v0.1.0/langyspace-ui-0.1.0.tgz'
```

Importe o CSS uma vez no entrypoint do app:

```tsx
import '@langyspace/ui/styles.css'
```

Não é necessário `.npmrc`, token npm ou token GitHub para instalar o release público.

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

Todas as props nativas de `<button>` e refs são preservadas. O `type` default é `button`, nunca
`submit` implícito.

O CSS usa seletores `:where(...)` com especificidade zero. Uma classe local pode ajustar uma
composição específica sem `!important`:

```css
.campaign-range-button {
  color: #ffffff;
  background: transparent;
}
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
3. Crie e envie a tag idêntica, por exemplo `v0.1.0`.
4. O workflow valida, empacota, calcula SHA-256 e cria o GitHub Release automaticamente.
5. Atualize consumidores explicitamente para o novo URL e lockfile.

O workflow falha se a tag e `package.json#version` divergirem.

## License

UNLICENSED. See `LICENSE`.
