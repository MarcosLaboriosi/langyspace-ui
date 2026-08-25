import { css, keyframes, styled } from 'styled-components'
import { tokens } from '../../foundations/tokens'

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
`

export const Row = styled.div.withConfig({
  componentId: 'lsui-sc-auth-token-digits',
})`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: ${tokens.spacing[2]};
  margin: ${tokens.spacing[4]} 0 ${tokens.spacing[6]};
`

export const Input = styled.input<{ $hasError: boolean; $isFilled: boolean }>`
  width: 100%;
  min-width: 0;
  max-width: 3.25rem;
  flex: 1 1 0;
  aspect-ratio: 1 / 1.1;
  border: 2px solid
    ${({ $hasError, $isFilled }) =>
      $hasError
        ? tokens.color.accent.default
        : $isFilled
          ? tokens.color.neutral[950]
          : tokens.color.neutral[400]};
  border-radius: ${tokens.radius.card};
  outline: 0;
  background-color: ${({ $hasError, $isFilled }) =>
    $hasError
      ? tokens.color.accent.tint
      : $isFilled
        ? tokens.color.neutral[50]
        : tokens.color.neutral[0]};
  color: ${tokens.color.neutral[950]};
  font-size: ${tokens.typography.fontSize['2xl']};
  font-weight: ${tokens.typography.fontWeight.bold};
  text-align: center;
  transition:
    background-color ${tokens.motion.duration.interactive}
      ${tokens.motion.easing.interactive},
    border-color ${tokens.motion.duration.interactive}
      ${tokens.motion.easing.interactive},
    transform ${tokens.motion.duration.interactive}
      ${tokens.motion.easing.interactive};

  ${({ $hasError }) =>
    $hasError &&
    css`
      animation: ${shake} 350ms ease;
    `}

  &:focus {
    border-color: ${tokens.color.neutral[950]};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.55;
    cursor: default;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition: none;
  }

  @media (min-width: 768px) {
    max-width: 3.75rem;
    font-size: ${tokens.typography.fontSize['3xl']};
  }
`
