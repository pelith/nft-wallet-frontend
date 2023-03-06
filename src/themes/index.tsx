import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import React from 'react'

import { components } from './components'
const customizeTheme = {
  styles: {
    global: {
      body: {
        minH: '100vh',
        minW: '320px',
        fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
        fontWeight: '400',
        lineHeight: '1.5',
        color: 'emerald.primary', //emerald.primary
        bg: '#06021b',
        '#root': { h: '100vh' },
      },
      '#chakra-toast-manager-bottom-left': {
        margin: '40px',
      },
    },
  },
  fontSizes: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    md: '1rem', // 16px
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    '4xl': '2.5rem',
    '5xl': '3.75rem',
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  colors: {
    neutral: {
      900: '#161616',
      700: '#3d3d3d',
      500: '#4a4a4a',
      100: 'white',
    },
    sapphire: {
      primary: {
        500: '#08BD9F',
        300: '#49D6BE',
      },
      secondary: {
        500: '#2DA2E5',
        300: '#64C3FA',
      },
      tertiary: {
        800: 'rgba(8, 189, 159, 0.75)',
        500: '#C2F07D',
      },
      gradient: {
        '2': 'linear-gradient(90deg, #08BD8F 0%, #64C3FA 100%)',
        '3-85':
          'linear-gradient(90deg, rgba(8, 182, 155, 0.85) 0%, rgba(100, 192, 245, 0.86) 100%)',
      },
    },
    emerald: {
      primary: '#7Affb6',
      secondary: '#46ff99',
      tertiary: '#004D22',
    },
    hightLight: '#ff7ac3',
    success: '#5DC887',
    danger: '#E0515F',
  },
  components,
  variants: {},
}

export const mainTheme = extendTheme({ ...customizeTheme })

export default function MainThemeProvider({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={mainTheme}>{children}</ChakraProvider>
}
