"use client";

import { Button } from "@/components/ui/button";
import * as ScrollArea from "@/components/ui/scroll-area";
import { css } from "styled-system/css";
import type { ComponentProps } from "react";
import { useCallback } from "react";

export type SuggestionsProps = ComponentProps<typeof ScrollArea.Root>;

export const Suggestions = ({
  className,
  children,
  ...props
}: SuggestionsProps) => (
  <ScrollArea.Root
    className={css(
      {
        width: "full",
        overflowX: "auto",
        whiteSpace: "nowrap",
      },
      className,
    )}
    {...props}
  >
    <div
      className={css({
        display: "flex",
        width: "max",
        flexWrap: "nowrap",
        alignItems: "center",
        gap: "2",
      })}
    >
      {children}
    </div>
  </ScrollArea.Root>
);

export type SuggestionProps = Omit<ComponentProps<typeof Button>, "onClick"> & {
  suggestion: string;
  onClick?: (suggestion: string) => void;
};

export const Suggestion = ({
  suggestion,
  onClick,
  className,
  variant = "outline",
  size = "sm",
  children,
  ...props
}: SuggestionProps) => {
  const handleClick = useCallback(() => {
    onClick?.(suggestion);
  }, [onClick, suggestion]);

  return (
    <Button
      className={css(
        {
          cursor: "pointer",
          borderRadius: "full",
          paddingX: "4",
        },
        className,
      )}
      onClick={handleClick}
      size={size}
      type="button"
      variant={variant}
      {...props}
    >
      {children || suggestion}
    </Button>
  );
};
