import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Battery, Gauge, Users } from "lucide-react";
import type { FleetCar } from "@/data/fleet";

type FleetCardProps = {
  car: FleetCar;
  priority?: boolean;
  compact?: boolean;
};

export function FleetCard({ car, priority = false, compact = false }: FleetCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 24 });
  const sy = useSpring(y, { stiffness: 220, damping: 24 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-6, 6]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [4, -4]);

  return (
    <motion.article
      ref={ref}
      onMouseMove={(event) => {
        if (window.matchMedia("(pointer: coarse)").matches) return;
        const bounds = ref.current?.getBoundingClientRect();
        if (!bounds) return;
        x.set((event.clientX - bounds.left) / bounds.width - 0.5);
        y.set((event.clientY - bounds.top) / bounds.height - 0.5);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-elegant backdrop-blur-xl ${
        compact
          ? "snap-center shrink-0 w-[min(78vw,20rem)] sm:w-[min(70vw,22rem)] md:w-auto md:shrink"
          : ""
      }`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-black">
        <img
          src={car.img}
          alt={car.name}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover object-[center_42%] transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
          <span className="rounded-full bg-background/70 px-2.5 py-1 text-[9px] uppercase tracking-[0.22em] text-foreground/90 backdrop-blur-md">
            {car.tag}
          </span>
          <span className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold leading-none text-primary-foreground shadow-[0_6px_20px_-8px_var(--color-primary)]">
            {car.price}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4 md:p-5">
        <h3 className="font-display text-xl leading-tight md:text-[1.35rem]">{car.name}</h3>
        <div className="mt-auto grid grid-cols-3 gap-2 border-t border-white/10 pt-4 text-xs text-foreground/70 md:gap-3">
          <FleetStat icon={<Battery className="h-3.5 w-3.5" />} label="Range" value={car.range} />
          <FleetStat icon={<Gauge className="h-3.5 w-3.5" />} label="0–100" value={car.accel} />
          <FleetStat icon={<Users className="h-3.5 w-3.5" />} label="Seats" value={car.seats} />
        </div>
      </div>
    </motion.article>
  );
}

function FleetStat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex min-h-[3.25rem] flex-col justify-between gap-1">
      <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-foreground/50">
        {icon}
        <span className="truncate">{label}</span>
      </div>
      <div className="text-sm font-medium tabular-nums text-foreground">{value}</div>
    </div>
  );
}
