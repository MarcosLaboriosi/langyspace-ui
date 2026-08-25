export const tokens = {
  color: {
    brand: {
      default: '#cc0f45',
      hover: '#b01343',
    },
    feedback: {
      danger: '#c62828',
      dangerStrong: '#991b1b',
      success: '#166534',
      successStrong: '#14532d',
    },
    focus: 'rgba(0, 242, 234, 0.72)',
    neutral: {
      0: '#ffffff',
      50: '#fafaf9',
      100: '#f1f1ef',
      300: '#d9d9d6',
      500: '#9a9a9a',
      900: '#1a1a1a',
      950: '#0a0a0a',
    },
  },
  control: {
    height: {
      lg: '3rem',
      md: '2.5rem',
      sm: '2rem',
    },
  },
  motion: {
    duration: {
      interactive: '150ms',
      spinner: '0.8s',
    },
    easing: {
      interactive: 'cubic-bezier(0.2, 0, 0, 1)',
    },
  },
  radius: {
    pill: '999px',
    rounded: '0.75rem',
  },
  shadow: {
    focus: '0 0 0 2px #ffffff, 0 0 0 5px rgba(0, 242, 234, 0.72)',
    raised: '0 4px 12px rgba(0, 0, 0, 0.07)',
    subtle: '0 1px 2px rgba(0, 0, 0, 0.05)',
  },
  spacing: {
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
  },
  typography: {
    fontSize: {
      md: '1rem',
      sm: '0.875rem',
    },
    fontWeight: {
      semibold: 600,
    },
    lineHeight: {
      snug: 1.25,
    },
  },
} as const

export type DesignTokens = typeof tokens
