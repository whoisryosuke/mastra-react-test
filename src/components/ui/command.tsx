'use client'
import { Combobox } from '@ark-ui/react/combobox'
import { Dialog } from '@ark-ui/react/dialog'
import { ark } from '@ark-ui/react/factory'
import { CheckIcon } from 'lucide-react'
import { forwardRef, type ComponentProps } from 'react'
import { createStyleContext } from 'styled-system/jsx'
import { command } from 'styled-system/recipes'
import type { HTMLStyledProps } from 'styled-system/types'

const { withProvider, withContext } = createStyleContext(command)

export const Root = withProvider(Combobox.Root, 'root')
export const Control = withContext(Combobox.Control, 'control')
export const Input = withContext(Combobox.Input, 'input')
export const Trigger = withContext(Combobox.Trigger, 'trigger')
export const Positioner = withContext(Combobox.Positioner, 'positioner')
export const Content = withContext(Combobox.Content, 'content')
export const List = withContext(Combobox.List, 'list')
export const Item = withContext(Combobox.Item, 'item')
export const ItemText = withContext(Combobox.ItemText, 'itemText')
export const ItemGroup = withContext(Combobox.ItemGroup, 'itemGroup')
export const ItemGroupLabel = withContext(Combobox.ItemGroupLabel, 'itemGroupLabel')
export const Empty = withContext(Combobox.Empty, 'empty')

const StyledItemIndicator = withContext(Combobox.ItemIndicator, 'itemIndicator')

export const ItemIndicator = forwardRef<HTMLDivElement, ComponentProps<typeof StyledItemIndicator>>(
  function ItemIndicator(props, ref) {
    return (
      <StyledItemIndicator ref={ref} {...props}>
        <CheckIcon />
      </StyledItemIndicator>
    )
  }
)

const ItemCommandBase = withContext(ark.span, 'itemCommand')

export const ItemShortcut = ItemCommandBase

export { ComboboxContext as Context } from '@ark-ui/react/combobox'
export type {
  ComboboxInputValueChangeDetails,
  ComboboxValueChangeDetails,
} from '@ark-ui/react/combobox'

export interface CommandProps extends HTMLStyledProps<'div'> {}

export interface CommandDialogProps extends Dialog.RootProps {
  title?: string
  description?: string
}

export const Command = Root
export const CommandDialog = Dialog.Root
export const CommandList = List
export const CommandInput = Input
export const CommandEmpty = Empty
export const CommandGroup = ItemGroup
export const CommandItem = Item
export const CommandShortcut = ItemShortcut
export const CommandSeparator = withContext(ark.hr, 'separator')