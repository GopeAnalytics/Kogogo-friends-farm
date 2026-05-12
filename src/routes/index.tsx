import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";
import {
  MapPin, Phone, Mail, Send, Egg, Drumstick, Leaf, Heart,
  ShieldCheck, Sparkles, Truck, GraduationCap,
} from "lucide-react";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import logo from "@/assets/logo.jpeg";
import hero from "@/assets/hero-poultry.jpg";
import imgBroilers from "@/assets/broilers.jpg";
import imgLayers from "@/assets/layers.jpg";
import imgTurkeys from "@/assets/turkeys.jpg";
import imgChicks from "@/assets/chicks.jpg";
import imgIncubation from "@/assets/incubation.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Kogogo Farm Siaya | Broilers, Layers, Turkeys, Chicks & Egg Incubation in Kenya" },
      { name: "description", content: "Buy healthy broilers, layers, turkeys and day-old chicks in Siaya, Kenya. Egg incubation services and expert poultry farming consultations. Order fresh poultry today." },
      { name: "keywords", content: "poultry farm Siaya, broilers Kenya, layers chicken Kenya, turkey farm Kenya, day old chicks Siaya, egg incubation Kenya, poultry consultation, Kogogo Farm" },
      { property: "og:title", content: "The Kogogo Farm Siaya — Healthy & Fresh Poultry" },
      { property: "og:description", content: "Premium broilers, layers, turkeys, chicks & egg incubation in Siaya, Kenya." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Home,
});

// Replace placeholders with real handles when available
const SOCIALS = {
  whatsapp: "https://wa.me/254700000000",
  whatsappNumber: "+254 700 000 000",
  email: "info@kogogofarm.co.ke",
  x: "https://x.com/kogogofarm",
  instagram: "https://instagram.com/kogogofarm",
  tiktok: "https://tiktok.com/@kogogofarm",
};

const PRODUCTS = [
  {
    id: "broilers", name: "Broilers", img: imgBroilers,
    desc: "Fast-growing meat chickens raised on clean feed for tender, juicy meat.",
    sizes: [
      { label: "Small (1.2–1.5 kg)", was: 700, now: 550 },
      { label: "Medium (1.6–2.0 kg)", was: 950, now: 800 },
      { label: "Large (2.1–2.5 kg)", was: 1300, now: 1100 },
    ],
  },
  {
    id: "layers", name: "Layers", img: imgLayers,
    desc: "Productive layer hens that deliver consistent, high-quality brown eggs.",
    sizes: [
      { label: "Point of Lay (16–18 wks)", was: 1500, now: 1200 },
      { label: "Mature Layer", was: 1200, now: 950 },
      { label: "Tray of Eggs (30 pcs)", was: 600, now: 480 },
    ],
  },
  {
    id: "turkeys", name: "Turkeys", img: imgTurkeys,
    desc: "Healthy, free-range turkeys — perfect for family feasts and restaurants.",
    sizes: [
      { label: "Young Turkey (4–6 kg)", was: 5000, now: 4200 },
      { label: "Mature Turkey (8–10 kg)", was: 9000, now: 7500 },
    ],
  },
  {
    id: "chicks", name: "Day-Old Chicks", img: imgChicks,
    desc: "Vaccinated, vigorous day-old chicks ready to start your flock.",
    sizes: [
      { label: "Broiler Chick", was: 130, now: 100 },
      { label: "Layer Chick", was: 150, now: 120 },
      { label: "Kienyeji (Improved)", was: 120, now: 90 },
    ],
  },
  {
    id: "incubation", name: "Egg Incubation", img: imgIncubation,
    desc: "Bring your fertile eggs — we hatch, you collect healthy chicks.",
    sizes: [
      { label: "Per Egg (Chicken)", was: 30, now: 20 },
      { label: "Per Egg (Turkey)", was: 60, now: 45 },
      { label: "Bulk 100+ eggs", was: 25, now: 15 },
    ],
  },
  {
    id: "consult", name: "Poultry Consultations", img: hero,
    desc: "1-on-1 expert advice on housing, feeding, vaccinations & profitability.",
    sizes: [
      { label: "Phone / Video Session (1 hr)", was: 2500, now: 1800 },
      { label: "On-Farm Visit (Siaya region)", was: 6000, now: 4500 },
      { label: "Full Setup Plan", was: 15000, now: 12000 },
    ],
  },
];

const BREEDS = [
  "Cobb 500 Broilers", "Ross 308 Broilers",
  "Isa Brown Layers", "Lohmann Brown Layers",
  "KARI Improved Kienyeji", "Kuroiler",
  "Black Australorp", "Broad-Breasted Bronze Turkey", "Beltsville White Turkey",
];

const BENEFITS = [
  { icon: Drumstick, title: "Lean Chicken Meat", text: "High in protein, low in fat — supports muscle health and weight management." },
  { icon: Heart, title: "Heart-Healthy Turkey", text: "Rich in B-vitamins, selenium and tryptophan; lower cholesterol than red meat." },
  { icon: Egg, title: "Farm-Fresh Eggs", text: "A complete protein source with essential omega-3s and vitamin D." },
  { icon: Leaf, title: "Naturally Raised", text: "Clean feed and humane housing — no shortcuts, just healthy birds." },
];

function formatKsh(n: number) {
  return "Ksh " + n.toLocaleString("en-KE");
}

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-center" richColors />
      <WhatsAppFloat href={SOCIALS.whatsapp} />
      <Header />
      <Hero />
      <Trust />
      <Products />
      <Breeds />
      <Benefits />
      <Location />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <img src={logo} alt="The Kogogo Farm Siaya logo" className="h-11 w-11 rounded-md object-cover" />
          <div className="leading-tight">
            <div className="font-display text-lg font-bold text-primary">The Kogogo Farm</div>
            <div className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Siaya · Healthy & Fresh</div>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#products" className="hover:text-primary">Products</a>
          <a href="#breeds" className="hover:text-primary">Breeds</a>
          <a href="#benefits" className="hover:text-primary">Benefits</a>
          <a href="#location" className="hover:text-primary">Location</a>
          <a href="#faq" className="hover:text-primary">FAQ</a>
          <a href="#contact" className="hover:text-primary">Contact</a>
        </nav>
        <a href="#contact">
          <Button className="bg-primary hover:bg-primary/90">Order Now</Button>
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <img src={hero} alt="Healthy free-range chickens at The Kogogo Farm in Siaya" className="absolute inset-0 h-full w-full object-cover" width={1600} height={1024} />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-36 text-white">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs uppercase tracking-widest">
          <Sparkles className="h-3.5 w-3.5" /> Healthy & Fresh · Siaya, Kenya
        </span>
        <h1 className="mt-5 font-display text-4xl md:text-6xl font-bold max-w-3xl leading-tight">
          Premium Broilers, Layers, Turkeys & Chicks — Straight From The Kogogo Farm.
        </h1>
        <p className="mt-5 max-w-2xl text-base md:text-lg text-white/85">
          Vaccinated, naturally-raised poultry and expert farming consultations.
          Order fresh from Siaya today and taste the Kogogo difference.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#products">
            <Button size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90 shadow-[var(--shadow-glow)]">
              Shop Poultry
            </Button>
          </a>
          <a href={SOCIALS.whatsapp} target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="bg-white/10 border-white/40 text-white hover:bg-white/20">
              WhatsApp Order
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

function Trust() {
  const items = [
    { icon: ShieldCheck, t: "Vaccinated Stock" },
    { icon: Truck, t: "Delivery in Siaya & Kisumu" },
    { icon: GraduationCap, t: "Expert Consultations" },
    { icon: Leaf, t: "Naturally Raised" },
  ];
  return (
    <div className="border-y border-border bg-secondary/40">
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(({ icon: Icon, t }) => (
          <div key={t} className="flex items-center gap-3 text-sm font-medium text-secondary-foreground">
            <Icon className="h-5 w-5 text-primary" /> {t}
          </div>
        ))}
      </div>
    </div>
  );
}

function Products() {
  return (
    <section id="products" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHead eyebrow="Our Products & Services" title="Quality poultry, fair prices." sub="Limited-time launch discounts. All prices in Kenya Shillings." />
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <article key={p.id} className="group rounded-xl bg-card border border-border overflow-hidden shadow-[var(--shadow-soft)] hover:-translate-y-1 transition-transform">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.img} alt={`${p.name} at The Kogogo Farm Siaya`} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold text-primary">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                <ul className="mt-4 space-y-2">
                  {p.sizes.map((s) => (
                    <li key={s.label} className="flex items-center justify-between text-sm border-b border-dashed border-border pb-2">
                      <span>{s.label}</span>
                      <span className="flex items-baseline gap-2">
                        <span className="text-xs text-muted-foreground line-through">{formatKsh(s.was)}</span>
                        <span className="font-semibold text-primary">{formatKsh(s.now)}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <a href={`${SOCIALS.whatsapp}?text=${encodeURIComponent("Hi Kogogo Farm, I'd like to order " + p.name + ".")}`} target="_blank" rel="noopener noreferrer" className="block mt-5">
                  <Button className="w-full bg-primary hover:bg-primary/90">Order {p.name}</Button>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Breeds() {
  return (
    <section id="breeds" className="py-20 bg-secondary/40 border-y border-border">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHead eyebrow="Breeds We Rear" title="Carefully selected, proven performers." sub="Each breed is raised with care to deliver the best meat or egg yield for Kenyan farmers and households." />
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          {BREEDS.map((b) => (
            <span key={b} className="rounded-full bg-card border border-border px-4 py-2 text-sm font-medium text-secondary-foreground shadow-sm">
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section id="benefits" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHead eyebrow="Why Eat Kogogo Poultry" title="Real nutrition, real flavour." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-xl border border-border p-6 bg-card shadow-[var(--shadow-soft)]">
              <div className="h-11 w-11 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-gold)" }}>
                <Icon className="h-5 w-5 text-gold-foreground" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section id="location" className="py-20 bg-secondary/40 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <SectionHead align="left" eyebrow="Visit The Farm" title="Find us in Siaya Town." sub="We welcome farmers, restaurants and families. Walk-ins welcome during business hours." />
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-start gap-3"><MapPin className="h-5 w-5 text-primary mt-0.5" /> Siaya Town, Siaya County, Kenya</li>
            <li className="flex items-start gap-3"><Phone className="h-5 w-5 text-primary mt-0.5" /> {SOCIALS.whatsappNumber}</li>
            <li className="flex items-start gap-3"><Mail className="h-5 w-5 text-primary mt-0.5" /> {SOCIALS.email}</li>
          </ul>
          <div className="mt-6 flex gap-3">
            <a href="https://www.google.com/maps?q=Siaya+Town,+Kenya" target="_blank" rel="noopener noreferrer">
              <Button className="bg-primary hover:bg-primary/90">Get Directions</Button>
            </a>
            <a href={SOCIALS.whatsapp} target="_blank" rel="noopener noreferrer">
              <Button variant="outline">Chat First</Button>
            </a>
          </div>
        </div>
        <div className="rounded-xl overflow-hidden border border-border shadow-[var(--shadow-soft)]">
          <iframe
            title="The Kogogo Farm — Siaya Town"
            src="https://www.google.com/maps?q=Siaya+Town,+Kenya&output=embed"
            className="w-full h-[360px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Do you deliver outside Siaya?", a: "Yes — we deliver across Siaya, Kisumu and surrounding counties. Bulk orders can be arranged nationwide." },
    { q: "Are the chicks vaccinated?", a: "All our day-old chicks are vaccinated against Marek's, Newcastle and Gumboro before leaving the farm." },
    { q: "What feed do you use?", a: "We use certified starter, grower and finisher feeds and supplement with greens for naturally healthy birds." },
    { q: "Can I bring my eggs for incubation?", a: "Yes. Drop off fertile eggs at the farm; we'll handle the 21-day cycle and notify you on hatch day." },
    { q: "Do you offer training?", a: "Yes — book a consultation for setup planning, disease prevention or full farm visits." },
  ];
  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-4">
        <SectionHead eyebrow="FAQs" title="Quick answers." />
        <Accordion type="single" collapsible className="mt-8">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`f-${i}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function Contact() {
  const [sending, setSending] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const phone = String(data.get("phone") || "");
    const message = String(data.get("message") || "");
    const body = `Hi Kogogo Farm,%0A%0AName: ${name}%0AEmail: ${email}%0APhone: ${phone}%0A%0A${encodeURIComponent(message)}`;
    // Open both: mailto and WhatsApp prefilled
    window.open(`${SOCIALS.whatsapp}?text=${body}`, "_blank");
    window.location.href = `mailto:${SOCIALS.email}?subject=${encodeURIComponent("Inquiry from " + name)}&body=${body}`;
    toast.success("Opening WhatsApp & Email — your message is ready to send.");
    setTimeout(() => { setSending(false); form.reset(); }, 800);
  };
  return (
    <section id="contact" className="py-20 bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-12">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-gold">Contact</span>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold">Talk to the farm owner.</h2>
          <p className="mt-3 text-primary-foreground/80 max-w-md">
            Send us a message — we'll respond by WhatsApp or email, usually within an hour.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-center gap-3"><MapPin className="h-5 w-5 text-gold" /> Siaya Town, Kenya</li>
            <li className="flex items-center gap-3"><Phone className="h-5 w-5 text-gold" /> {SOCIALS.whatsappNumber}</li>
            <li className="flex items-center gap-3"><Mail className="h-5 w-5 text-gold" /> {SOCIALS.email}</li>
          </ul>
          <Socials className="mt-8" />
        </div>
        <form onSubmit={onSubmit} className="rounded-xl bg-background text-foreground p-6 md:p-8 shadow-[var(--shadow-soft)] space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required placeholder="Your full name" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" required placeholder="+254…" className="mt-1" />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required placeholder="you@email.com" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" required rows={5} placeholder="Tell us what you need…" className="mt-1" />
          </div>
          <Button type="submit" disabled={sending} className="w-full bg-primary hover:bg-primary/90">
            <Send className="h-4 w-4" /> {sending ? "Opening…" : "Send Message"}
          </Button>
          <p className="text-xs text-muted-foreground text-center">Sends via WhatsApp & opens your email app.</p>
        </form>
      </div>
    </section>
  );
}

function Socials({ className = "" }: { className?: string }) {
  const Item = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      className="h-10 w-10 inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-gold hover:text-gold-foreground transition-colors">
      {children}
    </a>
  );
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Item href={SOCIALS.x} label="X (Twitter)">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M18.244 2H21l-6.52 7.45L22 22h-6.79l-4.78-6.24L4.8 22H2l6.97-7.96L2 2h6.91l4.32 5.71L18.244 2Zm-1.19 18h1.83L7.05 4H5.1l11.954 16Z"/></svg>
      </Item>
      <Item href={SOCIALS.instagram} label="Instagram">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
      </Item>
      <Item href={SOCIALS.tiktok} label="TikTok">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M16.5 3a5.5 5.5 0 0 0 4.5 4.5V11a8.4 8.4 0 0 1-4.5-1.4V16a6 6 0 1 1-6-6c.34 0 .67.03 1 .1v3.2a3 3 0 1 0 2 2.7V3h3Z"/></svg>
      </Item>
      <Item href={SOCIALS.whatsapp} label="WhatsApp">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M20 12a8 8 0 1 1-15.07-3.7L4 20l3.84-1A8 8 0 0 0 20 12Zm-8-6a6 6 0 0 0-5.13 9.1l-.5 1.84 1.9-.5A6 6 0 1 0 12 6Zm3.4 7.4c-.2-.1-1.16-.57-1.34-.64-.18-.07-.31-.1-.44.1-.13.2-.5.63-.62.76-.11.13-.23.14-.43.05-.2-.1-.84-.31-1.6-1-.6-.53-1-1.18-1.11-1.38-.12-.2-.01-.31.09-.41.09-.09.2-.23.3-.34.1-.11.13-.2.2-.33.07-.13.03-.25-.02-.34-.05-.1-.44-1.06-.6-1.45-.16-.39-.32-.34-.44-.34h-.38c-.13 0-.34.05-.52.25s-.69.67-.69 1.64.71 1.9.81 2.04c.1.13 1.4 2.13 3.39 2.99.47.2.84.32 1.13.41.47.15.9.13 1.24.08.38-.06 1.16-.47 1.32-.93.16-.45.16-.84.11-.93-.05-.09-.18-.15-.38-.25Z"/></svg>
      </Item>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground text-background/90 py-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="" className="h-9 w-9 rounded-md object-cover" />
          <div className="text-sm">
            <div className="font-semibold">The Kogogo Farm · Siaya</div>
            <div className="text-background/60">© {new Date().getFullYear()} Healthy & Fresh Poultry, Kenya.</div>
          </div>
        </div>
        <Socials />
      </div>
    </footer>
  );
}

function SectionHead({ eyebrow, title, sub, align = "center" }: { eyebrow: string; title: string; sub?: string; align?: "center" | "left" }) {
  return (
    <div className={align === "center" ? "text-center max-w-2xl mx-auto" : ""}>
      <span className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">{eyebrow}</span>
      <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
    </div>
  );
}
