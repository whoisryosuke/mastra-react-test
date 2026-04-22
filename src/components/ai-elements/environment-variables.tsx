"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import * as Switch from "@/components/ui/switch";
import { css } from "styled-system/css";
import { CheckIcon, CopyIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import type { ComponentProps, HTMLAttributes } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface EnvironmentVariablesContextType {
  showValues: boolean;
  setShowValues: (show: boolean) => void;
}

// Default noop for context default value
// oxlint-disable-next-line eslint(no-empty-function)
const noop = () => {};

const EnvironmentVariablesContext =
  createContext<EnvironmentVariablesContextType>({
    setShowValues: noop,
    showValues: false,
  });

export type EnvironmentVariablesProps = HTMLAttributes<HTMLDivElement> & {
  showValues?: boolean;
  defaultShowValues?: boolean;
  onShowValuesChange?: (show: boolean) => void;
};

export const EnvironmentVariables = ({
  showValues: controlledShowValues,
  defaultShowValues = false,
  onShowValuesChange,
  className,
  children,
  ...props
}: EnvironmentVariablesProps) => {
  const [internalShowValues, setInternalShowValues] =
    useState(defaultShowValues);
  const showValues = controlledShowValues ?? internalShowValues;

  const setShowValues = useCallback(
    (show: boolean) => {
      setInternalShowValues(show);
      onShowValuesChange?.(show);
    },
    [onShowValuesChange],
  );

  const contextValue = useMemo(
    () => ({ setShowValues, showValues }),
    [setShowValues, showValues],
  );

  return (
    <EnvironmentVariablesContext.Provider value={contextValue}>
      <div
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
      </div>
    </EnvironmentVariablesContext.Provider>
  );
};

export type EnvironmentVariablesHeaderProps = HTMLAttributes<HTMLDivElement>;

export const EnvironmentVariablesHeader = ({
  className,
  children,
  ...props
}: EnvironmentVariablesHeaderProps) => (
  <div
    className={css(
      {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        borderBottomColor: "border",
        paddingX: "4",
        paddingY: "3",
      },
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export type EnvironmentVariablesTitleProps = HTMLAttributes<HTMLHeadingElement>;

export const EnvironmentVariablesTitle = ({
  className,
  children,
  ...props
}: EnvironmentVariablesTitleProps) => (
  <h3
    className={css(
      {
        fontWeight: "medium",
        fontSize: "sm",
      },
      className,
    )}
    {...props}
  >
    {children ?? "Environment Variables"}
  </h3>
);

export type EnvironmentVariablesToggleProps = ComponentProps<typeof Switch>;

export const EnvironmentVariablesToggle = ({
  className,
  ...props
}: EnvironmentVariablesToggleProps) => {
  const { showValues, setShowValues } = useContext(EnvironmentVariablesContext);

  return (
    <div
      className={css(
        {
          display: "flex",
          alignItems: "center",
          gap: "2",
        },
        className,
      )}
    >
      <span
        className={css({
          color: "fg.muted",
          fontSize: "xs",
        })}
      >
        {showValues ? (
          <EyeIcon style={{ width: 14, height: 14 }} />
        ) : (
          <EyeOffIcon style={{ width: 14, height: 14 }} />
        )}
      </span>
      <Switch.Root
        aria-label="Toggle value visibility"
        checked={showValues}
        onCheckedChange={(details) => setShowValues(details.checked)}
        {...props}
      />
    </div>
  );
};

export type EnvironmentVariablesContentProps = HTMLAttributes<HTMLDivElement>;

export const EnvironmentVariablesContent = ({
  className,
  children,
  ...props
}: EnvironmentVariablesContentProps) => (
  <div
    className={css(
      {
        display: "flex",
        flexDirection: "column",
      },
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

interface EnvironmentVariableContextType {
  name: string;
  value: string;
}

const EnvironmentVariableContext =
  createContext<EnvironmentVariableContextType>({
    name: "",
    value: "",
  });

export type EnvironmentVariableGroupProps = HTMLAttributes<HTMLDivElement>;

export const EnvironmentVariableGroup = ({
  className,
  children,
  ...props
}: EnvironmentVariableGroupProps) => (
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

export type EnvironmentVariableNameProps = HTMLAttributes<HTMLSpanElement>;

export const EnvironmentVariableName = ({
  className,
  children,
  ...props
}: EnvironmentVariableNameProps) => {
  const { name } = useContext(EnvironmentVariableContext);

  return (
    <span
      className={css(
        {
          fontFamily: "mono",
          fontSize: "sm",
        },
        className,
      )}
      {...props}
    >
      {children ?? name}
    </span>
  );
};

export type EnvironmentVariableValueProps = HTMLAttributes<HTMLSpanElement>;

export const EnvironmentVariableValue = ({
  className,
  children,
  ...props
}: EnvironmentVariableValueProps) => {
  const { value } = useContext(EnvironmentVariableContext);
  const { showValues } = useContext(EnvironmentVariablesContext);

  const displayValue = showValues
    ? value
    : "•".repeat(Math.min(value.length, 20));

  return (
    <span
      className={css(
        {
          fontFamily: "mono",
          color: "fg.muted",
          fontSize: "sm",
        },
        !showValues && {
          userSelect: "none",
        },
        className,
      )}
      {...props}
    >
      {children ?? displayValue}
    </span>
  );
};

export type EnvironmentVariableProps = HTMLAttributes<HTMLDivElement> & {
  name: string;
  value: string;
};

export const EnvironmentVariable = ({
  name,
  value,
  className,
  children,
  ...props
}: EnvironmentVariableProps) => {
  const envVarContextValue = useMemo(() => ({ name, value }), [name, value]);

  return (
    <EnvironmentVariableContext.Provider value={envVarContextValue}>
      <div
        className={css(
          {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "4",
            paddingX: "4",
            paddingY: "3",
          },
          className,
        )}
        {...props}
      >
        {children ?? (
          <>
            <div
              className={css({
                display: "flex",
                alignItems: "center",
                gap: "2",
              })}
            >
              <EnvironmentVariableName />
            </div>
            <EnvironmentVariableValue />
          </>
        )}
      </div>
    </EnvironmentVariableContext.Provider>
  );
};

export type EnvironmentVariableCopyButtonProps = ComponentProps<
  typeof Button
> & {
  onCopy?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
  copyFormat?: "name" | "value" | "export";
};

export const EnvironmentVariableCopyButton = ({
  onCopy,
  onError,
  timeout = 2000,
  copyFormat = "value",
  children,
  className,
  ...props
}: EnvironmentVariableCopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<number>(0);
  const { name, value } = useContext(EnvironmentVariableContext);

  const getTextToCopy = useCallback((): string => {
    const formatMap = {
      export: () => `export ${name}="${value}"`,
      name: () => name,
      value: () => value,
    };
    return formatMap[copyFormat]();
  }, [name, value, copyFormat]);

  const copyToClipboard = useCallback(async () => {
    if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
      onError?.(new Error("Clipboard API not available"));
      return;
    }

    try {
      await navigator.clipboard.writeText(getTextToCopy());
      setIsCopied(true);
      onCopy?.();
      timeoutRef.current = window.setTimeout(() => setIsCopied(false), timeout);
    } catch (error) {
      onError?.(error as Error);
    }
  }, [getTextToCopy, onCopy, onError, timeout]);

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
          width: "6",
          height: "6",
          flexShrink: "0",
        },
        className,
      )}
      onClick={copyToClipboard}
      size="sm"
      variant="plain"
      {...props}
    >
      {children ?? <Icon style={{ width: 12, height: 12 }} />}
    </Button>
  );
};

export type EnvironmentVariableRequiredProps = ComponentProps<typeof Badge>;

export const EnvironmentVariableRequired = ({
  className,
  children,
  ...props
}: EnvironmentVariableRequiredProps) => (
  <Badge
    className={css(
      {
        fontSize: "xs",
      },
      className,
    )}
    variant="subtle"
    {...props}
  >
    {children ?? "Required"}
  </Badge>
);
