"use client";

import * as Collapsible from "@/components/ui/collapsible";
import { css } from "styled-system/css";
import { BookIcon, ChevronDownIcon } from "lucide-react";
import type { ComponentProps } from "react";

export type SourcesProps = ComponentProps<"div">;

export const Sources = ({ className, ...props }: SourcesProps) => (
  <Collapsible.Root
    className={css(
      {
        marginBottom: "4",
        color: "primary",
        fontSize: "xs",
      },
      className,
    )}
    {...props}
  />
);

export type SourcesTriggerProps = ComponentProps<typeof Collapsible.Trigger> & {
  count: number;
};

export const SourcesTrigger = ({
  className,
  count,
  children,
  ...props
}: SourcesTriggerProps) => (
  <Collapsible.Trigger
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
    {children ?? (
      <>
        <p className={css({ fontWeight: "medium" })}>Used {count} sources</p>
        <ChevronDownIcon className={css({ width: "4", height: "4" })} />
      </>
    )}
  </Collapsible.Trigger>
);

export type SourcesContentProps = ComponentProps<typeof Collapsible.Content>;

export const SourcesContent = ({
  className,
  ...props
}: SourcesContentProps) => (
  <Collapsible.Content
    className={css(
      {
        marginTop: "3",
        display: "flex",
        width: "fit",
        flexDirection: "column",
        gap: "2",
      },
      className,
    )}
    {...props}
  />
);

export type SourceProps = ComponentProps<"a">;

export const Source = ({
  className,
  href,
  title,
  children,
  ...props
}: SourceProps) => (
  <a
    className={css(
      {
        display: "flex",
        alignItems: "center",
        gap: "2",
      },
      className,
    )}
    href={href}
    rel="noreferrer"
    target="_blank"
    {...props}
  >
    {children ?? (
      <>
        <BookIcon className={css({ width: "4", height: "4" })} />
        <span className={css({ display: "block", fontWeight: "medium" })}>
          {title}
        </span>
      </>
    )}
  </a>
);
