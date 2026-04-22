"use client";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { css } from "styled-system/css";
import type { FileUIPart, SourceDocumentUIPart } from "ai";
import {
  FileTextIcon,
  GlobeIcon,
  ImageIcon,
  Music2Icon,
  PaperclipIcon,
  VideoIcon,
  XIcon,
} from "lucide-react";
import type { ComponentProps, HTMLAttributes, ReactNode } from "react";
import { createContext, useCallback, useContext, useMemo } from "react";

// ============================================================================
// Types
// ============================================================================

export type AttachmentData =
  | (FileUIPart & { id: string })
  | (SourceDocumentUIPart & { id: string });

export type AttachmentMediaCategory =
  | "image"
  | "video"
  | "audio"
  | "document"
  | "source"
  | "unknown";

export type AttachmentVariant = "grid" | "inline" | "list";

const mediaCategoryIcons: Record<AttachmentMediaCategory, typeof ImageIcon> = {
  audio: Music2Icon,
  document: FileTextIcon,
  image: ImageIcon,
  source: GlobeIcon,
  unknown: PaperclipIcon,
  video: VideoIcon,
};

// ============================================================================
// Utility Functions
// ============================================================================

export const getMediaCategory = (
  data: AttachmentData,
): AttachmentMediaCategory => {
  if (data.type === "source-document") {
    return "source";
  }

  const mediaType = data.mediaType ?? "";

  if (mediaType.startsWith("image/")) {
    return "image";
  }
  if (mediaType.startsWith("video/")) {
    return "video";
  }
  if (mediaType.startsWith("audio/")) {
    return "audio";
  }
  if (mediaType.startsWith("application/") || mediaType.startsWith("text/")) {
    return "document";
  }

  return "unknown";
};

export const getAttachmentLabel = (data: AttachmentData): string => {
  if (data.type === "source-document") {
    return data.title || data.filename || "Source";
  }

  const category = getMediaCategory(data);
  return data.filename || (category === "image" ? "Image" : "Attachment");
};

const renderAttachmentImage = (
  url: string,
  filename: string | undefined,
  isGrid: boolean,
) =>
  isGrid ? (
    <img
      alt={filename || "Image"}
      className={css({
        width: "full",
        height: "full",
        objectFit: "cover",
      })}
      height={96}
      src={url}
      width={96}
    />
  ) : (
    <img
      alt={filename || "Image"}
      className={css({
        width: "full",
        height: "full",
        borderRadius: "l2",
        objectFit: "cover",
      })}
      height={20}
      src={url}
      width={20}
    />
  );

// ============================================================================
// Contexts
// ============================================================================

interface AttachmentsContextValue {
  variant: AttachmentVariant;
}

const AttachmentsContext = createContext<AttachmentsContextValue | null>(null);

interface AttachmentContextValue {
  data: AttachmentData;
  mediaCategory: AttachmentMediaCategory;
  onRemove?: () => void;
  variant: AttachmentVariant;
}

const AttachmentContext = createContext<AttachmentContextValue | null>(null);

// ============================================================================
// Hooks
// ============================================================================

export const useAttachmentsContext = () =>
  useContext(AttachmentsContext) ?? { variant: "grid" as const };

export const useAttachmentContext = () => {
  const ctx = useContext(AttachmentContext);
  if (!ctx) {
    throw new Error("Attachment components must be used within <Attachment>");
  }
  return ctx;
};

// ============================================================================
// Attachments - Container
// ============================================================================

export type AttachmentsProps = HTMLAttributes<HTMLDivElement> & {
  variant?: AttachmentVariant;
};

export const Attachments = ({
  variant = "grid",
  className,
  children,
  ...props
}: AttachmentsProps) => {
  const contextValue = useMemo(() => ({ variant }), [variant]);

  return (
    <AttachmentsContext.Provider value={contextValue}>
      <div
        className={css(
          {
            display: "flex",
            alignItems: "flex-start",
          },
          variant === "list"
            ? css({
                flexDirection: "column",
                gap: "2",
              })
            : css({
                flexWrap: "wrap",
                gap: "2",
              }),
          variant === "grid" &&
            css({
              marginLeft: "auto",
              width: "fit",
            }),
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </AttachmentsContext.Provider>
  );
};

// ============================================================================
// Attachment - Item
// ============================================================================

export type AttachmentProps = HTMLAttributes<HTMLDivElement> & {
  data: AttachmentData;
  onRemove?: () => void;
};

export const Attachment = ({
  data,
  onRemove,
  className,
  children,
  ...props
}: AttachmentProps) => {
  const { variant } = useAttachmentsContext();
  const mediaCategory = getMediaCategory(data);

  const contextValue = useMemo<AttachmentContextValue>(
    () => ({ data, mediaCategory, onRemove, variant }),
    [data, mediaCategory, onRemove, variant],
  );

  return (
    <AttachmentContext.Provider value={contextValue}>
      <div
        className={css(
          {
            position: "relative",
          },
          variant === "grid" &&
            css({
              width: "6rem",
              height: "6rem",
              overflow: "hidden",
              borderRadius: "l2",
            }),
          variant === "inline" &&
            css({
              display: "flex",
              height: "2rem",
              cursor: "pointer",
              userSelect: "none",
              alignItems: "center",
              gap: "1.5",
              borderRadius: "l2",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "border",
              paddingX: "1.5",
              fontWeight: "medium",
              fontSize: "sm",
              transition: "all",
              _hover: {
                backgroundColor: "bg.subtle",
                color: "fg.default",
              },
            }),
          variant === "list" &&
            css({
              display: "flex",
              width: "full",
              alignItems: "center",
              gap: "3",
              borderRadius: "l2",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "border",
              padding: "3",
              _hover: {
                backgroundColor: "bg.subtle/50",
              },
            }),
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </AttachmentContext.Provider>
  );
};

// ============================================================================
// AttachmentPreview - Media preview
// ============================================================================

export type AttachmentPreviewProps = HTMLAttributes<HTMLDivElement> & {
  fallbackIcon?: ReactNode;
};

export const AttachmentPreview = ({
  fallbackIcon,
  className,
  ...props
}: AttachmentPreviewProps) => {
  const { data, mediaCategory, variant } = useAttachmentContext();

  const renderIcon = (Icon: typeof ImageIcon) => (
    <Icon
      className={css(
        {
          color: "fg.muted",
        },
        variant === "inline"
          ? css({ width: "3", height: "3" })
          : css({ width: "4", height: "4" }),
      )}
    />
  );

  const renderContent = () => {
    if (mediaCategory === "image" && data.type === "file" && data.url) {
      return renderAttachmentImage(data.url, data.filename, variant === "grid");
    }

    if (mediaCategory === "video" && data.type === "file" && data.url) {
      return (
        <video
          className={css({
            width: "full",
            height: "full",
            objectFit: "cover",
          })}
          muted
          src={data.url}
        />
      );
    }

    const Icon = mediaCategoryIcons[mediaCategory];
    return fallbackIcon ?? renderIcon(Icon);
  };

  return (
    <div
      className={css(
        {
          flexShrink: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        },
        variant === "grid" &&
          css({
            width: "full",
            height: "full",
            backgroundColor: "bg.subtle",
          }),
        variant === "inline" &&
          css({
            width: "5",
            height: "5",
            borderRadius: "l2",
            backgroundColor: "bg.default",
          }),
        variant === "list" &&
          css({
            width: "3rem",
            height: "3rem",
            borderRadius: "l2",
            backgroundColor: "bg.subtle",
          }),
        className,
      )}
      {...props}
    >
      {renderContent()}
    </div>
  );
};

// ============================================================================
// AttachmentInfo - Name and type display
// ============================================================================

export type AttachmentInfoProps = HTMLAttributes<HTMLDivElement> & {
  showMediaType?: boolean;
};

export const AttachmentInfo = ({
  showMediaType = false,
  className,
  ...props
}: AttachmentInfoProps) => {
  const { data, variant } = useAttachmentContext();
  const label = getAttachmentLabel(data);

  if (variant === "grid") {
    return null;
  }

  return (
    <div
      className={css(
        {
          minWidth: "0",
          flex: "1",
        },
        className,
      )}
      {...props}
    >
      <span
        className={css({
          display: "block",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        })}
      >
        {label}
      </span>
      {showMediaType && data.mediaType && (
        <span
          className={css({
            display: "block",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            color: "fg.muted",
            fontSize: "xs",
          })}
        >
          {data.mediaType}
        </span>
      )}
    </div>
  );
};

// ============================================================================
// AttachmentRemove - Remove button
// ============================================================================

export type AttachmentRemoveProps = ComponentProps<typeof Button> & {
  label?: string;
};

export const AttachmentRemove = ({
  label = "Remove",
  className,
  children,
  ...props
}: AttachmentRemoveProps) => {
  const { onRemove, variant } = useAttachmentContext();

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onRemove?.();
    },
    [onRemove],
  );

  if (!onRemove) {
    return null;
  }

  return (
    <Button
      aria-label={label}
      className={css(
        {},
        variant === "grid" &&
          css({
            position: "absolute",
            top: "2",
            right: "2",
            width: "6",
            height: "6",
            borderRadius: "full",
            padding: "0",
            backgroundColor: "bg.default/80",
            backdropFilter: "blur(4px)",
            opacity: "0",
            transition: "opacity",
            _groupHover: {
              opacity: "100",
            },
            _hover: {
              backgroundColor: "bg.default",
            },
          }),
        variant === "inline" &&
          css({
            width: "5",
            height: "5",
            padding: "0",
            borderRadius: "l2",
            opacity: "0",
            transition: "opacity",
            _groupHover: {
              opacity: "100",
            },
          }),
        variant === "list" &&
          css({
            width: "8",
            height: "8",
            flexShrink: "0",
            padding: "0",
            borderRadius: "l2",
          }),
        className,
      )}
      onClick={handleClick}
      type="button"
      variant="plain"
      {...props}
    >
      {children ?? <XIcon className={css({ width: "3", height: "3" })} />}
      <span className={css({ srOnly: true })}>{label}</span>
    </Button>
  );
};

// ============================================================================
// AttachmentHoverCard - Hover preview
// ============================================================================

export type AttachmentHoverCardProps = ComponentProps<typeof HoverCard>;

export const AttachmentHoverCard = ({
  openDelay = 0,
  closeDelay = 0,
  ...props
}: AttachmentHoverCardProps) => (
  <HoverCard closeDelay={closeDelay} openDelay={openDelay} {...props} />
);

export type AttachmentHoverCardTriggerProps = ComponentProps<
  typeof HoverCardTrigger
>;

export const AttachmentHoverCardTrigger = (
  props: AttachmentHoverCardTriggerProps,
) => <HoverCardTrigger {...props} />;

export type AttachmentHoverCardContentProps = ComponentProps<
  typeof HoverCardContent
>;

export const AttachmentHoverCardContent = ({
  align = "start",
  className,
  ...props
}: AttachmentHoverCardContentProps) => (
  <HoverCardContent
    align={align}
    className={css(
      {
        width: "auto",
        padding: "2",
      },
      className,
    )}
    {...props}
  />
);

// ============================================================================
// AttachmentEmpty - Empty state
// ============================================================================

export type AttachmentEmptyProps = HTMLAttributes<HTMLDivElement>;

export const AttachmentEmpty = ({
  className,
  children,
  ...props
}: AttachmentEmptyProps) => (
  <div
    className={css(
      {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4",
        color: "fg.muted",
        fontSize: "sm",
      },
      className,
    )}
    {...props}
  >
    {children ?? "No attachments"}
  </div>
);
