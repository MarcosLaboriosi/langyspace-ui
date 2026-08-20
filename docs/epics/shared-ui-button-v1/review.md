# Product review

## Review outcome

`approved with scope reductions`

## Decisions challenged and resolved

### One package versus copied component

Copiar mais uma implementação manteria deploy simples, mas não resolveria divergência nem criaria
um caminho versionado para o próximo componente. Um pacote independente é justificado porque já há
cinco consumidores e pipelines separados.

### npm versus GitHub Packages versus GitHub Release

- npm público oferece a melhor experiência de consumo, mas a máquina não tem sessão npm e o
  primeiro publish/trusted publisher exige coordenação externa.
- GitHub Packages publica com `GITHUB_TOKEN`, mas o npm registry do GitHub exige autenticação para
  instalação até em pacotes públicos e criaria configuração/permissions nos cinco repositórios.
- Um `.tgz` de GitHub Release público instala sem token, pode ser fixado por SemVer e checksum e usa
  a autenticação GitHub já disponível somente para publicar.

Para o v1, GitHub Release é o caminho de menor risco operacional. Migração futura para npm pode
preservar nome e API do pacote.

### Public repository

O repositório da biblioteca será público porque o consumidor `langyspace-cupom` já é público e um
artefato público elimina credenciais de leitura em todos os pipelines. O pacote não contém regras de
negócio, dados, endpoints, configuração Firebase ou segredos. O package metadata será
`UNLICENSED`, portanto visibilidade de código não concede licença de reutilização.

### API shape

Booleanos como `primary`, `secondary` e `tertiary` permitiriam combinações inválidas. Um único
`variant` torna estados mutuamente exclusivos e reduz a superfície. Tamanho, ícone, posição e
loading foram mantidos porque já são necessidades repetidas; todo o resto foi removido.

### Full migration versus proving infrastructure

Migrar todos os botões misturaria criação da infraestrutura com redesign e contratos específicos
como danger, icon-only, tabs e links. O v1 integra uma superfície real por produto e deixa migração
ampla para épicas posteriores baseadas em evidência.

## UX review

- A hierarquia primary/secondary/tertiary é suficiente para a primeira adoção.
- Loading mantém a label para evitar layout shift e preservar contexto.
- O componente continua nativo, focável e compatível com formulários.
- As dimensões já usadas nos produtos reduzem surpresa visual.
- A baixa especificidade permite que o seletor de período do cupom mantenha sua superfície escura.

## Risks accepted

- Atualizações de consumidores continuam deliberadamente manuais no v1.
- Artefatos de GitHub Release têm uma experiência menos familiar que npm, mas são reproduzíveis.
- Nem todo botão local será unificado; isso é uma restrição de escopo, não uma conclusão arquitetural.

## Deferred follow-ups

- Trusted publishing no npm quando houver conta/scope configurado.
- Botão destrutivo somente após inventário de pelo menos dois produtos.
- Automação de upgrade/PR cross-repository com credencial dedicada e escopo mínimo.
- Tokens compartilhados, IconButton e componentes seguintes em épicas próprias.

## Styled-components 0.2.0 product review

### Review outcome

`approved — implementation-only migration with visual parity required`

### Decisions challenged and resolved

- Manter o CSS por compatibilidade prolongaria exatamente a arquitetura rejeitada; `0.2.0` assume a
  remoção explícita do subpath e mantém `0.1.0` intacto para rollback.
- Embutir styled-components pouparia uma dependência no Cupom, mas duplicaria runtime/contexto e
  aumentaria bundle. Um peer único é a fronteira correta.
- `className` permanece como contrato nativo, porém styling visual local deve preferir
  `styled(Button)`. Isso é mais determinístico que disputar ordem entre CSS estático e estilos
  injetados.
- A separação `index.tsx`/`styles.ts`/`types.ts` resolve responsabilidades concretas e não cria uma
  abstração genérica adicional.

### UX and scope review

- Nenhuma cor, altura, raio, tipografia, copy, handler ou variante muda intencionalmente.
- A migração cobre somente o Button já adotado; novos componentes e migração ampla continuam fora.
- Loading, focus, disabled, long labels, pressed state e reduced motion conservam o contrato
  aprovado e serão comparados nos gates existentes.
