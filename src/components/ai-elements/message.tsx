"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import { Tooltip } from "@/components/ui/tooltip";
import { cjk } from "@streamdown/cjk";
import { code } from "@streamdown/code";
import { math } from "@streamdown/math";
import { mermaid } from "@streamdown/mermaid";
import type { UIMessage } from "ai";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type { ComponentProps, HTMLAttributes, ReactElement } from "react";
import {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Streamdown } from "streamdown";
import { Box } from "styled-system/jsx";
import { css, cx } from "styled-system/css";
import { cn } from "@/lib/utils";
import "@/theme/message.css";

export type MessageProps = HTMLAttributes<HTMLDivElement> & {
  from: UIMessage["role"];
};

const messageStyles = css({
  display: "flex",
  width: "full",
  maxWidth: "95%",
  flexDirection: "column",
  gap: "2",
});

const userStyles = css({
  bg: "gray.3",
  borderRadius: "xl",
  py: "4",
  px: "5",
  marginLeft: "auto",
  justifyContent: "flex-end",
});

export const Message = ({ className, from, ...props }: MessageProps) => (
  <div
    className={cx(messageStyles, from === "user" && userStyles)}
    {...props}
  />
);

const messageContentStyles = css({
  display: "flex",
  width: "fit",
  minWidth: "0",
  maxWidth: "full",
  flexDirection: "column",
  gap: "2",
  overflow: "hidden",
  fontSize: "sm",
  _group: {
    _user: {
      marginLeft: "auto",
      borderRadius: "l2",
      backgroundColor: "bg.subtle",
      paddingX: "4",
      paddingY: "3",
      color: "fg.default",
    },
    _assistant: {
      color: "fg.default",
    },
  },
});

export type MessageContentProps = HTMLAttributes<HTMLDivElement>;

export const MessageContent = ({
  children,
  className,
  ...props
}: MessageContentProps) => (
  <Box
    color="fg.default"
    className={cx(messageContentStyles, className)}
    {...props}
  >
    {children}
  </Box>
);

export type MessageActionsProps = ComponentProps<"div">;

export const MessageActions = ({
  className,
  children,
  ...props
}: MessageActionsProps) => (
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
  >
    {children}
  </div>
);

export type MessageActionProps = ComponentProps<typeof Button> & {
  tooltip?: string;
};

export const MessageAction = ({
  tooltip,
  className,
  ...props
}: MessageActionProps) => {
  const button = (
    <Button
      className={css(
        {
          opacity: "0",
          transition: "opacity",
          _groupHover: {
            opacity: "100",
          },
        },
        className,
      )}
      size="sm"
      variant="plain"
      {...props}
    />
  );

  if (tooltip) {
    return <Tooltip content={tooltip}>{button}</Tooltip>;
  }

  return button;
};

export type MessageMarkdownContentProps = HTMLAttributes<HTMLDivElement>;

export const MessageMarkdownContent = memo(
  ({ className, children, ...props }: MessageMarkdownContentProps) => (
    <div
      className={css(
        {
          display: "flex",
          flexDirection: "column",
          gap: "2",
          color: "fg.default",
          fontSize: "sm",
          lineHeight: "1.75",
        },
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);

MessageMarkdownContent.displayName = "MessageMarkdownContent";

export type MessageMarkdownLinkProps = ComponentProps<"a">;

export const MessageMarkdownLink = ({
  className,
  ...props
}: MessageMarkdownLinkProps) => (
  <a
    className={css(
      {
        color: "blue.6",
        textDecoration: "underline",
        textUnderlineOffset: "2",
      },
      className,
    )}
    {...props}
  />
);

export type MessageMarkdownCodeBlockProps = ComponentProps<"pre">;

export const MessageMarkdownCodeBlock = ({
  className,
  ...props
}: MessageMarkdownCodeBlockProps) => (
  <pre
    className={css(
      {
        display: "block",
        width: "full",
        overflowX: "auto",
        borderRadius: "l2",
        backgroundColor: "bg.subtle",
        padding: "3",
        fontFamily: "mono",
        fontSize: "xs",
      },
      className,
    )}
    {...props}
  />
);

export type MessageMarkdownCodeSpanProps = ComponentProps<"code">;

export const MessageMarkdownCodeSpan = ({
  className,
  ...props
}: MessageMarkdownCodeSpanProps) => (
  <code
    className={css(
      {
        borderRadius: "l1",
        backgroundColor: "bg.subtle",
        paddingX: "1",
        fontFamily: "mono",
        fontSize: "xs",
      },
      className,
    )}
    {...props}
  />
);

export type StreamdownContentProps = HTMLAttributes<HTMLDivElement>;

export const StreamdownContent = ({
  className,
  ...props
}: StreamdownContentProps) => (
  <div
    className={css(
      {
        display: "flex",
        flexDirection: "column",
        gap: "4",
      },
      className,
    )}
    {...props}
  />
);

export const streamdownComponents = {
  cjk,
  code,
  math,
  mermaid,
  Streamdown,
};

export type StreamdownRendererProps = ComponentProps<typeof Streamdown> & {
  children?: ReactElement;
};

export const StreamdownRenderer = (props: StreamdownRendererProps) => (
  <Streamdown components={streamdownComponents} {...props} />
);

const messageReasoningContentStyles = css({
  display: "flex",
  flexDirection: "column",
  gap: "2",
  padding: "3",
  borderRadius: "l2",
  backgroundColor: "bg.subtle",
  fontSize: "sm",
  color: "fg.muted",
  fontFamily: "mono",
});

export type MessageReasoningContentProps = HTMLAttributes<HTMLDivElement>;

export const MessageReasoningContent = ({
  className,
  children,
  ...props
}: MessageReasoningContentProps) => (
  <div className={cx(messageReasoningContentStyles, className)} {...props}>
    {children}
  </div>
);

export type MessageReasoningPreambleProps = ComponentProps<"p">;

export const MessageReasoningPreamble = ({
  className,
  ...props
}: MessageReasoningPreambleProps) => (
  <p
    className={css(
      {
        fontWeight: "medium",
        color: "fg.subtle",
        fontSize: "xs",
      },
      className,
    )}
    {...props}
  />
);

export type ToolCallListProps = HTMLAttributes<HTMLDivElement>;

export const ToolCallList = ({
  className,
  children,
  ...props
}: ToolCallListProps) => (
  <div
    className={css(
      {
        display: "grid",
        width: "full",
        gap: "2",
      },
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export type ToolCallCardProps = ComponentProps<"div">;

export const ToolCallCard = ({
  className,
  children,
  ...props
}: ToolCallCardProps) => (
  <div
    className={css(
      {
        display: "flex",
        flexDirection: "column",
        gap: "2",
        borderRadius: "l2",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "border",
        backgroundColor: "bg.default",
        padding: "3",
      },
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export type ToolCallHeaderProps = HTMLAttributes<HTMLDivElement>;

export const ToolCallHeader = ({
  className,
  children,
  ...props
}: ToolCallHeaderProps) => (
  <div
    className={css(
      {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "2",
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        borderBottomColor: "border",
        paddingBottom: "2",
      },
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export type ToolCallStatusProps = ComponentProps<"span">;

export const ToolCallStatus = ({
  className,
  ...props
}: ToolCallStatusProps) => (
  <span
    className={css(
      {
        fontSize: "xs",
        color: "fg.muted",
      },
      className,
    )}
    {...props}
  />
);

export type ToolCallListActionsProps = ComponentProps<"div">;

export const ToolCallListActions = ({
  className,
  children,
  ...props
}: ToolCallListActionsProps) => (
  <div
    className={css(
      {
        display: "flex",
        alignItems: "center",
        gap: "2",
      },
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export const messageTranslations = {
  left: ChevronLeftIcon,
  right: ChevronRightIcon,
};

export type MessageNavigationProps = ComponentProps<"div"> & {
  direction: "left" | "right";
  disabled?: boolean;
};

export const MessageNavigation = ({
  direction,
  disabled,
  className,
  ...props
}: MessageNavigationProps) => {
  const DirectionIcon = messageTranslations[direction];

  return (
    <Button
      className={css(
        {
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          opacity: "0",
          transition: "opacity",
          _groupHover: {
            opacity: "100",
          },
          zIndex: "1",
          borderRadius: "full",
        },
        direction === "left" ? { left: "1" } : { right: "1" },
        disabled && { opacity: "0" },
        className,
      )}
      disabled={disabled}
      size="sm"
      variant="outline"
      {...props}
    >
      <DirectionIcon className={css({ width: "4", height: "4" })} />
    </Button>
  );
};

export type PaginationProps = ComponentProps<"div"> & {
  page: number;
  total: number;
  onChange?: (page: number) => void;
};

export const MessagePagination = ({
  page,
  total,
  onChange,
  className,
  ...props
}: PaginationProps) => (
  <div
    className={css(
      {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "2",
        padding: "2",
      },
      className,
    )}
    {...props}
  >
    <ButtonGroup>
      <ButtonGroupText>
        {page + 1} / {total}
      </ButtonGroupText>
    </ButtonGroup>
  </div>
);

export type MessageResponseProps = ComponentProps<typeof Streamdown>;
const streamdownPlugins = { cjk, code, math, mermaid };

export const MessageResponse = memo(
  ({ className, ...props }: MessageResponseProps) => (
    <Streamdown
      className={cx(
        css({
          fontSize: "md",
          w: "full",
          h: "full",
          "& > :first-of-type": { mt: "0" },
          "& > :last-of-type": { mb: "0" },
        }),
        className,
      )}
      plugins={streamdownPlugins}
      {...props}
    />
  ),
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    nextProps.isAnimating === prevProps.isAnimating,
);

Message.displayName = "Message";
MessageContent.displayName = "MessageContent";
MessageActions.displayName = "MessageActions";
MessageResponse.displayName = "MessageResponse";
