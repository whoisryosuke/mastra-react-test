"use client";

import { Button } from "@/components/ui/button";
import * as Collapsible from "@/components/ui/collapsible";
import { Root as ScrollArea } from "@/components/ui/scroll-area";
import { css } from "styled-system/css";
import { ChevronDownIcon, PaperclipIcon } from "lucide-react";
import type { ComponentProps } from "react";

export interface QueueMessagePart {
  type: string;
  text?: string;
  url?: string;
  filename?: string;
  mediaType?: string;
}

export interface QueueMessage {
  id: string;
  parts: QueueMessagePart[];
}

export interface QueueTodo {
  id: string;
  title: string;
  description?: string;
  status?: "pending" | "completed";
}

export type QueueItemProps = ComponentProps<"li">;

export const QueueItem = ({ className, ...props }: QueueItemProps) => (
  <li
    className={css(
      {
        display: "flex",
        flexDirection: "column",
        gap: "1",
        borderRadius: "md",
        paddingX: "3",
        paddingY: "1",
        fontSize: "sm",
        transitionProperty: "colors",
        transitionDuration: "200ms",
        _hover: {
          backgroundColor: "muted",
        },
      },
      className,
    )}
    {...props}
  />
);

export type QueueItemIndicatorProps = ComponentProps<"span"> & {
  completed?: boolean;
};

export const QueueItemIndicator = ({
  completed = false,
  className,
  ...props
}: QueueItemIndicatorProps) => (
  <span
    className={css(
      {
        marginTop: "0.5",
        display: "inline-block",
        width: "2.5",
        height: "2.5",
        borderRadius: "full",
        borderWidth: "1px",
      },
      completed
        ? {
            borderColor: "muted.foreground / 0.2",
            backgroundColor: "muted.foreground / 0.1",
          }
        : { borderColor: "muted.foreground / 0.5" },
      className,
    )}
    {...props}
  />
);

export type QueueItemContentProps = ComponentProps<"span"> & {
  completed?: boolean;
};

export const QueueItemContent = ({
  completed = false,
  className,
  ...props
}: QueueItemContentProps) => (
  <span
    className={css(
      {
        lineClamp: "1",
        flexGrow: "1",
        wordBreak: "break-words",
      },
      completed
        ? {
            color: "muted.foreground / 0.5",
            textDecorationLine: "line-through",
          }
        : { color: "muted.foreground" },
      className,
    )}
    {...props}
  />
);

export type QueueItemDescriptionProps = ComponentProps<"div"> & {
  completed?: boolean;
};

export const QueueItemDescription = ({
  completed = false,
  className,
  ...props
}: QueueItemDescriptionProps) => (
  <div
    className={css(
      {
        marginLeft: "6",
        fontSize: "xs",
      },
      completed
        ? {
            color: "muted.foreground / 0.4",
            textDecorationLine: "line-through",
          }
        : { color: "muted.foreground" },
      className,
    )}
    {...props}
  />
);

export type QueueItemActionsProps = ComponentProps<"div">;

export const QueueItemActions = ({
  className,
  ...props
}: QueueItemActionsProps) => (
  <div className={css({ display: "flex", gap: "1" }, className)} {...props} />
);

export type QueueItemActionProps = Omit<
  ComponentProps<typeof Button>,
  "variant" | "size"
>;

export const QueueItemAction = ({
  className,
  ...props
}: QueueItemActionProps) => (
  <Button
    className={css(
      {
        width: "auto",
        height: "auto",
        padding: "1",
        borderRadius: "sm",
        color: "muted.foreground",
        opacity: "0",
        transitionProperty: "opacity",
        transitionDuration: "200ms",
        _hover: {
          backgroundColor: "muted.foreground / 0.1",
          color: "foreground",
        },
        _groupHover: {
          opacity: "100",
        },
      },
      className,
    )}
    size="xs"
    type="button"
    variant="plain"
    {...props}
  />
);

export type QueueItemAttachmentProps = ComponentProps<"div">;

export const QueueItemAttachment = ({
  className,
  ...props
}: QueueItemAttachmentProps) => (
  <div
    className={css(
      {
        marginTop: "1",
        display: "flex",
        flexWrap: "wrap",
        gap: "2",
      },
      className,
    )}
    {...props}
  />
);

export type QueueItemImageProps = ComponentProps<"img">;

export const QueueItemImage = ({
  className,
  ...props
}: QueueItemImageProps) => (
  <img
    alt=""
    className={css(
      {
        height: "8",
        width: "8",
        borderRadius: "sm",
        borderWidth: "1px",
        objectFit: "cover",
      },
      className,
    )}
    height={32}
    width={32}
    {...props}
  />
);

export type QueueItemFileProps = ComponentProps<"span">;

export const QueueItemFile = ({
  children,
  className,
  ...props
}: QueueItemFileProps) => (
  <span
    className={css(
      {
        display: "flex",
        alignItems: "center",
        gap: "1",
        borderRadius: "sm",
        borderWidth: "1px",
        backgroundColor: "muted",
        paddingX: "2",
        paddingY: "1",
        fontSize: "xs",
      },
      className,
    )}
    {...props}
  >
    <PaperclipIcon size={12} />
    <span
      className={css({
        maxWidth: "100px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      })}
    >
      {children}
    </span>
  </span>
);

export type QueueListProps = ComponentProps<typeof ScrollArea>;

export const QueueList = ({
  children,
  className,
  ...props
}: QueueListProps) => (
  <ScrollArea
    className={css({ marginTop: "2", marginBottom: "-1" }, className)}
    {...props}
  >
    <div className={css({ maxHeight: "40", paddingRight: "4" })}>
      <ul>{children}</ul>
    </div>
  </ScrollArea>
);

// QueueSection - collapsible section container
export type QueueSectionProps = ComponentProps<typeof Collapsible.Root>;

export const QueueSection = ({
  className,
  defaultOpen = true,
  ...props
}: QueueSectionProps) => (
  <Collapsible.Root
    className={className}
    defaultOpen={defaultOpen}
    {...props}
  />
);

// QueueSectionTrigger - section header/trigger
export type QueueSectionTriggerProps = ComponentProps<"button">;

export const QueueSectionTrigger = ({
  children,
  className,
  ...props
}: QueueSectionTriggerProps) => (
  <Collapsible.Trigger asChild>
    <button
      className={css(
        {
          display: "flex",
          width: "full",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "md",
          backgroundColor: "muted / 0.4",
          paddingX: "3",
          paddingY: "2",
          textAlign: "left",
          fontWeight: "medium",
          color: "muted.foreground",
          fontSize: "sm",
          transitionProperty: "colors",
          transitionDuration: "200ms",
          _hover: {
            backgroundColor: "muted",
          },
        },
        className,
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  </Collapsible.Trigger>
);

// QueueSectionLabel - label content with icon and count
export type QueueSectionLabelProps = ComponentProps<"span"> & {
  count?: number;
  label: string;
  icon?: React.ReactNode;
};

export const QueueSectionLabel = ({
  count,
  label,
  icon,
  className,
  ...props
}: QueueSectionLabelProps) => (
  <span
    className={css(
      { display: "flex", alignItems: "center", gap: "2" },
      className,
    )}
    {...props}
  >
    <ChevronDownIcon
      className={css({
        width: "4",
        height: "4",
        transitionProperty: "transform",
        transitionDuration: "200ms",
        _groupDataClosed: {
          transform: "rotate(-90deg)",
        },
      })}
    />
    {icon}
    <span>
      {count} {label}
    </span>
  </span>
);

// QueueSectionContent - collapsible content area
export type QueueSectionContentProps = ComponentProps<
  typeof Collapsible.Content
>;

export const QueueSectionContent = ({
  className,
  ...props
}: QueueSectionContentProps) => (
  <Collapsible.Content className={className} {...props} />
);

export type QueueProps = ComponentProps<"div">;

export const Queue = ({ className, ...props }: QueueProps) => (
  <div
    className={css(
      {
        display: "flex",
        flexDirection: "column",
        gap: "2",
        borderRadius: "xl",
        borderWidth: "1px",
        borderColor: "border",
        backgroundColor: "background",
        paddingX: "3",
        paddingTop: "2",
        paddingBottom: "2",
        boxShadow: "xs",
      },
      className,
    )}
    {...props}
  />
);
