import * as Command from "@/components/ui/command";
import * as Dialog from "@/components/ui/dialog";
import { css } from "styled-system/css";
import type { ComponentProps, ReactNode } from "react";

export type ModelSelectorProps = ComponentProps<typeof Dialog.Root>;

export const ModelSelector = (props: ModelSelectorProps) => (
  <Dialog.Root {...props} />
);

export type ModelSelectorTriggerProps = ComponentProps<typeof Dialog.Trigger>;

export const ModelSelectorTrigger = (props: ModelSelectorTriggerProps) => (
  <Dialog.Trigger {...props} />
);

export type ModelSelectorContentProps = ComponentProps<
  typeof Dialog.Content
> & {
  title?: ReactNode;
};

export const ModelSelectorContent = ({
  className,
  children,
  title = "Model Selector",
  ...props
}: ModelSelectorContentProps) => (
  <Dialog.Content
    aria-describedby={undefined}
    className={css(
      {
        outline: "none",
        borderWidth: "0",
        outlineWidth: "1px",
        outlineStyle: "solid",
        outlineColor: "border",
        padding: "0",
      },
      className,
    )}
    {...props}
  >
    <Dialog.Title>{title}</Dialog.Title>
    {children}
  </Dialog.Content>
);

export type ModelSelectorSearchProps = ComponentProps<typeof Command.Input>;

export const ModelSelectorSearch = ({
  className,
  ...props
}: ModelSelectorSearchProps) => (
  <Command.Input
    className={css(
      {
        height: "auto",
        paddingY: "3.5",
      },
      className,
    )}
    {...props}
  />
);

export type ModelSelectorListProps = ComponentProps<typeof Command.List>;

export const ModelSelectorList = ({
  className,
  ...props
}: ModelSelectorListProps) => <Command.List className={className} {...props} />;

export type ModelSelectorEmptyProps = ComponentProps<typeof Command.Empty>;

export const ModelSelectorEmpty = (props: ModelSelectorEmptyProps) => (
  <Command.Empty {...props} />
);

export type ModelSelectorGroupProps = ComponentProps<typeof Command.Group>;

export const ModelSelectorGroup = ({
  className,
  ...props
}: ModelSelectorGroupProps) => (
  <Command.Group className={className} {...props} />
);

export type ModelSelectorLabelProps = ComponentProps<"div">;

export const ModelSelectorLabel = ({
  className,
  ...props
}: ModelSelectorLabelProps) => (
  <div
    className={css(
      {
        paddingX: "2",
        paddingY: "1.5",
        fontSize: "xs",
        color: "fg.muted",
      },
      className,
    )}
    {...props}
  />
);

export type ModelSelectorItemProps = ComponentProps<typeof Command.Item>;

export const ModelSelectorItem = ({
  className,
  ...props
}: ModelSelectorItemProps) => (
  <Command.Item
    className={css(
      {
        display: "flex",
        alignItems: "center",
        gap: "2",
        cursor: "pointer",
        borderRadius: "l2",
        paddingX: "2",
        paddingY: "1.5",
        fontSize: "sm",
        _selected: {
          backgroundColor: "bg.subtle",
        },
      },
      className,
    )}
    {...props}
  />
);

export const ModelSelectorItemIcon = ({
  className,
  ...props
}: ComponentProps<"span">) => (
  <span
    className={css(
      {
        width: "3",
        height: "3",
        _dark: {
          invert: "1",
        },
      },
      className,
    )}
    {...props}
  />
);

export type ModelSelectorItemTextProps = ComponentProps<"span">;

export const ModelSelectorItemText = ({
  className,
  ...props
}: ModelSelectorItemTextProps) => (
  <span
    className={css(
      {
        flex: "1",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        textAlign: "left",
      },
      className,
    )}
    {...props}
  />
);

export type ModelSelectorSeparatorProps = ComponentProps<
  typeof Command.Separator
>;

export const ModelSelectorSeparator = (props: ModelSelectorSeparatorProps) => (
  <Command.Separator {...props} />
);

export type ModelSelectorShortcutProps = ComponentProps<"span">;

export const ModelSelectorShortcut = ({
  className,
  ...props
}: ModelSelectorShortcutProps) => (
  <span
    className={css(
      {
        marginLeft: "auto",
        fontSize: "xs",
        color: "fg.muted",
      },
      className,
    )}
    {...props}
  />
);

export const ModelSelectorLoading = () => (
  <div
    className={css({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "4",
    })}
  >
    Loading...
  </div>
);
