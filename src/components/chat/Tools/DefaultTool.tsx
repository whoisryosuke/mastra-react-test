import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from "@/components/ai-elements/tool";
import React from "react";
import { css, cx } from "styled-system/css";
import type { ToolItemProps } from "./types";

const toolHeaderStyles = css({
  cursor: "pointer",
});

type Props = ToolItemProps;

const DefaultTool = ({ id, index, content, className }: Props) => {
  return (
    <Tool key={`${id}-${index}`}>
      <ToolHeader
        type={content.type}
        state={content.state || "output-available"}
        className={cx(toolHeaderStyles, className)}
      />
      <ToolContent>
        <ToolInput input={content.input || {}} />
        <ToolOutput output={content.output} errorText={content.errorText} />
      </ToolContent>
    </Tool>
  );
};

export default DefaultTool;
