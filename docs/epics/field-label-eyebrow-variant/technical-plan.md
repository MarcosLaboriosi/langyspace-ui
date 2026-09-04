# Plano técnico — variante eyebrow para labels de campo

## Baseline

- `FieldRoot.Label` usa hoje tamanho `xs`, peso bold e line-height snug, sem tracking ou caixa alta;
- o label anterior do Student usava tamanho `xs`, semibold, `0.08em`, uppercase e line-height
  normal herdado;
- `FieldRoot` mantém gap de 8 px; o label anterior deixava 12 px até o controle;
- Teacher já usava `FieldRoot + TextInput`, portanto deve manter o recipe default;
- os únicos consumers atuais de `ControlledField` são Teacher e Student; `FieldRoot` também é usado
  no Admin.

## Solução

Adicionar `labelVariant?: 'default' | 'eyebrow'` a `FieldRootProps`. O componente converte o valor
ausente em `default` e passa uma prop transitória para `Styled.Label`. O recipe `eyebrow` usa tokens
existentes para cor muted, tamanho xs, peso semibold e line-height normal, além de tracking `0.08em`,
uppercase e margem inferior de 4 px. Somada ao gap estrutural de 8 px, a margem restaura os 12 px
anteriores sem alterar hint ou erro.

`ControlledFieldProps` referencia o tipo de `FieldRootProps` e o componente repassa a variante. No
Student, a prop é aplicada aos três `ControlledField` e aos dois `FieldRoot` formatados. O telefone
não muda porque já usa o label antigo.

## Arquivos

UI Library:

- `src/molecules/FieldRoot/{types,index,styles,stories,test}`;
- `src/molecules/ControlledField/{types,index,stories,test}` quando necessário;
- `quality/public-api.json` após revisão do diff gerado;
- documentação desta épica.

Student:

- `src/pages/RegisterStudent/sections/DetailsStep/index.tsx`;
- testes existentes somente se a prop exigir cobertura de integração adicional.

## Validação

1. testes focados de `FieldRoot` e `ControlledField`;
2. typecheck e `check:api`, aceitando apenas a nova prop opcional;
3. package smoke e tarball local;
4. story visual default, eyebrow, inválida e estreita;
5. consumo do tarball local no Student e teste focado de cadastro;
6. `pnpm run validate:ui` na library e no Student;
7. inspeção de 390, 1281 e 2048 px e comparação com o baseline anterior.

## Riscos e mitigação

- **regressão global:** manter `default` implícito e não modificar seu recipe;
- **API visual vaga:** usar o nome reconhecível `eyebrow`, sem expor propriedades CSS avulsas;
- **ritmo incorreto:** cobrir o espaçamento efetivo em story/browser e screenshot Student;
- **duplicação local:** aplicar a prop pública em vez de criar styled wrapper no portal;
- **release prematuro:** validar tarball local, mas não publicar/taguear/deployar sem autorização.

## Revisão crítica

### Produto

A solução restaura apenas a hierarquia pedida e mantém o recipe atual dos inputs fora do escopo.

### Tech Lead

Uma variante opt-in evita impacto nos muitos `FieldRoot` do Admin e nos campos Teacher, mantendo um
único owner para o estilo reutilizável.

### Senior React

A prop pertence ao `FieldRoot`; `ControlledField` apenas a encaminha. A prop transitória impede que
o atributo visual chegue ao DOM.

### QA

O default e a variante precisam aparecer lado a lado em cobertura visual. O aceite exige inspeção
do cadastro completo, inclusive telefone e erro.

## Decisão

Usar variante pública opt-in, não trocar o default e não reintroduzir CSS de produto para labels.
