# Proposal — seleção em lote para listas operacionais

## Status

`discovery only`. Nenhuma prop, export ou implementação entra em `@langyspace/ui` por este
documento.

## Caso observado

A tabela de Cobranças ativa seleção em lote somente na fila `gerar_invoice`. O fluxo atual exige:

- entrar e sair explicitamente do modo de lote;
- selecionar até 20 resultados visíveis e elegíveis;
- selecionar ou limpar todos os itens elegíveis do viewport;
- desabilitar linhas que não podem gerar invoice;
- bloquear filtros enquanto existe seleção;
- manter resumo e comando de execução fora da tabela;
- persistir uma execução por até oito horas e reconciliar resultados interrompidos.

Somente os quatro primeiros pontos são apresentação de seleção. Limite, elegibilidade, filtros,
snapshot, execução, persistência, reconciliação e mensagens pertencem ao Admin.

## Por que o V1 não basta

Uma coluna comum já consegue renderizar um checkbox por item, mas o contrato atual não possui:

- controle de seleção no header;
- estado `checked`, `mixed` e `disabled` do grupo;
- semântica comum para selecionar resultados visíveis;
- recipe de target, alinhamento e associação do checkbox em cards.

Mover o checkbox mestre para uma toolbar externa seria tecnicamente possível, mas mudaria a
hierarquia aprovada do fluxo de Cobranças. A T08 não autoriza essa alteração de produto.

## Boundary proposto

Se o spike confirmar a necessidade, a extensão deve ser controlada e estritamente visual:

```ts
interface OperationalListSelection<Item> {
  getItemLabel: (item: Item, index: number) => string
  isItemDisabled?: (item: Item, index: number) => boolean
  isItemSelected: (item: Item, index: number) => boolean
  onItemToggle: (item: Item, index: number) => void
  visibleGroup: {
    checked: boolean
    disabled?: boolean
    indeterminate?: boolean
    label: string
    onToggle: () => void
  }
}
```

O nome e o shape são apenas hipótese para o spike. A API publicada não deve carregar `limit`,
`selectedKeys`, invoice, paginação, execução ou comandos de provider. O consumer continua dono do
estado e fornece todos os valores derivados.

## Semântica e comportamento a provar

- header checkbox dentro de `th`, com accessible name e estado mixed;
- checkbox de item dentro de `td`, associado ao row header e ao column header;
- Espaço alterna somente o checkbox focado e não aciona navegação da linha;
- select-all afeta apenas o conjunto visível informado pelo consumer;
- itens disabled continuam legíveis e não entram no estado mixed;
- cards de uma e duas colunas mantêm checkbox, identidade e ações sem sobreposição;
- seleção permanece controlada quando itens somem por filtro ou paginação;
- SSR e hydration não dependem de storage ou estado de provider.

## Spike blocking

Antes de qualquer mudança pública:

1. montar uma story privada com 0, 1, mixed, all, disabled e limite atingido;
2. provar roles/labels/Space com Playwright e axe em 390, 768 e 1281 px;
3. comparar header checkbox com toolbar externa nas capturas;
4. validar Cobranças nas filas normal e `gerar_invoice`, sem duplicar duas tabelas interativas;
5. revisar o contrato e publicar somente em nova versão minor, se aprovado.

## Decisão T08

Cobranças permanece local até esse spike. As filas sem bulk não serão migradas isoladamente se isso
obrigar o mesmo callsite a manter dois recipes responsivos concorrentes.
