"use client";

import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { Button } from "@/components/ui/button";
import * as Command from "@/components/ui/command";
import * as Dialog from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { css } from "styled-system/css";
import {
  CircleSmallIcon,
  MarsIcon,
  MarsStrokeIcon,
  NonBinaryIcon,
  PauseIcon,
  PlayIcon,
  TransgenderIcon,
  VenusAndMarsIcon,
  VenusIcon,
} from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { createContext, useCallback, useContext, useMemo } from "react";

interface VoiceSelectorContextValue {
  value: string | undefined;
  setValue: (value: string | undefined) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const VoiceSelectorContext = createContext<VoiceSelectorContextValue | null>(
  null,
);

export const useVoiceSelector = () => {
  const context = useContext(VoiceSelectorContext);
  if (!context) {
    throw new Error(
      "VoiceSelector components must be used within VoiceSelector",
    );
  }
  return context;
};

export type VoiceSelectorProps = ComponentProps<typeof Dialog.Root> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string | undefined) => void;
};

export const VoiceSelector = ({
  value: valueProp,
  defaultValue,
  onValueChange,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  children,
  ...props
}: VoiceSelectorProps) => {
  const [value, setValue] = useControllableState({
    defaultProp: defaultValue,
    onChange: onValueChange,
    prop: valueProp,
  });

  const [open, setOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });

  const voiceSelectorContext = useMemo(
    () => ({ open, setOpen, setValue, value }),
    [value, setValue, open, setOpen],
  );

  return (
    <VoiceSelectorContext.Provider value={voiceSelectorContext}>
      <Dialog.Root onOpenChange={setOpen} open={open} {...props}>
        {children}
      </Dialog.Root>
    </VoiceSelectorContext.Provider>
  );
};

export type VoiceSelectorTriggerProps = ComponentProps<typeof Dialog.Trigger>;

export const VoiceSelectorTrigger = (props: VoiceSelectorTriggerProps) => (
  <Dialog.Trigger {...props} />
);

export type VoiceSelectorContentProps = ComponentProps<
  typeof Dialog.Content
> & {
  title?: ReactNode;
};

export const VoiceSelectorContent = ({
  className,
  children,
  title = "Voice Selector",
  ...props
}: VoiceSelectorContentProps) => (
  <Dialog.Content
    aria-describedby={undefined}
    className={css({ padding: "0" }, className)}
    {...props}
  >
    <Dialog.Title className={css({ display: "none" })}>{title}</Dialog.Title>
    <Command.Root className="**:data-[slot=command-input-wrapper]:h-auto">
      {children}
    </Command.Root>
  </Dialog.Content>
);

export type VoiceSelectorDialogProps = ComponentProps<typeof Command.Dialog>;

export const VoiceSelectorDialog = (props: VoiceSelectorDialogProps) => (
  <Command.Dialog {...props} />
);

export type VoiceSelectorInputProps = ComponentProps<typeof Command.Input>;

export const VoiceSelectorInput = ({
  className,
  ...props
}: VoiceSelectorInputProps) => (
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

export type VoiceSelectorListProps = ComponentProps<typeof Command.List>;

export const VoiceSelectorList = (props: VoiceSelectorListProps) => (
  <Command.List {...props} />
);

export type VoiceSelectorEmptyProps = ComponentProps<typeof Command.Empty>;

export const VoiceSelectorEmpty = (props: VoiceSelectorEmptyProps) => (
  <Command.Empty {...props} />
);

export type VoiceSelectorGroupProps = ComponentProps<typeof Command.Group>;

export const VoiceSelectorGroup = (props: VoiceSelectorGroupProps) => (
  <Command.Group {...props} />
);

export type VoiceSelectorItemProps = ComponentProps<typeof Command.Item>;

export const VoiceSelectorItem = ({
  className,
  ...props
}: VoiceSelectorItemProps) => (
  <Command.Item
    className={css({ paddingX: "4", paddingY: "2" }, className)}
    {...props}
  />
);

export type VoiceSelectorShortcutProps = ComponentProps<
  typeof Command.Shortcut
>;

export const VoiceSelectorShortcut = (props: VoiceSelectorShortcutProps) => (
  <Command.Shortcut {...props} />
);

export type VoiceSelectorSeparatorProps = ComponentProps<
  typeof Command.Separator
>;

export const VoiceSelectorSeparator = (props: VoiceSelectorSeparatorProps) => (
  <Command.Separator {...props} />
);

export type VoiceSelectorGenderProps = ComponentProps<"span"> & {
  value?:
    | "male"
    | "female"
    | "transgender"
    | "androgyne"
    | "non-binary"
    | "intersex";
};

export const VoiceSelectorGender = ({
  className,
  value,
  children,
  ...props
}: VoiceSelectorGenderProps) => {
  let icon: ReactNode | null = null;

  switch (value) {
    case "male": {
      icon = <MarsIcon className={css({ width: "4", height: "4" })} />;
      break;
    }
    case "female": {
      icon = <VenusIcon className={css({ width: "4", height: "4" })} />;
      break;
    }
    case "transgender": {
      icon = <TransgenderIcon className={css({ width: "4", height: "4" })} />;
      break;
    }
    case "androgyne": {
      icon = <MarsStrokeIcon className={css({ width: "4", height: "4" })} />;
      break;
    }
    case "non-binary": {
      icon = <NonBinaryIcon className={css({ width: "4", height: "4" })} />;
      break;
    }
    case "intersex": {
      icon = <VenusAndMarsIcon className={css({ width: "4", height: "4" })} />;
      break;
    }
    default: {
      icon = <CircleSmallIcon className={css({ width: "4", height: "4" })} />;
    }
  }

  return (
    <span
      className={css({ color: "muted.foreground", fontSize: "xs" }, className)}
      {...props}
    >
      {children ?? icon}
    </span>
  );
};

export type VoiceSelectorAccentProps = ComponentProps<"span"> & {
  value?: string;
};

export const VoiceSelectorAccent = ({
  className,
  value,
  children,
  ...props
}: VoiceSelectorAccentProps) => {
  let emoji: string | null = null;

  switch (value) {
    case "american":
      emoji = "🇺🇸";
      break;
    case "british":
      emoji = "🇬🇧";
      break;
    case "australian":
      emoji = "🇦🇺";
      break;
    case "canadian":
      emoji = "🇨🇦";
      break;
    case "irish":
      emoji = "🇮🇪";
      break;
    case "scottish":
      emoji = "🏴󠁧󠁢󠁳󠁣󠁴󠁿";
      break;
    case "indian":
      emoji = "🇮🇳";
      break;
    case "south-african":
      emoji = "🇿🇦";
      break;
    case "new-zealand":
      emoji = "🇳🇿";
      break;
    case "spanish":
      emoji = "🇪🇸";
      break;
    case "french":
      emoji = "🇫🇷";
      break;
    case "german":
      emoji = "🇩🇪";
      break;
    case "italian":
      emoji = "🇮🇹";
      break;
    case "portuguese":
      emoji = "��🇹";
      break;
    case "brazilian":
      emoji = "🇧🇷";
      break;
    case "mexican":
      emoji = "🇲🇽";
      break;
    case "argentinian":
      emoji = "🇦🇷";
      break;
    case "japanese":
      emoji = "🇯🇵";
      break;
    case "chinese":
      emoji = "🇨🇳";
      break;
    case "korean":
      emoji = "🇰🇷";
      break;
    case "russian":
      emoji = "🇷🇺";
      break;
    case "arabic":
      emoji = "🇸🇦";
      break;
    case "dutch":
      emoji = "🇳🇱";
      break;
    case "swedish":
      emoji = "🇸🇪";
      break;
    case "norwegian":
      emoji = "🇳🇴";
      break;
    case "danish":
      emoji = "🇩🇰";
      break;
    case "finnish":
      emoji = "🇫🇮";
      break;
    case "polish":
      emoji = "🇵🇱";
      break;
    case "turkish":
      emoji = "🇹🇷";
      break;
    case "greek":
      emoji = "🇬🇷";
      break;
    default:
      emoji = null;
  }

  return (
    <span
      className={css({ color: "muted.foreground", fontSize: "xs" }, className)}
      {...props}
    >
      {children ?? emoji}
    </span>
  );
};

export type VoiceSelectorAgeProps = ComponentProps<"span">;

export const VoiceSelectorAge = ({
  className,
  ...props
}: VoiceSelectorAgeProps) => (
  <span
    className={css(
      {
        color: "muted.foreground",
        fontSize: "xs",
        fontVariantNumeric: "tabular-nums",
      },
      className,
    )}
    {...props}
  />
);

export type VoiceSelectorNameProps = ComponentProps<"span">;

export const VoiceSelectorName = ({
  className,
  ...props
}: VoiceSelectorNameProps) => (
  <span
    className={css(
      {
        flex: "1",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        textAlign: "left",
        fontWeight: "medium",
      },
      className,
    )}
    {...props}
  />
);

export type VoiceSelectorDescriptionProps = ComponentProps<"span">;

export const VoiceSelectorDescription = ({
  className,
  ...props
}: VoiceSelectorDescriptionProps) => (
  <span
    className={css({ color: "muted.foreground", fontSize: "xs" }, className)}
    {...props}
  />
);

export type VoiceSelectorAttributesProps = ComponentProps<"div">;

export const VoiceSelectorAttributes = ({
  className,
  children,
  ...props
}: VoiceSelectorAttributesProps) => (
  <div
    className={css(
      { display: "flex", alignItems: "center", fontSize: "xs" },
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export type VoiceSelectorBulletProps = ComponentProps<"span">;

export const VoiceSelectorBullet = ({
  className,
  ...props
}: VoiceSelectorBulletProps) => (
  <span
    aria-hidden="true"
    className={css({ userSelect: "none", color: "border" }, className)}
    {...props}
  >
    &bull;
  </span>
);

export type VoiceSelectorPreviewProps = Omit<
  ComponentProps<"button">,
  "children"
> & {
  playing?: boolean;
  loading?: boolean;
  onPlay?: () => void;
};

export const VoiceSelectorPreview = ({
  className,
  playing,
  loading,
  onPlay,
  onClick,
  ...props
}: VoiceSelectorPreviewProps) => {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onClick?.(event);
      onPlay?.();
    },
    [onClick, onPlay],
  );

  let icon = <PlayIcon className={css({ width: "3", height: "3" })} />;

  if (loading) {
    icon = <Spinner className={css({ width: "3", height: "3" })} />;
  } else if (playing) {
    icon = <PauseIcon className={css({ width: "3", height: "3" })} />;
  }

  return (
    <Button
      aria-label={playing ? "Pause preview" : "Play preview"}
      className={css({ width: "6", height: "6" }, className)}
      disabled={loading}
      onClick={handleClick}
      size="xs"
      type="button"
      variant="outline"
      {...props}
    >
      {icon}
    </Button>
  );
};
