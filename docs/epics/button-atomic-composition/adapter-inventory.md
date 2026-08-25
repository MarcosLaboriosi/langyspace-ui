# Inventário de adapters e boundaries

## Regra

Features importam o boundary do próprio produto. O package define a linguagem canônica de
`variant`, `tone`, `size` e `density`; adapters só traduzem uma responsabilidade de produto que não
pertence ao atom compartilhado. Tipos locais são derivados dos tipos públicos de `@langyspace/ui`.

## Landing

- `components/base/Button` é o único boundary local para Button e reexporta o atom sem alterar API.
- CTAs de navegação aprovados importam `ActionLink` diretamente porque não existe adapter de
  navegação local com responsabilidade adicional.
- `Pressable` permanece direto em controles de domínio que não são ações rotuladas.

## Admin

- `Button` traduz `leadingIcon`/`trailingIcon` para os slots canônicos e preserva o contrato local de
  label sem quebra de linha.
- `IconButton` concentra nome acessível, shape e a escala icon-only do produto.
- `TextButton` mantém a ação textual compacta usada nas superfícies densas.
- `LoadingState` compõe o `Spinner` público; não implementa animação.
- O alias `ghost` foi removido. Call sites usam `tertiary` diretamente.

## Student

- `Button` mantém apenas o adapter legado `icon` + `iconPosition` enquanto os call sites convergem
  nos slots semânticos; suas variantes e escalas vêm do package.
- `IconButton` representa a ação exclusivamente iconográfica e exige nome acessível.
- `AuthSubmitButton` e `AuthBackButton` são boundaries de fluxo, com layout e semântica próprios da
  autenticação.
- Features que antes importavam o Button compartilhado diretamente agora passam pelo boundary
  local. `Pressable` continua reservado a controles de domínio.

## Teacher

- `Button` mantém o mesmo adapter legado `icon` + `iconPosition`, com tipos derivados.
- `IconButton` concentra as ações icon-only do portal.
- `PillButton` é o controle compacto de produto e pode renderizar Button ou ActionLink. Ele não
  mantém nomes paralelos de aparência: usa `primary`, `secondary`, `tertiary`, `success` e `tone`.
- `AuthSubmitButton` e `AuthBackButton` continuam boundaries específicos do formulário público.

## Cupom

- Não há reutilização local que justifique wrapper. A página importa Button diretamente do package.

## Imports permitidos

- Dentro do package, atoms importam outros atoms apenas pelo entrypoint público do atom, nunca por
  `*/styles`.
- Landing, Admin, Student e Teacher só importam Button do package dentro dos adapters listados.
- Cupom pode importar Button diretamente enquanto houver uma única superfície.
- ActionLink pode ser importado diretamente nos call sites aprovados pelo inventário de links.
