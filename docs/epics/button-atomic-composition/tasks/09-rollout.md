# T09 — publicar, integrar e provar produção

Status: pendente.

## Responsabilidade

Publicar o package validado e levar o mesmo artefato aos cinco produtos com prova operacional.

## Escopo

- escolher SemVer pela API final e publicar release imutável;
- verificar checksum, conteúdo, Node import e prerender do asset público;
- substituir tarball local pela URL pública e executar frozen installs;
- criar commits coerentes com staging explícito por repo;
- provar ancestry, atualizar mains sem force e acompanhar workflows;
- verificar canais Firebase live, HTTP 200 e markers dos bundles;
- atualizar documentação, rollback e handoff final.

## Checklist

- [ ] AC-09 a AC-11 comprovados;
- [ ] release/tag/package version consistentes;
- [ ] cinco consumidores no mesmo artefato;
- [ ] CI/Hosting concluídos com sucesso;
- [ ] worktrees originais preservados;
- [ ] épico fechado sem próxima task ambígua.

## Conclusão

Mains e produções servem o patch validado; rollback é executável e o handoff contém toda a evidência.

## Validação focada

- checksum e conteúdo do release;
- `pnpm install --frozen-lockfile` em cada consumidor;
- workflows por SHA;
- Firebase live version, rota HTTP e marker servido.
