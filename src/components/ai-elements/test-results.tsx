"use client";

import { Badge } from "@/components/ui/badge";
import * as Collapsible from "@/components/ui/collapsible";
import { css } from "styled-system/css";
import {
  CheckCircle2Icon,
  ChevronRightIcon,
  CircleDotIcon,
  CircleIcon,
  XCircleIcon,
} from "lucide-react";
import type { ComponentProps, HTMLAttributes } from "react";
import { createContext, useContext, useMemo } from "react";

type TestStatus = "passed" | "failed" | "skipped" | "running";

interface TestResultsSummary {
  passed: number;
  failed: number;
  skipped: number;
  total: number;
  duration?: number;
}

interface TestResultsContextType {
  summary?: TestResultsSummary;
}

const TestResultsContext = createContext<TestResultsContextType>({});

const formatDuration = (ms: number) => {
  if (ms < 1000) {
    return `${ms}ms`;
  }
  return `${(ms / 1000).toFixed(2)}s`;
};

export type TestResultsHeaderProps = HTMLAttributes<HTMLDivElement>;

export const TestResultsHeader = ({
  className,
  children,
  ...props
}: TestResultsHeaderProps) => (
  <div
    className={css(
      {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: "1px",
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

export type TestResultsDurationProps = HTMLAttributes<HTMLSpanElement>;

export const TestResultsDuration = ({
  className,
  children,
  ...props
}: TestResultsDurationProps) => {
  const { summary } = useContext(TestResultsContext);

  if (!summary?.duration) {
    return null;
  }

  return (
    <span
      className={css({ color: "muted.foreground", fontSize: "sm" }, className)}
      {...props}
    >
      {children ?? formatDuration(summary.duration)}
    </span>
  );
};

export type TestResultsSummaryProps = HTMLAttributes<HTMLDivElement>;

const passedBadgeStyle = css({
  gap: "1",
  backgroundColor: "green.100",
  color: "green.700",
  _dark: {
    backgroundColor: "green.900 / 0.3",
    color: "green.400",
  },
});

const failedBadgeStyle = css({
  gap: "1",
  backgroundColor: "red.100",
  color: "red.700",
  _dark: {
    backgroundColor: "red.900 / 0.3",
    color: "red.400",
  },
});

const skippedBadgeStyle = css({
  gap: "1",
  backgroundColor: "yellow.100",
  color: "yellow.700",
  _dark: {
    backgroundColor: "yellow.900 / 0.3",
    color: "yellow.400",
  },
});

export const TestResultsSummary = ({
  className,
  children,
  ...props
}: TestResultsSummaryProps) => {
  const { summary } = useContext(TestResultsContext);

  if (!summary) {
    return null;
  }

  return (
    <div
      className={css(
        { display: "flex", alignItems: "center", gap: "3" },
        className,
      )}
      {...props}
    >
      {children ?? (
        <>
          <Badge className={passedBadgeStyle}>
            <CheckCircle2Icon className={css({ width: "3", height: "3" })} />
            {summary.passed} passed
          </Badge>
          {summary.failed > 0 && (
            <Badge className={failedBadgeStyle}>
              <XCircleIcon className={css({ width: "3", height: "3" })} />
              {summary.failed} failed
            </Badge>
          )}
          {summary.skipped > 0 && (
            <Badge className={skippedBadgeStyle}>
              <CircleIcon className={css({ width: "3", height: "3" })} />
              {summary.skipped} skipped
            </Badge>
          )}
        </>
      )}
    </div>
  );
};

export type TestResultsProps = HTMLAttributes<HTMLDivElement> & {
  summary?: TestResultsSummary;
};

export const TestResults = ({
  summary,
  className,
  children,
  ...props
}: TestResultsProps) => {
  const contextValue = useMemo(() => ({ summary }), [summary]);

  return (
    <TestResultsContext.Provider value={contextValue}>
      <div
        className={css(
          {
            borderRadius: "lg",
            borderWidth: "1px",
            backgroundColor: "background",
          },
          className,
        )}
        {...props}
      >
        {children ??
          (summary && (
            <TestResultsHeader>
              <TestResultsSummary />
              <TestResultsDuration />
            </TestResultsHeader>
          ))}
      </div>
    </TestResultsContext.Provider>
  );
};

export type TestResultsProgressProps = HTMLAttributes<HTMLDivElement>;

export const TestResultsProgress = ({
  className,
  children,
  ...props
}: TestResultsProgressProps) => {
  const { summary } = useContext(TestResultsContext);

  if (!summary) {
    return null;
  }

  const passedPercent = (summary.passed / summary.total) * 100;
  const failedPercent = (summary.failed / summary.total) * 100;

  return (
    <div
      className={css(
        { display: "flex", flexDirection: "column", gap: "2" },
        className,
      )}
      {...props}
    >
      {children ?? (
        <>
          <div
            className={css({
              display: "flex",
              height: "2",
              overflow: "hidden",
              borderRadius: "full",
              backgroundColor: "muted",
            })}
          >
            <div
              className={css({
                backgroundColor: "green.500",
                transition: "all",
              })}
              style={{ width: `${passedPercent}%` }}
            />
            <div
              className={css({ backgroundColor: "red.500", transition: "all" })}
              style={{ width: `${failedPercent}%` }}
            />
          </div>
          <div
            className={css({
              display: "flex",
              justifyContent: "space-between",
              color: "muted.foreground",
              fontSize: "xs",
            })}
          >
            <span>
              {summary.passed}/{summary.total} tests passed
            </span>
            <span>{passedPercent.toFixed(0)}%</span>
          </div>
        </>
      )}
    </div>
  );
};

export type TestResultsContentProps = HTMLAttributes<HTMLDivElement>;

export const TestResultsContent = ({
  className,
  children,
  ...props
}: TestResultsContentProps) => (
  <div
    className={css(
      { display: "flex", flexDirection: "column", gap: "2", padding: "4" },
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

interface TestSuiteContextType {
  name: string;
  status: TestStatus;
}

const TestSuiteContext = createContext<TestSuiteContextType>({
  name: "",
  status: "passed",
});

const statusStyles: Record<TestStatus, ReturnType<typeof css>> = {
  failed: css({ color: "red.600", _dark: { color: "red.400" } }),
  passed: css({ color: "green.600", _dark: { color: "green.400" } }),
  running: css({ color: "blue.600", _dark: { color: "blue.400" } }),
  skipped: css({ color: "yellow.600", _dark: { color: "yellow.400" } }),
};

const statusIcons: Record<TestStatus, React.ReactNode> = {
  failed: <XCircleIcon className={css({ width: "4", height: "4" })} />,
  passed: <CheckCircle2Icon className={css({ width: "4", height: "4" })} />,
  running: (
    <CircleDotIcon
      className={css({ width: "4", height: "4", animation: "pulse" })}
    />
  ),
  skipped: <CircleIcon className={css({ width: "4", height: "4" })} />,
};

const TestStatusIcon = ({ status }: { status: TestStatus }) => (
  <span className={css({ flexShrink: "0" }, statusStyles[status])}>
    {statusIcons[status]}
  </span>
);

export type TestSuiteProps = ComponentProps<typeof Collapsible.Root> & {
  name: string;
  status: TestStatus;
};

export const TestSuite = ({
  name,
  status,
  className,
  children,
  ...props
}: TestSuiteProps) => {
  const contextValue = useMemo(() => ({ name, status }), [name, status]);

  return (
    <TestSuiteContext.Provider value={contextValue}>
      <Collapsible.Root
        className={css({ borderRadius: "lg", borderWidth: "1px" }, className)}
        {...props}
      >
        {children}
      </Collapsible.Root>
    </TestSuiteContext.Provider>
  );
};

export type TestSuiteNameProps = ComponentProps<typeof Collapsible.Trigger>;

export const TestSuiteName = ({
  className,
  children,
  ...props
}: TestSuiteNameProps) => {
  const { name, status } = useContext(TestSuiteContext);

  return (
    <Collapsible.Trigger
      className={css(
        {
          display: "flex",
          width: "full",
          alignItems: "center",
          gap: "2",
          paddingX: "4",
          paddingY: "3",
          textAlign: "left",
          transitionProperty: "colors",
          transitionDuration: "200ms",
          _hover: {
            backgroundColor: "muted / 0.5",
          },
        },
        className,
      )}
      {...props}
    >
      <ChevronRightIcon
        className={css({
          width: "4",
          height: "4",
          flexShrink: "0",
          color: "muted.foreground",
          transitionProperty: "transform",
          transitionDuration: "200ms",
          _groupDataOpen: {
            transform: "rotate(90deg)",
          },
        })}
      />
      <TestStatusIcon status={status} />
      <span className={css({ fontWeight: "medium", fontSize: "sm" })}>
        {children ?? name}
      </span>
    </Collapsible.Trigger>
  );
};

export type TestSuiteStatsProps = HTMLAttributes<HTMLDivElement> & {
  passed?: number;
  failed?: number;
  skipped?: number;
};

export const TestSuiteStats = ({
  passed = 0,
  failed = 0,
  skipped = 0,
  className,
  children,
  ...props
}: TestSuiteStatsProps) => (
  <div
    className={css(
      {
        marginLeft: "auto",
        display: "flex",
        alignItems: "center",
        gap: "2",
        fontSize: "xs",
      },
      className,
    )}
    {...props}
  >
    {children ?? (
      <>
        {passed > 0 && (
          <span
            className={css({
              color: "green.600",
              _dark: { color: "green.400" },
            })}
          >
            {passed} passed
          </span>
        )}
        {failed > 0 && (
          <span
            className={css({ color: "red.600", _dark: { color: "red.400" } })}
          >
            {failed} failed
          </span>
        )}
        {skipped > 0 && (
          <span
            className={css({
              color: "yellow.600",
              _dark: { color: "yellow.400" },
            })}
          >
            {skipped} skipped
          </span>
        )}
      </>
    )}
  </div>
);

export type TestSuiteContentProps = ComponentProps<typeof Collapsible.Content>;

export const TestSuiteContent = ({
  className,
  children,
  ...props
}: TestSuiteContentProps) => (
  <Collapsible.Content
    className={css({ borderTopWidth: "1px" }, className)}
    {...props}
  >
    <div className={css({ borderBottomWidth: "1px" })}>{children}</div>
  </Collapsible.Content>
);

interface TestContextType {
  name: string;
  status: TestStatus;
  duration?: number;
}

const TestContext = createContext<TestContextType>({
  name: "",
  status: "passed",
});

export type TestNameProps = HTMLAttributes<HTMLSpanElement>;

export const TestName = ({ className, children, ...props }: TestNameProps) => {
  const { name } = useContext(TestContext);

  return (
    <span className={css({ flex: "1" }, className)} {...props}>
      {children ?? name}
    </span>
  );
};

export type TestDurationProps = HTMLAttributes<HTMLSpanElement>;

export const TestDuration = ({
  className,
  children,
  ...props
}: TestDurationProps) => {
  const { duration } = useContext(TestContext);

  if (duration === undefined) {
    return null;
  }

  return (
    <span
      className={css(
        { marginLeft: "auto", color: "muted.foreground", fontSize: "xs" },
        className,
      )}
      {...props}
    >
      {children ?? `${duration}ms`}
    </span>
  );
};

export type TestStatusProps = HTMLAttributes<HTMLSpanElement>;

export const TestStatus = ({
  className,
  children,
  ...props
}: TestStatusProps) => {
  const { status } = useContext(TestContext);

  return (
    <span
      className={css({ flexShrink: "0" }, statusStyles[status], className)}
      {...props}
    >
      {children ?? statusIcons[status]}
    </span>
  );
};

export type TestProps = HTMLAttributes<HTMLDivElement> & {
  name: string;
  status: TestStatus;
  duration?: number;
};

export const Test = ({
  name,
  status,
  duration,
  className,
  children,
  ...props
}: TestProps) => {
  const contextValue = useMemo(
    () => ({ duration, name, status }),
    [duration, name, status],
  );

  return (
    <TestContext.Provider value={contextValue}>
      <div
        className={css(
          {
            display: "flex",
            alignItems: "center",
            gap: "2",
            paddingX: "4",
            paddingY: "2",
            fontSize: "sm",
          },
          className,
        )}
        {...props}
      >
        {children ?? (
          <>
            <TestStatus />
            <TestName />
            {duration !== undefined && <TestDuration />}
          </>
        )}
      </div>
    </TestContext.Provider>
  );
};

export type TestErrorProps = HTMLAttributes<HTMLDivElement>;

export const TestError = ({
  className,
  children,
  ...props
}: TestErrorProps) => (
  <div
    className={css(
      {
        marginTop: "2",
        borderRadius: "md",
        padding: "3",
      },
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export type TestErrorMessageProps = HTMLAttributes<HTMLParagraphElement>;

export const TestErrorMessage = ({
  className,
  children,
  ...props
}: TestErrorMessageProps) => (
  <p
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
  </p>
);

export type TestErrorStackProps = HTMLAttributes<HTMLPreElement>;

export const TestErrorStack = ({
  className,
  children,
  ...props
}: TestErrorStackProps) => (
  <pre
    className={css(
      {
        marginTop: "2",
        overflow: "auto",
        fontFamily: "mono",
        fontSize: "xs",
      },
      className,
    )}
    {...props}
  >
    {children}
  </pre>
);
