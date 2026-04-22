"use client";

import * as Collapsible from "@/components/ui/collapsible";
import * as Tabs from "@/components/ui/tabs";
import { css } from "styled-system/css";
import type { ToolUIPart } from "ai";
import { ChevronDownIcon, Code } from "lucide-react";
import type { ComponentProps } from "react";

import { getStatusBadge } from "./tool";

export type SandboxRootProps = ComponentProps<typeof Collapsible.Root>;

export const Sandbox = ({ className, ...props }: SandboxRootProps) => (
  <Collapsible.Root
    className={css(
      {
        marginBottom: "4",
        width: "full",
        overflow: "hidden",
        borderRadius: "md",
        borderWidth: "1px",
      },
      className,
    )}
    defaultOpen
    {...props}
  />
);

export interface SandboxHeaderProps {
  title?: string;
  state: ToolUIPart["state"];
  className?: string;
}

export const SandboxHeader = ({
  className,
  title,
  state,
  ...props
}: SandboxHeaderProps) => (
  <Collapsible.Trigger
    className={css(
      {
        display: "flex",
        width: "full",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "4",
        padding: "3",
      },
      className,
    )}
    {...props}
  >
    <div className={css({ display: "flex", alignItems: "center", gap: "2" })}>
      <Code
        className={css({ width: "4", height: "4", color: "muted.foreground" })}
      />
      <span className={css({ fontWeight: "medium", fontSize: "sm" })}>
        {title}
      </span>
      {getStatusBadge(state)}
    </div>
    <ChevronDownIcon
      className={css({
        width: "4",
        height: "4",
        color: "muted.foreground",
        transitionProperty: "transform",
        transitionDuration: "200ms",
        _groupDataOpen: {
          transform: "rotate(180deg)",
        },
      })}
    />
  </Collapsible.Trigger>
);

export type SandboxContentProps = ComponentProps<typeof Collapsible.Content>;

export const SandboxContent = ({
  className,
  ...props
}: SandboxContentProps) => (
  <Collapsible.Content
    className={css(
      {
        outline: "none",
      },
      className,
    )}
    {...props}
  />
);

export type SandboxTabsProps = ComponentProps<typeof Tabs.Root>;

export const SandboxTabs = ({ className, ...props }: SandboxTabsProps) => (
  <Tabs.Root
    className={css({ width: "full", gap: "0" }, className)}
    {...props}
  />
);

export type SandboxTabsBarProps = ComponentProps<"div">;

export const SandboxTabsBar = ({
  className,
  ...props
}: SandboxTabsBarProps) => (
  <div
    className={css(
      {
        display: "flex",
        width: "full",
        alignItems: "center",
        borderBottomWidth: "1px",
        borderTopWidth: "1px",
        borderColor: "border",
      },
      className,
    )}
    {...props}
  />
);

export type SandboxTabsListProps = ComponentProps<typeof Tabs.List>;

export const SandboxTabsList = ({
  className,
  ...props
}: SandboxTabsListProps) => (
  <Tabs.List
    className={css(
      {
        height: "auto",
        borderRadius: "none",
        borderWidth: "0",
        backgroundColor: "transparent",
        padding: "0",
      },
      className,
    )}
    {...props}
  />
);

export type SandboxTabsTriggerProps = ComponentProps<typeof Tabs.Trigger>;

export const SandboxTabsTrigger = ({
  className,
  ...props
}: SandboxTabsTriggerProps) => (
  <Tabs.Trigger
    className={css(
      {
        borderRadius: "none",
        borderWidth: "0",
        borderBottomWidth: "2px",
        borderColor: "transparent",
        paddingX: "4",
        paddingY: "2",
        fontWeight: "medium",
        color: "muted.foreground",
        fontSize: "sm",
        transitionProperty: "colors",
        transitionDuration: "200ms",
        _dataActive: {
          borderColor: "primary",
          backgroundColor: "transparent",
          color: "foreground",
          boxShadow: "none",
        },
      },
      className,
    )}
    {...props}
  />
);

export type SandboxTabContentProps = ComponentProps<typeof Tabs.Content>;

export const SandboxTabContent = ({
  className,
  ...props
}: SandboxTabContentProps) => (
  <Tabs.Content
    className={css({ marginTop: "0", fontSize: "sm" }, className)}
    {...props}
  />
);
