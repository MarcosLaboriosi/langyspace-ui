# Revisão técnica

## Resultado

`aprovado com execução vertical por família e consumidor`

## Product Manager

- O objetivo é mensurável por busca estática, API pública, gates e produção.
- A migração aceita pequenas mudanças visuais porque removê-las é o resultado pedido, não uma
  regressão a esconder.
- Pressable preserva a linguagem de domínio sem multiplicar props no Button.
- O escopo não inclui reduzir ações ou reescrever fluxos.

## Tech Lead

- A dependência aponta em uma direção: consumidor -> package; Pressable não importa tema/domínio.
- Um release minor `v0.5.0` é necessário por novas exports e variantes compatíveis.
- Wrappers locais são adapters legítimos, mas não podem possuir recipe visual canônico.
- Um audit estático em cada CI é preferível a uma verificação apenas no repositório central.
- O pacote continua sem CSS global e com peer dependencies externas.

## Senior Engineer

- Trocar todos os controles por `styled(Button)` foi rejeitado porque herdaria padding/radius onde
  a superfície específica precisa ownership total.
- Trocar todos por `styled(Pressable)` foi rejeitado para ações canônicas porque conservaria
  divergências.
- A implementação deve separar patches mecânicos de mudanças semânticas para facilitar revisão.
- Classes legadas só serão removidas com prova de zero uso; selectors contextuais por `button` serão
  migrados para componentes/classes explícitos.
- TypeScript deve rejeitar `tone="brand"` fora de primary e icon-only sem nome.
- O `type="button"` padrão precisa continuar mesmo através de styled-components.

## QA

- O inventário inicial vira baseline do audit estático: 0/3, 80/7, 2/81, 2/68, 0/0.
- Landing, Admin e Cupom já têm boa cobertura das superfícies afetadas.
- Student e Teacher têm gaps concretos e recebem casos antes da validação final.
- Teste de geometry não substitui inspeção de hierarquia, contraste e densidade.
- Nenhuma assertion será relaxada para acomodar a migração.

## Acessibilidade

- Pressable fornece foco mínimo; componentes específicos podem reforçá-lo, não removê-lo.
- Icon-only exige nome acessível no package e nos wrappers.
- Scrim continua com nome/semântica apropriados e não vira CTA.
- Links permanecem links mesmo quando têm aparência de Button.
- Loading mantém label e busy; disabled não substitui explicação inline.

## Performance

- Pressable adiciona um styled component reutilizado, sem runtime de tema ou rede.
- React/styled-components permanecem peers e externos ao bundle.
- A substituição reduz CSS duplicado de ações; não adiciona provider ou contexto.
- Os gates amplos rodam uma vez por consumidor depois dos checks focados.

## Operação e rollback

- Worktrees isolados protegem Teacher sujo e qualquer avanço concorrente.
- Release precede upgrades; nenhum consumidor aponta para branch ou arquivo local.
- Push é fast-forward e sem force.
- Produção é Hosting-only; rollback é por URL/lockfile e redeploy.

## Ordem aprovada

1. fechar docs e inventário;
2. implementar/testar package;
3. publicar artefato;
4. Landing;
5. Admin por famílias;
6. Student por base, ações e específicos;
7. Teacher por base, ações e específicos;
8. Cupom;
9. gates completos e revisão cross-repo;
10. commits, mains, CI, produção e prova pública.

Essa ordem evita que consumidores dependam de API não publicada e limita o diagnóstico a uma
fronteira por vez.
