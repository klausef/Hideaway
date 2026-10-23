import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, ChevronDown, Expand, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Photo = {
  number: number;
  src: string;
  alt: string;
};

const photoAt = (number: number): Photo => ({
  number,
  src: `/photos/gallery-${String(number).padStart(2, "0")}.jpg`,
  alt: `Hideaway Spring Resort in Maramag, Bukidnon — photograph ${number}`,
});

/**
 * Gallery selection: clear views of the grounds and moments with four people
 * or fewer. The full set (including group and event photographs) stays behind
 * the "All photographs" dropdown below.
 */
const curatedNumbers = [1, 5, 6, 7, 8, 11, 12, 14, 15, 16, 17, 19];

export const galleryPhotos: Photo[] = curatedNumbers.map(photoAt);
export const allPhotos: Photo[] = Array.from({ length: 19 }, (_, index) =>
  photoAt(index + 1),
);

type Lightbox = { list: Photo[]; index: number } | null;

export function Gallery() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState<Lightbox>(null);
  const [showAll, setShowAll] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const active = rail.querySelector<HTMLElement>(`[data-thumb="${current}"]`);
    if (!active) return;
    const railBox = rail.getBoundingClientRect();
    const activeBox = active.getBoundingClientRect();
    const left = activeBox.left - railBox.left + rail.scrollLeft;
    rail.scrollTo({
      left: left - (rail.clientWidth - active.clientWidth) / 2,
      behavior: "smooth",
    });
  }, [current]);

  const open = (list: Photo[], index: number) => setLightbox({ list, index });

  const step = (direction: number) =>
    setLightbox((state) =>
      state === null
        ? null
        : {
            ...state,
            index:
              (state.index + direction + state.list.length) %
              state.list.length,
          },
    );

  const photo = lightbox === null ? null : lightbox.list[lightbox.index];

  return (
    <>
      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: "start" }}
        className="mt-12"
      >
        <CarouselContent className="-ml-0">
          {galleryPhotos.map((item, index) => (
            <CarouselItem key={item.src} className="pl-0">
              <button
                type="button"
                onClick={() => open(galleryPhotos, index)}
                aria-label={`Open photograph ${index + 1} larger`}
                className="group relative block w-full overflow-hidden bg-muted text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.015] sm:aspect-[3/2]"
                />
                <span className="absolute bottom-4 left-4 bg-background/90 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-foreground backdrop-blur-sm">
                  Maramag · Bukidnon
                </span>
                <span className="absolute bottom-4 right-4 hidden items-center gap-2 bg-background/90 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-foreground backdrop-blur-sm sm:inline-flex">
                  <Expand className="size-3" strokeWidth={1.5} />
                  Expand
                </span>
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Controls */}
      <div className="mt-5 flex items-center gap-6">
        <p className="shrink-0 text-[11px] tabular-nums tracking-[0.16em] text-muted-foreground">
          <span className="text-foreground">
            {String(current + 1).padStart(2, "0")}
          </span>{" "}
          / {String(galleryPhotos.length).padStart(2, "0")}
        </p>
        <div className="hidden h-px flex-1 bg-border sm:block">
          <div
            className="h-px bg-foreground transition-all duration-500 ease-out"
            style={{ width: `${((current + 1) / galleryPhotos.length) * 100}%` }}
          />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Previous photograph"
            onClick={() => api?.scrollPrev()}
            className="size-11 rounded-none border-border bg-transparent hover:bg-secondary"
          >
            <ArrowLeft className="size-4" strokeWidth={1.5} />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Next photograph"
            onClick={() => api?.scrollNext()}
            className="size-11 rounded-none border-border bg-transparent hover:bg-secondary"
          >
            <ArrowRight className="size-4" strokeWidth={1.5} />
          </Button>
        </div>
      </div>

      {/* Thumbnail rail */}
      <div
        ref={railRef}
        className="-mx-6 mt-5 overflow-x-auto px-6 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex gap-2">
          {galleryPhotos.map((item, index) => (
            <button
              key={item.src}
              type="button"
              data-thumb={index}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to photograph ${index + 1}`}
              aria-current={current === index}
              className={cn(
                "relative h-14 w-20 shrink-0 overflow-hidden bg-muted transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground",
                current === index ? "opacity-100" : "opacity-45 hover:opacity-80",
              )}
            >
              <img
                src={item.src}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <span
                className={cn(
                  "pointer-events-none absolute inset-0 border",
                  current === index ? "border-foreground" : "border-transparent",
                )}
              />
            </button>
          ))}
        </div>
      </div>

      {/* All photographs dropdown */}
      <div className="mt-14 border-t border-border">
        <button
          type="button"
          onClick={() => setShowAll((value) => !value)}
          aria-expanded={showAll}
          aria-controls="all-photographs"
          className="flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-2 py-5 text-left"
        >
          <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              All photographs
            </span>
            <span className="text-[10px] tabular-nums tracking-[0.18em] text-muted-foreground/60">
              {allPhotos.length}
            </span>
            <span className="hidden text-xs leading-5 text-muted-foreground/80 sm:inline">
              Including group and event photos
            </span>
          </span>
          <span className="flex items-center gap-2 text-[11px] tracking-wide text-muted-foreground">
            {showAll ? "Hide" : "Show all"}
            <ChevronDown
              className={cn(
                "size-4 transition-transform duration-300",
                showAll && "rotate-180",
              )}
              strokeWidth={1.5}
            />
          </span>
        </button>

        {showAll && (
          <div
            id="all-photographs"
            className="grid grid-cols-3 gap-2 pb-2 sm:grid-cols-5 lg:grid-cols-7"
          >
            {allPhotos.map((item, index) => (
              <button
                key={item.src}
                type="button"
                onClick={() => open(allPhotos, index)}
                aria-label={`Open photograph ${index + 1} larger`}
                className="group relative aspect-square overflow-hidden bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/20" />
                <span className="absolute bottom-1.5 left-1.5 text-[9px] tabular-nums tracking-[0.14em] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {String(item.number).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Dialog
        open={lightbox !== null}
        onOpenChange={(value) => {
          if (!value) setLightbox(null);
        }}
      >
        <DialogContent
          showCloseButton={false}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              step(1);
            }
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              step(-1);
            }
          }}
          className="max-w-[calc(100%-1rem)] gap-0 border-white/15 bg-[#14130f] p-0 text-white sm:max-w-[min(1180px,94vw)]"
        >
          <DialogTitle className="sr-only">Photo gallery</DialogTitle>
          <DialogDescription className="sr-only">
            Photographs of Hideaway Spring Resort. Use the arrow keys to move
            between images.
          </DialogDescription>

          <div className="relative">
            <div className="flex items-center justify-center bg-black">
              {photo && (
                <img
                  key={photo.src}
                  src={photo.src}
                  alt={photo.alt}
                  className="max-h-[78vh] w-full object-contain"
                />
              )}
            </div>

            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Close gallery"
              className="absolute right-3 top-3 flex size-10 items-center justify-center bg-black/50 text-white/80 transition-colors hover:bg-black/75 hover:text-white"
            >
              <X className="size-4" strokeWidth={1.5} />
            </button>

            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photograph"
              className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center bg-black/45 text-white/80 transition-colors hover:bg-black/75 hover:text-white"
            >
              <ArrowLeft className="size-4" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photograph"
              className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center bg-black/45 text-white/80 transition-colors hover:bg-black/75 hover:text-white"
            >
              <ArrowRight className="size-4" strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex items-center justify-between border-t border-white/15 px-5 py-3.5">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/45">
              Hideaway Spring Resort
            </span>
            <span className="text-[11px] tabular-nums tracking-[0.16em] text-white/70">
              {String((lightbox?.index ?? 0) + 1).padStart(2, "0")} /{" "}
              {String(lightbox?.list.length ?? galleryPhotos.length).padStart(
                2,
                "0",
              )}
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
