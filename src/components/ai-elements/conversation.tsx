"use client";

import { Button } from "@/components/ui/button";
import { css } from "styled-system/css";
import type { UIMessage } from "ai";
import { ArrowDownIcon, DownloadIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { useCallback } from "react";
import { StickToBottom, useStickToBottomContext } from "use-stick-to-bottom";

export type ConversationProps = ComponentProps<typeof StickToBottom>;

export const Conversation = ({ className, ...props }: ConversationProps) => (
  <StickToBottom
    className={css(
      {
        position: "relative",
        flex: "1",
        overflowY: "hidden",
      },
      className,
    )}
    initial="smooth"
    resize="smooth"
    role="log"
    {...props}
  />
);

export type ConversationContentProps = ComponentProps<
  typeof StickToBottom.Content
>;

export const ConversationContent = ({
  className,
  ...props
}: ConversationContentProps) => (
  <StickToBottom.Content
    className={css(
      {
        display: "flex",
        flexDirection: "column",
        gap: "8",
        padding: "4",
      },
      className,
    )}
    {...props}
  />
);

export type ConversationEmptyStateProps = ComponentProps<"div"> & {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
};

export const ConversationEmptyState = ({
  className,
  title = "No messages yet",
  description = "Start a conversation to see messages here",
  icon,
  children,
  ...props
}: ConversationEmptyStateProps) => (
  <div
    className={css(
      {
        display: "flex",
        width: "full",
        height: "full",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "3",
        padding: "8",
        textAlign: "center",
      },
      className,
    )}
    {...props}
  >
    {children ?? (
      <>
        {icon && (
          <div
            className={css({
              color: "fg.muted",
            })}
          >
            {icon}
          </div>
        )}
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "1",
          })}
        >
          <h3
            className={css({
              fontWeight: "medium",
              fontSize: "sm",
            })}
          >
            {title}
          </h3>
          {description && (
            <p
              className={css({
                color: "fg.muted",
                fontSize: "sm",
              })}
            >
              {description}
            </p>
          )}
        </div>
      </>
    )}
  </div>
);

export type ConversationScrollButtonProps = ComponentProps<typeof Button>;

export const ConversationScrollButton = ({
  className,
  ...props
}: ConversationScrollButtonProps) => {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext();

  const handleScrollToBottom = useCallback(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  return (
    !isAtBottom && (
      <Button
        className={css(
          {
            position: "absolute",
            bottom: "4",
            left: "50%",
            transform: "translateX(-50%)",
            borderRadius: "full",
            _dark: {
              backgroundColor: "bg.default",
              _hover: {
                backgroundColor: "bg.subtle",
              },
            },
          },
          className,
        )}
        onClick={handleScrollToBottom}
        size="sm"
        type="button"
        variant="outline"
        {...props}
      >
        <ArrowDownIcon className={css({ width: "4", height: "4" })} />
      </Button>
    )
  );
};

const getMessageText = (message: UIMessage): string =>
  message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");

export type ConversationDownloadProps = Omit<
  ComponentProps<typeof Button>,
  "onClick"
> & {
  messages: UIMessage[];
  filename?: string;
  formatMessage?: (message: UIMessage, index: number) => string;
};

const defaultFormatMessage = (message: UIMessage): string => {
  const roleLabel =
    message.role.charAt(0).toUpperCase() + message.role.slice(1);
  return `**${roleLabel}:** ${getMessageText(message)}`;
};

export const messagesToMarkdown = (
  messages: UIMessage[],
  formatMessage: (
    message: UIMessage,
    index: number,
  ) => string = defaultFormatMessage,
): string => messages.map((msg, i) => formatMessage(msg, i)).join("\n\n");

export const ConversationDownload = ({
  messages,
  filename = "conversation.md",
  formatMessage = defaultFormatMessage,
  className,
  children,
  ...props
}: ConversationDownloadProps) => {
  const handleDownload = useCallback(() => {
    const markdown = messagesToMarkdown(messages, formatMessage);
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }, [messages, filename, formatMessage]);

  return (
    <Button
      className={css(
        {
          position: "absolute",
          top: "4",
          right: "4",
          borderRadius: "full",
          _dark: {
            backgroundColor: "bg.default",
            _hover: {
              backgroundColor: "bg.subtle",
            },
          },
        },
        className,
      )}
      onClick={handleDownload}
      size="sm"
      type="button"
      variant="outline"
      {...props}
    >
      {children ?? (
        <DownloadIcon className={css({ width: "4", height: "4" })} />
      )}
    </Button>
  );
};
