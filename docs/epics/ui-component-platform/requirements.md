# Requisitos

## Convenções e ownership

### R01 — Unidade canônica por component

Cada component público deve possuir owner claro e arquivos co-localizados. O source pode continuar
com `index.tsx`, `styles.ts` e `types.ts`, porque o diretório já fornece o nome do component e essa
convenção mantém imports estáveis. Arquivos que aparecem em relatórios, falhas e busca devem usar
nomenclatura semântica:

```text
atoms/Button/
  index.tsx
  styles.ts
  types.ts
  Button.test.tsx
  Button.stories.tsx
```

Acceptance:

- nenhum teste de component se chama `index.test.tsx`;
- uma suite não usa o nome de outro component como owner;
- wrappers pequenos podem ter suite própria curta ou contract test gerado, mas não ficam invisíveis;
- mudança de nome não altera o entrypoint público nem o bundle.

### R02 — Setup de teste central

`@testing-library/jest-dom/vitest` e cleanup devem ser configurados uma vez no setup do Vitest.
Suites individuais importam apenas o que usam.

### R03 — Dois níveis de teste explícitos

- unit/behavior tests podem importar o component local para testar detalhes de ownership;
- contract tests importam somente de `src/index.ts` ou do tarball empacotado para provar a API;
- o nome/local da suite torna o nível evidente; não misturar ambos acidentalmente.

## Catálogo visual

### R04 — Storybook React/Vite co-localizado

Adicionar Storybook ao repositório da biblioteca, usando stories CSF em
`Component/Component.stories.tsx`. A biblioteca publicada não pode incluir runtime ou arquivos do
Storybook.

Acceptance:

- `pnpm storybook` abre o catálogo local;
- `pnpm build:storybook` gera site estático em diretório ignorado;
- package tarball continua contendo apenas `audit`, `dist`, `LICENSE` e `README.md`;
- build de Storybook passa em CI sem rede durante render das stories.

### R05 — Matriz mínima de stories

Cada component deve documentar:

- estado default e cada variation pública;
- disabled, loading/busy, error/invalid e selection quando aplicáveis;
- conteúdo curto, longo e token sem quebra quando aplicável;
- focus-visible e keyboard behavior relevante;
- surface clara/escura, density e responsive boundary quando fizerem parte do contrato;
- reduced motion quando houver animação;
- exemplo de composição sem levar regra de produto para a story base.

### R06 — Docs executáveis

Autodocs deve expor description, props controláveis, defaults, exemplos recomendados e restrições.
Props internas, transient props e selectors de audit não aparecem como API de uso.

### R07 — Migração segura do showcase

O showcase atual permanece como oracle até a paridade de componentes/estados/audits ser medida.
Ele só pode ser removido quando:

- todas as 19 exports estiverem representadas;
- os 36 cenários atuais tiverem equivalente ou substituto documentado;
- layout, focus, loading, selection, auth e field assertions rodarem sobre stories;
- screenshots normal/stress em 390, 1281 e 2048 forem inspecionados.

## Acessibilidade e interação

### R08 — A11y automatizado por story

O addon oficial de a11y deve rodar axe nas stories e falhar CI para violações. Exceções exigem
regra, justificativa, owner, prazo e teste manual equivalente; não pode haver disable global.

### R09 — Interaction tests

Components interativos devem ter `play` tests para o comportamento que o browser realmente possui:
click, keyboard, focus, paste/clear/selection e busy/disabled. JSDOM continua apropriado para unit
tests puros; Playwright/story runtime prova layout e comportamento dependente do browser.

### R10 — Accessible name canônico

Criar um tipo foundation reutilizável que exija exatamente uma fonte de nome acessível quando o
component não tem label textual garantida. O contrato deve impedir `aria-label` e
`aria-labelledby` simultâneos, em vez de repetir unions permissivas em quatro components.

### R11 — Descrição de field cumulativa

Um control dentro de `FieldRoot` deve combinar e deduplicar seu `aria-describedby` explícito com os
IDs de hint/error do contexto. Um valor do consumidor não pode apagar mensagens do owner do field.

### R12 — Compound control consistente

Documentar e testar quem possui `disabled`, `invalid`, size, surface e slots. Não pode existir um
wrapper visualmente disabled com child interativo. Se propagar automaticamente não for seguro para
children arbitrários, a API deve tornar essa responsabilidade impossível de ignorar ou restringir
a composição aceita.

### R13 — Copy acessível sem idioma embutido

Components de infraestrutura não devem inventar copy localizada. `SearchInput` precisa receber o
nome da ação de limpar quando ela existir; `Clear search` não deve ser default silencioso.

### R14 — Token digits com domínio válido

Definir comprimentos suportados e comportamento de focus, paste, backspace e arrows. `length=0`
não pode gerar índice negativo/focus inválido. O timeout de autofocus deve ser removido ou
justificado por uma necessidade reproduzível.

## Arquitetura React e Atomic Design

### R15 — Dependency direction

```text
foundations -> primitives -> atoms -> molecules
```

Uma camada pode depender apenas de si ou das camadas abaixo. Types/recipes compartilhados de
fields e choices não ficam em atoms/molecules quando alimentam mais de um component irmão.

### R16 — Sem wrappers cerimoniais

Um novo component deve acrescentar pelo menos um destes valores: semântica, behavior, accessibility,
recipe reutilizável ou boundary de domínio. Apenas renomear props ou styles não justifica component.

### R17 — Ref contract React 19

Escolher e documentar um padrão de ref após uma spike com inputs, styled-components, declarations,
SSR e consumidores. A coexistência atual de `forwardRef` e ref-as-prop não deve ser normalizada por
estética; a decisão precisa provar compatibilidade e ergonomia.

### R18 — Icon ownership

SVGs internos podem continuar locais enquanto forem detalhes de um component. Um `Icon` público ou
catálogo de glyphs só nasce quando houver consumo repetido, naming, sizing e accessibility
consistentes. Não criar abstração apenas para mover `SearchIcon`/`CloseIcon`.

### R19 — Composition antes de prop expansion

Novas APIs devem preferir slots semânticos e componentes pequenos. Boolean props combinatórias,
polymorphic `as` sem caso real e props de style livre são rejeitados.

## Tokens e recipes

### R20 — Token audit orientado a semântica

Todo literal visual recorrente deve ser classificado como token, constante privada do recipe ou
valor inválido. Nem todo literal vira token. O resultado deve resolver gaps comprovados de
typography/spacing/field/control e evitar aliases duplicados sem significado.

### R21 — Layout ownership

Components não devem embutir margem externa. `AuthNotice` não pode decidir `margin-top` do container.
Fill/min-height e wrapping só permanecem props quando representam layout interno do contract, com
stories em containers estreitos.

### R22 — Recipes consistentes

Inconsistências como font maior em `FilterPills sm` do que em `md`, altura `lg` de
`CompoundControl` diferente da family de fields e ternário idêntico do SegmentedControl devem ser
decididas por baseline/uso e teste visual, não mantidas por acidente.

## Qualidade de package e automação

### R23 — Manifesto público único

Manter uma fonte tipada de componentes públicos e metadata de qualidade. Stories, contract tests,
smokes e relatórios podem validar o manifesto, mas o manifesto não deve entrar no runtime público
se aumentar bundle ou side effects.

### R24 — Smokes completos

Browser build e SSR devem importar/renderizar todo component público aplicável, incluindo hoje
`CompoundControl`, `SelectInput` e `TextareaInput`. Wrappers que compartilham markup ainda precisam
ser importados para provar a export.

### R25 — API e declarations

CI deve detectar export removido, declaration quebrada, subpath inválido e arquivo ausente no
tarball. Mudança breaking exige decisão de versionamento e migration notes.

### R26 — Bundle e side effects

Medir bundle de consumidores focados antes de criar subpath exports. O gate deve provar que importar
um component não inclui Storybook, fixtures ou scripts e que styled-components permanece peer.

### R27 — Audit escalável

Substituir cadastros paralelos e regexs crescentes por pequenas regras testáveis. AST é obrigatória
somente onde aliases/formatação tornam regex incapaz de provar o contrato. Cada regra precisa de
fixture positiva e negativa.

### R28 — Gate proporcional

Focused checks rodam durante cada task. O full gate roda uma vez depois dos focused checks. CI deve
permitir separar unit/lint/type/a11y/story-build/layout sem reduzir o gate final de release.

## Promoção de novos components

### R29 — Maturity model

Um candidate só é promovido se tiver:

- pelo menos dois usos equivalentes ou um contract transversal claro e urgente;
- semântica e owner definidos;
- API menor que os adapters removidos;
- visual tokens/recipe aprovados;
- story, unit/interaction/a11y/layout tests;
- SSR/package smoke;
- plano de adoção e rollback.

### R30 — Três decisões preservadas

Para cada candidate:

1. específico e sem reutilização: component local de produto;
2. variação semântica legítima: prop fechada no component existente;
3. diferença cosmética/acidental: convergir para um padrão do design system.

### R31 — Sem quota de components

O épico não precisa promover um número mínimo. A primeira onda pode terminar sem novos exports
se nenhum candidate passar o maturity gate.

## Release e operação

### R32 — Catálogo estático

O build do Storybook deve ser artifact de todo PR relevante. Como o repositório é público, GitHub
Pages é a opção preferida para `main`, mas sua ativação é uma task operacional separada e
reversível. Nenhum dado real pode entrar nas stories.

### R33 — Release imutável

Runtime changes seguem tarball candidato, checksum, package/SSR smoke, consumers aplicáveis,
release tag imutável e prova do artifact servido. Docs-only/catalog-only não forçam nova versão do
package.

### R34 — Visual gate

Todas as tasks de runtime/recipe/story devem declarar surfaces, states, stress, widths, fixtures e
evidência. A revisão manual de screenshots continua obrigatória porque axe e geometry assertions
não avaliam hierarquia visual completa.
