# Epic — variante eyebrow para labels de campo

## Problema

A adoção dos campos compartilhados no cadastro Student preservou comportamento e altura, mas
substituiu o label pequeno, espaçado e em caixa alta por um label simples. O campo de telefone
permaneceu com o padrão anterior, deixando o formulário visualmente inconsistente.

## Objetivo

Disponibilizar na UI Library uma variante reutilizável de label `eyebrow` e aplicá-la no cadastro
Student sem alterar o padrão atual de Teacher, Admin ou outros consumidores.

## Escopo

- variante opcional em `FieldRoot`;
- repasse da variante por `ControlledField`;
- story, testes, contrato público e documentação da variante;
- validação integrada no cadastro Student em `/cadastro` e `/registration`.

## Fora de escopo

- alterar o estilo default de `FieldRoot`;
- restaurar o recipe antigo dos inputs;
- migrar `PhoneField` ou alterar sua interação;
- alterar telas, rotas, dados, validações ou mensagens;
- publicar pacote, criar tag, fazer push ou deploy sem autorização explícita.

## Jornada preservada

1. A pessoa abre o cadastro Student.
2. Os labels voltam a usar a hierarquia visual anterior.
3. Inputs, máscaras, erros, foco e submit continuam funcionando como hoje.
4. Consumidores que não informam a variante permanecem visualmente inalterados.

## Critérios de sucesso

- o default não sofre mudança de CSS ou DOM;
- `eyebrow` usa tamanho `xs`, peso semibold, tracking `0.08em`, caixa alta e ritmo equivalente ao
  label anterior;
- todos os cinco labels de texto do cadastro Student usam a variante;
- stories, testes, API, package smoke e gates visuais aplicáveis passam;
- screenshots em 390, 1281 e 2048 px mostram os labels consistentes com `Celular`.

## Impacto visual

Classificação: `direct`. A variante altera hierarquia e ritmo vertical quando explicitamente
selecionada. As superfícies afetadas são as stories de `FieldRoot`/`ControlledField` e o detalhe do
cadastro Student nos estados normal, preenchido e inválido.
