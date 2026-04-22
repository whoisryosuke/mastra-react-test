"use client";

import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { Badge } from "@/components/ui/badge";
import * as Collapsible from "@/components/ui/collapsible";
import { css } from "styled-system/css";
import type { LucideIcon } from "lucide-react";
import { BrainIcon, ChevronDownIcon, DotIcon } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { createContext, memo, useContext, useMemo } from "react";

interface ChainOfThoughtContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ChainOfThoughtContext = createContext<ChainOfThoughtContextValue | null>(
  null,
);

const useChainOfThought = () => {
  const context = useContext(ChainOfThoughtContext);
  if (!context) {
    throw new Error(
      "ChainOfThought components must be used within ChainOfThought",
    );
  }
  return context;
};

export type ChainOfThoughtProps = ComponentProps<"div"> & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const ChainOfThought = memo(
  ({
    className,
    open,
    defaultOpen = false,
    onOpenChange,
    children,
    ...props
  }: ChainOfThoughtProps) => {
    const [isOpen, setIsOpen] = useControllableState({
      defaultProp: defaultOpen,
      onChange: onOpenChange,
      prop: open,
    });

    const chainOfThoughtContext = useMemo(
      () => ({ isOpen, setIsOpen }),
      [isOpen, setIsOpen],
    );

    return (
      <ChainOfThoughtContext.Provider value={chainOfThoughtContext}>
        <div
          className={css(
            {
              width: "full",
              display: "flex",
              flexDirection: "column",
              gap: "4",
            },
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </ChainOfThoughtContext.Provider>
    );
  },
);

export type ChainOfThoughtHeaderProps = ComponentProps<
  typeof Collapsible.Trigger
>;

export const ChainOfThoughtHeader = memo(
  ({ className, children, ...props }: ChainOfThoughtHeaderProps) => {
    const { isOpen, setIsOpen } = useChainOfThought();

    return (
      <Collapsible.Root
        onOpenChange={(details) => setIsOpen(details.open)}
        open={isOpen}
      >
        <Collapsible.Trigger
          className={css(
            {
              display: "flex",
              width: "full",
              alignItems: "center",
              gap: "2",
              color: "fg.muted",
              fontSize: "sm",
              transition: "colors",
              _hover: {
                color: "fg.default",
              },
            },
            className,
          )}
          {...props}
        >
          <BrainIcon className={css({ width: "4", height: "4" })} />
          <span
            className={css({
              flex: "1",
              textAlign: "left",
            })}
          >
            {children ?? "Chain of Thought"}
          </span>
          <ChevronDownIcon
            className={css({
              width: "4",
              height: "4",
              transition: "transform 0.2s",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            })}
          />
        </Collapsible.Trigger>
      </Collapsible.Root>
    );
  },
);

export type ChainOfThoughtStepProps = ComponentProps<"div"> & {
  icon?: LucideIcon;
  label: ReactNode;
  description?: ReactNode;
  status?: "complete" | "active" | "pending";
};

const stepStatusStyles = {
  active: css({ color: "fg.default" }),
  complete: css({ color: "fg.muted" }),
  pending: css({ color: "fg.muted", opacity: "0.5" }),
};

export const ChainOfThoughtStep = memo(
  ({
    className,
    icon: Icon = DotIcon,
    label,
    description,
    status = "complete",
    children,
    ...props
  }: ChainOfThoughtStepProps) => (
    <div
      className={css(
        {
          display: "flex",
          gap: "2",
          fontSize: "sm",
          animation: "fade-in 0.2s, slide-in-from-top 0.2s",
        },
        stepStatusStyles[status],
        className,
      )}
      {...props}
    >
      <div
        className={css({
          position: "relative",
          marginTop: "0.5",
        })}
      >
        <Icon className={css({ width: "4", height: "4" })} />
        <div
          className={css({
            position: "absolute",
            top: "1.75rem",
            bottom: "0",
            left: "50%",
            marginLeft: "-0.5px",
            width: "1px",
            backgroundColor: "border",
          })}
        />
      </div>
      <div
        className={css({
          flex: "1",
          display: "flex",
          flexDirection: "column",
          gap: "2",
          overflow: "hidden",
        })}
      >
        <div>{label}</div>
        {description && (
          <div
            className={css({
              color: "fg.muted",
              fontSize: "xs",
            })}
          >
            {description}
          </div>
        )}
        {children}
      </div>
    </div>
  ),
);

export type ChainOfThoughtSearchResultsProps = ComponentProps<"div">;

export const ChainOfThoughtSearchResults = memo(
  ({ className, ...props }: ChainOfThoughtSearchResultsProps) => (
    <div
      className={css(
        {
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "2",
        },
        className,
      )}
      {...props}
    />
  ),
);

export type ChainOfThoughtSearchResultProps = ComponentProps<typeof Badge>;

export const ChainOfThoughtSearchResult = memo(
  ({ className, children, ...props }: ChainOfThoughtSearchResultProps) => (
    <Badge
      className={css(
        {
          display: "flex",
          gap: "1",
          paddingX: "2",
          paddingY: "0.5",
          fontWeight: "normal",
          fontSize: "xs",
        },
        className,
      )}
      variant="subtle"
      {...props}
    >
      {children}
    </Badge>
  ),
);

export type ChainOfThoughtContentProps = ComponentProps<
  typeof Collapsible.Content
>;

export const ChainOfThoughtContent = memo(
  ({ className, children, ...props }: ChainOfThoughtContentProps) => {
    const { isOpen } = useChainOfThought();

    return (
      <Collapsible.Root open={isOpen}>
        <Collapsible.Content
          className={css(
            {
              marginTop: "2",
              display: "flex",
              flexDirection: "column",
              gap: "3",
              color: "fg.default",
              outline: "none",
            },
            className,
          )}
          {...props}
        >
          {children}
        </Collapsible.Content>
      </Collapsible.Root>
    );
  },
);

export type ChainOfThoughtImageProps = ComponentProps<"div"> & {
  caption?: string;
};

export const ChainOfThoughtImage = memo(
  ({ className, children, caption, ...props }: ChainOfThoughtImageProps) => (
    <div
      className={css(
        {
          marginTop: "2",
          display: "flex",
          flexDirection: "column",
          gap: "2",
        },
        className,
      )}
      {...props}
    >
      <div
        className={css({
          position: "relative",
          display: "flex",
          maxHeight: "22rem",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          borderRadius: "l2",
          backgroundColor: "bg.subtle",
          padding: "3",
        })}
      >
        {children}
      </div>
      {caption && (
        <p
          className={css({
            color: "fg.muted",
            fontSize: "xs",
          })}
        >
          {caption}
        </p>
      )}
    </div>
  ),
);

ChainOfThought.displayName = "ChainOfThought";
ChainOfThoughtHeader.displayName = "ChainOfThoughtHeader";
ChainOfThoughtStep.displayName = "ChainOfThoughtStep";
ChainOfThoughtSearchResults.displayName = "ChainOfThoughtSearchResults";
ChainOfThoughtSearchResult.displayName = "ChainOfThoughtSearchResult";
ChainOfThoughtContent.displayName = "ChainOfThoughtContent";
ChainOfThoughtImage.displayName = "ChainOfThoughtImage";
