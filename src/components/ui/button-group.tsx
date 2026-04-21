"use client"

import { ark } from "@ark-ui/react/factory"
import type { ComponentProps, HTMLAttributes } from "react"
import { styled } from "styled-system/jsx"
import { group } from "styled-system/recipes"
import { Separator } from "@/components/ui/separator"

export const ButtonGroupRoot = styled(ark.div, group)

export type ButtonGroupProps = ComponentProps<typeof ButtonGroupRoot>

const StyledButtonGroupText = styled(ark.span)

export interface ButtonGroupTextProps extends HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean
}

export function ButtonGroupText({
  className,
  asChild,
  ...props
}: ButtonGroupTextProps) {
  return (
    <StyledButtonGroupText
      data-slot="button-group-text"
      className={className}
      {...props}
    />
  )
}

export interface ButtonGroupSeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
}

export function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: ButtonGroupSeparatorProps) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={className}
      {...props}
    />
  )
}

export const ButtonGroup = Object.assign(ButtonGroupRoot, {
  Text: ButtonGroupText,
  Separator: ButtonGroupSeparator,
})