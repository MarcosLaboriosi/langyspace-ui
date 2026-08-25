# T07 — fortalecer audits arquiteturais

Status: concluída.

## Responsabilidade

Transformar as decisões do épico em prevenção automática de regressão.

## Escopo

- manter checks de native button/styled.button;
- bloquear spinner/keyframe de espera fora do atom;
- adicionar allowlist exata para motion de domínio;
- bloquear import de atom por `*/styles` no package;
- validar import boundaries e unions copiadas onde houver regra confiável;
- adicionar reduced-motion audit determinístico;
- documentar mensagens de erro e como corrigir.

## Checklist

- [x] cada regra falha em fixture negativa e passa no código aceito;
- [x] allowlist inclui caminho, motivo e owner;
- [x] regex não captura animação não relacionada;
- [x] reduced motion usa computed animation;
- [x] scripts entram nos gates existentes.

## Conclusão

Uma nova duplicação relevante falha localmente e em CI com mensagem acionável.

## Validação focada

- executar cada script em estado válido;
- executar fixtures negativas controladas sem commitá-las;
- lint dos scripts e focused layout reduced motion.
