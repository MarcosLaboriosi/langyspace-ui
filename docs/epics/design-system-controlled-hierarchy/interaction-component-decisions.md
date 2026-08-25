# Decisões de fields, filtros e autenticação

## Hierarquia promovida na T12

| Componente                            | Camada   | Responsabilidade compartilhada                                         |
| ------------------------------------- | -------- | ---------------------------------------------------------------------- |
| AuthNotice                            | atom     | notice semântico com children e props nativas                          |
| TextInput, SelectInput, TextareaInput | atom     | input nativo, recipe e integração opcional com FieldRoot               |
| AuthTokenDigits                       | molecule | dígitos, sanitização, paste, backspace, foco e controlled/uncontrolled |
| FieldRoot                             | molecule | label, hint, error, ids e described-by                                 |
| CompoundControl                       | molecule | uma única surface para slots e control                                 |
| SearchInput                           | molecule | CompoundControl, ícone decorativo e clear com restauração de foco      |
| FilterPills                           | molecule | grupo de filtros pressed com counts, size e overflow                   |
| SegmentedControl                      | molecule | escolha exclusiva em surface light/inverse e shape rounded/pill        |

## Limites

- `react-hook-form`, query params, copy de flow, Firebase, resend e navigation permanecem locais;
- `digitLabel`, nome do grupo e `clearLabel` são fornecidos pelo produto para não embutir idioma;
- `FilterPills` não recebe breakpoint ou prop cosmética; responsive distribution diferente continua
  boundary local até existir um contrato repetido;
- `SegmentedControl` não absorve o tipo de domínio do Cupom: options tipadas entram pelo callsite;
- fields possuem tokens de altura próprios; alterar fields não pode modificar Button/IconButton.

## Evidência de equivalência

- AuthTokenDigits Student/Teacher era byte-identical; AuthNotice diferia somente no forwarding de
  props nativas, resolvido pelo contrato mais completo;
- fields/compound/search do Admin já separavam acessibilidade, surface e adapter de form e foram a
  referência promovida;
- FilterPills repetia a mesma semântica com duas densidades reais; SegmentedControl repetia escolha
  exclusiva em surfaces clara e inversa no Admin/Cupom.

## Decisões da adoção T13

- `ChoiceValue` é `string | number`: valores numéricos são identidade legítima de uma escolha e o
  Cupom não deve converter domínio para string somente para satisfazer o componente visual;
- os tokens de fields preservam altura, border, surface e conteúdo do Admin sem reutilizar tokens de
  actions, impedindo que uma correção de input altere Button/IconButton;
- `AuthTokenDigits` preserva digitação contínua controlled, paste, foco, backspace, accessible name
  do grupo e nome individual dos seis dígitos;
- o FilterPills sem uso do Student foi removido; o do Teacher permanece local por possuir
  distribuição responsiva específica, não por diferença cosmética;
- os componentes removidos só foram apagados depois de busca confirmar zero imports locais.
