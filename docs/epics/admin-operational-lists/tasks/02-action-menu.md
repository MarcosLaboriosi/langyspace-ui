# T02 — ActionMenu acessível

Status: concluída em 2026-08-28. Evidência: [t02-evidence.md](../t02-evidence.md).

## Objetivo

Implementar o menu por array de ações com ownership completo de semântica, teclado, foco e posição.

## Trabalho

- criar source/types/styles/test/story co-localizados;
- implementar controlled/uncontrolled, trigger, portal fixed, flip/clamp, outside click, Escape e
  return focus;
- implementar setas, Home/End e skip de disabled/loading;
- omitir trigger sem items e manter menu perceptível/focável quando todos estão disabled/loading;
- distinguir close reasons para Escape/seleção, Tab, outside e viewport sem roubo de foco;
- normalizar danger e separators sem `className` do consumer;
- garantir listeners globais somente enquanto aberto;
- exportar provisoriamente no candidate e registrar manifest/API depois da revisão;
- documentar uso e limites.

## Aceite

- action descriptors usam ícone/nome/tom/callback;
- keyboard flow completo e axe verde;
- menu permanece dentro do viewport em start/end e narrow;
- scroll/resize fecham o popup e listeners existem somente enquanto aberto;
- nenhuma dependência runtime nova sem aprovação explícita;
- nenhuma copy ou icon library de produto.

## Validação

- unit focado;
- Storybook interaction focado, consultando `ownerDocument.body` para o popup portaled;
- layout/visual stories focadas;
- typecheck, lint e format dos arquivos alterados.
