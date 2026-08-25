# T14 — centralizar o audit arquitetural

Status: concluída.

## Responsabilidade

Substituir engines copiados por uma regra central versionada com config local pequena.

## Escopo

- CLI/engine público ou executable estável no package;
- configs por produto para boundaries, motion e exceptions;
- detectar native ownership, copied unions, private imports, layer inversion e visual overrides;
- provar mensagens com fixtures negativas temporárias.

## Conclusão

Seis produtos executam o mesmo engine e mantêm somente decisões específicas locais.

## Resultado

- o package publica `@langyspace/ui/audit` e o executable `langyspace-ui-audit` no mesmo tarball dos
  componentes;
- os seis scripts copiados foram substituídos pelo engine central e por um config pequeno em cada
  repositório;
- boundaries e motion allowlists exigem path, motivo e owner; overrides descendentes exigem também
  selector exato;
- o engine bloqueia native ownership, spinner local, motion sem classificação, import privado,
  copied union, layer inversion, props removidas e overrides visuais;
- layout audits continuam locais porque conhecem rotas, fixtures e densidade do produto;
- o audit encontrou um `min-height` redundante no resultado de quiz do Teacher; o override foi
  removido e a altura voltou a pertencer ao Button canônico;
- o segmented control financeiro do Admin continua boundary de domínio sobre Pressable e possui
  exceção explícita por selector, razão e owner.

## Validação focada

- fixtures positivas e negativas de cada regra;
- `test:button-system`/novo nome em todos os repos;
- format/lint dos configs.

## Evidência

- dez fixtures negativas provam as regras e a validação obrigatória das exceções;
- package passou audit de 67 arquivos, lint, format, typecheck, 46 testes, build, tarball/Node/SSR,
  smoke do CLI publicado e 36 cenários de layout;
- o mesmo executable auditou Landing/Admin/Student/Teacher/Cupom em 99/149/307/477/20 arquivos;
- os cinco configs passaram Prettier e os audits positivos;
- o Teacher passou build e 13 testes do StudentLearningPreview depois da remoção do override;
- o candidato 1.0.0 com engine público possui SHA-256
  `8a1d7ff63bd412cf3ae1efde7a7442e48450515d01bb87552436f5e0076d6ceb`.
