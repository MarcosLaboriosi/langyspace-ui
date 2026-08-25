# T05 — migrar links de ação comprovados

Status: concluída.

## Responsabilidade

Remover recipes duplicados apenas onde ActionLink expressa a semântica real.

## Escopo

- migrar CTAs canônicos aprovados do Landing;
- migrar links pós-pagamento/suporte aprovados do Student;
- migrar links rotulados de Meet/material no Teacher;
- retirar o caminho anchor e o spinner duplicado de PillButton;
- preservar floating WhatsApp, icon links, chips e CTAs especiais que falhem na equivalência.

## Checklist

- [x] inventário resolvido item a item;
- [x] href/target/rel e navegação preservados;
- [x] copy, icon placement e accessible names preservados;
- [x] nenhuma full reload nova em rota que usava router;
- [x] screenshots antes/depois equivalentes.

## Conclusão

Links canônicos usam ActionLink; componentes específicos restantes têm justificativa de produto.

## Validação focada

- focused tests de navegação e atributos externos;
- builds Landing/Student/Teacher;
- focused layout nas rotas e larguras mapeadas.
