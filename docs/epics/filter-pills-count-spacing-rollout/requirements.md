# Requisitos — espaçamento de contador no FilterPills

## Funcionais

- RF1 — opções com `counts` exibem separação consistente entre label e badge.
- RF2 — o espaçamento funciona para `size="sm"` e `size="md"`.
- RF3 — seleção, `aria-pressed`, disabled, click, scroll e wrap permanecem equivalentes.
- RF4 — consumidores não precisam alterar props ou markup.

## Não funcionais

- RNF1 — usar somente tokens existentes do design system.
- RNF2 — não alterar exports, tipos ou dependências.
- RNF3 — manter foco visível, hit target e nomes acessíveis.
- RNF4 — preservar alterações alheias nos worktrees de UI e Admin.
- RNF5 — release e consumo usam URL imutável; deploy limita-se a `hosting:admin`.

## Critérios de aceite

1. `Todos` e `175` não se encostam em capturas móveis e desktop.
2. Um teste falha se `display: inline-flex` ou o `gap` de 8 px forem removidos.
3. Storybook cobre contador ativo e inativo em `sm`, `md` e largura estreita.
4. `pnpm run validate:ui` da library passa.
5. Release `v1.4.1` publica `.tgz` e `.sha256` verificáveis anonimamente.
6. Admin instala `v1.4.1`, valida, chega à `main` e é publicado no site `langyspace-admin`.
7. Rotas públicas do Admin respondem HTTP 200 e o bundle servido confere com o build publicado.

## Riscos e bordas

- o aumento de largura pode revelar overflow em superfícies estreitas; scroll e wrap devem continuar
  sem colisão;
- o workflow Admin pode falhar antes de iniciar jobs; nesse caso, usar somente o fallback Hosting já
  autorizado, após gates locais;
- nunca incluir as mudanças paralelas em `.agents/skills` nos commits deste rollout.
