# Revisão crítica de produto e UX

## Product Manager

### Objeção: a family tem apenas um produto consumidor

Um componente compartilhado não deve existir somente porque há repetição interna no Admin.

### Resolução

O maturity gate não usa quantidade de repositórios como único critério. Há 16 tabelas e duas listas
ativas resolvendo o mesmo problema operacional. O contrato será product-agnostic e testado em duas
rotas materialmente diferentes antes do tag. Se a segunda rota exigir props de domínio ou escape
hatches, a promoção é cancelada e o código permanece local.

## Design System Architecture

### Objeção: `OperationalList` pode virar um data grid genérico

Columns, sorting, actions e responsive behavior podem crescer indefinidamente.

### Resolução

O V1 não possui data source, bulk selection, editing, virtualization, resizing ou arbitrary CSS.
Ele possui somente presentation e interaction já repetidas. Novas capacidades exigem novo
inventário e mudança pública deliberada; a fila de cobranças não dita o V1.

### Objeção: “específico para Admin” contradiz a biblioteca product-agnostic

### Resolução

Admin é o piloto e o principal caso de uso, não parte do nome, copy ou tipos. Os nomes públicos são
`OperationalList` e `ActionMenu`; nenhum export se chama Student, Teacher, Billing, Lead ou Admin.

## UX/UI

### Objeção: remover click na linha deixa a operação mais lenta

Algumas tabelas hoje abrem drawer ao clicar em qualquer parte da linha.

### Resolução

O V1 usa ação primária clara na célula principal e mantém quick actions. Isso elimina conflitos com
botões internos e melhora previsibilidade de teclado. O piloto mede densidade e velocidade. Uma
surface inteira clicável só será adicionada se houver semântica acessível comprovada, não por
conveniência de mouse.

### Objeção: uma regra única de breakpoint pode piorar tabelas financeiras

### Resolução

O componente usa container query e importâncias semânticas de coluna. O piloto define o recipe
canônico; cobranças só migra depois de revisão visual própria. Não haverá prop livre de breakpoint.

## Accessibility

### Objeção: transformar table em cards pode destruir semântica

### Resolução

O DOM continua usando `table`, `thead`, `tbody`, `tr`, `th` e `td`; apenas a apresentação muda.
Labels compactos são decorativos e derivados dos headers. Browser/axe tests inspecionam roles nas
duas apresentações. Se um browser suportado perder semântica com `display`, cards e adoção Admin
ficam bloqueados; dual markup interativo e suppression não são fallbacks aceitos. Scroll tabular
mantém apenas o spike operável e não satisfaz o aceite visual do V1.

### Objeção: menu baseado em array costuma falhar em teclado e foco

### Resolução

Focus management é responsabilidade central do `ActionMenu`, com tests de trigger, setas,
Home/End, Escape, click externo, disabled/loading e retorno de foco. O Admin não implementa esses
listeners.

## Engenharia de produto

### Objeção: renderer por coluna permite qualquer coisa e torna a API impossível de garantir

### Resolução

Renderer é necessário porque o package não conhece Avatar+nome, status, invoice ou professora. A
biblioteca garante o container, a célula e o label; o consumer garante o conteúdo. Stories incluem
nodes compostos, texto extremo e controles interativos para provar os limites.

### Objeção: `getActions(item, index)` recria arrays e callbacks em toda renderização

### Resolução

O custo é pequeno frente às listas atuais e simplifica ações condicionais. O componente não usa a
identidade do array como estado. Performance é medida com fixture densa; memoização só entra se a
medição comprovar gargalo.

## Segurança e privacidade

### Objeção: stories de Admin podem publicar dados reais

### Resolução

Stories usam nomes, telefones, IDs e valores sintéticos. Nenhuma fixture de produção, URL assinada,
provider ID real ou dado pessoal entra no repositório/package.

## Operações

### Objeção: publicar antes de migrar o consumer pode cristalizar uma API errada

### Resolução

O candidate tarball é instalado em Leads e Alunos antes do tag. O release minor só ocorre depois
dos dois gates completos e de diff/API review. A URL imutável é instalada depois do tag e o Admin
é validado novamente.

## Veredito

Plano aprovado com condição: nenhuma fila financeira entra no contrato inicial e o release depende
de duas adoções reais, não apenas do Storybook.
