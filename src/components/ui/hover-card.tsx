import * as React from "react"
import { HoverCard } from '@ark-ui/react/hover-card'

const HoverCardRoot = (props: any) => {
  return <HoverCard.Root data-slot="hover-card" {...props} />
}

const HoverCardTrigger = (props: any) => {
  return (
    <HoverCard.Trigger data-slot="hover-card-trigger" {...props} />
  )
}

const HoverCardContent = React.forwardRef(({ 
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: any, ref: any) => {
  return (
    <HoverCard.Portal data-slot="hover-card-portal">
      <HoverCard.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={className}
        ref={ref}
        {...props}
      />
    </HoverCard.Portal>
  )
})

// Re-export the components
export { HoverCardRoot as HoverCard, HoverCardTrigger, HoverCardContent }