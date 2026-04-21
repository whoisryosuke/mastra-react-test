import { comboboxAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

export const command = defineSlotRecipe({
  className: 'command',
  slots: comboboxAnatomy.extendWith('itemCommand', 'itemText', 'separator').keys(),
  base: {
    root: {
      position: 'relative',
      width: 'full',
    },
    control: {
      alignItems: 'center',
      display: 'flex',
      position: 'relative',
      width: 'full',
    },
    input: {
      background: 'transparent',
      border: 'none',
      color: 'fg.default',
      display: 'flex',
      flex: '1',
      fontSize: 'sm',
      outline: 'none',
      width: '100%',
      _placeholder: {
        color: 'fg.muted',
      },
      _focusVisible: {
        outline: 'none',
      },
    },
    list: {
      maxH: '72',
      overflowY: 'auto',
      overscrollBehavior: 'contain',
      py: '2',
    },
    empty: {
      color: 'fg.muted',
      fontSize: 'sm',
      px: '2',
      py: '6',
      textAlign: 'center',
    },
    content: {
      bg: 'gray.surface.bg',
      borderRadius: 'xl',
      boxShadow: 'lg',
      display: 'flex',
      flexDirection: 'column',
      maxH: '96',
      overflow: 'hidden',
      p: '1',
    },
    item: {
      cursor: 'default',
      display: 'flex',
      alignItems: 'center',
      gap: '2',
      px: '2',
      borderRadius: 'md',
      fontSize: 'sm',
      transitionDuration: 'fast',
      userSelect: 'none',
      transitionProperty: 'background, color',
      _highlighted: {
        bg: 'gray.a3',
      },
      _selected: {
        bg: 'gray.a4',
      },
      _disabled: {
        opacity: '0.5',
        pointerEvents: 'none',
      },
    },
    itemIndicator: {
      ml: 'auto',
      opacity: '0',
      _selected: {
        opacity: '1',
      },
    },
    itemCommand: {
      ml: 'auto',
      color: 'fg.muted',
      fontSize: 'xs',
      letterSpacing: 'wider',
      flex: '0',
    },
    itemText: {
      flex: '1',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    trigger: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
    },
    positioner: {
      zIndex: 'zIndex.modal',
    },
    itemGroup: {
      overflow: 'hidden',
    },
    itemGroupLabel: {
      color: 'fg.muted',
      fontSize: 'xs',
      fontWeight: 'medium',
      px: '2',
      py: '1.5',
    },
    separator: {
      mx: '-1',
      my: '1',
      height: 'px',
      bg: 'border',
    },
  },
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      sm: {
        content: {
          maxW: 'sm',
        },
        input: {
          height: '8',
        },
        item: {
          py: '1',
        },
      },
      md: {
        content: {
          maxW: 'md',
        },
        input: {
          height: '9',
        },
        item: {
          py: '1.5',
        },
      },
      lg: {
        content: {
          maxW: 'lg',
        },
        input: {
          height: '10',
        },
        item: {
          py: '2',
        },
      },
    },
  },
})