# Epic — espaçamento de contador no FilterPills

## Problema

O `FilterPills` declara `gap`, mas seus itens não criam um contexto flex. Quando uma opção possui
contador, o rótulo e o badge ficam visualmente encostados, como em `Todos 175` no Admin.

## Objetivo

Corrigir o recipe compartilhado, publicar uma patch release imutável e colocar o Admin em produção
consumindo essa versão.

## Escopo

- tornar cada item do `FilterPills` um `inline-flex` centralizado;
- aplicar o token de espaçamento entre rótulo e contador em `sm` e `md`;
- manter API, semântica, estados e comportamento responsivo;
- publicar `@langyspace/ui@1.4.1` em GitHub Release;
- fixar o artifact imutável no Admin e publicar somente `hosting:admin`.

## Fora de escopo

- migrar filtros locais que não usam `FilterPills`;
- alterar labels, contagens, regras de filtro ou outros componentes;
- publicar Functions, Rules, dados ou mensagens.

## Jornada e impacto visual

Classificação: `direct`. Afeta qualquer `FilterPills` com contador, principalmente as filas do
Admin. Estados cobertos: ativo, inativo, disabled, `sm`, `md`, scroll e wrap. Extremos: contador de
três dígitos, superfície estreita e sequência completa de opções. Larguras representativas: 390,
1281 e 2048 px.

## Sucesso

1. Rótulo e contador possuem 8 px reais de separação em ambos os tamanhos.
2. Testes, package smoke, API e layout audit passam sem mudança pública de contrato.
3. `v1.4.1` possui asset e checksum públicos e imutáveis.
4. Admin fixa `v1.4.1`, passa os gates aplicáveis e serve o bundle correspondente no Hosting live.
