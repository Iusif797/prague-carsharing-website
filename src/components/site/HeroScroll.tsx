import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { ArrowDown } from "lucide-react";

const clampScrollProgress = (value: number) => Math.min(1, Math.max(0, value));

const toScrollRange = (values: number[]) => values.map(clampScrollProgress);

const SCENES = [
  {
    eyebrow: "Car-sharing · Praha",
    title: <>Drive Prague,<br /><em className="font-display italic text-primary">effortlessly.</em></>,
    sub: "Unlock any BMW from your phone. Park anywhere inside the ring. Pay by the minute.",
  },
  {
    eyebrow: "Instant access",
    title: <>Tap. Walk in.<br /><em className="font-display italic text-primary">Just drive.</em></>,
    sub: "Your phone is the key. Engine starts in under three seconds — no counters, no paperwork.",
  },
  {
    eyebrow: "All of Prague",
    title: <>From Vyšehrad<br />to <em className="font-display italic text-primary">Letná.</em></>,
    sub: "Free-floating zone covers every district inside the inner ring — pick up and drop off anywhere.",
  },
  {
    eyebrow: "Premium fleet",
    title: <>Only BMW.<br /><em className="font-display italic text-primary">Always clean.</em></>,
    sub: "i4, 1 Series, X1. Inspected twice a day. Fueled and charged before you arrive.",
  },
];

export function HeroScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTime = useRef(0);
  const rafId = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const video = videoRef.current;
    if (!video || !video.duration || isNaN(video.duration)) return;
    targetTime.current = Math.max(0, Math.min(v * video.duration, video.duration - 0.01));
  });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tick = () => {
      const video = videoRef.current;
      if (video && video.duration) {
        const diff = targetTime.current - video.currentTime;
        if (reduced) {
          video.currentTime = targetTime.current;
        } else if (Math.abs(diff) > 0.005) {
          try {
            video.currentTime += diff * 0.18;
          } catch {}
        }
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative" style={{ height: "500vh" }}>
      <div className="sticky top-0 h-svh w-full overflow-hidden bg-background">
        <video
          ref={videoRef}
          src="/videos/hero.mp4"
          muted
          playsInline
          preload="auto"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          {...({ "webkit-playsinline": "true", "x5-playsinline": "true" } as any)}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Vignette + grain */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/10 to-background/90 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/40 pointer-events-none" />
        <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
        <div className="absolute inset-0 noise pointer-events-none" />

        {SCENES.map((scene, i) => (
          <Scene key={i} index={i} total={SCENES.length} progress={scrollYProgress} {...scene} />
        ))}

        {/* scroll indicator */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/60 text-xs tracking-[0.3em] uppercase"
        >
          Scroll
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}

function Scene({
  index,
  total,
  progress,
  eyebrow,
  title,
  sub,
}: {
  index: number;
  total: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  progress: any;
  eyebrow: string;
  title: React.ReactNode;
  sub: string;
}) {
  const slot = 1 / total;
  const s = index * slot;
  const e = (index + 1) * slot;
  const fade = 0.06;
  const opacity = useTransform(
    progress,
    toScrollRange([s - fade, s + fade * 0.5, e - fade * 0.5, e + fade]),
    [0, 1, 1, 0],
  );
  const y = useTransform(
    progress,
    toScrollRange([s - fade, s + fade, e - fade, e + fade]),
    [40, 0, 0, -40],
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex items-center"
    >
      <div className="max-w-7xl w-full mx-auto px-6 md:px-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs uppercase tracking-[0.25em] text-foreground/80 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {eyebrow}
          </div>
          <h1 className="font-display text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.95] font-medium text-foreground">
            {title}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/75 max-w-xl leading-relaxed">
            {sub}
          </p>
          {index === 0 && (
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button className="h-12 px-7 rounded-full bg-primary text-primary-foreground font-medium shadow-elegant hover:opacity-90 transition">
                Start driving
              </button>
              <button className="h-12 px-7 rounded-full glass text-foreground/90 hover:bg-white/10 transition">
                See pricing
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
