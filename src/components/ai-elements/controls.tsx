"use client";

import { css } from "styled-system/css";
import { Controls as ControlsPrimitive } from "@xyflow/react";
import type { ComponentProps } from "react";

export type ControlsProps = ComponentProps<typeof ControlsPrimitive>;

export const Controls = ({ className, ...props }: ControlsProps) => (
  <ControlsPrimitive
    className={css(
      {
        display: "flex",
        gap: "1px",
        overflow: "hidden",
        borderRadius: "l2",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "border",
        backgroundColor: "bg.default",
        padding: "1",
        boxShadow: "none !important",
      },
      {
        "&>button": {
          borderRadius: "l2",
          borderWidth: "0 !important",
          backgroundColor: "transparent !important",
          _hover: {
            backgroundColor: "bg.subtle !important",
          },
        },
      },
      className,
    )}
    {...props}
  />
);
