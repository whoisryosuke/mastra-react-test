import * as Card from "@/components/ui/card";
import { css } from "styled-system/css";
import { Handle, Position } from "@xyflow/react";
import type { ComponentProps } from "react";

export type NodeProps = ComponentProps<typeof Card.Root> & {
  handles: {
    target: boolean;
    source: boolean;
  };
};

export const Node = ({ handles, className, ...props }: NodeProps) => (
  <Card.Root
    className={css(
      {
        position: "relative",
        width: "full",
        height: "auto",
        minWidth: "20rem",
        display: "flex",
        flexDirection: "column",
        gap: "0",
        borderRadius: "l2",
        padding: "0",
      },
      className,
    )}
    {...props}
  >
    {handles.target && <Handle position={Position.Left} type="target" />}
    {handles.source && <Handle position={Position.Right} type="source" />}
    {props.children}
  </Card.Root>
);

export type NodeHeaderProps = ComponentProps<typeof Card.Header>;

export const NodeHeader = ({ className, ...props }: NodeHeaderProps) => (
  <Card.Header
    className={css(
      {
        display: "flex",
        flexDirection: "column",
        gap: "0.5",
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        borderBottomColor: "border",
        borderTopRadius: "l2",
        backgroundColor: "bg.subtle",
        padding: "3 !important",
      },
      className,
    )}
    {...props}
  />
);

export type NodeTitleProps = ComponentProps<typeof Card.Title>;

export const NodeTitle = (props: NodeTitleProps) => <Card.Title {...props} />;

export type NodeDescriptionProps = ComponentProps<typeof Card.Description>;

export const NodeDescription = (props: NodeDescriptionProps) => (
  <Card.Description {...props} />
);

export type NodeActionProps = ComponentProps<typeof Card.Action>;

export const NodeAction = (props: NodeActionProps) => (
  <Card.Action {...props} />
);

export type NodeContentProps = ComponentProps<typeof Card.Content>;

export const NodeContent = ({ className, ...props }: NodeContentProps) => (
  <Card.Content
    className={css(
      {
        padding: "3",
      },
      className,
    )}
    {...props}
  />
);

export type NodeFooterProps = ComponentProps<typeof Card.Footer>;

export const NodeFooter = ({ className, ...props }: NodeFooterProps) => (
  <Card.Footer
    className={css(
      {
        borderTopWidth: "1px",
        borderTopStyle: "solid",
        borderTopColor: "border",
        borderBottomRadius: "l2",
        backgroundColor: "bg.subtle",
        padding: "3 !important",
      },
      className,
    )}
    {...props}
  />
);
