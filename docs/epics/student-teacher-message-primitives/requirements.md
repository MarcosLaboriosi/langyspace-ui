# Requisitos: primitives de mensagens

## MessageBubble

- aceita `side: incoming | outgoing`, default `incoming`;
- recebe conteúdo por `children`, horário já formatado por `timestamp` e `dateTime` opcional;
- status é ausente ou um par obrigatório `status + statusLabel`, com
  `sending | sent | failed`;
- preserva props nativas e ref de `<article>`;
- usa `<time>`, quebra whitespace/linhas e valores sem espaços;
- não conhece papel, nome, ID, locale, backend ou regra de leitura.

## MessageComposer

- é um `<form>` controlado com `value`, `onValueChange` e `onSubmit` sem event leakage;
- copy e ícone vêm do consumer: `textareaLabel`, `submitLabel`, `submitIcon`, `placeholder`,
  `helperText` e `error`;
- aceita `maxLength`, default 1.000, e mostra contador;
- bloqueia submit para valor vazio/whitespace, acima do limite, disabled ou loading;
- preserva texto multiline; Enter continua nativo da textarea e o botão envia pelo teclado;
- loading bloqueia textarea/botão, marca o form busy e preserva o nome acessível;
- erro é `role=alert` e textarea recebe `aria-invalid`/`aria-describedby`;
- preserva props nativas e ref de `<form>`;
- não limpa valor, faz trim, retry, persistência ou chamada de rede.

## Compatibilidade e qualidade

- mudança aditiva minor: `1.4.1 -> 1.5.0`;
- styled-components continua peer e cada root ganha `componentId` explícito;
- ambos entram no component manifest, root exports, API snapshot, slice `molecules`, browser smoke e
  SSR smoke;
- stories não dependem de rede nem vazam para o tarball;
- nenhum budget é aumentado sem medida e justificativa concreta.

## Critérios de aceite

- tipos recusam `status` sem `statusLabel` e `statusLabel` sem `status`;
- submit ocorre uma vez por ação e não ocorre nos quatro estados bloqueados;
- helper/error/counter formam uma descrição acessível estável;
- stories cobrem todas as variantes previstas e o audit não encontra overflow;
- o pacote instalado por tarball importa, prerenderiza e inclui os dois markers.
