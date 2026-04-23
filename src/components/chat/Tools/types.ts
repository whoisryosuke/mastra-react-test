import { type ToolUIPart } from "ai";

export const TOOL_TYPES = {
  getChordTool: "Get Chord",
} as const;

export type ToolTypes = keyof typeof TOOL_TYPES;

export type ToolItemProps = {
  id: string;
  index: number;
  content: ToolUIPart;
  className?: string;
};
