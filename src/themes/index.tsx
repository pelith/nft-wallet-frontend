import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import React from 'react'

import { components } from './components'
const customizeTheme = {
  styles: {
    global: {
      body: {
        minH: '100vh',
        fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
        fontWeight: '400',
        lineHeight: '1.5',
        color: '#79ffb5', // #79ffb5
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
      900: '#08080A',
      800: '#151619',
      700: '#1C1E22',
      600: '#26282F',
      100: '#FFFFFF',
      '900-75': '#08080ABF',
      '800-85': '#151619D9',
      '800-50': '#15161980',
      '130-75': '#EBF0FFBF',
      '120-60': 'rgba(214, 225, 255, 0.6)',
      '110-30': '#C2D2FF4D',
      '110-15': '#C2D2FF33',
      gradient: {
        900: 'linear-gradient(156.94deg, rgba(8, 9, 10, 0.7) 0%, #08080A 25%, #08080A 90%, rgba(8, 8, 10, 0.85) 100%)',
      },
    },
    investment: {
      primary: {
        500: '#3063F0',
        300: '#5A84FA',
      },
      secondary: {
        500: '#3C30F0',
        300: '#7C73FA',
      },
      tertiary: {
        500: '#30E2EF',
      },
      gradient: {
        '1': 'linear-gradient(90deg, #3063F0 0%, #3C30F0 100%)',
        '2': 'linear-gradient(90deg, #3063F0 0%, #7C73FA 100%)',
        '3-85':
          'linear-gradient(90deg, rgba(48, 99, 240, 0.85) 0%, rgba(124, 115, 250, 0.85) 100%)',
        '4': 'linear-gradient(90deg, #5A84FA 0%, #7C73FA 100%)',
        '5-35':
          'linear-gradient(90deg, rgba(90, 132, 250, 0.35) 0%, rgba(124, 115, 250, 0.35) 100%)',
        '7': 'linear-gradient(180deg, #5A84FA 0%, #7C73FA 100%);',
      },
    },
    satellite: {
      primary: {
        500: '#E6710B',
        300: '#F58522',
      },
      secondary: {
        500: '#FF565C',
        300: '#FF8F93',
      },
      gradient: {
        '2': 'linear-gradient(90deg, #E6710B 0%, #FF8F93 100%)',
        '3-85':
          'linear-gradient(90deg, rgba(230, 113, 11, 0.85) 0%, rgba(255, 143, 147, 0.85) 100%)',
        '4': 'linear-gradient(90deg, #F58522 0%, #FF8F93 100%)',
        '5': 'linear-gradient(90deg, rgba(245, 133, 34, 0.35) 0%, rgba(255, 143, 147, 0.35) 100%)',
        '7': 'linear-gradient(180deg, #F58522 0%, #FF8F93 100%)',
      },
    },
    reward: {
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
        '1': 'linear-gradient(90deg, #08BD9F 0%, #2DA2E5 100%)',
        '2': 'linear-gradient(90deg, #08BD9F 0%, #64C3FA 100%)',
        '3-85':
          'linear-gradient(90deg, rgba(8, 189, 159, 0.85) 0%, rgba(100, 195, 250, 0.85) 100%)',
        '4': 'linear-gradient(90deg, #49D6BE 0%, #64C3FA 100%)',
        '5': 'linear-gradient(90deg, rgba(73, 214, 190, 0.35) 0%, rgba(100, 195, 250, 0.35) 100%)',
        '6': 'linear-gradient(90deg, rgba(73, 214, 190, 0.25) 0%, rgba(100, 195, 250, 0.25) 100%)',
        '7': 'linear-gradient(180deg, #49D6BE 0%, #64C3FA 100%)',
        other:
          'linear-gradient(90deg, rgba(73, 214, 190, 0.15) 0%, rgba(100, 195, 250, 0.15) 100%)',
      },
    },
    success: '#5DC887',
    danger: '#E0515F',
    'success-25': '#5DC88740',
    'success-10': '#5DC8871A',
    'danger-35': '#E0515F59',
    'danger-25': '#E0515F40',
    'danger-10': '#E0515F1A',
  },
  components,
  variants: {},
}

export const mainTheme = extendTheme({ ...customizeTheme })

export default function MainThemeProvider({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={mainTheme}>{children}</ChakraProvider>
}
