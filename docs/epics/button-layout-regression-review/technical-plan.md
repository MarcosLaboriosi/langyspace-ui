# Plano técnico

## Diagnóstico confirmado

| Superfície              | Antes                       | Depois de v0.5.0            | Decisão                         |
| ----------------------- | --------------------------- | --------------------------- | ------------------------------- |
| Teacher `PillButton md` | 40 px, 14 px, padding 16 px | 40 px, 16 px, padding 20 px | `density="compact"`             |
| Teacher footer          | três ações em linha         | wrap 2+1                    | linha sem wrap; pilha mobile    |
| Teacher audit `/`       | conteúdo real/mock          | loading não resolvido       | mock ready síncrono + interação |
| Admin professora 390    | ação podia escapar          | label quebra em duas linhas | pilha uniforme mobile           |
| Student base Button     | 32/40/48 regular            | mesmas métricas             | preservar                       |

## Package

- adicionar `ButtonDensity` aos tipos públicos;
- resolver styles por `size + density`, mantendo o mapa atual para regular;
- compact: `sm` equivalente ao atual; `md` 40/14/padding 16; `lg` 48/16/padding 20;
- aplicar `white-space: nowrap` e remover quebra forçada do recipe;
- expor `data-density` para audit/debug sem vazar transient props;
- atualizar tests, README/showcase e stress fixture.

## Teacher

- adaptar `PillButton` ao novo density sem expor geometria livre;
- `ClassDrawer.Footer`: desktop `nowrap`; mobile coluna com filhos stretch;
- manter prompt de falta como composição local independente;
- em design mock, retornar `getMockTodayPageData` antes de qualquer serviço remoto;
- criar caso `class-drawer-attendance` no audit e uma interação determinística que abre aula passada;
- adicionar assertions do grupo: label em uma linha; mesmo topo no desktop; largura uniforme na pilha.

## Admin

- `PortalAction` escolhe density compacta para `.pill` e remove CSS duplicado de métricas;
- o action row de professora muda para coluna em 390/até breakpoint aprovado;
- footer genérico com três ou mais ações empilha no mobile; duas ações podem continuar lado a lado;
- remover `white-space: normal` de botões de ação;
- ampliar fixture/assertion somente nas superfícies comprovadas.

## Validação dos demais produtos

- Landing: focused audit de How/Quiz/Shadowing e build/SSR se o package mudar;
- Student: focused audit de pagamento/checkout/perfil e build com recipe regular;
- Cupom: report normal/stress e build;
- nenhuma alteração de produto será feita sem falha reproduzida ou dependência de versão.

## Sequência de integração

1. validar package localmente e gerar tarball;
2. testar consumidores contra o tarball local em worktrees isolados;
3. concluir gates e screenshot review;
4. publicar patch imutável e verificar checksum/smoke;
5. substituir referências locais pela URL imutável, frozen install e revalidar;
6. commits por repositório, ancestry check, push sem force, CI/Hosting e prova pública.

## Riscos e mitigação

| Risco                                       | Mitigação                                                         |
| ------------------------------------------- | ----------------------------------------------------------------- |
| nowrap causar overflow                      | containers auditados mudam para pilha explícita                   |
| compact virar escape hatch                  | union fechada e métricas internas ao package                      |
| fixture Teacher voltar a loading            | ready mock retorna antes dos services e tem assertion de conteúdo |
| regra genérica afetar drawers de duas ações | aplicar somente a grupos com 3+ filhos e screenshot dedicado      |
| alterar Student indiretamente               | default regular + snapshots/screenshots de controle               |
| esconder nova quebra com CSS local          | computed geometry e screenshot de contexto, não só route load     |

## Revisão crítica

- Rejeitado: voltar o `Button md` global a 14/16, pois isso mudaria Student e ações regulares válidas.
- Rejeitado: resolver apenas o screenshot com padding local, pois preservaria um recipe clandestino.
- Rejeitado: permitir quebra de texto, pois gera alturas e hierarquia imprevisíveis.
- Rejeitado: um `ActionGroup` compartilhado agora; os breakpoints e semântica ainda pertencem aos
  layouts de produto e há somente duas composições comprovadas.
- Aprovado: uma prop de densidade limitada, dois adapters locais e fixtures que exercitam o estado
  real que falhou.
