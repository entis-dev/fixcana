const { hairlineWidth } = require('nativewind/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        "plusjakarta-bold": ["PlusJakartaSans-Bold", "sans-serif"],
        "plusjakarta-bolditalic": ["PlusJakartaSans-BoldItalic", "sans-serif"],
        "plusjakarta-extrabold": ["PlusJakartaSans-ExtraBold", "sans-serif"],
        "plusjakarta-extrabolditalic": ["PlusJakartaSans-ExtraBoldItalic", "sans-serif"],
        "plusjakarta-extralight": ["PlusJakartaSans-ExtraLight", "sans-serif"],
        "plusjakarta-extralightitalic": ["PlusJakartaSans-ExtraLightItalic", "sans-serif"],
        "plusjakarta-italic": ["PlusJakartaSans-Italic", "sans-serif"],
        "plusjakarta-light": ["PlusJakartaSans-Light", "sans-serif"],
        "plusjakarta-lightitalic": ["PlusJakartaSans-LightItalic", "sans-serif"],
        "plusjakarta-medium": ["PlusJakartaSans-Medium", "sans-serif"],
        "plusjakarta-mediumitalic": ["PlusJakartaSans-MediumItalic", "sans-serif"],
        "plusjakarta-regular": ["PlusJakartaSans-Regular", "sans-serif"],
        "plusjakarta-semibold": ["PlusJakartaSans-SemiBold", "sans-serif"],
        "plusjakarta-semibolditalic": ["PlusJakartaSans-SemiBoldItalic", "sans-serif"],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};