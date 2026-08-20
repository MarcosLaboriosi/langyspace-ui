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
- FR-09: estilos devem ser importáveis por `@langyspace/ui/styles.css`.
- FR-10: seletores da biblioteca devem ter baixa especificidade para permitir composição local sem
  `!important`.

### Delivery

- FR-11: CI deve executar lint, format check, testes, build e auditoria visual.
- FR-12: uma tag `v<package.version>` deve criar automaticamente um release com `.tgz`, checksum e
  notas, falhando se tag e versão divergirem.
- FR-13: o release deve ser instalável por URL pública imutável, sem token.
- FR-14: cada consumidor deve importar o stylesheet uma vez e manter a versão exata no lockfile.
- FR-15: uma superfície por produto deve usar o componente publicado, não um path/file link local.
- FR-16: cada integração deve preservar copy, handlers, semântica e estado existentes.
- FR-17: o deploy de cada app deve continuar pelo workflow Firebase já versionado.

## Non-functional requirements

- NFR-01: nenhum runtime dependency além de React como peer.
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

## Edge cases

- Label longa com espaços deve quebrar de forma controlada sem overflow.
- Token longo sem espaços não pode escapar do viewport.
- Ícone customizado deve encolher zero e não distorcer a label.
- `disabled` fornecido pelo consumidor e `isLoading` devem compor sem reabilitar cliques.
- `aria-busy` explícito deve ser preservado quando loading é falso e forçado para true quando ativo.
- `className` local deve coexistir com a classe da biblioteca.
- SSR/prerender de `langyspace` não pode acessar `window` durante import do pacote.
- O pacote deve funcionar no app `cupom`, que não usa styled-components.

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
