import { Photo } from "@/components/ui/photo";
import type { CaseSample } from "@/content/work";

export interface CaseSamplesProps {
  samples: readonly CaseSample[];
}

/**
 * Her work samples on a case page (used as supplied, decision 2026-11-14).
 *
 * Images sit in equal 4:5 Alpine Oat frames, contained not cropped, so square
 * graphics, portrait posters and tall phone screenshots line up as one even
 * contact sheet. Reels get their own 9:16 grid. Videos load only when played
 * (preload="none"), show a poster, and offer no download, picture-in-picture
 * or speed controls; MediaGuard blocks right-click and drag on both.
 */
/** Desktop columns sized to the count, so no row ends with a lone item. */
const imageCols: Record<number, string> = { 1: "lg:grid-cols-2", 2: "lg:grid-cols-2", 3: "lg:grid-cols-3", 4: "lg:grid-cols-4" };
const videoCols: Record<number, string> = { 1: "lg:grid-cols-4", 2: "lg:grid-cols-4", 3: "lg:grid-cols-3", 4: "lg:grid-cols-4", 5: "lg:grid-cols-5" };

export function CaseSamples({ samples }: CaseSamplesProps) {
  const images = samples.filter((s) => s.kind === "image");
  const videos = samples.filter((s) => s.kind === "video");

  return (
    <section aria-labelledby="samples-heading" className="container-page pb-(--section-y)">
      <h2 id="samples-heading" className="border-t-2 border-text pt-8 text-3xl md:pt-10">
        Samples
      </h2>

      {images.length > 0 && (
        <ul className={`mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 md:mt-12 ${imageCols[images.length] ?? "lg:grid-cols-3"}`}>
          {images.map((img) => (
            <li key={img.src}>
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-surface">
                  <Photo
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, calc(100vw - 2.5rem)"
                    className="absolute inset-0 h-full w-full object-contain p-4 md:p-6"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-text-muted">{img.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      )}

      {videos.length > 0 && (
        <>
          <h3 className="mt-14 text-2xl md:mt-16">Reels</h3>
          <ul className={`mt-6 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6 ${videoCols[videos.length] ?? "lg:grid-cols-4"}`}>
            {videos.map((vid) => (
              <li key={vid.src}>
                <figure>
                  {/* Captions are burned into the supplied reels; a .vtt track
                      is added when one exists (open item: confirm every
                      spoken line is captioned, WCAG 1.2.2). */}
                  {/* eslint-disable-next-line jsx-a11y/media-has-caption -- captions burned into the video; optional VTT track below */}
                  <video
                    src={vid.src}
                    poster={vid.poster}
                    aria-label={vid.label}
                    controls
                    playsInline
                    preload="none"
                    controlsList="nodownload noplaybackrate"
                    disablePictureInPicture
                    className="aspect-[9/16] w-full rounded-sm bg-field-dark object-cover"
                  >
                    {vid.captions && <track kind="captions" src={vid.captions} srcLang="en" label="English" default />}
                  </video>
                  <figcaption className="mt-3 text-sm text-text-muted">{vid.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
