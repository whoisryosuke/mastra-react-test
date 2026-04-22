"use client";

import {
  Root as Avatar,
  Fallback as AvatarFallback,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import * as Collapsible from "@/components/ui/collapsible";
import { css } from "styled-system/css";
import {
  CheckIcon,
  CopyIcon,
  FileIcon,
  GitCommitIcon,
  MinusIcon,
  PlusIcon,
} from "lucide-react";
import type { ComponentProps, HTMLAttributes } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

export type CommitProps = ComponentProps<typeof Collapsible.Root>;

export const Commit = ({ className, children, ...props }: CommitProps) => (
  <Collapsible.Root
    className={css(
      {
        borderRadius: "l2",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "border",
        backgroundColor: "bg.default",
      },
      className,
    )}
    {...props}
  >
    {children}
  </Collapsible.Root>
);

export type CommitHeaderProps = ComponentProps<typeof Collapsible.Trigger>;

export const CommitHeader = ({
  className,
  children,
  ...props
}: CommitHeaderProps) => (
  <Collapsible.Trigger asChild {...props}>
    <div
      className={css(
        {
          display: "flex",
          cursor: "pointer",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "4",
          padding: "3",
          textAlign: "left",
          transition: "colors",
          _hover: {
            opacity: 0.8,
          },
        },
        className,
      )}
    >
      {children}
    </div>
  </Collapsible.Trigger>
);

export type CommitHashProps = HTMLAttributes<HTMLSpanElement>;

export const CommitHash = ({
  className,
  children,
  ...props
}: CommitHashProps) => (
  <span
    className={css(
      {
        fontFamily: "mono",
        fontSize: "xs",
      },
      className,
    )}
    {...props}
  >
    <GitCommitIcon
      className={css({
        marginRight: "0.25rem",
        display: "inline-block",
        width: "3",
        height: "3",
      })}
    />
    {children}
  </span>
);

export type CommitMessageProps = HTMLAttributes<HTMLSpanElement>;

export const CommitMessage = ({
  className,
  children,
  ...props
}: CommitMessageProps) => (
  <span
    className={css(
      {
        fontWeight: "medium",
        fontSize: "sm",
      },
      className,
    )}
    {...props}
  >
    {children}
  </span>
);

export type CommitMetadataProps = HTMLAttributes<HTMLDivElement>;

export const CommitMetadata = ({
  className,
  children,
  ...props
}: CommitMetadataProps) => (
  <div
    className={css(
      {
        display: "flex",
        alignItems: "center",
        gap: "2",
        color: "fg.muted",
        fontSize: "xs",
      },
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export type CommitSeparatorProps = HTMLAttributes<HTMLSpanElement>;

export const CommitSeparator = ({
  className,
  children,
  ...props
}: CommitSeparatorProps) => (
  <span className={className} {...props}>
    {children ?? "•"}
  </span>
);

export type CommitInfoProps = HTMLAttributes<HTMLDivElement>;

export const CommitInfo = ({
  className,
  children,
  ...props
}: CommitInfoProps) => (
  <div
    className={css(
      {
        display: "flex",
        flex: "1",
        flexDirection: "column",
      },
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export type CommitAuthorProps = HTMLAttributes<HTMLDivElement>;

export const CommitAuthor = ({
  className,
  children,
  ...props
}: CommitAuthorProps) => (
  <div
    className={css(
      {
        display: "flex",
        alignItems: "center",
      },
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export type CommitAuthorAvatarProps = ComponentProps<typeof Avatar> & {
  initials: string;
};

export const CommitAuthorAvatar = ({
  initials,
  className,
  ...props
}: CommitAuthorAvatarProps) => (
  <Avatar
    className={css(
      {
        width: "2rem",
        height: "2rem",
      },
      className,
    )}
    {...props}
  >
    <AvatarFallback
      className={css({
        fontSize: "xs",
      })}
    >
      {initials}
    </AvatarFallback>
  </Avatar>
);

export type CommitTimestampProps = HTMLAttributes<HTMLTimeElement> & {
  date: Date;
};

const relativeTimeFormat = new Intl.RelativeTimeFormat("en", {
  numeric: "auto",
});

const formatRelativeDate = (date: Date) => {
  const days = Math.round(
    (date.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );
  return relativeTimeFormat.format(days, "day");
};

export const CommitTimestamp = ({
  date,
  className,
  children,
  ...props
}: CommitTimestampProps) => {
  const [formatted, setFormatted] = useState("");

  const updateFormatted = useCallback(() => {
    setFormatted(formatRelativeDate(date));
  }, [date]);

  useEffect(() => {
    updateFormatted();
  }, [updateFormatted]);

  return (
    <time
      className={css(
        {
          fontSize: "xs",
        },
        className,
      )}
      dateTime={date.toISOString()}
      {...props}
    >
      {children ?? formatted}
    </time>
  );
};

export type CommitActionsProps = HTMLAttributes<HTMLDivElement>;

const handleActionsClick = (e: React.MouseEvent) => e.stopPropagation();
const handleActionsKeyDown = (e: React.KeyboardEvent) => e.stopPropagation();

export const CommitActions = ({
  className,
  children,
  ...props
}: CommitActionsProps) => (
  <div
    className={css(
      {
        display: "flex",
        alignItems: "center",
        gap: "1",
      },
      className,
    )}
    onClick={handleActionsClick}
    onKeyDown={handleActionsKeyDown}
    role="group"
    {...props}
  >
    {children}
  </div>
);

export type CommitCopyButtonProps = ComponentProps<typeof Button> & {
  hash: string;
  onCopy?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
};

export const CommitCopyButton = ({
  hash,
  onCopy,
  onError,
  timeout = 2000,
  children,
  className,
  ...props
}: CommitCopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<number>(0);

  const copyToClipboard = useCallback(async () => {
    if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
      onError?.(new Error("Clipboard API not available"));
      return;
    }

    try {
      if (!isCopied) {
        await navigator.clipboard.writeText(hash);
        setIsCopied(true);
        onCopy?.();
        timeoutRef.current = window.setTimeout(
          () => setIsCopied(false),
          timeout,
        );
      }
    } catch (error) {
      onError?.(error as Error);
    }
  }, [hash, onCopy, onError, timeout, isCopied]);

  useEffect(
    () => () => {
      window.clearTimeout(timeoutRef.current);
    },
    [],
  );

  const Icon = isCopied ? CheckIcon : CopyIcon;

  return (
    <Button
      className={css(
        {
          width: "7",
          height: "7",
          flexShrink: "0",
        },
        className,
      )}
      onClick={copyToClipboard}
      size="sm"
      variant="plain"
      {...props}
    >
      {children ?? <Icon style={{ width: 14, height: 14 }} />}
    </Button>
  );
};

export type CommitContentProps = ComponentProps<typeof Collapsible.Content>;

export const CommitContent = ({
  className,
  children,
  ...props
}: CommitContentProps) => (
  <Collapsible.Content
    className={css(
      {
        borderTopWidth: "1px",
        borderTopStyle: "solid",
        borderTopColor: "border",
        padding: "3",
      },
      className,
    )}
    {...props}
  >
    {children}
  </Collapsible.Content>
);

export type CommitFilesProps = HTMLAttributes<HTMLDivElement>;

export const CommitFiles = ({
  className,
  children,
  ...props
}: CommitFilesProps) => (
  <div
    className={css(
      {
        display: "flex",
        flexDirection: "column",
        gap: "1",
      },
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export type CommitFileProps = HTMLAttributes<HTMLDivElement>;

export const CommitFile = ({
  className,
  children,
  ...props
}: CommitFileProps) => (
  <div
    className={css(
      {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "2",
        borderRadius: "l2",
        paddingX: "2",
        paddingY: "1",
        fontSize: "sm",
        _hover: {
          backgroundColor: "bg.subtle",
        },
      },
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export type CommitFileInfoProps = HTMLAttributes<HTMLDivElement>;

export const CommitFileInfo = ({
  className,
  children,
  ...props
}: CommitFileInfoProps) => (
  <div
    className={css(
      {
        display: "flex",
        minWidth: "0",
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

const fileStatusStyles = {
  added: css({ color: "green.6", _dark: { color: "green.4" } }),
  deleted: css({ color: "red.6", _dark: { color: "red.4" } }),
  modified: css({ color: "yellow.6", _dark: { color: "yellow.4" } }),
  renamed: css({ color: "blue.6", _dark: { color: "blue.4" } }),
};

const fileStatusLabels = {
  added: "A",
  deleted: "D",
  modified: "M",
  renamed: "R",
};

export type CommitFileStatusProps = HTMLAttributes<HTMLSpanElement> & {
  status: "added" | "modified" | "deleted" | "renamed";
};

export const CommitFileStatus = ({
  status,
  className,
  children,
  ...props
}: CommitFileStatusProps) => (
  <span
    className={css(
      {
        fontWeight: "medium",
        fontFamily: "mono",
        fontSize: "xs",
      },
      fileStatusStyles[status],
      className,
    )}
    {...props}
  >
    {children ?? fileStatusLabels[status]}
  </span>
);

export type CommitFileIconProps = ComponentProps<typeof FileIcon>;

export const CommitFileIcon = ({
  className,
  ...props
}: CommitFileIconProps) => (
  <FileIcon
    className={css(
      {
        width: "3.5",
        height: "3.5",
        flexShrink: "0",
        color: "fg.muted",
      },
      className,
    )}
    {...props}
  />
);

export type CommitFilePathProps = HTMLAttributes<HTMLSpanElement>;

export const CommitFilePath = ({
  className,
  children,
  ...props
}: CommitFilePathProps) => (
  <span
    className={css(
      {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        fontFamily: "mono",
        fontSize: "xs",
      },
      className,
    )}
    {...props}
  >
    {children}
  </span>
);

export type CommitFileChangesProps = HTMLAttributes<HTMLDivElement>;

export const CommitFileChanges = ({
  className,
  children,
  ...props
}: CommitFileChangesProps) => (
  <div
    className={css(
      {
        flexShrink: "0",
        display: "flex",
        alignItems: "center",
        gap: "1",
        fontFamily: "mono",
        fontSize: "xs",
      },
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export type CommitFileAdditionsProps = HTMLAttributes<HTMLSpanElement> & {
  count: number;
};

export const CommitFileAdditions = ({
  count,
  className,
  children,
  ...props
}: CommitFileAdditionsProps) => {
  if (count <= 0) {
    return null;
  }

  return (
    <span
      className={css(
        {
          color: "green.6",
          _dark: { color: "green.4" },
        },
        className,
      )}
      {...props}
    >
      {children ?? (
        <>
          <PlusIcon
            className={css({
              display: "inline-block",
              width: "3",
              height: "3",
            })}
          />
          {count}
        </>
      )}
    </span>
  );
};

export type CommitFileDeletionsProps = HTMLAttributes<HTMLSpanElement> & {
  count: number;
};

export const CommitFileDeletions = ({
  count,
  className,
  children,
  ...props
}: CommitFileDeletionsProps) => {
  if (count <= 0) {
    return null;
  }

  return (
    <span
      className={css(
        {
          color: "red.6",
          _dark: { color: "red.4" },
        },
        className,
      )}
      {...props}
    >
      {children ?? (
        <>
          <MinusIcon
            className={css({
              display: "inline-block",
              width: "3",
              height: "3",
            })}
          />
          {count}
        </>
      )}
    </span>
  );
};
