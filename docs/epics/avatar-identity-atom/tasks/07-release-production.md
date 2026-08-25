# T07 — Release, produção e encerramento

## Responsabilidade

Publicar o package imutável, avançar as mains aplicáveis, comprovar produção e fechar o épico sem
loop documental.

## Checklist

- [ ] commit/push da library com fast-forward e CI verde;
- [ ] criar tag/release `v1.2.0` com tarball e checksum;
- [ ] baixar e verificar o artifact publicado;
- [ ] substituir candidate pelo URL imutável em Admin/Teacher;
- [ ] commit/push Admin, Teacher e cleanup Student com staging explícito;
- [ ] aguardar workflows e deploys sem tocar Functions;
- [ ] verificar HTTP 200, bundle filename/hash e marker `lsui-sc-avatar`;
- [ ] verificar catálogo publicado pelo commit aprovado;
- [ ] registrar release evidence, rollback e incidentes contidos;
- [ ] fechar tasks/progress no mesmo commit documental final necessário.

## Done

Package, catálogo e consumers estão comprovados em `main`/produção; o épico não possui próxima task
ambígua e os checkouts originais continuam preservados.

## Validação focada

- GitHub Actions library/catalog/release;
- workflows Admin/Teacher/Student;
- HTTP e SHA-256 dos artifacts servidos;
- marker runtime no bundle Admin/Teacher;
- Prettier e `git diff --check` nos documentos finais.
