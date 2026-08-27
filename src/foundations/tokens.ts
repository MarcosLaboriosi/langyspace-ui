export const tokens = {
  color: {
    accent: {
      default: '#ff1f5c',
      tint: '#fff4f7',
    },
    content: {
      default: '#0a0a0a',
      muted: '#6b6b6b',
      placeholder: '#737373',
      secondary: '#2a2a2a',
    },
    brand: {
      default: '#cc0f45',
      hover: '#b01343',
    },
    feedback: {
      danger: '#c62828',
      dangerSoft: '#fdecec',
      dangerStrong: '#991b1b',
      info: '#006c9a',
      infoSoft: '#e8f7fc',
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
    inverse: {
      borderSubtle: 'rgba(255, 255, 255, 0.18)',
      contentMuted: 'rgba(255, 255, 255, 0.72)',
      surfaceSubtle: 'rgba(255, 255, 255, 0.18)',
    },
    neutral: {
      0: '#ffffff',
      50: '#fafaf9',
      100: '#f1f1ef',
      300: '#d9d9d6',
      /** @deprecated Compatibility alias. Prefer neutral[300] for borders. */
      400: '#d9d9d6',
      500: '#9a9a9a',
      600: '#6b6b6b',
      900: '#1a1a1a',
      950: '#0a0a0a',
    },
    overlay: {
      default: 'rgba(10, 10, 10, 0.42)',
    },
    surfaceBorder: {
      default: '#d8d4cb',
      strong: '#0a0a0a',
      subtle: '#ececea',
    },
    surface: {
      muted: '#f8f8f6',
      subtle: '#fbfbfa',
    },
  },
  control: {
    height: {
      lg: '3rem',
      md: '2.5rem',
      sm: '2rem',
    },
  },
  field: {
    height: {
      lg: '3.5rem',
      md: '2.75rem',
      sm: '2.5rem',
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
    card: '0.875rem',
    control: '0.625rem',
    lg: '0.5rem',
    pill: '999px',
    rounded: '0.75rem',
  },
  shadow: {
    drawer: '-16px 0 40px rgba(10, 10, 10, 0.1)',
    focus: '0 0 0 2px #ffffff, 0 0 0 5px rgba(0, 242, 234, 0.72)',
    popover: '0 20px 60px rgba(10, 10, 10, 0.18)',
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
    8: '2rem',
    16: '4rem',
  },
  typography: {
    fontSize: {
      '2xs': '0.6875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '2rem',
      sm: '0.875rem',
      xs: '0.75rem',
    },
    fontWeight: {
      bold: 700,
      medium: 500,
      semibold: 600,
    },
    lineHeight: {
      normal: 1.5,
      snug: 1.25,
    },
  },
} as const

export type DesignTokens = typeof tokens
