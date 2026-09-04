# Requisitos — variante eyebrow para labels de campo

## Funcionais

- RF-01: `FieldRoot` deve aceitar `labelVariant="eyebrow"` mantendo `default` implícito.
- RF-02: `ControlledField` deve expor e repassar a mesma variante.
- RF-03: a variante deve afetar somente o label e seu espaço até o controle.
- RF-04: associação `label`/controle, hints, erros e IDREFs devem permanecer intactos.
- RF-05: nome, data de nascimento, e-mail, CPF condicional e Instagram no Student devem usar a
  variante.

## Não funcionais

- RNF-01: usar somente tokens existentes da UI Library.
- RNF-02: não depender de CSS global, tema do consumidor ou ordem de imports.
- RNF-03: manter compatibilidade retroativa para consumidores sem `labelVariant`.
- RNF-04: não introduzir regra específica de Student dentro da library.
- RNF-05: preservar alterações paralelas nos worktrees canônicos.

## Casos de borda

- label longo em superfície estreita;
- estado com hint e erro simultâneos;
- `ControlledField` com validação do `react-hook-form`;
- CPF ausente ou presente conforme a regra do cadastro;
- coexistência com o label do `PhoneField`.

## Aceite

- o label eyebrow computa `text-transform: uppercase`, `letter-spacing: 0.08em`, peso 600 e
  line-height normal;
- o intervalo label-controle equivale aos 12 px anteriores no Student;
- o recipe default continua coberto e inalterado;
- a API pública registra a prop opcional;
- o cadastro não apresenta corte, overflow ou mistura de hierarquia entre labels.
