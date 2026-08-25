# Candidato local 1.0.0

## Artefato único

- arquivo: `langyspace-ui-1.0.0.tgz`;
- SHA-256: `a6e00b71f1784fbd1efc1c983c1581815cd98135920ee755fdb931c303421093`;
- conteúdo: `dist`, `LICENSE`, `README.md` e `package.json`; sem source, screenshots ou arquivos
  locais;
- validação do package: `validate:ui` passou, incluindo 31 testes, audit, lint, format, typecheck,
  build, pack/import Node, prerender SSR, consumer Vite e 36 cenários visuais em nove larguras.

Os cinco worktrees receberam exatamente esse arquivo via `file:`. A dependência local é somente o
mecanismo do candidato; T15 troca a referência pela URL imutável da release pública.

O candidato foi renovado durante a revisão visual da Landing: `IconButton inverse` passou a manter
um contorno translúcido canônico em surfaces escuras. O full gate do package foi repetido antes de
gerar o checksum acima.

## Builds iniciais dos consumidores

| Produto | Resultado | Incompatibilidade real                                                                                                |
| ------- | --------- | --------------------------------------------------------------------------------------------------------------------- |
| Landing | falhou    | dois `ActionLink tone="brand"` em FinalCta e StickyMobileCta; trocar pelo variant direto                              |
| Admin   | falhou    | adapter Button ainda traduz `tone`/`iconOnly`; adapter IconButton ainda constrói Button icon-only; tipo `ButtonTone`  |
| Student | falhou    | adapter Button e teste ainda usam `tone`; IconButton local constrói Button icon-only; dois styled attrs usam `tone`   |
| Teacher | falhou    | adapter Button e teste ainda usam `tone`; IconButton local constrói Button icon-only; PillButton depende de tone/type |
| Cupom   | passou    | nenhuma dependência da API removida                                                                                   |

## Leitura técnica

- nenhum consumidor revelou import profundo, contract de SSR, peer incompatível ou comportamento
  oculto que exija compat layer;
- os erros estão confinados aos adapters/callsites já previstos no inventário;
- a ordem T05 Landing, T06 Admin, T07 Student, T08 Teacher e T09 Cupom continua válida;
- cada task deve manter o mesmo tarball instalado, remover tradução local e provar layout contra o
  baseline antes de alterar a referência de release.
