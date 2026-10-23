import { BookingDialog } from "@/components/BookingDialog";
import { Gallery } from "@/components/Gallery";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Clock3,
  MapPin,
  Phone,
} from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";

const address =
  "Purok 6A, South Poblacion, Maramag, Bukidnon 8714, Philippines";
const googlePlaceName = "Enchanted Spring Resort";
const email = "hideaway.springresort2025@gmail.com";
const phones = [
  { label: "TM", display: "0927 434 6675", href: "tel:+639274346675" },
  { label: "Smart", display: "0947 208 5041", href: "tel:+639472085041" },
];
const facebook = "https://www.facebook.com/profile.php?id=61594787518063";
const youtube = "https://youtube.com/@hideawayspringresort";
const tiktok = "https://www.tiktok.com/@thehideawayspringresort";
const mapsUrl =
  "https://www.google.com/maps/place/Enchanted+Spring+Resort/@7.7610366,124.9919964,16z/data=!4m6!3m5!1s0x32ff3b5d18bdee5d:0x9173fb686da26357!8m2!3d7.7610366!4d124.9919964!16s%2Fg%2F11sd8n37cg";
const mapEmbed =
  "https://www.google.com/maps?q=" +
  encodeURIComponent(`${googlePlaceName}, Maramag, Bukidnon`) +
  "&z=16&output=embed";

export default function Landing() {
  const reduceMotion = useReducedMotion();

  return (
    <div id="top" className="min-h-screen bg-background">
      <a
        href="#resort"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:border focus:border-border focus:bg-background focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <SiteHeader />

      <main>
        {/* Hero: the one thing above everything else */}
        <section className="relative border-b border-border bg-[#17160f]">
          <div className="relative min-h-[calc(100svh-4rem)] w-full overflow-hidden">
            <img
              src="/photos/hero.jpg"
              alt="Spring pools and greenery at Hideaway Spring Resort in Maramag, Bukidnon"
              className="absolute inset-0 h-full w-full object-cover"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

            <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-[1280px] flex-col justify-end px-6 pb-10 pt-24 sm:px-10 sm:pb-12 lg:pb-14">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
                className="max-w-3xl text-white"
              >
                <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-white/70">
                  <span className="h-px w-8 bg-white/40" />
                  Maramag · Bukidnon
                </p>
                <h1 className="mt-5 font-serif text-[clamp(2.25rem,8.4vw,6.2rem)] leading-[0.94] tracking-[-0.015em]">
                  A quiet spring,
                  <br />
                  <span className="italic text-white/90">hidden in Maramag.</span>
                </h1>
                <p className="mt-7 max-w-md text-sm leading-7 text-white/75 sm:text-base">
                  Spring-fed pools under old trees. A slow, easy day for the
                  whole family — open daily from 8:30 AM.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <BookingDialog className="bg-[#f7f5f0] text-[#1c1a15] hover:bg-white" />
                  <a
                    href="#gallery"
                    className="group inline-flex items-center gap-2 text-[13px] tracking-wide text-white/80 transition-colors hover:text-white"
                  >
                    See the spring
                    <ArrowDown className="size-3.5 transition-transform group-hover:translate-y-0.5" />
                  </a>
                </div>
              </motion.div>

              <div className="mt-12 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-white/20 pt-5 text-[10px] uppercase tracking-[0.2em] text-white/55 sm:mt-16 sm:text-[11px]">
                <span>Open daily · 8:30 AM – 5:00 PM</span>
                <span className="hidden sm:inline">
                  South Poblacion · Maramag
                </span>
                <a
                  href="#gallery"
                  className="hidden items-center gap-2 transition-colors hover:text-white md:inline-flex"
                >
                  12 photographs
                  <span className="h-px w-6 bg-white/30" />
                </a>
                <span>Relax · Refresh · Reconnect</span>
              </div>
            </div>
          </div>
        </section>

        {/* A short introduction */}
        <section id="resort" className="scroll-mt-16 border-b border-border">
          <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-6 py-24 sm:px-10 md:grid-cols-12 md:gap-8 lg:py-32">
            <div className="md:col-span-4">
              <SectionLabel index="01">The resort</SectionLabel>
              <p className="max-w-[15rem] text-sm leading-6 text-muted-foreground">
                A small spring resort in the quiet edge of Maramag, Bukidnon.
              </p>
            </div>
            <Reveal className="md:col-span-8">
              <h2 className="max-w-2xl font-serif text-[2rem] leading-[1.12] tracking-[-0.01em] sm:text-[2.75rem] lg:text-[3.4rem]">
                Cold spring water, deep shade, and nothing to rush for.
              </h2>
              <div className="mt-8 grid max-w-2xl gap-6 text-sm leading-7 text-muted-foreground sm:grid-cols-2">
                <p>
                  Hideaway is a place for unhurried afternoons — a cool swim, a
                  shaded table, and the kind of quiet that only water and old
                  trees can make.
                </p>
                <p>
                  Come for the day, bring the family, and stay until the light
                  softens. Proper swimwear is required, and little ones stay
                  with a parent or guardian.
                </p>
              </div>

              <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-7 sm:grid-cols-3">
                <Fact label="Open" value="Daily, 8:30 AM – 5:00 PM" />
                <Fact label="Visits" value="Day visits welcome" />
                <Fact label="Find us" value="South Poblacion, Maramag" />
              </dl>
            </Reveal>
          </div>
        </section>

        {/* Gallery carousel */}
        <section id="gallery" className="scroll-mt-16 border-b border-border">
          <div className="mx-auto w-full max-w-[1280px] px-6 py-24 sm:px-10 lg:py-32">
            <Reveal>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <SectionLabel index="02">Gallery</SectionLabel>
                  <h2 className="font-serif text-[2rem] leading-none tracking-[-0.01em] sm:text-[2.75rem] lg:text-[3.4rem]">
                    A look around.
                  </h2>
                </div>
                <p className="max-w-xs text-sm leading-6 text-muted-foreground">
                  Clear views of the grounds, with four people or fewer. Use the
                  arrows, the thumbnails, or open any photograph full screen.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <Gallery />
            </Reveal>
          </div>
        </section>

        {/* Location */}
        <section id="visit" className="scroll-mt-16 border-b border-border">
          <div className="mx-auto w-full max-w-[1280px] px-6 pt-24 sm:px-10 lg:pt-32">
            <div className="grid gap-12 md:grid-cols-12 md:gap-10">
              <Reveal className="md:col-span-5">
                <SectionLabel index="03">Visit</SectionLabel>
                <h2 className="max-w-md font-serif text-[2rem] leading-[1.12] tracking-[-0.01em] sm:text-[2.75rem] lg:text-[3.2rem]">
                  Find the gate at the edge of Maramag.
                </h2>
                <p className="mt-6 max-w-sm text-sm leading-7 text-muted-foreground">
                  We&apos;re in Purok 6A, South Poblacion, a short ride from the
                  town proper. Message us before you travel and we&apos;ll keep
                  a place for you.
                </p>

                <OpenStatus />

                <dl>
                  <DetailRow label="Address">
                    <span className="flex gap-2">
                      <MapPin
                        className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                        strokeWidth={1.5}
                      />
                      <span>{address}</span>
                    </span>
                  </DetailRow>
                  <DetailRow label="Hours">
                    <span className="flex gap-2">
                      <Clock3
                        className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                        strokeWidth={1.5}
                      />
                      <span>
                        Daily, 8:30 AM – 5:00 PM
                        <span className="mt-1 block text-xs text-muted-foreground">
                          Day visits welcome · open weekends
                        </span>
                      </span>
                    </span>
                  </DetailRow>
                  <DetailRow label="Call or text">
                    <span className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
                      <Phone
                        className="size-4 shrink-0 text-muted-foreground"
                        strokeWidth={1.5}
                      />
                      {phones.map((phone, index) => (
                        <span key={phone.href} className="flex items-center gap-1.5">
                          <a
                            href={phone.href}
                            className="underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
                          >
                            {phone.display}
                          </a>
                          <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                            {phone.label}
                          </span>
                          {index < phones.length - 1 && (
                            <span className="text-muted-foreground">·</span>
                          )}
                        </span>
                      ))}
                    </span>
                  </DetailRow>
                  <DetailRow label="Email">
                    <a
                      href={`mailto:${email}`}
                      className="break-all underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
                    >
                      {email}
                    </a>
                  </DetailRow>
                </dl>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="h-11 rounded-none px-5 text-[13px] font-medium tracking-wide"
                  >
                    <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                      Get directions
                      <ArrowUpRight className="size-4" />
                    </a>
                  </Button>
                  <BookingDialog
                    triggerLabel="Book a visit"
                    variant="outline"
                    className="h-11 px-5"
                  />
                </div>

                <p className="mt-8 max-w-xs border-l border-border pl-4 text-xs leading-5 text-muted-foreground">
                  Proper swimwear is required. Children must be supervised by a
                  parent or guardian.
                </p>
              </Reveal>

              <Reveal className="md:col-span-7" delay={0.08}>
                <div className="relative h-[340px] w-full overflow-hidden border border-border bg-muted sm:h-[440px] md:h-[560px]">
                  <iframe
                    title="Map to Hideaway Spring Resort in Maramag, Bukidnon"
                    src={mapEmbed}
                    className="h-full w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5" />

                  <div className="pointer-events-none absolute inset-x-3 top-3 flex items-start justify-between gap-3">
                    <div className="pointer-events-auto max-w-[16rem] border border-border bg-background/95 p-4 backdrop-blur-sm">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        The gate
                      </p>
                      <p className="mt-2 text-sm leading-5">{address}</p>
                      <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
                        Pinned on Google Maps as {googlePlaceName}
                      </p>
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] transition-colors hover:text-muted-foreground"
                      >
                        Open in Maps
                        <ArrowUpRight className="size-3" strokeWidth={1.5} />
                      </a>
                    </div>
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open Hideaway Spring Resort in Google Maps"
                      className="pointer-events-auto flex size-10 items-center justify-center border border-border bg-background/95 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
                    >
                      <ArrowUpRight className="size-4" strokeWidth={1.5} />
                    </a>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  <span>South Poblacion · Maramag</span>
                  <span>Bukidnon · 8714</span>
                </div>
              </Reveal>
            </div>

            <dl className="mt-16 grid gap-8 border-t border-border pt-10 pb-24 sm:grid-cols-3 lg:mt-20 lg:pb-32">
              <Fact
                label="Opening hours"
                value="Daily, 8:30 AM – 5:00 PM"
              />
              <Fact
                label="Getting here"
                value="Purok 6A, South Poblacion — a short ride from the Maramag town proper."
              />
              <Fact
                label="Good to know"
                value="Proper swimwear required. Children stay with a parent or guardian."
              />
            </dl>
          </div>
        </section>

        {/* Closing call to action */}
        <section className="border-b border-border">
          <div className="mx-auto grid w-full max-w-[1280px] gap-8 px-6 py-24 sm:px-10 md:grid-cols-12 lg:py-32">
            <div className="md:col-span-3">
              <SectionLabel index="04">Come by</SectionLabel>
            </div>
            <Reveal className="md:col-span-9">
              <h2 className="max-w-2xl font-serif text-[2rem] leading-[1.1] tracking-[-0.01em] sm:text-[2.75rem] lg:text-[3.4rem]">
                Come for the day. Stay until the light softens.
              </h2>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                <BookingDialog />
                <a
                  href="#visit"
                  className="group inline-flex items-center gap-2 text-[13px] tracking-wide text-muted-foreground transition-colors hover:text-foreground"
                >
                  Directions &amp; hours
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  const [progress, setProgress] = useState(0);
  const links = [
    { label: "The resort", href: "#resort" },
    { label: "Gallery", href: "#gallery" },
    { label: "Visit", href: "#visit" },
  ];

  useEffect(() => {
    const onScroll = () => {
      const root = document.documentElement;
      const max = root.scrollHeight - root.clientHeight;
      setProgress(max > 0 ? Math.min(1, root.scrollTop / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between gap-6 px-6 sm:px-10">
        <a href="#top" className="flex items-baseline gap-3">
          <span className="font-serif text-[22px] leading-none tracking-[0.01em]">
            Hideaway
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.24em] text-muted-foreground sm:inline">
            Spring Resort
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-[12px] tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <span className="hidden text-[10px] uppercase tracking-[0.2em] text-muted-foreground lg:inline">
            Maramag · Bukidnon
          </span>
          <BookingDialog className="h-9 px-4 text-[12px]" />
        </div>
      </div>
      <span className="absolute inset-x-0 bottom-0 h-px bg-transparent">
        <span
          className="block h-px origin-left bg-foreground/70 transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${progress})` }}
        />
      </span>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-[#191814] text-[#e9e5da]">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-16 sm:px-10 lg:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="font-serif text-[1.9rem] leading-none tracking-[0.01em]">
              Hideaway <span className="italic text-white/70">Spring Resort</span>
            </p>
            <p className="mt-5 max-w-[18rem] text-sm leading-6 text-white/50">
              Relax. Refresh. Reconnect. A quiet spring in the heart of Maramag,
              Bukidnon.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[11px] uppercase tracking-[0.2em] text-white/60">
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                Facebook
                <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
              </a>
              <a
                href={youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                YouTube
              </a>
              <a
                href={tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                TikTok
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <FooterHeading>Visit</FooterHeading>
            <p className="text-sm leading-6 text-white/50">{address}</p>
            <p className="mt-4 text-sm leading-6 text-white/50">
              Open daily
              <br />
              8:30 AM – 5:00 PM
            </p>
          </div>

          <div className="md:col-span-2">
            <FooterHeading>Contact</FooterHeading>
            {phones.map((phone) => (
              <a
                key={phone.href}
                href={phone.href}
                className="block text-sm text-white/50 transition-colors hover:text-white"
              >
                {phone.display}
              </a>
            ))}
            <a
              href={`mailto:${email}`}
              className="mt-3 block break-all text-sm text-white/50 transition-colors hover:text-white"
            >
              {email}
            </a>
          </div>

          <div className="md:col-span-2">
            <FooterHeading>Explore</FooterHeading>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#gallery"
                  className="text-white/50 transition-colors hover:text-white"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#visit"
                  className="text-white/50 transition-colors hover:text-white"
                >
                  Location
                </a>
              </li>
              <li>
                <BookingDialog
                  triggerLabel="Book now"
                  variant="ghost"
                  className="h-auto justify-start p-0 text-sm font-normal tracking-normal text-white/50 hover:bg-transparent hover:text-white"
                />
              </li>
              <li>
                <a
                  href="/auth"
                  className="text-white/50 transition-colors hover:text-white"
                >
                  Staff access
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/15 pt-6 text-[10px] uppercase tracking-[0.18em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Hideaway Spring Resort</p>
          <p>South Poblacion · Maramag, Bukidnon</p>
        </div>
      </div>
    </footer>
  );
}

function SectionLabel({
  index,
  children,
}: {
  index: string;
  children: ReactNode;
}) {
  return (
    <p className="mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
      <span className="tabular-nums text-foreground/45">{index}</span>
      <span className="h-px w-7 bg-border" />
      {children}
    </p>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-2 text-sm leading-6">{value}</dd>
    </div>
  );
}

function DetailRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-border py-4 text-sm sm:grid-cols-[7rem_1fr]">
      <dt className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </dt>
      <dd className="leading-6">{children}</dd>
    </div>
  );
}

function OpenStatus() {
  const [status, setStatus] = useState(readStatus);

  useEffect(() => {
    const id = window.setInterval(() => setStatus(readStatus()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-y border-border py-3 text-[10px] uppercase tracking-[0.18em]">
      <span className="flex items-center gap-2">
        <span
          className={cn(
            "size-1.5 rounded-full",
            status.open ? "bg-foreground" : "bg-muted-foreground/60",
          )}
        />
        <span className="text-foreground">{status.label}</span>
      </span>
      <span className="text-muted-foreground">· {status.detail}</span>
      <span className="ml-auto hidden text-muted-foreground sm:inline">
        Philippine time
      </span>
    </div>
  );
}

function readStatus() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
  const minute = Number(
    parts.find((part) => part.type === "minute")?.value ?? "0",
  );
  const minutes = hour * 60 + minute;
  const open = minutes >= 8 * 60 + 30 && minutes < 17 * 60;

  return open
    ? { open, label: "Open now", detail: "Closes 5:00 PM" }
    : { open, label: "Closed now", detail: "Opens 8:30 AM" };
}

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 0.61, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-white/35">
      {children}
    </p>
  );
}
