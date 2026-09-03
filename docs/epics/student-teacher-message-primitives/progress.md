# Progresso: primitives de mensagens

## Estado atual

T01.1 a T01.4 concluídas a partir do checkout `main` limpo e sincronizado com `origin/main` em
`e77933684c84fb69e3b65a7efa4ec20753f8a3ae`.

## Concluído

- contratos, tokens, testes, stories, manifest, API snapshot, budgets, package smoke e workflow de
  release inspecionados;
- precedente do chat Student Live conferido apenas como consumer; lógica de domínio não entra na
  library;
- API pública proposta e revisão crítica registradas;
- versão minor candidata definida como `1.5.0`.
- `MessageBubble` implementada como molecule sem domínio, com sides incoming/outgoing, horário
  semântico, status rotulado, ref/props nativas e quebra de conteúdo extremo;
- `MessageComposer` implementado como form controlado, sem estado duplicado, com copy/ícone do
  consumer, contador, erro associado e bloqueio de submits inválidos;
- 2 testes focados de `MessageBubble`, 3 de `MessageComposer` e o typecheck passaram.
- a API aditiva foi revisada como minor: 29 values, 83 types e 102 declarations;
- a primeira medida de bundle registrou library em 83.014 raw/18.248 gzip e molecules em
  71.769 raw/16.012 gzip; os budgets foram recalibrados com margem pequena para 84.500/18.600 e
  73.500/16.500, sem alterar os slices não afetados.
- exports, manifest, API snapshot, bundle entries, package smoke e SSR smoke foram integrados;
- `pnpm run validate:ui` passou por arquitetura, lint, formato, types, 226 testes, cobertura,
  build, API pública, budgets, package/SSR smokes e Storybook;
- a auditoria visual passou em 1.002 cenários de 111 stories, sem ocorrências; as capturas de
  `MessageBubble` e `MessageComposer` foram inspecionadas em 390, 1281 e 2048 px.

## Próxima subtask

T01.5 — produzir o candidate `1.5.0` e, com autorização explícita, publicar release imutável.

## Bloqueadores

Nenhum para o código e o push. Tag, publicação do pacote e GitHub Release exigem autorização
explícita adicional e serão tratados somente na T01.5.
