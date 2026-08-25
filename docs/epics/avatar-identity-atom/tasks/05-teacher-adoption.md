# T05 — Adoção Teacher

## Responsabilidade

Substituir os oito callsites Teacher pelo mesmo package candidato e validar shell, lists e drawers.

## Checklist

- [ ] instalar exatamente o candidate aprovado no Admin;
- [ ] migrar seis imports para o entrypoint público;
- [ ] mapear `accent` para `brand` e `muted` para default `neutral`;
- [ ] remover os três arquivos locais;
- [ ] adicionar policy contra import local e recipe override;
- [ ] adicionar assertion do marker para diâmetro, círculo, overflow e flex-shrink;
- [ ] criar case `inicio-drawer-aluno` para abrir a tab de perfil e cobrir `xl`;
- [ ] garantir allowlist pnpm para `1.2.0` no release final;
- [ ] validar foto válida, fallback, mobile header, sidebar, Hoje, Alunos e drawer;
- [ ] comparar screenshots before/after em 390/1281/2048.

## Done

Teacher usa a API canônica diretamente, mantém a interatividade nos owners locais e passa o gate
visual completo sem regressão hierárquica.

## Validação focada

- architecture audit, lint e build;
- tests de Sidebar/MobileTeacherHeader afetados;
- layout cases `inicio,inicio-drawer-presenca,inicio-drawer-aluno,alunos` em nove widths;
- full `pnpm run validate:ui` uma vez.
