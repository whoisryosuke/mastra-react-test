"use client";

import { Badge } from "@/components/ui/badge";
import * as Carousel from "@/components/ui/carousel";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { css } from "styled-system/css";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import type { ComponentProps } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type InlineCitationProps = ComponentProps<"span">;

export const InlineCitation = ({
  className,
  ...props
}: InlineCitationProps) => (
  <span
    className={css(
      {
        display: "inline-flex",
        alignItems: "center",
        gap: "1",
      },
      className,
    )}
    {...props}
  />
);

export type InlineCitationTextProps = ComponentProps<"span">;

export const InlineCitationText = ({
  className,
  ...props
}: InlineCitationTextProps) => (
  <span
    className={css(
      {
        transition: "colors",
        _groupHover: {
          backgroundColor: "bg.subtle",
        },
      },
      className,
    )}
    {...props}
  />
);

export type InlineCitationCardProps = ComponentProps<typeof HoverCard>;

export const InlineCitationCard = (props: InlineCitationCardProps) => (
  <HoverCard closeDelay={0} openDelay={0} {...props} />
);

export type InlineCitationCardTriggerProps = ComponentProps<typeof Badge> & {
  sources: string[];
};

export const InlineCitationCardTrigger = ({
  sources,
  className,
  ...props
}: InlineCitationCardTriggerProps) => (
  <HoverCardTrigger asChild>
    <Badge
      className={css(
        {
          marginLeft: "1",
          borderRadius: "full",
        },
        className,
      )}
      variant="subtle"
      {...props}
    >
      {sources[0] ? (
        <>
          {new URL(sources[0]).hostname}{" "}
          {sources.length > 1 && `+${sources.length - 1}`}
        </>
      ) : (
        "unknown"
      )}
    </Badge>
  </HoverCardTrigger>
);

export type InlineCitationCardContentProps = ComponentProps<
  typeof HoverCardContent
>;

export const InlineCitationCardContent = ({
  align = "start",
  className,
  ...props
}: InlineCitationCardContentProps) => (
  <HoverCardContent
    className={css(
      {
        width: "18rem",
      },
      className,
    )}
    align={align}
    {...props}
  />
);

export type InlineCitationListProps = ComponentProps<"div">;

export const InlineCitationList = ({
  className,
  ...props
}: InlineCitationListProps) => (
  <div
    className={css(
      {
        display: "flex",
        flexDirection: "column",
      },
      className,
    )}
    {...props}
  />
);

export type InlineCitationItemProps = ComponentProps<"a">;

export const InlineCitationItem = ({
  className,
  ...props
}: InlineCitationItemProps) => (
  <a
    className={css(
      {
        display: "block",
        padding: "2",
        borderRadius: "l2",
        _hover: {
          backgroundColor: "bg.subtle",
        },
      },
      className,
    )}
    {...props}
  />
);

export type InlineCitationItemTitleProps = ComponentProps<"p">;

export const InlineCitationItemTitle = ({
  className,
  ...props
}: InlineCitationItemTitleProps) => (
  <p
    className={css(
      {
        fontWeight: "medium",
        fontSize: "sm",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
      className,
    )}
    {...props}
  />
);

export type InlineCitationItemUrlProps = ComponentProps<"p">;

export const InlineCitationItemUrl = ({
  className,
  ...props
}: InlineCitationItemUrlProps) => (
  <p
    className={css(
      {
        fontSize: "xs",
        color: "fg.muted",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
      className,
    )}
    {...props}
  />
);

interface SourcesCarouselContextType {
  api?: Carousel.CarouselApi;
  orientation?: "horizontal" | "vertical";
}

const SourcesCarouselContext = createContext<SourcesCarouselContextType>({});

export type SourcesCarouselProps = ComponentProps<typeof Carousel.Root>;

export const SourcesCarousel = ({
  className,
  ...props
}: SourcesCarouselProps) => {
  const [api, setApi] = useState<Carousel.CarouselApi>();
  const [selected, setSelected] = useState(0);

  const contextValue = useCallback(
    () => ({ api, orientation: "horizontal" }),
    [api],
  );

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = (details: Carousel.CarouselApi) => {
      setSelected(details.selectedScrollSnap() ?? 0);
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <SourcesCarouselContext.Provider value={contextValue()}>
      <Carousel.Root
        className={css(
          {
            width: "full",
          },
          className,
        )}
        setApi={setApi}
        {...props}
      />
    </SourcesCarouselContext.Provider>
  );
};

export type SourcesCarouselListProps = ComponentProps<
  typeof Carousel.ItemGroup
>;

export const SourcesCarouselList = ({
  className,
  ...props
}: SourcesCarouselListProps) => (
  <Carousel.ItemGroup
    className={css(
      {
        display: "flex",
        gap: "1",
      },
      className,
    )}
    {...props}
  />
);

export type SourcesCarouselItemProps = ComponentProps<typeof Carousel.Item>;

export const SourcesCarouselItem = ({
  className,
  ...props
}: SourcesCarouselItemProps) => (
  <Carousel.Item
    className={css(
      {
        display: "flex",
        flexShrink: "0",
        width: "full",
      },
      className,
    )}
    {...props}
  />
);

const sourcesCarouselTranslations = {
  left: ArrowLeftIcon,
  right: ArrowRightIcon,
};

export type SourcesCarouselButtonProps = ComponentProps<
  typeof Carousel.PrevTrigger
> & {
  direction: "left" | "right";
};

export const SourcesCarouselButton = ({
  className,
  direction,
  ...props
}: SourcesCarouselButtonProps) => {
  const DirectionIcon = sourcesCarouselTranslations[direction];

  return (
    <Carousel.PrevTrigger
      className={css(
        {
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: "1",
          borderRadius: "full",
        },
        direction === "left"
          ? {
              left: "1",
            }
          : {
              right: "1",
            },
        className,
      )}
      {...props}
    >
      <DirectionIcon
        className={css({
          width: "4",
          height: "4",
        })}
      />
    </Carousel.PrevTrigger>
  );
};

export type InlineCitationCountProps = ComponentProps<"span"> & {
  count?: number;
};

export const InlineCitationCount = ({
  count = 0,
  className,
  ...props
}: InlineCitationCountProps) => (
  <span
    className={css(
      {
        fontSize: "xs",
        color: "fg.muted",
        _groupHover: {
          color: "fg.default",
        },
      },
      className,
    )}
    {...props}
  >
    {count}
  </span>
);

export type InlineCitationActiveIndicatorProps = ComponentProps<"span"> & {
  active: boolean;
};

export const InlineCitationActiveIndicator = ({
  active,
  className,
  ...props
}: InlineCitationActiveIndicatorProps) => (
  <span
    className={css(
      {
        width: "1.5",
        height: "1.5",
        borderRadius: "full",
        backgroundColor: active ? "blue.6" : "fg.muted",
      },
      className,
    )}
    {...props}
  />
);

export const InlineCitationSource = ({
  url,
  title,
}: {
  url: string;
  title?: string;
}) => (
  <div
    className={css({
      display: "flex",
      flexDirection: "column",
      gap: "1",
    })}
  >
    <span
      className={css({
        fontWeight: "medium",
        fontSize: "sm",
      })}
    >
      {title ?? url}
    </span>
    <span
      className={css({
        fontSize: "xs",
        color: "fg.muted",
      })}
    >
      {url}
    </span>
  </div>
);
