import { css } from "styled-system/css";
import { Panel as PanelPrimitive } from "@xyflow/react";
import type { ComponentProps } from "react";

type PanelProps = ComponentProps<typeof PanelPrimitive>;

export const Panel = ({ className, ...props }: PanelProps) => (
  <PanelPrimitive
    className={css(
      {
        margin: "4",
        overflow: "hidden",
        borderRadius: "md",
        borderWidth: "1px",
        backgroundColor: "card",
        padding: "1",
      },
      className,
    )}
    {...props}
  />
);
