"use client";

import * as Collapsible from "@/components/ui/collapsible";
import { css } from "styled-system/css";
import { ChevronDownIcon, SearchIcon } from "lucide-react";
import type { ComponentProps } from "react";

export type TaskItemFileProps = ComponentProps<"div">;

export const TaskItemFile = ({
  children,
  className,
  ...props
}: TaskItemFileProps) => (
  <div
    className={css(
      {
        display: "inline-flex",
        alignItems: "center",
        gap: "1",
        borderRadius: "md",
        borderWidth: "1px",
        backgroundColor: "secondary",
        paddingX: "1.5",
        paddingY: "0.5",
        fontSize: "xs",
        color: "foreground",
      },
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export type TaskItemProps = ComponentProps<"div">;

export const TaskItem = ({ children, className, ...props }: TaskItemProps) => (
  <div
    className={css({ color: "muted.foreground", fontSize: "sm" }, className)}
    {...props}
  >
    {children}
  </div>
);

export type TaskProps = ComponentProps<typeof Collapsible.Root>;

export const Task = ({
  defaultOpen = true,
  className,
  ...props
}: TaskProps) => (
  <Collapsible.Root
    className={className}
    defaultOpen={defaultOpen}
    {...props}
  />
);

export type TaskTriggerProps = ComponentProps<typeof Collapsible.Trigger> & {
  title: string;
};

export const TaskTrigger = ({
  children,
  className,
  title,
  ...props
}: TaskTriggerProps) => (
  <Collapsible.Trigger
    asChild
    className={css(
      {
        display: "flex",
        width: "full",
        alignItems: "center",
        gap: "2",
        color: "muted.foreground",
        fontSize: "sm",
        transitionProperty: "colors",
        transitionDuration: "200ms",
        _hover: {
          color: "foreground",
        },
      },
      className,
    )}
    {...props}
  >
    {children ?? (
      <div
        className={css({
          display: "flex",
          width: "full",
          cursor: "pointer",
          alignItems: "center",
          gap: "2",
          color: "muted.foreground",
          fontSize: "sm",
          transitionProperty: "colors",
          transitionDuration: "200ms",
          _hover: {
            color: "foreground",
          },
        })}
      >
        <SearchIcon className={css({ width: "4", height: "4" })} />
        <p className={css({ fontSize: "sm" })}>{title}</p>
        <ChevronDownIcon
          className={css({
            width: "4",
            height: "4",
            transitionProperty: "transform",
            transitionDuration: "200ms",
            _groupDataOpen: {
              transform: "rotate(180deg)",
            },
          })}
        />
      </div>
    )}
  </Collapsible.Trigger>
);

export type TaskContentProps = ComponentProps<typeof Collapsible.Content>;

export const TaskContent = ({
  children,
  className,
  ...props
}: TaskContentProps) => (
  <Collapsible.Content className={className} {...props}>
    <div
      className={css({
        marginTop: "4",
        display: "flex",
        flexDirection: "column",
        gap: "2",
        borderLeftWidth: "2px",
        borderColor: "muted",
        paddingLeft: "4",
      })}
    >
      {children}
    </div>
  </Collapsible.Content>
);
