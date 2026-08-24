# T03 — Publicar o release imutável

## Responsabilidade

Entregar exatamente o package validado como `v0.5.0` público e instalável.

## Subtasks

- [ ] atualizar version e lockfile;
- [ ] commit/staging restrito e `git diff --cached --check`;
- [ ] fast-forward de main e push;
- [ ] tag/push `v0.5.0`;
- [ ] esperar CI e release workflows;
- [ ] verificar tarball, checksum, contents e download anônimo;
- [ ] rodar smoke externo Node/Vite com o artefato público;
- [ ] atualizar progress com SHA, runs e checksum.

## Conclusão

O URL público imutável está disponível e corresponde ao commit validado.

## Validação focada

- GitHub workflow conclusions;
- `pnpm pack --dry-run`/smoke script com a URL de release;
- checksum publicado versus baixado.
