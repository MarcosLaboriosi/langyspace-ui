# Épico: Avatar como atom de identidade visual

## Contexto

O épico `ui-component-platform` publicou `@langyspace/ui@1.1.0`, o catálogo Storybook e o primeiro
piloto posterior aos botões, `SectionHeader`. A próxima onda deve provar que a plataforma continua
crescendo por evidência e não por cópia de diretórios.

Um inventário novo dos cinco `origin/main` encontrou três implementações locais chamadas `Avatar`.
Admin e Teacher possuem 19 callsites runtime que resolvem a mesma responsabilidade: mostrar
iniciais ou uma foto decorativa dentro de um círculo. Student mantém uma cópia sem qualquer import
runtime. Landing e Cupom não possuem a family.

## Problema

Admin e Teacher mantêm recipes incompatíveis para a mesma identidade visual:

- tamanhos com os mesmos nomes medem valores diferentes;
- `accent`/`muted` e `brand`/`neutral` expressam as mesmas intenções com vocabulários distintos;
- apenas Admin declara o avatar decorativo por padrão;
- duas estratégias diferentes controlam fallback de imagem;
- 310 linhas de source permanecem distribuídas entre três diretórios e um recipe artesanal;
- não existe story isolada, package smoke ou regra que impeça a cópia de voltar.

Preservar cada diferença como prop tornaria a library um espelho do legado. Remover diferenças sem
auditar as telas, porém, repetiria a regressão visual que motivou o design system.

## Objetivo

Promover `Avatar` como atom público pequeno, semântico e independente dos themes dos produtos;
adotá-lo nos 19 callsites ativos; remover a cópia morta do Student; publicar um artefato imutável e
comprovar os consumers em produção.

```text
tokens -> Avatar -> identidade composta pelo produto
                    |-> sidebar
                    |-> tabela/lista
                    |-> drawer
                    +-> busca global
```

O atom possui apenas o recipe da representação. Botões de editar foto, navegação, badges, status,
upload, derivação de iniciais e dados de perfil permanecem nos produtos.

## Impacto visual

`direct`. O tamanho, typography, background, border e fallback do círculo mudam para um recipe
canônico. As superfícies afetadas são:

- Admin: shell autenticado, busca global, tabelas e drawers de cobranças/assinaturas;
- Teacher: shell desktop/mobile, Hoje, Alunos e drawer de aula/aluno;
- catálogo: stories default, tamanhos, tons, imagem/fallback e stress;
- Student: nenhuma superfície, pois a cópia não possui callsite runtime.

O gate cobre 390, 1281 e 2048 px, os breakpoints densos dos dois produtos, conteúdo com iniciais de
um a três caracteres, nomes longos adjacentes, imagem válida, imagem com erro e todas as combinações
de tamanho/tom comprovadas.

## Escopo

- inventário fresh dos cinco products por semântica, props, styles e callsites;
- atom `Avatar` em `src/atoms/Avatar` com source/test/story co-localizados;
- contrato público, manifesto, browser/SSR smoke, API report e bundle budget;
- adoção direta em Admin e Teacher, sem adapters;
- remoção da cópia local não utilizada no Student;
- auditorias dos consumers para impedir retorno da implementação local e override do recipe;
- release minor `v1.2.0`, CI, catálogo, deploys aplicáveis e prova de artefato servido.

## Fora de escopo

- criar grupo de avatares, badge de presença/status, tooltip ou menu;
- tornar o avatar clicável ou proprietário de upload;
- derivar iniciais a partir de nome, e-mail ou dados de domínio;
- aceitar size, cor, border, radius ou typography arbitrários;
- promover fotos das páginas públicas de disponibilidade, que possuem composição e dimensões
  editoriais próprias;
- migrar Toast, PhoneField, Logo, auth shells ou outras families no mesmo release;
- atualizar a dependency de Landing, Cupom ou Student sem consumo runtime.

## Resultado esperado

- um único atom com API `initials`, `imageUrl`, `size` e `tone`, além de props nativas do `span`;
- `size="xs | sm | md | lg | xl"` em uma escala monotônica de 24/32/40/56/64 px;
- `tone="neutral | brand | inverse"` construído apenas com tokens públicos da library;
- root decorativo por padrão, imagem com `alt=""` e fallback determinístico para iniciais;
- 19 callsites ativos importando diretamente de `@langyspace/ui`;
- zero source local de Avatar nos três products onde a cópia existia;
- nenhuma alteração de rota, payload, Firebase, regra, dado ou contrato de domínio.

## Métricas de sucesso

| Medida                  |                             Baseline |                  Meta |
| ----------------------- | -----------------------------------: | --------------------: |
| Implementações locais   | 3 diretórios + 1 recipe / 310 linhas |                     0 |
| Callsites ativos        |                 Admin 10 / Teacher 9 | 19 no package público |
| Props cosméticas livres |                                    0 |                     0 |
| Stories da library      |                                   72 |            +5 ou mais |
| Owner test/story/smokes |                          inexistente | completo no manifesto |
| Issues geométricas      |       desconhecido após convergência |                     0 |
| Adapters de consumer    |                                    0 |                     0 |

## Critérios de conclusão

O épico termina somente quando o package imutável for publicado, Admin e Teacher estiverem em
`main` e servindo o marker do atom, Student tiver removido a cópia morta, todos os CI/deploys
aplicáveis estiverem verdes e screenshots representativas confirmarem que a normalização dos
tamanhos não quebrou hierarquia, densidade ou alinhamento.
