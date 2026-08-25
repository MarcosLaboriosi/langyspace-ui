# T15 — revisar, publicar e provar produção

Status: concluída.

## Responsabilidade

Executar review final, publicar artefatos imutáveis e provar os cinco produtos em produção.

## Escopo

- revisar requirements, diffs, dead code, docs e inventory final;
- full gate do package e dos cinco consumers;
- screenshot review em 390/1281/2048 e boundaries afetados;
- publicar major/minor aprovados, checksum e public download smoke;
- atualizar dependências imutáveis, commits convencionais, pushes sem force e CI;
- provar readiness/traffic, HTTP routes e markers dos bundles live.

## Conclusão

Todos os critérios de aceite possuem evidência atual e não existe próxima task ambígua.

## Validação focada

- seis `validate:ui` finais;
- package tarball/Node/SSR smoke;
- CI/Hosting e served-bundle proof por produto.

## Resultado

- `@langyspace/ui@1.0.0` foi publicado pelo release `32884945020`; o artefato público possui
  SHA-256 `b64791ed236da7d018898e46785c33a29528eb7862541dd6bed20146c01a048f` e passou smoke de
  import, executable, SSR e Vite a partir da URL pública;
- os cinco consumidores usam a URL imutável do release, sem caminhos privados, temporários ou
  imports internos;
- os gates finais passaram com 36 cenários no package, 270 na Landing, 1.820 no Admin, 648 no
  Student, 252 no Teacher e 36 no Cupom;
- a revisão visual cobriu 390/1281/2048, autenticação, drawer de presença, forms, estados, filtros e
  controles compostos; a quebra original do footer mobile permanece corrigida;
- a política de supply chain do pnpm foi atualizada de 0.6.0 para 1.0.0 nos quatro workspaces que
  já possuíam a exceção do pacote privado e foi validada com pnpm 11.2.2;
- Landing `2c5bc3a`, Admin `ae49e0a`, Student `70caa49`, Teacher `8cff191` e Cupom `fde3356`
  chegaram a `main` sem force-push e seus workflows de deploy concluíram com sucesso;
- as cinco URLs públicas responderam HTTP 200 e serviram bundles contendo os component IDs
  semânticos do design system.
