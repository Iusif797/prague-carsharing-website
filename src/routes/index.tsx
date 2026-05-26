import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { ScrollExperience } from "@/components/site/ScrollExperience";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Praha Drive — Premium BMW car-sharing in Prague" },
      {
        name: "description",
        content:
          "Unlock any BMW from your phone. Pay by the minute, anywhere in Prague's inner ring. i4, 1 Series, X1 — clean, fueled, ready.",
      },
      { property: "og:title", content: "Praha Drive — Premium BMW car-sharing in Prague" },
      { property: "og:description", content: "By the minute. Anywhere in Prague. Premium BMW fleet." },
    ],
  }),
});

function Index() {
  return (
    <main className="bg-background text-foreground">
      <Header />
      <ScrollExperience />
      <Footer />
    </main>
  );
}
