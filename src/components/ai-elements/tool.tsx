"use client";

import { Badge } from "@/components/ui/badge";
import * as Collapsible from "@/components/ui/collapsible";
import { css } from "styled-system/css";
import type { DynamicToolUIPart, ToolUIPart } from "ai";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  CircleIcon,
  ClockIcon,
  WrenchIcon,
  XCircleIcon,
} from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { isValidElement } from "react";

import { CodeBlock } from "./code-block";
import { Heading } from "../ui";

export type ToolProps = ComponentProps<typeof Collapsible.Root>;

export const Tool = ({ className, ...props }: ToolProps) => (
  <Collapsible.Root
    className={css(
      {
        marginBottom: "4",
        width: "full",
        borderRadius: "md",
        borderWidth: "1px",
      },
      className,
    )}
    {...props}
  />
);

export type ToolPart = ToolUIPart | DynamicToolUIPart;

export type ToolHeaderProps = {
  title?: string;
  className?: string;
} & (
  | { type: ToolUIPart["type"]; state: ToolUIPart["state"]; toolName?: never }
  | {
      type: DynamicToolUIPart["type"];
      state: DynamicToolUIPart["state"];
      toolName: string;
    }
);

const statusLabels: Record<ToolPart["state"], string> = {
  "approval-requested": "Awaiting Approval",
  "approval-responded": "Responded",
  "input-available": "Running",
  "input-streaming": "Pending",
  "output-available": "Completed",
  "output-denied": "Denied",
  "output-error": "Error",
};

const statusIcons: Record<ToolPart["state"], ReactNode> = {
  "approval-requested": (
    <ClockIcon
      className={css({ width: "4", height: "4", color: "yellow.600" })}
    />
  ),
  "approval-responded": (
    <CheckCircleIcon
      className={css({ width: "4", height: "4", color: "blue.600" })}
    />
  ),
  "input-available": (
    <ClockIcon
      className={css({ width: "4", height: "4", animation: "pulse" })}
    />
  ),
  "input-streaming": (
    <CircleIcon className={css({ width: "4", height: "4" })} />
  ),
  "output-available": (
    <CheckCircleIcon
      className={css({ width: "4", height: "4", color: "green.600" })}
    />
  ),
  "output-denied": (
    <XCircleIcon
      className={css({ width: "4", height: "4", color: "orange.600" })}
    />
  ),
  "output-error": (
    <XCircleIcon
      className={css({ width: "4", height: "4", color: "red.600" })}
    />
  ),
};

export const getStatusBadge = (status: ToolPart["state"]) => (
  <Badge
    className={css({ gap: "1.5", borderRadius: "full", fontSize: "xs" })}
    variant="subtle"
  >
    {statusIcons[status]}
    {statusLabels[status]}
  </Badge>
);

export const ToolHeader = ({
  className,
  title,
  type,
  state,
  toolName,
  ...props
}: ToolHeaderProps) => {
  const derivedName =
    type === "dynamic-tool" ? toolName : type.split("-").slice(1).join("-");

  return (
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
        <WrenchIcon
          className={css({
            width: "4",
            height: "4",
            color: "muted.foreground",
          })}
        />
        <span className={css({ fontWeight: "medium", fontSize: "sm" })}>
          {title ?? derivedName}
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
};

export type ToolContentProps = ComponentProps<typeof Collapsible.Content>;

export const ToolContent = ({ className, ...props }: ToolContentProps) => (
  <Collapsible.Content
    className={css(
      {
        display: "flex",
        flexDirection: "column",
        gap: "4",
        padding: "4",
        color: "popover.foreground",
        outline: "none",
      },
      className,
    )}
    {...props}
  />
);

export type ToolInputProps = ComponentProps<"div"> & {
  input: ToolPart["input"];
};

export const ToolInput = ({ className, input, ...props }: ToolInputProps) => (
  <div
    className={css(
      {
        display: "flex",
        flexDirection: "column",
        gap: "2",
        overflow: "hidden",
      },
      className,
    )}
    {...props}
  >
    <Heading
      as="h4"
      color="gray.12"
      className={css({
        fontWeight: "medium",
        fontSize: "xs",
        textTransform: "uppercase",
        letterSpacing: "wide",
      })}
    >
      Parameters
    </Heading>
    <div
      className={css({ borderRadius: "md", backgroundColor: "muted / 0.5" })}
    >
      <CodeBlock code={JSON.stringify(input, null, 2)} language="json" />
    </div>
  </div>
);

export type ToolOutputProps = ComponentProps<"div"> & {
  output: ToolPart["output"];
  errorText: ToolPart["errorText"];
};

export const ToolOutput = ({
  className,
  output,
  errorText,
  ...props
}: ToolOutputProps) => {
  if (!(output || errorText)) {
    return null;
  }

  let Output = <div>{output as ReactNode}</div>;

  if (typeof output === "object" && !isValidElement(output)) {
    Output = (
      <CodeBlock code={JSON.stringify(output, null, 2)} language="json" />
    );
  } else if (typeof output === "string") {
    Output = <CodeBlock code={output} language="json" />;
  }

  return (
    <div
      className={css(
        { display: "flex", flexDirection: "column", gap: "2" },
        className,
      )}
      {...props}
    >
      <Heading
        className={css({
          fontWeight: "medium",
          fontSize: "xs",
          textTransform: "uppercase",
          letterSpacing: "wide",
        })}
      >
        {errorText ? "Error" : "Result"}
      </Heading>
      <div
        className={css(
          {
            overflowX: "auto",
            borderRadius: "md",
            fontSize: "xs",
          },
          errorText
            ? { backgroundColor: "destructive / 0.1", color: "destructive" }
            : { backgroundColor: "muted / 0.5", color: "gray.12" },
        )}
      >
        {errorText && <div>{errorText}</div>}
        {Output}
      </div>
    </div>
  );
};
