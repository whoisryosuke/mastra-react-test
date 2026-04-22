"use client";

import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { css } from "styled-system/css";
import type { LucideIcon } from "lucide-react";
import { XIcon } from "lucide-react";
import type { ComponentProps, HTMLAttributes } from "react";

export type ArtifactProps = HTMLAttributes<HTMLDivElement>;

export const Artifact = ({ className, ...props }: ArtifactProps) => (
  <div
    className={css(
      {
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderRadius: "l2",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "border",
        backgroundColor: "bg.default",
        boxShadow: "sm",
      },
      className,
    )}
    {...props}
  />
);

export type ArtifactHeaderProps = HTMLAttributes<HTMLDivElement>;

export const ArtifactHeader = ({
  className,
  ...props
}: ArtifactHeaderProps) => (
  <div
    className={css(
      {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        borderBottomColor: "border",
        backgroundColor: "bg.subtle",
        paddingX: "4",
        paddingY: "3",
      },
      className,
    )}
    {...props}
  />
);

export type ArtifactCloseProps = ComponentProps<typeof Button>;

export const ArtifactClose = ({
  className,
  children,
  size = "sm",
  variant = "plain",
  ...props
}: ArtifactCloseProps) => (
  <Button
    className={css(
      {
        width: "8",
        height: "8",
        padding: "0",
        color: "fg.muted",
        _hover: {
          color: "fg.default",
        },
      },
      className,
    )}
    size={size}
    type="button"
    variant={variant}
    {...props}
  >
    {children ?? <XIcon className={css({ width: "4", height: "4" })} />}
    <span className={css({ srOnly: true })}>Close</span>
  </Button>
);

export type ArtifactTitleProps = HTMLAttributes<HTMLParagraphElement>;

export const ArtifactTitle = ({ className, ...props }: ArtifactTitleProps) => (
  <p
    className={css(
      {
        fontWeight: "medium",
        color: "fg.default",
        fontSize: "sm",
      },
      className,
    )}
    {...props}
  />
);

export type ArtifactDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export const ArtifactDescription = ({
  className,
  ...props
}: ArtifactDescriptionProps) => (
  <p
    className={css(
      {
        color: "fg.muted",
        fontSize: "sm",
      },
      className,
    )}
    {...props}
  />
);

export type ArtifactActionsProps = HTMLAttributes<HTMLDivElement>;

export const ArtifactActions = ({
  className,
  ...props
}: ArtifactActionsProps) => (
  <div
    className={css(
      {
        display: "flex",
        alignItems: "center",
        gap: "1",
      },
      className,
    )}
    {...props}
  />
);

export type ArtifactActionProps = ComponentProps<typeof Button> & {
  tooltip?: string;
  label?: string;
  icon?: LucideIcon;
};

export const ArtifactAction = ({
  tooltip,
  label,
  icon: Icon,
  children,
  className,
  size = "sm",
  variant = "plain",
  ...props
}: ArtifactActionProps) => {
  const button = (
    <Button
      className={css(
        {
          width: "8",
          height: "8",
          padding: "0",
          color: "fg.muted",
          _hover: {
            color: "fg.default",
          },
        },
        className,
      )}
      size={size}
      type="button"
      variant={variant}
      {...props}
    >
      {Icon ? <Icon className={css({ width: "4", height: "4" })} /> : children}
      <span className={css({ srOnly: true })}>{label || tooltip}</span>
    </Button>
  );

  if (tooltip) {
    return <Tooltip content={tooltip}>{button}</Tooltip>;
  }

  return button;
};

export type ArtifactContentProps = HTMLAttributes<HTMLDivElement>;

export const ArtifactContent = ({
  className,
  ...props
}: ArtifactContentProps) => (
  <div
    className={css(
      {
        flex: "1",
        overflow: "auto",
        padding: "4",
      },
      className,
    )}
    {...props}
  />
);
