"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip } from "@/components/ui/tooltip";
import { css } from "styled-system/css";
import type { LucideProps } from "lucide-react";
import { BookmarkIcon } from "lucide-react";
import type { ComponentProps, HTMLAttributes } from "react";

export type CheckpointProps = HTMLAttributes<HTMLDivElement>;

export const Checkpoint = ({
  className,
  children,
  ...props
}: CheckpointProps) => (
  <div
    className={css(
      {
        display: "flex",
        alignItems: "center",
        gap: "0.5",
        overflow: "hidden",
        color: "fg.muted",
      },
      className,
    )}
    {...props}
  >
    {children}
    <Separator />
  </div>
);

export type CheckpointIconProps = LucideProps;

export const CheckpointIcon = ({
  className,
  children,
  ...props
}: CheckpointIconProps) =>
  children ?? (
    <BookmarkIcon
      className={css(
        {
          width: "4",
          height: "4",
          flexShrink: "0",
        },
        className,
      )}
      {...props}
    />
  );

export type CheckpointTriggerProps = ComponentProps<typeof Button> & {
  tooltip?: string;
};

export const CheckpointTrigger = ({
  children,
  variant = "plain",
  size = "sm",
  tooltip,
  ...props
}: CheckpointTriggerProps) =>
  tooltip ? (
    <Tooltip content={tooltip}>
      <Button size={size} type="button" variant={variant} {...props}>
        {children}
      </Button>
    </Tooltip>
  ) : (
    <Button size={size} type="button" variant={variant} {...props}>
      {children}
    </Button>
  );
