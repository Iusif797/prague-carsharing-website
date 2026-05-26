import { FLEET_CARS } from "@/data/fleet";
import { FleetCard } from "@/components/site/FleetCard";

export function Fleet() {
  return (
    <section id="fleet" className="relative overflow-hidden bg-background px-4 py-24 sm:px-6 md:py-32">
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-20" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-16">
          <div>
            <div className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">Fleet</div>
            <h2 className="max-w-2xl font-display text-4xl leading-[1.02] md:text-6xl">
              Three machines. <em className="italic text-foreground/70">One promise.</em>
            </h2>
          </div>
          <p className="max-w-sm text-foreground/60">
            Hand-picked BMWs only. Every car serviced weekly, cleaned every shift.
          </p>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden snap-x snap-mandatory md:snap-none">
          {FLEET_CARS.map((car, index) => (
            <FleetCard key={car.name} car={car} priority={index === 0} compact />
          ))}
        </div>
      </div>
    </section>
  );
}
