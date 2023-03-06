import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'

const baseStyle = defineStyle({
  lineHeight: '24px',
  borderRadius: '8px',
  fontWeight: 'bold',
  color: 'neutral.100',
  _disabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
    bg: 'neutral.700',
    color: 'neutral.100',
  },

  // below from chakra
  transitionProperty: 'common',
  transitionDuration: 'normal',
  transition: 'border-color 0.25s',

  _hover: {
    _disabled: {
      bg: 'initial',
    },
  },
})

const primaryBoxShadow: { [key: string]: string } = {
  sapphire: '0px 0px 10px rgba(8, 189, 159, 0.75)',
}

const variantPrimary = defineStyle((props) => {
  const { colorScheme: c } = props

  const bg = `${c}.gradient.3-85`,
    color = 'neutral.100',
    hoverBg = `${c}.gradient.2`,
    activeBg = bg,
    boxShadow = primaryBoxShadow[c] || ''

  return {
    bg,
    color,
    _hover: {
      bg: hoverBg,
      boxShadow: boxShadow,
      _disabled: {
        boxShadow: 'none',
      },
    },

    _active: { boxShadow: boxShadow, bg: activeBg },
  }
})

type AccessibleColor = {
  bg?: string
  color?: string
  hoverBg?: string
  activeBg?: string
}

/** Accessible color overrides for less accessible colors. */
const accessibleColorMap: { [key: string]: AccessibleColor } = {
  satellite: {
    bg: 'linear-gradient(90deg, rgba(245, 133, 34, 0.25) 0%, rgba(255, 143, 147, 0.25) 100%)',
    hoverBg:
      'linear-gradient(90deg, rgba(245, 133, 34, 0.35) 0%, rgba(255, 143, 147, 0.35) 100%)',
  },
}

const variantSecondary = defineStyle((props) => {
  const { colorScheme: c } = props

  const {
    bg = 'neutral.500',
    color = 'neutral.100',
    hoverBg = 'neutral.700',
    activeBg,
  } = accessibleColorMap[c] || ({} as AccessibleColor)

  return {
    bg,
    color,
    _hover: {
      bg: hoverBg,
    },
    _active: { bg: activeBg },
  }
})

const variantTertiary = defineStyle(() => {
  return {
    color: 'neutral.500',
    _hover: {
      color: 'neutral.100',
      _disabled: {
        bg: 'none',
      },
    },
  }
})

const variantMenu = defineStyle({
  bg: 'neutral.900',
  color: 'neutral.100',
  borderRadius: '8px',
  _hover: {
    bg: 'neutral.700',
  },
  _active: {
    bg: 'neutral.700',
  },
})

const variants = {
  primary: variantPrimary,
  secondary: variantSecondary,
  tertiary: variantTertiary,
  menu: variantMenu,
}

const sizes = {
  lg: defineStyle({
    h: 'auto',
    minW: '112px',
    fontSize: 'md',
    p: '0.8em 1.4em;',
  }),
  md: defineStyle({
    h: 'auto',
    minW: '112px',
    fontSize: 'md',
    p: '0.6em 1.2em;',
  }),
  sm: defineStyle({
    h: 'auto',
    minW: '80px',
    fontSize: 'sm',
    p: '0.4em 1em;',
  }),
}

export const buttonTheme = defineStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: 'primary',
    size: 'md',
    colorScheme: 'sapphire',
  },
})
