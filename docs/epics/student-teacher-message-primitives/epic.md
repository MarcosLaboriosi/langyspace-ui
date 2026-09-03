# Epic: primitives de mensagens

## Problema

Student e Teacher precisam renderizar a mesma conversa pedagógica sem duplicar bolhas, composer,
estados de envio e regras básicas de acessibilidade. A library ainda oferece os atoms necessários,
mas não essas duas composições.

## Objetivo

Publicar `MessageBubble` e `MessageComposer` como molecules product-agnostic de
`@langyspace/ui@1.5.0`, prontas para consumo posterior pelos portais.

## Escopo

- duas molecules com APIs semânticas estreitas;
- stories, testes, component manifest, browser/SSR/package smoke e API snapshot;
- audit visual para estados e conteúdo extremo;
- documentação pública e candidate tarball;
- tag/release imutável somente após autorização explícita de publicação.

## Fora de escopo

Firebase, listeners, navegação, lista de conversas, participantes, retry, persistência, tradução,
formatação de horário, ícones próprios ou regras de elegibilidade.

## Sucesso

- os dois componentes passam testes, cobertura, API, bundle, package e SSR;
- nenhum stylesheet global ou dependência runtime nova é introduzido;
- texto de 1.000 caracteres e valor sem espaços não causam overflow em 390, 1281 ou 2048 px;
- composer mantém semântica nativa de form, foco visível, erro associado e submit protegido nos
  estados vazio, acima do limite, disabled e loading;
- um tarball `1.5.0` verificado fica pronto para release imutável.

## Impacto visual

Classificação `direct`: componentes novos alteram UI e interação quando consumidos. Nesta library,
as superfícies afetadas são as stories de `MessageBubble` e `MessageComposer`. Estados: incoming,
outgoing, sending, sent, failed, multiline, texto máximo, URL sem espaços, vazio, disabled, loading
e error. Larguras: 390, 768, 1281 e 2048 px; screenshots em 390, 1281 e 2048 px.
