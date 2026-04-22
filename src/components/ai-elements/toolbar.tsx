import { css } from "styled-system/css";
import { NodeToolbar, Position } from "@xyflow/react";
import type { ComponentProps } from "react";

type ToolbarProps = ComponentProps<typeof NodeToolbar>;

export const Toolbar = ({ className, ...props }: ToolbarProps) => (
  <NodeToolbar
    className={css(
      {
        display: "flex",
        alignItems: "center",
        gap: "1",
        borderRadius: "sm",
        borderWidth: "1px",
        backgroundColor: "background",
        padding: "1.5",
      },
      className,
    )}
    position={Position.Bottom}
    {...props}
  />
);
