# T05 — Adoção Teacher

## Responsabilidade

Substituir os oito callsites do Avatar local e o `ProfileAvatar` artesanal pelo mesmo package
candidato, validando shell, lists e drawers.

## Checklist

- [x] instalar exatamente o candidate aprovado no Admin;
- [x] migrar sete imports para o entrypoint público;
- [x] remover o recipe `ProfileAvatar` duplicado do drawer de aluno;
- [x] mapear `accent` para `brand` e `muted` para default `neutral`;
- [x] remover os três arquivos locais;
- [x] adicionar policy contra import local e recipe override;
- [x] adicionar assertion do marker para diâmetro, círculo, overflow e flex-shrink;
- [x] criar case `inicio-drawer-aluno` para abrir a tab de perfil e cobrir `xl`;
- [x] garantir allowlist pnpm para `1.2.0` no release final;
- [x] validar foto válida, fallback, mobile header, sidebar, Hoje, Alunos e drawer;
- [x] comparar screenshots before/after em 390/1281/2048.

## Resultado

Nove callsites visuais usam o package público; o recipe escondido no StudentProfileDrawer também
foi removido. Três focused files/18 tests e 270 cenários/594 leituras de Avatar passaram. O workflow
`32916232724` publicou o bundle validado.

## Done

Teacher usa a API canônica diretamente, mantém a interatividade nos owners locais e passa o gate
visual completo sem regressão hierárquica.

## Validação focada

- architecture audit, lint e build;
- tests de Sidebar/MobileTeacherHeader afetados;
- layout cases `inicio,inicio-drawer-presenca,inicio-drawer-aluno,alunos` em nove widths;
- full `pnpm run validate:ui` uma vez.
