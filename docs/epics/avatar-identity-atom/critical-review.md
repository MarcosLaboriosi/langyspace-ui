# Revisão crítica

## Product Manager

### Objeção

Avatar pode parecer uma escolha cosmética com pouco valor depois de Button e SectionHeader.

### Resolução

Há 18 callsites ativos e 257 linhas de source repetidas. A mudança reduz manutenção em duas
superfícies operacionais densas e estabelece o primeiro atom de identidade. Não há quota de
components: outras families foram explicitamente rejeitadas.

### Objeção

Remover a cópia Student sem adotar a nova versão pode deixar os products inconsistentes.

### Resolução

Consistência significa ausência de implementação duplicada, não dependency uniforme. Student não
renderiza Avatar; instalar package novo sem uso seria churn. O build prova que a cópia é realmente
morta.

## Tech Lead

### Objeção

Cinco tamanhos e três tons podem ser uma API grande para um atom pequeno.

### Resolução

Todos os cinco tamanhos possuem callsite real somando Admin/Teacher; inverse, neutral e brand também.
Não há size/tone hipotético. Valores são fechados, monotônicos e substituem dois vocabulários.

### Objeção

Uma regra product-specific para import local pode duplicar governance.

### Resolução

O audit público já aceita policy adicional por product. Não será criada nova engine ou rule global
que assumiria paths dos consumers. `canonicalComponents` protege recipe overrides e a regra local
protege ownership.

## Senior React Engineer

### Objeção

Guardar a failed URL em state pode manter um erro antigo quando o browser recupera a mesma URL.

### Resolução

Uma URL que falhou permanece em fallback até mudar ou o component remountar, comportamento
previsível e igual ao Admin atual. Retry automático/timer adicionaria requests e lifecycle não
comprovados. URL nova é tentada sem effect.

### Objeção

`aria-hidden` default no root pode ocultar uma identity usada sozinha no futuro.

### Resolução

Todos os callsites atuais possuem texto/accessible name externo. Props nativas permitem
`aria-hidden={false}`, `role="img"` e `aria-label` se um caso futuro provar a necessidade; não será
criada prop paralela agora. Story/docs deixam o default explícito.

### Objeção

`ComponentPropsWithRef<'span'>` sem `forwardRef` pode falhar em React antigo.

### Resolução

O package e os cinco products estão em React 19 e a plataforma já validou esse pattern com refs,
styled composition, declarations, browser e SSR. Não ampliar compatibilidade sem consumer.

## Design System Architecture

### Objeção

Dimensões exatas deveriam ser tokens globais.

### Resolução

A escala é própria de Avatar. Promover cada diâmetro a foundation sugeriria reuso inexistente. O
recipe privado tipado usa tokens globais para cor/typography/radius e mantém dimensions locais.

### Objeção

Diferenças de 2–4 px podem ser contextuais e não acidentes.

### Resolução

Os mesmos labels significam medidas diferentes sem regra de domínio, breakpoint ou density prop.
Isso é divergência histórica. A escala 24/32/40/56/64 é intencional; before/after pode rejeitar o
recipe antes do release, mas não criar alias por product.

## QA

### Objeção

O audit genérico pode passar mesmo com avatar oval, encolhido ou texto vazando.

### Resolução

T01/T04/T05 devem confirmar observabilidade. Se faltar, adicionam assertions para width=height,
border-radius circular, flex-shrink e overflow nos fixtures versionados. Stories cobrem todas as
sizes e stress; screenshots continuam obrigatórias.

### Objeção

Imagem com erro é nondeterministic em Storybook.

### Resolução

Behavior é provado em unit com `fireEvent.error`. A story usa URL inválida controlada e `play`
aguarda remoção; se o browser runner não garantir o evento, a story documenta fallback e o unit
permanece a prova blocking, sem request externo.

### Objeção

Admin tem uma matriz muito grande e pode exceder o tempo local.

### Resolução

Execução usa cases/widths focados durante a task e o workflow shardado como gate completo. Não se
reduz a matriz nem se chama timeout local de aprovação.

## UX/UI

### Objeção

O `sm` Admin encolhe de 36 para 32 px no footer e pode perder peso visual.

### Resolução

O footer recebe inspeção direta em desktop e mobile; a conta continua identificada por e-mail/role.
Se a hierarquia piorar, o size semântico do callsite pode mudar para `md`, desde que isso seja uma
decisão do layout e não um valor arbitrário.

### Objeção

Teacher `xl` cresce para 64 px e pode apertar drawer mobile.

### Resolução

O drawer é coberto em 390 px com conteúdo stress. Layout externo deve acomodar o atom ou escolher
`lg` se 64 não representar a hierarquia desejada. O package não recebe breakpoint prop.

## Accessibility

### Objeção

`aria-hidden="true"` combinado com imagem `alt=""` é redundante.

### Resolução

É redundância defensiva válida: root documenta semântica decorativa e o `alt` vazio mantém a imagem
decorativa se o root for desocultado. Não há duplicate announcement.

### Objeção

Tone não pode ser a única forma de comunicar identidade/status.

### Resolução

Tone representa ênfase/surface, não status. Todos os callsites têm texto adjacente e nenhuma regra
de negócio deriva do tone.

## Performance

### Objeção

Uma imagem por linha pode gerar muitos requests.

### Resolução

Callsites de listas/tabelas passam apenas initials. `imageUrl` aparece no shell Teacher; o atom não
precarrega nem cria requests além do `img` solicitado pelo consumer. Bundle delta é medido.

## Security e privacidade

### Objeção

Publicar story com foto/URL pode vazar dados.

### Resolução

Stories usam data URL sintética criada no repo. Nenhuma fixture real, signed URL ou request externo
entra no artifact público.

## Operations e release

### Objeção

Publicar `1.2.0` antes de testar os consumers pode repetir incompatibilidade de SSR/supply chain.

### Resolução

Admin e Teacher instalam o mesmo candidate local e passam os gates antes do tag. Release inclui
checksum; depois os lockfiles apontam para o URL imutável e `minimumReleaseAgeExclude` é atualizado
no mesmo commit.

### Objeção

Atualizar docs depois do deploy dispara outro CI e prolonga indefinidamente o encerramento.

### Resolução

Progress e release evidence são atualizados no último commit necessário. Se uma evidência só existe
após o workflow, ela é registrada sem alterar runtime/tag; o CI documental final é acompanhado uma
vez, sem criar outro commit apenas para registrar seu próprio run ID.

## Veredito

Plano aprovado. Avatar é a única family desta onda; a API permanece pequena, o risco visual está
explicitamente coberto e T01 deve concluir a baseline antes de qualquer runtime change.
