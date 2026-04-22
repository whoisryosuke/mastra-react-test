"use client";

import * as Accordion from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { css } from "styled-system/css";
import type { Tool } from "ai";
import { BotIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { memo } from "react";

import { CodeBlock } from "./code-block";

export type AgentProps = ComponentProps<"div">;

export const Agent = memo(({ className, ...props }: AgentProps) => (
  <div
    className={css(
      {
        width: "full",
        borderRadius: "l2",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "border",
      },
      className,
    )}
    {...props}
  />
));

export type AgentHeaderProps = ComponentProps<"div"> & {
  name: string;
  model?: string;
};

export const AgentHeader = memo(
  ({ className, name, model, ...props }: AgentHeaderProps) => (
    <div
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
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          gap: "2",
        })}
      >
        <BotIcon
          className={css({
            width: "4",
            height: "4",
            color: "fg.muted",
          })}
        />
        <span
          className={css({
            fontWeight: "medium",
            fontSize: "sm",
          })}
        >
          {name}
        </span>
        {model && (
          <Badge
            className={css({
              fontFamily: "mono",
              fontSize: "xs",
            })}
            variant="subtle"
          >
            {model}
          </Badge>
        )}
      </div>
    </div>
  ),
);

export type AgentContentProps = ComponentProps<"div">;

export const AgentContent = memo(
  ({ className, ...props }: AgentContentProps) => (
    <div
      className={css(
        {
          display: "flex",
          flexDirection: "column",
          gap: "4",
          padding: "4",
          paddingTop: "0",
        },
        className,
      )}
      {...props}
    />
  ),
);

export type AgentInstructionsProps = ComponentProps<"div"> & {
  children: string;
};

export const AgentInstructions = memo(
  ({ className, children, ...props }: AgentInstructionsProps) => (
    <div
      className={css(
        {
          display: "flex",
          flexDirection: "column",
          gap: "2",
        },
        className,
      )}
      {...props}
    >
      <span
        className={css({
          fontWeight: "medium",
          color: "fg.muted",
          fontSize: "sm",
        })}
      >
        Instructions
      </span>
      <div
        className={css({
          borderRadius: "l2",
          backgroundColor: "bg.subtle",
          padding: "3",
          color: "fg.muted",
          fontSize: "sm",
        })}
      >
        <p>{children}</p>
      </div>
    </div>
  ),
);

export type AgentToolsProps = ComponentProps<typeof Accordion.Root>;

export const AgentTools = memo(({ className, ...props }: AgentToolsProps) => (
  <div
    className={css(
      {
        display: "flex",
        flexDirection: "column",
        gap: "2",
      },
      className,
    )}
  >
    <span
      className={css({
        fontWeight: "medium",
        color: "fg.muted",
        fontSize: "sm",
      })}
    >
      Tools
    </span>
    <Accordion.Root
      className={css({
        borderRadius: "l2",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "border",
      })}
      {...props}
    />
  </div>
));

export type AgentToolProps = ComponentProps<typeof Accordion.Item> & {
  tool: Tool;
};

export const AgentTool = memo(
  ({ className, tool, value, ...props }: AgentToolProps) => {
    const schema =
      "jsonSchema" in tool && tool.jsonSchema
        ? tool.jsonSchema
        : tool.inputSchema;

    return (
      <Accordion.Item
        className={css(
          {
            borderBottomWidth: "1px",
            borderBottomStyle: "solid",
            borderBottomColor: "border",
          },
          className,
        )}
        value={value}
        {...props}
      >
        <Accordion.ItemTrigger
          className={css({
            paddingX: "3",
            paddingY: "2",
            fontSize: "sm",
            _hover: {
              textDecoration: "none",
            },
          })}
        >
          {tool.description ?? "No description"}
        </Accordion.ItemTrigger>
        <Accordion.ItemContent
          className={css({
            paddingX: "3",
            paddingBottom: "3",
          })}
        >
          <div
            className={css({
              borderRadius: "l2",
              backgroundColor: "bg.subtle",
            })}
          >
            <CodeBlock code={JSON.stringify(schema, null, 2)} language="json" />
          </div>
        </Accordion.ItemContent>
      </Accordion.Item>
    );
  },
);

export type AgentOutputProps = ComponentProps<"div"> & {
  schema: string;
};

export const AgentOutput = memo(
  ({ className, schema, ...props }: AgentOutputProps) => (
    <div
      className={css(
        {
          display: "flex",
          flexDirection: "column",
          gap: "2",
        },
        className,
      )}
      {...props}
    >
      <span
        className={css({
          fontWeight: "medium",
          color: "fg.muted",
          fontSize: "sm",
        })}
      >
        Output Schema
      </span>
      <div
        className={css({
          borderRadius: "l2",
          backgroundColor: "bg.subtle",
        })}
      >
        <CodeBlock code={schema} language="typescript" />
      </div>
    </div>
  ),
);

Agent.displayName = "Agent";
AgentHeader.displayName = "AgentHeader";
AgentContent.displayName = "AgentContent";
AgentInstructions.displayName = "AgentInstructions";
AgentTools.displayName = "AgentTools";
AgentTool.displayName = "AgentTool";
AgentOutput.displayName = "AgentOutput";
