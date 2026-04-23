import React from "react";
import type { ToolItemProps, ToolTypes } from "./types";
import DefaultTool from "./DefaultTool";
import ChordTool from "./ChordTool";
import MusicGenerationTool from "./MusicGenerationTool";

type Props = ToolItemProps & {};

const ToolView = ({ content, ...props }: Props) => {
  const toolName = content.type.replace("tool-", "") as ToolTypes;

  if (content.state != "output-available") {
    return <></>;
  }

  switch (toolName) {
    case "getChordTool":
      return <ChordTool content={content} {...props} />;
    case "musicGenerationTool":
      return <MusicGenerationTool content={content} {...props} />;

    default:
      return <DefaultTool content={content} {...props} />;
  }
};

export default ToolView;
