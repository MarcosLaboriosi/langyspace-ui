# T07 — Release, mains e produção

## Responsabilidade

Publicar o mesmo artefato validado, atualizar os três products e provar produção.

## Subtasks

- [ ] commitar package candidate verde;
- [ ] criar tag/release `v1.3.0` e comparar conteúdo/hash;
- [ ] substituir candidate pelo URL imutável nos consumers;
- [ ] rodar checks de integridade sem repetir gates caros sem mudança runtime;
- [ ] commitar cada consumer com staging explícito;
- [ ] fazer push fast-forward para as quatro `main`;
- [ ] acompanhar workflows/deploys;
- [ ] verificar catálogo, URLs, asset filename/hash e runtime markers;
- [ ] fechar evidence, tasks e progress sem próxima subtask ambígua.

## Done

- package e consumers em main;
- workflows verdes e Hostings servindo os bundles validados;
- rollback e checksums registrados;
- checkouts originais preservados.

## Validação

- GitHub release asset/hash;
- GitHub Actions por commit;
- HTTP 200, bundle hash e marker `lsui-sc-modal-panel`/equivalente;
- `git status --short` e `origin/main` nos quatro repos.
