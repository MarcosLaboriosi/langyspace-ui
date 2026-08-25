# Audits arquiteturais

Cada produto executa `pnpm run test:button-system` antes de build/layout. O package executa a mesma
entrada antes de lint e typecheck.

## Regras

- `<button>` e `styled.button` pertencem ao `Pressable`; consumidores compõem os atoms públicos.
- `rotate(360deg)` fora de `Spinner` é tratado como spinner local de espera e falha.
- todo arquivo com keyframe de domínio precisa de caminho exato, motivo e owner na
  `allowedDomainMotion` do produto; isso separa motion pedagógico, feedback e skeleton de espera.
- imports diretos de Button só passam nos boundaries inventariados por produto.
- unions locais que repetem `primary` e `secondary` falham; tipos devem derivar a API pública.
- atoms do package não podem importar os estilos privados de outro atom.
- o layout audit do package consulta `matchMedia` e o `animationName` computado do Spinner nos modos
  normal e `prefers-reduced-motion: reduce`.

## Mensagens e correção

- `local wait spinner`: use `Spinner` ou `Button isLoading`.
- `unclassified motion`: confirme que não é espera e adicione caminho, motivo e owner exatos.
- `direct Button import`: use o adapter local; Cupom é a única exceção sem wrapper.
- `copied Button union`: derive com `Extract`, `Exclude`, `Pick` ou `Omit` dos tipos públicos.
- `private styles`: importe o entrypoint público do atom.

Fixtures negativas temporárias comprovaram todas as mensagens e foram removidas depois da execução.
