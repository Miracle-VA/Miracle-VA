import { getImageProps } from "next/image";

export interface PhotoProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  className?: string;
  /** Above the fold: load straight away instead of lazily. */
  eager?: boolean;
}

/**
 * A photo through Next's image optimiser (AVIF/WebP, responsive srcset),
 * rendered as a plain <img> on the server. Unlike <Image>, it ships no client
 * JavaScript and adds nothing to the page's hydration payload, which matters
 * for LCP on slow phones (05 Performance).
 *
 * Above-the-fold photos load eagerly but aren't preloaded: on phones the
 * cover line, not the photo, is the LCP element, so the photo shouldn't
 * compete with its font for bandwidth. Chrome still raises the priority of
 * in-viewport images once layout runs.
 */
export function Photo({ eager = false, ...image }: PhotoProps) {
  const { props } = getImageProps({ ...image, loading: eager ? "eager" : "lazy" });
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text -- alt is in props; this is next/image's own output
  return <img {...props} draggable={false} />;
}
