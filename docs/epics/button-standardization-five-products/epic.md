# Padronização de botões nos cinco produtos

## Problema

Os cinco produtos Langy.space já consomem `@langyspace/ui`, mas a adoção cobre apenas parte das
ações. O inventário de `origin/main` em 24 de agosto de 2026 encontrou:

| Produto | `<button>` em código de produção | `styled.button` | Situação do pacote |
| ------- | -------------------------------: | --------------: | ------------------ |
| Landing |                                0 |               3 | `v0.4.0`           |
| Admin   |                               80 |               7 | `v0.4.1`           |
| Student |                                2 |              81 | `v0.2.1`           |
| Teacher |                                2 |              68 | `v0.2.1`           |
| Cupom   |                                0 |               0 | `v0.2.1`           |

Parte dessas diferenças representa controles realmente distintos, como tabs, cards clicáveis,
opções de quiz e células de calendário. Outra parte replica o mesmo botão de ação com alturas,
paddings, raios, cores e estados levemente diferentes. Sem uma decisão explícita, qualquer migração
mecânica produziria um `Button` excessivamente configurável ou conservaria a divergência sob novos
nomes.

## Objetivo

Fazer todo botão nativo de produção nos cinco produtos nascer de um componente do design system,
mantendo duas famílias deliberadas:

1. `Button` para comandos canônicos com hierarquia e estado semânticos;
2. `Pressable` como primitive mínima para componentes específicos cuja superfície não é um botão de
   ação canônico.

A migração deve remover diferenças históricas sem justificativa, preservar diferenças funcionais
reais, publicar um único artefato imutável e levar os cinco `main` até produção com evidência visual.

## Impacto visual

`direct` — a composição, geometria, cores, foco, loading, disabled, hover e densidade de ações mudam
em rotas públicas e autenticadas dos cinco produtos.

### Superfícies afetadas

- Landing: `/`, `/aulas-de-ingles-online`, `/termos` e `/privacidade`;
- Admin: `/login`, `/`, `/leads`, `/alunos`, `/professoras`, `/agenda`, `/marketing`,
  `/financeiro` e `/configuracoes`, incluindo dialogs, drawers, buscas e execução em lote;
- Student: autenticação/cadastro, `/comecar`, `/`, `/aulas`, `/licoes`, `/vocabulario`, `/planos`,
  `/pagamento`, `/perfil`, checkout e estados de portal;
- Teacher: `/login`, `/cadastro`, `/`, `/calendario`, `/materiais`, apresentação, `/alunos`, previews
  de lições/vocabulário, `/repasses`, disponibilidades e drawers do shell;
- Cupom: `/relatorio/:id` e fallbacks públicos de redirect.

### Estados de risco

- labels longas e tokens sem quebra;
- ações compactas, grupos densos e icon-only;
- loading, disabled, pressed/selected, hover, focus e reduced motion;
- primary/secondary/tertiary, brand, success e danger;
- dialogs, drawers, scrims, cards/rows clicáveis, quiz, flashcards, calendário e apresentação;
- vazio, erro, parcial, conteúdo máximo e permissões diferentes já exercitados pelos mocks locais.

### Larguras

Os gates existentes usam 390, 768, 1280, 1281, 1440, 1536, 1551, 1552 e 2048 px conforme cada
produto. A inspeção final obrigatória usa 390, o boundary mais denso de 1281 e 2048 px; Teacher
mantém também o caso compacto 390x667 quando aplicável.

## Escopo

- evoluir `@langyspace/ui` sem dependência de tema de consumidor;
- incluir semântica transversal comprovada sem criar props de geometria arbitrária;
- incluir uma primitive compartilhada para componentes interativos específicos;
- migrar componentes base e todos os botões nativos de produção nos cinco consumidores;
- remover CSS legado de botão que ficar sem consumidor;
- adicionar uma auditoria estática contra regressão;
- completar testes, builds, gates visuais, release, commits, push, `main`, CI, Hosting e verificação
  pública.

## Fora de escopo

- redesenhar fluxos, copy, navegação ou regras de negócio;
- transformar links de navegação em botões;
- mover tabs, cards, calendário, quiz ou controles de domínio para a biblioteca compartilhada;
- criar prop de cor livre, altura livre, padding livre, raio livre, `css`, tema global ou variante
  por produto;
- alterar Firebase, Functions, Firestore, billing, auth, Calendar/Meet ou dados de produção.

## Jornada esperada

1. A pessoa encontra a mesma hierarquia de ação nos cinco produtos.
2. Ação principal, alternativa, baixa ênfase, institucional, destrutiva e de conclusão têm contratos
   previsíveis.
3. Loading mantém nome e dimensão; disabled não simula loading; foco permanece visível.
4. Controles de domínio continuam reconhecíveis no contexto, mas herdam a base de interação do
   design system.
5. Nenhuma rota muda de comportamento, destino ou permissão por causa da migração.

## Critérios mensuráveis de sucesso

- zero `<button>` e zero `styled.button` em código de produção dos cinco consumidores;
- todo comando canônico usa `Button` direta ou indiretamente;
- todo controle específico usa `Pressable` por meio de um componente nomeado;
- nenhum consumidor redefine altura, padding, tipografia, raio ou cor canônica apenas para manter
  diferença histórica;
- todos os consumidores fixam o mesmo release imutável;
- package tests, SSR/prerender smoke, builds e gates completos passam;
- screenshots representativas são inspecionadas e o veredito visual é registrado;
- commits são restritos ao escopo, `main` remoto contém cada mudança e os cinco sites de produção
  servem o artefato novo;
- worktrees originais e alterações não relacionadas permanecem intactos.
