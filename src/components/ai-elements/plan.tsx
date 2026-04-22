"use client";

import { Button } from "@/components/ui/button";
import {
  Root as Card,
  Header as CardHeader,
  Body as CardContent,
  Footer as CardFooter,
  Title as CardTitle,
  Description as CardDescription,
} from "@/components/ui/card";
import * as Collapsible from "@/components/ui/collapsible";
import { css } from "styled-system/css";
import { ChevronsUpDownIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { createContext, useContext, useMemo } from "react";

import { Shimmer } from "./shimmer";

interface PlanContextValue {
  isStreaming: boolean;
}

const PlanContext = createContext<PlanContextValue | null>(null);

const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("Plan components must be used within Plan");
  }
  return context;
};

export type PlanProps = ComponentProps<typeof Collapsible.Root> & {
  isStreaming?: boolean;
};

export const Plan = ({
  className,
  isStreaming = false,
  children,
  ...props
}: PlanProps) => {
  const contextValue = useMemo(() => ({ isStreaming }), [isStreaming]);

  return (
    <PlanContext.Provider value={contextValue}>
      <Collapsible.Root asChild data-slot="plan" {...props}>
        <Card
          className={css(
            {
              boxShadow: "none",
            },
            className,
          )}
        >
          {children}
        </Card>
      </Collapsible.Root>
    </PlanContext.Provider>
  );
};

export type PlanHeaderProps = ComponentProps<typeof CardHeader>;

export const PlanHeader = ({ className, ...props }: PlanHeaderProps) => (
  <CardHeader
    className={css(
      {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
      },
      className,
    )}
    data-slot="plan-header"
    {...props}
  />
);

export type PlanTitleProps = Omit<
  ComponentProps<typeof CardTitle>,
  "children"
> & {
  children: string;
};

export const PlanTitle = ({ children, ...props }: PlanTitleProps) => {
  const { isStreaming } = usePlan();

  return (
    <CardTitle data-slot="plan-title" {...props}>
      {isStreaming ? <Shimmer>{children}</Shimmer> : children}
    </CardTitle>
  );
};

export type PlanDescriptionProps = Omit<
  ComponentProps<typeof CardDescription>,
  "children"
> & {
  children: string;
};

export const PlanDescription = ({
  className,
  children,
  ...props
}: PlanDescriptionProps) => {
  const { isStreaming } = usePlan();

  return (
    <CardDescription
      className={css(
        {
          textWrap: "balance",
        },
        className,
      )}
      data-slot="plan-description"
      {...props}
    >
      {isStreaming ? <Shimmer>{children}</Shimmer> : children}
    </CardDescription>
  );
};

export type PlanActionProps = ComponentProps<"div">;

export const PlanAction = (props: PlanActionProps) => (
  <div data-slot="plan-action" {...props} />
);

export type PlanContentProps = ComponentProps<typeof CardContent>;

export const PlanContent = (props: PlanContentProps) => (
  <Collapsible.Content asChild>
    <CardContent data-slot="plan-content" {...props} />
  </Collapsible.Content>
);

export type PlanFooterProps = ComponentProps<"div">;

export const PlanFooter = (props: PlanFooterProps) => (
  <CardFooter data-slot="plan-footer" {...props} />
);

export type PlanTriggerProps = ComponentProps<typeof Collapsible.Trigger>;

export const PlanTrigger = ({ className, ...props }: PlanTriggerProps) => (
  <Collapsible.Trigger asChild>
    <Button
      className={css(
        {
          width: "8",
          height: "8",
        },
        className,
      )}
      data-slot="plan-trigger"
      size="sm"
      variant="plain"
      {...props}
    >
      <ChevronsUpDownIcon className={css({ width: "4", height: "4" })} />
      <span className={css({ display: "none" })}>Toggle plan</span>
    </Button>
  </Collapsible.Trigger>
);
