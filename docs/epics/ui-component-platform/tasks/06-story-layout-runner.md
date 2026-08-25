# T06 — Runner de layout orientado a stories

## Objetivo

Preservar o rigor geométrico do audit atual sem manter um app/showcase central.

## Passos

1. catalogar cada assertion atual e sua story owner;
2. extrair overflow, containment, focus, motion e loading checks genéricos;
3. extrair field/selection/auth checks em módulos pequenos;
4. enumerar stories pela metadata construída;
5. aplicar widths globais e boundaries locais;
6. gerar report JSON e screenshots por story/scenario;
7. executar runner antigo e novo em paralelo;
8. remover showcase/CSS/entry somente com paridade verde.

## Checks focados

- normal/stress x normal/reduced motion
- 390/1281/2048 globais
- 768/1280 e outros boundaries declarados
- inspeção manual dos artifacts

## Done

- nenhuma assertion atual perdida;
- novo component não exige editar selector list central;
- report identifica story e rule;
- showcase removido sem alterar package runtime.

## Resultado

- o runner legado passou em 36 cenários, com nove widths, dois modos e duas preferências de motion,
  antes da remoção;
- o runner novo enumera `index.json`, reconhece roots estáveis genericamente e usa as tags
  `layout-boundary`/`visual-review` para ampliar cobertura sem selector list por component;
- 63 stories passaram em 534 cenários: 390/1281/2048 globais, motion normal/reduced e
  768/1280/1440/1536/1551/1552 para stories de boundary;
- rules possuem IDs acionáveis para render, overflow, containment, action recipes/loading,
  reduced motion, focus, StatePanel, field, selection e AuthTokenDigits;
- rede externa é bloqueada, page errors falham, report fica em path determinístico e screenshots
  anteriores são removidos antes do run;
- 57 screenshots de risco foram gerados; amostras de 390/1281/2048 para actions, fields,
  selections, auth, states e tokens foram revisadas sem regressão visível;
- `index.html`, `showcase/` e os três runners transitórios foram removidos após a paridade verde;
  README, TypeScript e ESLint agora apontam para o catálogo.

## Rollback

Manter o runner/showcase antigo por um release enquanto o novo roda advisory; apagar somente no
commit final da task.
