import { css } from "styled-system/css";
import type { Experimental_GeneratedImage } from "ai";

export type ImageProps = Experimental_GeneratedImage & {
  className?: string;
  alt?: string;
};

export const Image = ({
  base64,
  uint8Array: _uint8Array,
  mediaType,
  ...props
}: ImageProps) => (
  <img
    {...props}
    alt={props.alt}
    className={css(
      {
        height: "auto",
        maxWidth: "full",
        overflow: "hidden",
        borderRadius: "l2",
      },
      props.className,
    )}
    src={`data:${mediaType};base64,${base64}`}
  />
);
