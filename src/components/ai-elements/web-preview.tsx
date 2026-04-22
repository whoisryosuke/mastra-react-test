"use client";

import { Button } from "@/components/ui/button";
import * as Collapsible from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Tooltip } from "@/components/ui/tooltip";
import { css } from "styled-system/css";
import { ChevronDownIcon } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export interface WebPreviewContextValue {
  url: string;
  setUrl: (url: string) => void;
  consoleOpen: boolean;
  setConsoleOpen: (open: boolean) => void;
}

const WebPreviewContext = createContext<WebPreviewContextValue | null>(null);

const useWebPreview = () => {
  const context = useContext(WebPreviewContext);
  if (!context) {
    throw new Error("WebPreview components must be used within a WebPreview");
  }
  return context;
};

export type WebPreviewProps = ComponentProps<"div"> & {
  defaultUrl?: string;
  onUrlChange?: (url: string) => void;
};

export const WebPreview = ({
  className,
  children,
  defaultUrl = "",
  onUrlChange,
  ...props
}: WebPreviewProps) => {
  const [url, setUrl] = useState(defaultUrl);
  const [consoleOpen, setConsoleOpen] = useState(false);

  const handleUrlChange = useCallback(
    (newUrl: string) => {
      setUrl(newUrl);
      onUrlChange?.(newUrl);
    },
    [onUrlChange],
  );

  const contextValue = useMemo<WebPreviewContextValue>(
    () => ({
      consoleOpen,
      setConsoleOpen,
      setUrl: handleUrlChange,
      url,
    }),
    [consoleOpen, handleUrlChange, url],
  );

  return (
    <WebPreviewContext.Provider value={contextValue}>
      <div
        className={css(
          {
            display: "flex",
            width: "full",
            height: "full",
            flexDirection: "column",
            borderRadius: "lg",
            borderWidth: "1px",
            backgroundColor: "card",
          },
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </WebPreviewContext.Provider>
  );
};

export type WebPreviewNavigationProps = ComponentProps<"div">;

export const WebPreviewNavigation = ({
  className,
  children,
  ...props
}: WebPreviewNavigationProps) => (
  <div
    className={css(
      {
        display: "flex",
        alignItems: "center",
        gap: "1",
        borderBottomWidth: "1px",
        padding: "2",
      },
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export type WebPreviewNavigationButtonProps = ComponentProps<typeof Button> & {
  tooltip?: string;
};

export const WebPreviewNavigationButton = ({
  onClick,
  disabled,
  tooltip,
  children,
  ...props
}: WebPreviewNavigationButtonProps) => (
  <Tooltip content={tooltip}>
    <Button
      className={css({
        height: "8",
        width: "8",
        padding: "0",
        _hover: {
          color: "foreground",
        },
      })}
      disabled={disabled}
      onClick={onClick}
      size="sm"
      variant="plain"
      {...props}
    >
      {children}
    </Button>
  </Tooltip>
);

export type WebPreviewUrlProps = ComponentProps<typeof Input>;

export const WebPreviewUrl = ({
  value,
  onChange,
  onKeyDown,
  ...props
}: WebPreviewUrlProps) => {
  const { url, setUrl } = useWebPreview();
  const [prevUrl, setPrevUrl] = useState(url);
  const [inputValue, setInputValue] = useState(url);

  if (url !== prevUrl) {
    setPrevUrl(url);
    setInputValue(url);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    onChange?.(event);
  };

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        const target = event.target as HTMLInputElement;
        setUrl(target.value);
      }
      onKeyDown?.(event);
    },
    [setUrl, onKeyDown],
  );

  return (
    <Input
      className={css({
        height: "8",
        flex: "1",
        fontSize: "sm",
      })}
      onChange={onChange ?? handleChange}
      onKeyDown={handleKeyDown}
      placeholder="Enter URL..."
      value={value ?? inputValue}
      {...props}
    />
  );
};

export type WebPreviewBodyProps = ComponentProps<"iframe"> & {
  loading?: ReactNode;
};

export const WebPreviewBody = ({
  className,
  loading,
  src,
  ...props
}: WebPreviewBodyProps) => {
  const { url } = useWebPreview();

  return (
    <div className={css({ flex: "1" })}>
      <iframe
        className={css({ width: "full", height: "full" }, className)}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
        src={(src ?? url) || undefined}
        title="Preview"
        {...props}
      />
      {loading}
    </div>
  );
};

export type WebPreviewConsoleProps = ComponentProps<"div"> & {
  logs?: {
    level: "log" | "warn" | "error";
    message: string;
    timestamp: Date;
  }[];
};

export const WebPreviewConsole = ({
  className,
  logs = [],
  children,
  ...props
}: WebPreviewConsoleProps) => {
  const { consoleOpen, setConsoleOpen } = useWebPreview();

  return (
    <Collapsible.Root
      className={css(
        {
          borderTopWidth: "1px",
          backgroundColor: "muted / 0.5",
          fontFamily: "mono",
          fontSize: "sm",
        },
        className,
      )}
      onOpenChange={(details) => setConsoleOpen(details.open)}
      open={consoleOpen}
      {...props}
    >
      <Collapsible.Trigger asChild>
        <Button
          className={css({
            display: "flex",
            width: "full",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "4",
            textAlign: "left",
            fontWeight: "medium",
            _hover: {
              backgroundColor: "muted / 0.5",
            },
          })}
          variant="plain"
        >
          Console
          <ChevronDownIcon
            className={css({
              width: "4",
              height: "4",
              transitionProperty: "transform",
              transitionDuration: "200ms",
              transform: consoleOpen ? "rotate(180deg)" : "rotate(0deg)",
            })}
          />
        </Button>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div
          className={css({
            maxHeight: "48",
            display: "flex",
            flexDirection: "column",
            gap: "1",
            overflowY: "auto",
            paddingX: "4",
            paddingBottom: "4",
          })}
        >
          {logs.length === 0 ? (
            <p className={css({ color: "muted.foreground" })}>
              No console output
            </p>
          ) : (
            logs.map((log) => (
              <div
                className={css(
                  {
                    fontSize: "xs",
                  },
                  log.level === "error" && { color: "destructive" },
                  log.level === "warn" && { color: "yellow.600" },
                  log.level === "log" && { color: "foreground" },
                )}
                key={`${log.timestamp.getTime()}-${log.level}-${log.message}`}
              >
                <span className={css({ color: "muted.foreground" })}>
                  {log.timestamp.toLocaleTimeString()}
                </span>{" "}
                {log.message}
              </div>
            ))
          )}
          {children}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};
