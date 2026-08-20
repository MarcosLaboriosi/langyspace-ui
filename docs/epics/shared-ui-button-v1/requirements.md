# Requirements

## Functional requirements

### Package

- FR-01: o pacote deve chamar-se `@langyspace/ui` e expor ESM e tipos TypeScript.
- FR-02: `Button` deve renderizar um `<button>` nativo e usar `type="button"` por padrão.
- FR-03: `variant` deve aceitar somente `primary`, `secondary` e `tertiary`.
- FR-04: `size` deve aceitar somente `sm`, `md` e `lg`.
- FR-05: `fullWidth` deve controlar somente largura, sem alterar semântica.
- FR-06: `icon` deve aceitar um nó React e `iconPosition` deve aceitar `start` ou `end`.
- FR-07: `isLoading` deve manter a label, expor `aria-busy="true"`, substituir o ícone por um
  indicador interno, desabilitar interação e preservar feedback visual.
- FR-08: props nativas, `className`, `data-*`, `aria-*` e ref devem chegar ao elemento.
- FR-09: todos os estilos do Button devem viver em `src/Button/styles.ts` com `styled-components`; o
  pacote não deve expor ou exigir CSS global.
- FR-10: `className` deve continuar chegando ao elemento para que `styled(Button)` componha estilos
  externos sem `!important`.

### Delivery

- FR-11: CI deve executar lint, format check, testes, build e auditoria visual.
- FR-12: uma tag `v<package.version>` deve criar automaticamente um release com `.tgz`, checksum e
  notas, falhando se tag e versão divergirem.
- FR-13: o release deve ser instalável por URL pública imutável, sem token.
- FR-14: cada consumidor deve remover o import legado de stylesheet e manter a versão exata no
  lockfile.
- FR-15: uma superfície por produto deve usar o componente publicado, não um path/file link local.
- FR-16: cada integração deve preservar copy, handlers, semântica e estado existentes.
- FR-17: o deploy de cada app deve continuar pelo workflow Firebase já versionado.
- FR-18: `variant` e `size` devem ser a fonte única de altura, padding, tipografia, raio e tons
  neutros do Button nos consumidores.
- FR-19: consumidores devem usar `fullWidth` para largura de container e podem usar `className` ou
  `styled(Button)` apenas para composição externa ou estado contextual não representado pela API.
- FR-20: o componente deve usar `src/Button/index.tsx`, `styles.ts` e `types.ts`; tipos públicos e
  transient props internos não podem permanecer declarados no arquivo do componente.
- FR-21: `styled-components` deve ser peer dependency externa do pacote, nunca uma cópia embutida no
  bundle.
- FR-22: o Cupom deve declarar `styled-components` diretamente e migrar seu controle contextual para
  `styled(Button)`; os demais produtos reutilizam seus peers existentes.

## Non-functional requirements

- NFR-01: React e styled-components são as únicas peer dependencies de runtime; ambos permanecem
  externos ao bundle.
- NFR-02: package build deve ser reproduzível com Node 24 ou superior e pnpm 10.33.2; CI de
  release usa Node 24.
- NFR-03: o bundle deve ser ESM, tree-shakeable e sem código Firebase ou app-specific.
- NFR-04: foco visível deve atingir WCAG 2.2 AA em superfícies claras e escuras cobertas.
- NFR-05: touch target padrão `md` deve ter pelo menos 40 px e `lg` 48 px; `sm` é reservado para
  grupos compactos e mantém 32 px.
- NFR-06: labels não devem ser truncadas silenciosamente; o botão deve conter conteúdo sem escapar
  do viewport.
- NFR-07: reduced motion deve remover deslocamentos/animação não essencial.
- NFR-08: não introduzir tokens, credenciais ou acesso cross-repository nos consumidores.
- NFR-09: worktrees sujos do usuário devem ser preservados; commits devem conter só a integração.
- NFR-10: rollback deve consistir em restaurar a versão anterior do URL e lockfile.

## Business rules

- `primary`: ação principal da decisão atual.
- `secondary`: ação de suporte/alternativa com superfície neutra.
- `tertiary`: ação de baixa ênfase ou controle compacto sobre superfície existente.
- Não se usa mais de uma ação `primary` no mesmo grupo decisório sem justificativa local.
- Ações destrutivas permanecem nos componentes locais até um contrato próprio ser planejado.
- Navegação continua a usar link; o v1 não faz Button fingir ser `<a>`.
- Variação nova exige caso real em dois produtos ou uma necessidade transversal explícita.
- Uma diferença histórica sutil não é uma especificidade de produto; deve convergir para o
  `variant`/`size` canônico.
- Um estado pressionado sobre superfície inversa é uma especificidade contextual válida, desde que
  a classe local não replique a geometria e a tipografia do Button.

## Edge cases

- Label longa com espaços deve quebrar de forma controlada sem overflow.
- Token longo sem espaços não pode escapar do viewport.
- Ícone customizado deve encolher zero e não distorcer a label.
- `disabled` fornecido pelo consumidor e `isLoading` devem compor sem reabilitar cliques.
- `aria-busy` explícito deve ser preservado quando loading é falso e forçado para true quando ativo.
- `className` local deve coexistir com a classe da biblioteca.
- SSR/prerender de `langyspace` não pode acessar `window` durante import do pacote.
- O pacote deve funcionar no app `cupom`, que passa a declarar uma instância compatível de
  styled-components sem adotar ThemeProvider ou tema global.
- O pacote e o Cupom devem funcionar sem ThemeProvider; o Button não depende do tema de nenhum app.
- A remoção de `@langyspace/ui/styles.css` deve falhar em busca estática se algum consumidor ainda
  mantiver o import legado.

## Acceptance criteria

- AC-01: testes provam default type, clique, ref, props nativas, variantes, tamanhos, ícone e loading.
- AC-02: o package tarball contém somente arquivos publicáveis esperados e instala numa app Vite.
- AC-03: showcase passa em modo normal e stress nas nove larguras aprovadas.
- AC-04: release `v0.1.0` mostra `.tgz` e `.sha256` públicos.
- AC-05: os cinco builds resolvem `@langyspace/ui` sem `.npmrc` ou segredo novo.
- AC-06: os gates dos cinco apps passam e screenshots 390, boundary denso e 2048 são inspecionados.
- AC-07: os cinco workflows de produção concluem com o commit esperado.
- AC-08: diffs finais não incluem as alterações locais pré-existentes de admin ou teacher.
- AC-09: README documenta instalação, import de CSS, API, versionamento, release e limites do v1.
- AC-10: README documenta `fullWidth`, `className` e `styled(Button)` e delimita quais estilos podem
  permanecer locais.
- AC-11: `AuthSubmitButton` conserva somente layout externo local e herda a aparência/altura `lg`
  compartilhada.
- AC-12: o seletor de período do Cupom conserva largura uniforme e estado invertido pressionado,
  mas herda altura, padding, tipografia, raio e interação do `size="sm"` compartilhado.
- AC-13: gates completos e screenshots de Teacher `/login` e Cupom `/relatorio/:id` passam em 390,
  1281 e 2048 px antes do deploy dos dois produtos.
- AC-14: `src/button.css`, `src/styles.d.ts`, o export `./styles.css` e qualquer CSS gerado pelo
  pacote deixam de existir.
- AC-15: `Button` reside em pasta própria com `index.tsx`, `styles.ts`, `types.ts` e teste focado;
  os tipos públicos continuam importáveis pela raiz do pacote.
- AC-16: o tarball `0.2.0` declara React/styled-components como peers, não contém styled-components
  empacotado e compila num consumidor Vite limpo sem import de CSS.
- AC-17: os cinco produtos resolvem o mesmo release imutável `0.2.0`, não contêm o import legado e
  passam seus gates visuais completos.
- AC-18: os cinco workflows de Hosting concluem no SHA esperado e os assets públicos são verificados.
