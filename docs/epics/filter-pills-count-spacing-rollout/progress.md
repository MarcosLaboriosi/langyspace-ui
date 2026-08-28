# Progresso — espaçamento de contador no FilterPills

## Estado atual

Rollout concluído: library `v1.4.1` publicada, Admin atualizado na `main` e artifact validado em
produção.

## Concluído

- diagnóstico confirmou `gap` inerte por ausência de layout flex no item;
- recipe compartilhado corrigido sem mudança de API;
- teste e Storybook cobrem `Todos: 175`;
- teste unitário: 3/3;
- story test focado: 5/5;
- `pnpm run validate:ui`: 214 tests, 942 cenários, 105 stories, zero issue;
- capturas de 390 e 1281 px inspecionadas; matriz também passou em 2048 px;
- plano revisado como Produto, Tech Lead, Engenharia e QA.
- runtime commit da library `ccbace8084b25ba5f07a8f185a099d0fbdb4d45d` enviado para `main`;
- CI da library `33170536369` passou, incluindo testes, API e visual;
- tag anotada `v1.4.1` aponta para o runtime commit e o workflow `33171190578` passou;
- artifact público `langyspace-ui-1.4.1.tgz` confere com o SHA-256 publicado
  `b916d5b19ba5515d4f423cc797ee1360759a2ad1b0ad433008ee7597584c613f`;
- Admin fixou a URL imutável `v1.4.1`; instalação congelada, build, 321 testes funcionais,
  27 fluxos de acessibilidade e 45 cenários de design system passaram;
- auditoria focada das superfícies consumidoras passou em 24 cenários nas larguras 390, 1280,
  1281 e 2048 px, sem problemas geométricos;
- commit Admin `6b61a111b117382f7dba94021dbc28d7e8ca7927` enviado para `main`;
- workflow Admin `33174693450` falhou na detecção, antes de executar qualquer step; o fallback
  autorizado publicou somente `hosting:admin` no projeto `langyspace-564b5`;
- versão Hosting `c4f73fa8f8e97515` finalizada e promovida ao canal `live` em
  `2026-08-28T13:18:25.847Z`;
- `langyspace-admin.web.app` e `admin.langy.space` respondem HTTP 200 na rota de cobranças;
- bundle público `assets/index-B6a9zk3-.js` é idêntico ao build local, com SHA-256
  `632b2f53455473b30a7770600f57d2a2d301cd0c90ae22be1304ab05157a2832`, e contém uma única
  assinatura `lsui-sc-filter-pills` com o recipe corrigido.

## Próxima subtask

Nenhuma; rollout concluído.

## Blockers

Nenhum. A falha de infraestrutura do workflow Admin foi contornada pelo fallback autorizado e
restrito a `hosting:admin`.

## Preservação de worktree

As alterações paralelas em `.agents/skills/langyspace-ui-workflow/SKILL.md` e no equivalente do
Admin não pertencem a este rollout e permanecerão fora de staging/commits.
