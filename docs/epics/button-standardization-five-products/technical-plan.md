# Plano técnico

## Arquitetura

```text
@langyspace/ui v0.5.0
  Pressable -> botão nativo + baseline estrutural/interativo
      |
      +-- Button -> recipe canônico de ação
      |
      +-- styled(Pressable) nos controles específicos dos consumidores

Button -> wrappers locais de compatibilidade
  Admin: Button / IconButton / TextButton
  Student: Button / IconButton / AuthSubmitButton / AuthBackButton
  Teacher: Button / PillButton / IconButton / AuthSubmitButton / AuthBackButton
  Landing e Cupom: composição direta
```

`Pressable` não conhece tema, domínio ou layout. `Button` reutiliza seu comportamento nativo e
aplica o recipe canônico. Os consumidores podem manter componentes nomeados, mas nenhum botão de
produção nasce diretamente de `button`.

## Mudanças no pacote

### Novos arquivos

```text
src/Pressable/index.tsx
src/Pressable/styles.ts
src/Pressable/types.ts
src/Pressable/index.test.tsx
```

### Button

- usar `Pressable` como elemento base;
- adicionar `ButtonTone = 'neutral' | 'brand'` com union discriminada que permita brand somente em
  primary;
- adicionar `danger` e `success` a `ButtonVariant`;
- manter API existente compatível;
- styles continuam independentes de tema e com `componentId` explícito;
- showcase/audit passa a cobrir novos papéis, Pressable normal/disabled/focus e stress.

### Cores canônicas

- neutral: escala atual `#0a0a0a` / branco;
- brand: `#cc0f45`, hover `#b01343`, branco; valores acessíveis já aprovados pelo contrato Admin;
- danger: `#c62828`, hover/active `#991b1b`, branco;
- success: `#166534`, hover/active `#14532d`, branco;
- focus mantém anel branco + aqua do pacote.

Não será criado contrato de tokens consumível neste épico; os valores são internos ao recipe.

## Estratégia de consumidores

### Regra mecânica segura

- `styled.button` específico vira `styled(Pressable)` e mantém somente CSS de contexto;
- `<button>` vira uma primitive semântica existente (`Button`, `IconButton`, `TextButton`) ou um
  componente local novo sobre `Pressable`;
- button de ação já nomeado vira `styled(Button)` e remove recipe duplicado;
- aliases/classes legados saem somente depois de `rg` provar zero consumers;
- testes podem manter `<button>` apenas como fixture deliberada e ficam fora do audit estático.

### Landing

- `ChipButton`, `BottomNavItem` e `Option` são controles específicos sobre `Pressable`;
- todos os CTAs existentes continuam `Button`;
- `v0.5.0`, SSR `noExternal`, build/prerender e layout audit permanecem obrigatórios.

### Admin

- manter a taxonomia já aprovada em `admin-semantic-operations-ui`;
- atualizar o wrapper local para delegar danger e brand ao pacote;
- `IconButton` continua local porque subtle/danger icon-only são recipes próprios;
- `TextButton`, FilterPills, SegmentedControl, search result e controles densos usam `Pressable`;
- mapear markup legado por consequência, não pela classe:
  - `.pill` -> secondary;
  - `.pill.solid` -> primary neutral;
  - `.pill.pink` -> primary brand somente quando ação institucional principal;
  - `.danger-solid` -> danger;
  - `.danger-ghost` -> TextButton danger ou componente local;
  - `.ico-btn` -> IconButton;
  - `.link-btn`/`.back-link` -> TextButton;
- remover CSS legado verticalmente, uma família por vez;
- expandir `test:design-system` ou adicionar audit estático ao mesmo gate.

### Student

- migrar Button/IconButton/AuthSubmit/AuthBack para composição compartilhada;
- remover PillButton se continuar sem consumer de produção;
- ações visuais recorrentes mapeiam para Button; controles de conteúdo/portal usam Pressable;
- nomes por cor saem das APIs públicas locais;
- audit estático entra em `validate:ui`;
- `scripts/audit-layout.mjs` ganha casos locais sanitizados para auth/cadastro, escolha de plano e
  checkout que exercitem loading, selected, error e labels longas.

### Teacher

- migrar Button/PillButton/IconButton/AuthSubmit/AuthBack para composição compartilhada;
- mapear `default/solid/ghost/green/pink` para `secondary/primary/tertiary/success/primary brand`;
- ações padrão em drawers/páginas usam wrappers canônicos; tabs, calendário e preview usam
  Pressable;
- audit estático entra em `validate:ui`;
- `scripts/audit-layout.mjs` ganha casos sanitizados para previews de lições/vocabulário,
  apresentação e drawers ainda sem cobertura.

### Cupom

- manter `RangeButton` contextual sobre `Button`;
- atualizar para `v0.5.0`, adicionar audit estático e revalidar pressed/unpressed.

## Auditoria estática

Cada consumidor terá `scripts/audit-button-system.mjs` com uma allowlist explícita apenas para
arquivos de teste/fixture. A auditoria:

1. percorre `src` com extensões `.ts`/`.tsx`;
2. ignora `*.test.*`, `*.spec.*` e arquivos de declaração;
3. falha ao encontrar JSX `<button` ou `styled.button`;
4. relata arquivo, linha e trecho;
5. é chamada por `validate:ui` antes do build/layout audit.

O pacote testa sua própria saída e não precisa proibir o `<button>` interno de `Pressable`.

## Cobertura e fixtures

- Todas as fixtures continuam locais e sanitizadas.
- Network é bloqueada pelos audits existentes.
- Student adiciona casos de rota pública sem sessão real; se o design mock atual não suporta, a
  mudança mínima será feita no provider/route selector apenas para fixture.
- Teacher adiciona IDs e dados de mock já existentes para preview/apresentação/drawer; nenhuma query
  de produção será chamada.
- Audits verificam contenção, overflow, target canônico por `data-size`, labels longas, busy/disabled
  e nome de icon-only.
- Screenshot review cobre normal + stress quando disponível, em 390/1281/2048.

## Testes focados

### Pacote

- Pressable: type default, ref, native props, disabled, className e SSR id;
- Button: compatibilidade das três variantes atuais, danger, success, brand, união de tipos,
  icon-only, loading e sizes;
- package smoke: import Node, render SSR e clean Vite consumer;
- layout: matriz semântica e stress.

### Consumidores

- testes existentes de base/wrappers ajustados a markers atuais `lsui-sc-*`;
- testes de comportamento de páginas continuam responsáveis por handlers e fluxo;
- testes novos somente quando o mapeamento semântico não tiver cobertura existente;
- builds TypeScript capturam props inválidas e styled-components transient props.

## Release e integração Git

1. validar e commitar package em branch isolada;
2. fast-forward de `main` somente se `origin/main` continuar ancestral;
3. criar/push tag `v0.5.0` e esperar CI/release;
4. verificar release público, checksum, tarball e smoke anônimo;
5. atualizar consumidores em worktrees isolados com URL exata e lockfile frozen;
6. validar cada consumidor antes de commitar;
7. fetch + ancestry check + push de cada `main` sem force;
8. monitorar workflows de Hosting e verificar bundles/rotas públicas.

Commits serão Conventional Commits e cada repositório terá staging por paths explícitos.

## Rollback

- pacote publicado é imutável e não é apagado;
- rollback de consumidor restaura URL/lockfile anterior e o commit de migração daquele repo;
- Hosting redeploya pelo workflow normal;
- nenhuma migração de dados ou backend precisa ser revertida.

## Riscos e mitigação

| Risco                                           | Mitigação                                                                         |
| ----------------------------------------------- | --------------------------------------------------------------------------------- |
| Pressable vazar estilo para controle específico | baseline mínimo, focused screenshots e diff de computed styles                    |
| wrapper local reintroduzir recipe               | auditoria estática + revisão de propriedades canônicas                            |
| troca de altura deslocar layout denso           | gates em todos os boundaries e screenshots de contexto                            |
| Admin class mapping alterar hierarquia          | classificar por consequência e manter uma primary por grupo                       |
| SSR Landing perder CSS                          | explicit component ids, `noExternal`, Node/prerender smoke                        |
| release asset ainda indisponível                | esperar workflow e testar download anônimo antes de instalar                      |
| worktree concorrente avançar main               | fetch, merge-base e fast-forward estrito; nunca force/reset                       |
| gate amplo falhar por gap antigo                | diagnosticar e corrigir somente falhas causadas pelo diff; não enfraquecer assert |
| deploy Teacher incluir Functions                | manter mudança fora de `functions/packages/*` e verificar target Hosting-only     |

## Segurança e operação

- nenhuma credencial, token, `.npmrc`, Firebase config nova ou segredo entra no diff;
- nenhum audit acessa rede externa, autentica usuário real ou abre checkout/Meet;
- nenhuma escrita de produção, mensagem externa ou mutation de provider faz parte do épico;
- deploy autorizado limita-se aos cinco Firebase Hosting targets já existentes.
