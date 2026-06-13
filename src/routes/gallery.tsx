import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Image, Video, MapPin, Phone, Mail } from "lucide-react";
import imgBroilers from "@/assets/broilers.jpg";
import imgLayers from "@/assets/layers.jpg";
import imgTurkeys from "@/assets/turkeys.jpg";
import imgChicks from "@/assets/chicks.jpg";
import imgIncubation from "@/assets/incubation.jpg";

const SOCIALS = {
  whatsapp: "https://wa.me/254700000000",
};

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | The Kogogo Farm Siaya" },
      {
        name: "description",
        content:
          "Explore photos and videos from The Kogogo Farm. See our poultry, incubation, and farm visits in action.",
      },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col gap-6 text-center">
          <div className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            Gallery
          </div>
          <h1 className="text-4xl font-display font-bold tracking-tight text-foreground sm:text-5xl">
            See our farm through pictures and video.
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
            Browse the best moments from The Kogogo Farm, from our birds and incubators to farm
            visits and daily life on the ranch.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Broiler House",
              image: imgBroilers,
              caption: "Healthy broilers raised with care.",
            },
            {
              title: "Layer Stock",
              image: imgLayers,
              caption: "Productive layers with strong egg yield.",
            },
            {
              title: "Turkeys on the Yard",
              image: imgTurkeys,
              caption: "Free-range turkeys ready for family feasts.",
            },
            {
              title: "Day-Old Chicks",
              image: imgChicks,
              caption: "Freshly hatched chicks ready for delivery.",
            },
            {
              title: "Incubation Facility",
              image: imgIncubation,
              caption: "Controlled egg incubation for strong hatch rates.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-[var(--shadow-soft)]"
            >
              <div className="relative h-72 overflow-hidden bg-slate-900/10">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h2 className="text-xl font-semibold text-foreground">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.caption}</p>
              </div>
            </div>
          ))}

          <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-[var(--shadow-soft)]">
            <div className="relative h-72 overflow-hidden bg-slate-950">
              <video controls poster={imgIncubation} className="h-full w-full object-cover">
                <source
                  src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            </div>
            <div className="p-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                <Video className="h-4 w-4" /> Video Tour
              </div>
              <h2 className="mt-4 text-xl font-semibold text-foreground">Incubation & Farm Life</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Watch our incubation room in action and see how we manage eggs, chicks, and daily
                farm operations.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-6 rounded-[2rem] border border-border bg-card p-8 shadow-[var(--shadow-soft)] md:grid-cols-3">
          <div className="space-y-2">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Image className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-foreground">Professional shots</h3>
            <p className="text-sm text-muted-foreground">
              High-quality photos of our breeds, facilities, and farm routines.
            </p>
          </div>
          <div className="space-y-2">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Phone className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-foreground">WhatsApp support</h3>
            <p className="text-sm text-muted-foreground">
              Ask for more gallery content, pricing, or book a farm visit directly.
            </p>
          </div>
          <div className="space-y-2">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <MapPin className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-foreground">On-farm tours</h3>
            <p className="text-sm text-muted-foreground">
              See our process in person with guided farm tours in Siaya.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-2xl border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition hover:bg-secondary/70"
          >
            Back to home
          </a>
          <a
            href={`${SOCIALS.whatsapp}?text=${encodeURIComponent("Hi Kogogo Farm, I'd like more photos and videos from your gallery and to inquire about farm visits.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            Contact on WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
