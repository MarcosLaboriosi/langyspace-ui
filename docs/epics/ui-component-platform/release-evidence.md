# Evidência de release

## Source, catálogo e package

| Evidência                           | Resultado                                                                           |
| ----------------------------------- | ----------------------------------------------------------------------------------- |
| UI source do release / tag `v1.1.0` | `5b182df40a2837b7d15609bc5eb747952f38bc0f`                                          |
| CI agregado                         | run `32906931747`, architecture/tests/package/visual/validate passed                |
| Catálogo Pages                      | run `32907418172`, <https://marcoslaboriosi.github.io/langyspace-ui/> retorna `200` |
| Catalog index                       | SHA-256 `049e0485b8642438213294cef0feeec42654037207f9719335c36cb89f869905`          |
| Release workflow                    | run `32907433140`, passed                                                           |
| Package                             | `@langyspace/ui@1.1.0`, 35.693 bytes                                                |
| Tarball SHA-256                     | `7d5be91fb277d64b4e7f31c353c6022e5772cf4ad2b4f3c70d8ea9a987ba8c7f`                  |

O catálogo é o artifact estático produzido pelo job visual do mesmo commit aprovado. O
`index.json` servido contém as quatro stories de `SectionHeader`. O release publicou tarball e
checksum, e a conferência local do arquivo baixado passou.

## Gates da library

- audit arquitetural: 93 production files e LSUI001–LSUI012;
- testes: 47 files / 146 tests, sendo 74 unit e 72 story/axe;
- coverage: 96,75% statements, 95,90% branches, 99,08% functions e 97,35% lines;
- API: 21 values, 51 types e 72 declarations;
- package: conteúdo, metadata, ESM, browser consumer, SSR/CSS e CLI passed;
- bundle raw/gzip: library 40.749/8.855, actions 13.872/3.177, fields 22.966/5.123 e
  molecules 20.291/5.656 bytes;
- layout: 72 stories / 612 cenários, zero issue após corrigir o overflow da tabela documental de
  tokens; screenshots de `SectionHeader` em 390/1281/2048 foram inspecionados.

## Consumers e Hosting

| Produto | Main      | Workflow             | Bundle servido      | Evidência                                                                  |
| ------- | --------- | -------------------- | ------------------- | -------------------------------------------------------------------------- |
| Admin   | `a627cb8` | `32909197149` passed | `index-CjTpURI_.js` | SHA-256 `88ccba89881e70769e4699945172a1fe6deae4cce3ada898994f40d7bae78caa` |
| Teacher | `89a4c79` | `32909197852` passed | `index-ylCYiEla.js` | SHA-256 `8d6efc0501ea2cd00dbf052a9c38b8c65c0af7c4d8fe3aee92646d4f79bb15e8` |

Nos dois produtos, `web.app` e `firebaseapp.com` retornaram `200`, os hashes servidos foram
idênticos aos builds locais validados e o marker `lsui-sc-section-header` foi encontrado. Admin
passou 235 tests, 13 fluxos WCAG, 45 cenários de design system e os quatro shards da matriz completa
de layout. Teacher passou o gate próprio e 252 cenários em 14 estados de rota.

Landing, Student e Cupom não foram alterados nem redeployados: o inventário não encontrou consumo
runtime do piloto e adicionar uma dependency sem uso violaria o escopo e a direção de dependência.

## Incidentes contidos

- o Node 26 local habilita WebStorage experimental sem arquivo e faz 15 testes antigos do Admin
  falharem; a mesma falha foi reproduzida na baseline e os 235 testes passaram com essa API
  experimental desativada. Os workflows oficiais usam Node 24;
- o primeiro deploy de Admin/Teacher falhou no install porque o allowlist de
  `minimumReleaseAgeExclude` ainda apontava para `@langyspace/ui@1.0.0`; o allowlist foi atualizado
  para a versão imutável `1.1.0`, o pnpm 11.2.2 comprovou as políticas verdes e os reruns fizeram
  deploy com sucesso;
- a execução local Admin em todas as 13 larguras excedeu 15 minutos. O recorte completo de estados
  em 390/1281/2048 passou em 420 cenários, e o CI concluiu a matriz integral em quatro shards.

## Rollback

Reverter os commits Admin/Teacher restaura os components locais e o URL `v1.0.0`. O catálogo pode
ser despublicado sem afetar o package; consumidores do package continuam fixados em tarballs
imutáveis. Nenhum dado, Function, regra, payload ou contrato de domínio foi alterado.
