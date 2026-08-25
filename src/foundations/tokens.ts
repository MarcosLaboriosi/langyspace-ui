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
    status: {
      brand: {
        background: '#ffe1ec',
        foreground: '#cc0f45',
        indicator: '#cc0f45',
      },
      danger: {
        background: '#fdecec',
        foreground: '#991b1b',
        indicator: '#c62828',
      },
      info: {
        background: '#e8f7fc',
        foreground: '#075985',
        indicator: '#006c9a',
      },
      neutral: {
        background: '#f1f1ef',
        foreground: '#404040',
        indicator: '#737373',
      },
      success: {
        background: '#dcfce7',
        foreground: '#166534',
        indicator: '#16a34a',
      },
      warning: {
        background: '#fef3c7',
        foreground: '#92400e',
        indicator: '#a85505',
      },
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
    card: '1rem',
    pill: '999px',
    rounded: '0.75rem',
  },
  shadow: {
    focus: '0 0 0 2px #ffffff, 0 0 0 5px rgba(0, 242, 234, 0.72)',
    raised: '0 4px 12px rgba(0, 0, 0, 0.07)',
    subtle: '0 1px 2px rgba(0, 0, 0, 0.05)',
  },
  spacing: {
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    16: '4rem',
  },
  typography: {
    fontSize: {
      md: '1rem',
      sm: '0.875rem',
      xs: '0.75rem',
    },
    fontWeight: {
      semibold: 600,
    },
    lineHeight: {
      normal: 1.5,
      snug: 1.25,
    },
  },
} as const

export type DesignTokens = typeof tokens
