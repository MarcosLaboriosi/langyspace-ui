# T02 — criar o atom Spinner

Status: concluída.

## Responsabilidade

Extrair Spinner como atom público e tornar Icon novamente um wrapper puro.

## Escopo

- criar pasta, componente, styles, types e testes de Spinner;
- implementar current color, tamanho aprovado e reduced motion;
- compor Button com Spinner no slot direito, preservando label, ícone esquerdo e busy/disabled;
- remover loading de Icon;
- compor Button pelo componente Pressable, não por `Pressable/styles`;
- atualizar exports, README, showcase e SSR/package smoke.

## Checklist

- [x] API pública mínima e types fechados;
- [x] invariant decorativo/a11y documentado;
- [x] testes normal/reduced motion/icon slots/icon-only;
- [x] component IDs e SSR estáveis;
- [x] diff revisado sem prop livre ou dependência nova.

## Conclusão

O package possui `Spinner` independente; Button preserva seu contrato e Icon não conhece loading.

## Validação focada

- unit/type tests de Spinner, Icon e Button;
- `pnpm run lint`;
- `pnpm run build`;
- `pnpm run test:package`;
- focused layout do showcase em motion normal/reduzido.
