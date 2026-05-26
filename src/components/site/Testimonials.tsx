import { Star } from "lucide-react";

const T = [
  { name: "Tereza H.", role: "Designer · Vinohrady", text: "Replaced my old Škoda. Cheaper, never stuck in a garage, always within 3 minutes' walk." },
  { name: "Marek D.", role: "Founder · Karlín", text: "Took an i4 from Karlín to Český Krumlov for the weekend. Cap kicked in — paid less than a train ticket." },
  { name: "Anežka K.", role: "Photographer · Letná", text: "Cars are spotless. I shoot weddings, can show up in something nice. The X1 has a real trunk." },
];

export function Testimonials() {
  return (
    <section className="relative py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Loved by Praguers</div>
            <h2 className="font-display text-5xl md:text-6xl leading-[1] max-w-2xl">
              <em className="italic">4.9</em> on the App Store.<br />Across 12,000 reviews.
            </h2>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {T.map((t) => (
            <div key={t.name} className="p-8 rounded-3xl glass shadow-elegant">
              <div className="flex gap-1 mb-4 text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary" />
                ))}
              </div>
              <p className="text-foreground/85 leading-relaxed mb-6 font-display text-xl italic">"{t.text}"</p>
              <div className="text-sm">
                <div className="font-medium">{t.name}</div>
                <div className="text-foreground/55">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
