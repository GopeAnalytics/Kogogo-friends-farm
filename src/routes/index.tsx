import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  Egg,
  Drumstick,
  Leaf,
  Heart,
  ShieldCheck,
  Sparkles,
  Truck,
  GraduationCap,
  Menu,
} from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { GalleryGrid } from "@/components/site/GalleryGrid";
import logo from "@/assets/logo.jpeg";
import hero from "@/assets/hero-poultry.jpg";
import imgBroilers from "@/assets/broilers.jpg";
import imgLayers from "@/assets/layers.jpg";
import imgTurkeys from "@/assets/turkeys.jpg";
import imgChicks from "@/assets/chicks.jpg";
import imgIncubation from "@/assets/incubation.jpg";
import videoFarmVisit from "@/assets/farm-visit.mp4";
import videoIncubation from "@/assets/incubation.mp4";
import farmOwner from "@/assets/farm-owner.png";
import poultryExpert from "@/assets/poultry-expert.jpg";
import userIcon from "@/assets/user-icon.png";
import malayChicken from "@/assets/gallery/photo-9a.jpg";
import seramaChicken from "@/assets/gallery/serama.jpeg";
import brahmaChickens from "@/assets/gallery/photo-10a.jpg";
import lightBrahmaVariety from "@/assets/gallery/photo-11a.jpg";
import plymouthRockRooster from "@/assets/gallery/photo-3b.jpg";
import whiteHollandTurkey from "@/assets/gallery/photo-6b.jpg";
import helmetedGuineaFowl from "@/assets/gallery/photo-7a.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "The Kogogo Farm Siaya | Broilers, Layers, Turkeys, Chicks & Egg Incubation in Kenya",
      },
      {
        name: "description",
        content:
          "Buy healthy broilers, layers, turkeys and day-old chicks in Siaya, Kenya. Egg incubation services and expert poultry farming consultations. Order fresh poultry today.",
      },
      {
        name: "keywords",
        content:
          "poultry farm Siaya, broilers Kenya, layers chicken Kenya, turkey farm Kenya, day old chicks Siaya, egg incubation Kenya, poultry consultation, Kogogo Farm",
      },
      { property: "og:title", content: "The Kogogo Farm Siaya — Healthy & Fresh Poultry" },
      {
        property: "og:description",
        content: "Premium broilers, layers, turkeys, chicks & egg incubation in Siaya, Kenya.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Home,
});

// Replace placeholders with real handles when available
const SOCIALS = {
  whatsapp: "https://wa.me/254724844696",
  whatsappNumber: "+254 724 844 696",
  email: "info@thekogogofarm.co.ke",
  x: "https://x.com/kogogofarm",
  instagram: "https://instagram.com/kogogofarm",
  tiktok: "https://www.tiktok.com/@the.kogogofarmsiaya?_r=1&_t=ZS-9795gipP0bs",
};

const PRODUCTS = [
  {
    id: "Hybrid",
    name: "Hybrid Roosters",
    img: imgBroilers,
    desc: "Fast-growing breeding and meat chickens raised on clean feed for tender, juicy meat.",
    sizes: [
      { label: "Small (1.2–1.5 kg)", was: 700, now: 650 },
      { label: "Medium (1.6–2.0 kg)", was: 950, now: 800 },
      { label: "Large (2.1–2.5 kg)", was: 1300, now: 1100 },
    ],
  },
  {
    id: "layers",
    name: "Layers",
    img: imgLayers,
    desc: "Productive layer hens that deliver consistent, high-quality brown eggs.",
    sizes: [
      { label: "Point of Lay (16–18 wks)", was: 1500, now: 1200 },
      { label: "Mature Layer", was: 1200, now: 950 },
      { label: "Tray of Eggs (30 pcs)", was: 600, now: 480 },
    ],
  },
  {
    id: "turkeys",
    name: "Turkeys",
    img: imgTurkeys,
    desc: "Healthy, free-range turkeys — perfect for family feasts and restaurants.",
    sizes: [
      { label: "Young Turkey (4–6 kg)", was: 5000, now: 4200 },
      { label: "Mature Turkey (8–10 kg)", was: 9000, now: 7500 },
    ],
  },
  {
    id: "chicks",
    name: "Day-Old Chicks",
    img: imgChicks,
    desc: "Vaccinated, vigorous day-old chicks ready to start your flock.",
    sizes: [
      { label: "Broiler Chick", was: 130, now: 100 },
      { label: "Layer Chick", was: 150, now: 120 },
      { label: "Kienyeji (Improved)", was: 120, now: 90 },
    ],
  },
  {
    id: "incubation",
    name: "Egg Incubation",
    img: imgIncubation,
    desc: "Bring your fertile eggs — we hatch, you collect healthy chicks.",
    sizes: [
      { label: "Per Egg (Chicken)", was: 30, now: 20 },
      { label: "Per Egg (Turkey)", was: 60, now: 45 },
      { label: "Bulk 100+ eggs", was: 25, now: 15 },
    ],
  },
  {
    id: "consult",
    name: "Poultry Consultations",
    img: hero,
    desc: "1-on-1 expert advice on housing, feeding, vaccinations & profitability.",
    sizes: [
      { label: "Phone / Video Session (1 hr)", was: 2500, now: 1800 },
      { label: "On-Farm Visit (Siaya region)", was: 6000, now: 4500 },
      { label: "Full Setup Plan", was: 15000, now: 12000 },
    ],
  },
];

const BREEDS = [
  {
    name: "Malay Chicken",
    img: malayChicken,
    desc: "Tall, powerful heritage chickens known for their striking build and premium meat quality.",
  },
  {
    name: "Serama Chicken",
    img: seramaChicken,
    desc: "Small, elegant ornamental chickens prized for their confident posture and charming temperament.",
  },
  {
    name: "Brahma Chickens",
    img: brahmaChickens,
    desc: "Gentle giant chickens with feathered legs, calm nature, and excellent family-farm appeal.",
  },
  {
    name: "Light Brahma Variety",
    img: lightBrahmaVariety,
    desc: "A beautiful Brahma variety with bold contrast, steady temperament, and impressive size.",
  },
  {
    name: "Plymouth Rock Rooster",
    img: plymouthRockRooster,
    desc: "A hardy rooster with distinctive barred plumage and strong breeding qualities.",
  },
  {
    name: "White Holland Turkey",
    img: whiteHollandTurkey,
    desc: "A clean white turkey variety raised for good growth, tender meat, and farm presence.",
  },
  {
    name: "Helmeted Guinea Fowl",
    img: helmetedGuineaFowl,
    desc: "Active foragers valued for pest control, nutritious meat, and distinctive spotted plumage.",
  },
];

const BENEFITS = [
  {
    icon: Drumstick,
    title: "Lean Chicken Meat",
    text: "High in protein, low in fat — supports muscle health and weight management.",
  },
  {
    icon: Heart,
    title: "Heart-Healthy Turkey",
    text: "Rich in B-vitamins, selenium and tryptophan; lower cholesterol than red meat.",
  },
  {
    icon: Egg,
    title: "Farm-Fresh Eggs",
    text: "A complete protein source with essential omega-3s and vitamin D.",
  },
  {
    icon: Leaf,
    title: "Naturally Raised",
    text: "Clean feed and humane housing — no shortcuts, just healthy birds.",
  },
];

const TESTIMONIALS = [
  {
    name: "Martha, Local Farmer",
    quote:
      "The Kogogo Farm team helped me choose the right breeds and my flock is healthier than ever.",
  },
  {
    name: "John, Restaurant Owner",
    quote: "Fresh poultry delivered on time with consistent quality — customers keep coming back.",
  },
  {
    name: "Grace, Poultry Enthusiast",
    quote: "Their consultation service gave me confidence to start my own small farm business.",
  },
];

function formatKsh(n: number) {
  return "Ksh " + n.toLocaleString("en-KE");
}

function About() {
  const slides = [hero, imgLayers, imgBroilers];
  const team = [
    {
      name: "Mr.Julius Ogogoh",
      role: "Farm Owner",
      img: farmOwner,
      bio: "Leads Kogogo Farm with a focus on healthy birds, sustainable farming and long-term trust in every delivery.",
    },
    {
      name: "Mr.Ojwang'",
      role: "Poultry Expert",
      img: poultryExpert,
      bio: "Oversees bird welfare, nutrition and flock health to keep every batch strong and market-ready.",
    },
    {
      name: "Mr.Evans",
      role: "Operations Lead",
      img: userIcon,
      bio: "Manages farm logistics and customer orders so every delivery arrives fresh and on schedule.",
    },
  ];

  return (
    <section id="about" className="relative overflow-hidden py-24">
      <div className="about-slideshow absolute inset-0 -z-10">
        {slides.map((src, index) => (
          <div
            key={src}
            className="about-slide"
            style={{ backgroundImage: `url(${src})`, animationDelay: `${index * 5}s` }}
          />
        ))}
        <div className="absolute inset-0 bg-emerald-950/65" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] items-start">
          <div className="rounded-[2rem] border border-emerald-200/10 bg-emerald-950/85 p-10 shadow-[0_30px_90px_-40px_rgba(7,89,50,0.55)] text-white">
            <span className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
              About Kogogo Farm
            </span>
            <h2 className="mt-4 text-4xl font-display font-bold leading-tight text-white sm:text-5xl">
              A modern poultry farm with a heart for quality.
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-emerald-100/90 md:text-lg">
              The Kogogo Farm is about Kuku for you — providing the best, healthy and well reared
              poultry. Whether it is for commercial or family consumption, or you are just a lover
              of poultry, this is the place to find tender birds, trustworthy service and real
              farming expertise.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-emerald-300/15 bg-emerald-900/40 p-6">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-200">
                  <Leaf className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-semibold text-white">Mission</h3>
                <p className="mt-3 text-sm text-emerald-100/70">
                  Provide healthy poultry, ethical care, and reliable support to every Kenyan family
                  and business.
                </p>
              </div>
              <div className="rounded-3xl border border-emerald-300/15 bg-emerald-900/40 p-6">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-200">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-semibold text-white">Vision</h3>
                <p className="mt-3 text-sm text-emerald-100/70">
                  A region where fresh poultry is trusted, accessible and farmed with pride.
                </p>
              </div>
              <div className="rounded-3xl border border-emerald-300/15 bg-emerald-900/40 p-6">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-200">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-semibold text-white">Promise</h3>
                <p className="mt-3 text-sm text-emerald-100/70">
                  Consistent quality, responsive service, and poultry raised with care.
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#contact">
                <Button className="animated-gradient-button text-white">Contact Us</Button>
              </a>
              <a href="#breeds">
                <Button className="text-white bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30">
                  Explore Breeds
                </Button>
              </a>
            </div>
          </div>

          <div className="grid gap-5">
            {team.map((member) => (
              <div
                key={member.name}
                className="group overflow-hidden rounded-[2rem] border border-emerald-300/15 bg-emerald-950/80 shadow-[0_24px_90px_-50px_rgba(7,89,50,0.55)] transition hover:-translate-y-1"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-emerald-950/90 via-transparent to-transparent" />
                </div>
                <div className="p-6 text-white">
                  <div className="text-sm uppercase tracking-[0.25em] text-emerald-200/70">
                    {member.role}
                  </div>
                  <h3 className="mt-3 text-2xl font-semibold">{member.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-emerald-100/70">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
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
      <Services />
      <Breeds />
      <About />
      <Gallery />
      <Benefits />
      <Location />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}

function Header() {
  const [activeSection, setActiveSection] = useState("products");

  useEffect(() => {
    const sections = ["products", "breeds", "about", "gallery", "benefits", "location", "contact"];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLink = (href: string, label: string) => (
    <a
      href={href}
      className={`transition-colors ${
        activeSection === href.slice(1)
          ? "text-primary font-semibold border-b-2 border-primary pb-1"
          : "hover:text-primary"
      }`}
    >
      {label}
    </a>
  );

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <img
            src={logo}
            alt="The Kogogo Farm Siaya logo"
            className="h-11 w-11 rounded-md object-cover"
          />
          <div className="leading-tight">
            <div className="font-display text-lg font-bold text-primary">The Kogogo Farm</div>
            <div className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
              Siaya · Healthy & Fresh
            </div>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLink("#products", "Products")}
          {navLink("#breeds", "Breeds")}
          {navLink("#about", "About")}
          {navLink("#gallery", "Gallery")}
          {navLink("#benefits", "Benefits")}
          {navLink("#location", "Location")}
          {navLink("#contact", "Contact")}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#contact" className="hidden md:inline-block">
            <Button className="animated-gradient-button text-white shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60">
              Order Now
            </Button>
          </a>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="max-w-[21rem] rounded-3xl border border-border bg-background/95 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl"
            >
              <SheetHeader className="pb-4">
                <SheetTitle className="text-lg font-semibold">Navigation</SheetTitle>
                <SheetDescription className="text-sm text-muted-foreground">
                  Jump to any section of the site.
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-2 pt-4">
                <SheetClose asChild>
                  <a
                    href="#products"
                    className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                      activeSection === "products"
                        ? "bg-primary/20 text-primary font-semibold"
                        : "text-foreground hover:bg-secondary/60"
                    }`}
                  >
                    Products
                  </a>
                </SheetClose>
                <SheetClose asChild>
                  <a
                    href="#breeds"
                    className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                      activeSection === "breeds"
                        ? "bg-primary/20 text-primary font-semibold"
                        : "text-foreground hover:bg-secondary/60"
                    }`}
                  >
                    Breeds
                  </a>
                </SheetClose>
                <SheetClose asChild>
                  <a
                    href="#gallery"
                    className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                      activeSection === "gallery"
                        ? "bg-primary/20 text-primary font-semibold"
                        : "text-foreground hover:bg-secondary/60"
                    }`}
                  >
                    Gallery
                  </a>
                </SheetClose>
                <SheetClose asChild>
                  <a
                    href="#benefits"
                    className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                      activeSection === "benefits"
                        ? "bg-primary/20 text-primary font-semibold"
                        : "text-foreground hover:bg-secondary/60"
                    }`}
                  >
                    Benefits
                  </a>
                </SheetClose>
                <SheetClose asChild>
                  <a
                    href="#location"
                    className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                      activeSection === "location"
                        ? "bg-primary/20 text-primary font-semibold"
                        : "text-foreground hover:bg-secondary/60"
                    }`}
                  >
                    Location
                  </a>
                </SheetClose>
                <SheetClose asChild>
                  <a
                    href="#contact"
                    className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                      activeSection === "contact"
                        ? "bg-primary/20 text-primary font-semibold"
                        : "text-foreground hover:bg-secondary/60"
                    }`}
                  >
                    Contact
                  </a>
                </SheetClose>
              </div>

              <div className="mt-6 space-y-3">
                <SheetClose asChild>
                  <a href="#contact" className="block">
                    <Button className="w-full animated-gradient-button text-white shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60">
                      Order Now
                    </Button>
                  </a>
                </SheetClose>
                <SheetClose asChild>
                  <a
                    href={SOCIALS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="outline" className="w-full">
                      WhatsApp Order
                    </Button>
                  </a>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

const HERO_SLIDES = [
  {
    id: "welcome",
    title: "Welcome to Kogogo Farm",
    subtitle: "Fresh poultry, trusted farming support, local to Siaya.",
    description:
      "Delivering premium broilers, healthy layers, and reliable poultry advice with care for every customer.",
    button: "Explore the farm",
    href: "#products",
    image: hero,
  },
  {
    id: "about",
    title: "About us",
    subtitle: "A local farm built on trust and consistent quality.",
    description:
      "Kogogo Farm brings ethical poultry production to Siaya — from free-range broilers to trusted farming advice for Kenyan households.",
    button: "Learn more",
    href: "#about",
    image: imgLayers,
  },
  {
    id: "services",
    title: "Services",
    subtitle: "Farm visits, flock selection, consultations and hatchery support.",
    description:
      "Book a farm tour, choose the right flock, get expert poultry consultations, or incubate eggs with confidence.",
    button: "Talk to us",
    href: "#services",
    image: imgBroilers,
  },
  {
    id: "testimonials",
    title: "Testimonials",
    subtitle: "See why customers keep choosing Kogogo Farm.",
    description:
      "Fresh poultry, dependable delivery, and hands-on support — heard directly from our satisfied customers.",
    button: "See what people say",
    href: "#testimonials",
    image: imgTurkeys,
  },
];

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!heroRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % HERO_SLIDES.length);
    }, 7500);
    return () => window.clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    const element = slideRefs.current[activeSlide];
    // Only auto-scroll slides when the hero section is still near the top
    const heroEl = heroRef.current;
    if (!element || !heroEl) return;
    const rect = heroEl.getBoundingClientRect();
    const heroNearTop = rect.top >= -50 && rect.top <= 200;
    if (heroNearTop) {
      element.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [activeSlide]);

  return (
    <section id="top" ref={heroRef} className="relative isolate overflow-hidden bg-slate-950">
      <div className="relative">
        <div
          className="no-scrollbar flex min-h-[720px] snap-x snap-mandatory overflow-x-auto scroll-smooth cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              ref={(element) => (slideRefs.current[index] = element)}
              className="snap-center relative min-w-full overflow-hidden"
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 h-full w-full object-cover brightness-[0.55]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/75" />
              <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-center px-6 py-24 text-white sm:px-10 lg:px-16">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/90 backdrop-blur-sm">
                  <Sparkles className="h-4 w-4" />
                  {slide.id === "welcome" ? "Welcome" : slide.title}
                </span>
                <h1 className="mt-8 max-w-3xl text-4xl font-display font-bold leading-tight text-white md:text-6xl">
                  {slide.subtitle}
                </h1>
                <p className="mt-6 max-w-2xl text-base text-white/80 md:text-lg">
                  {slide.description}
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <a href={slide.href} className="inline-block">
                    <Button size="lg" className="animated-gradient-button text-white">
                      {slide.button}
                    </Button>
                  </a>
                  <a
                    href={SOCIALS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="whatsapp-cta bg-white/10 border-white/40 text-white hover:bg-white/20"
                    >
                      WhatsApp Order
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-8 flex justify-center gap-3">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={`dot-${index}`}
            type="button"
            aria-label={`Show ${HERO_SLIDES[index].title}`}
            onClick={() => setActiveSlide(index)}
            className={`h-3 w-3 rounded-full transition-colors ${activeSlide === index ? "bg-white" : "bg-white/30"}`}
          />
        ))}
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
          <div
            key={t}
            className="flex items-center gap-3 text-sm font-medium text-secondary-foreground"
          >
            <Icon className="h-5 w-5 text-primary" /> {t}
          </div>
        ))}
      </div>
    </div>
  );
}

function Products() {
  return (
    <section id="products" className="relative py-20 md:py-28">
      <div id="services" className="absolute -top-24" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4">
        <SectionHead
          eyebrow="Our Products & Services"
          title="Quality poultry, fair prices."
          sub="Limited-time launch discounts. All prices in Kenya Shillings."
        />
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <article
              key={p.id}
              className="group rounded-xl bg-card border border-border overflow-hidden shadow-[var(--shadow-soft)] hover:-translate-y-1 transition-transform"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={p.img}
                  alt={`${p.name} at The Kogogo Farm Siaya`}
                  loading="lazy"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold text-primary">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                <ul className="mt-4 space-y-2">
                  {p.sizes.map((s) => (
                    <li
                      key={s.label}
                      className="flex items-center justify-between text-sm border-b border-dashed border-border pb-2"
                    >
                      <span>{s.label}</span>
                      <span className="flex items-baseline gap-2">
                        <span className="text-xs text-muted-foreground line-through">
                          {formatKsh(s.was)}
                        </span>
                        <span className="font-semibold text-primary">{formatKsh(s.now)}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`${SOCIALS.whatsapp}?text=${encodeURIComponent("Hi Kogogo Farm, I'd like to order " + p.name + ".")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-5"
                >
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

function Services() {
  const incubationSteps = [
    { stage: "Bring Eggs", description: "Client brings fertile eggs to the farm for incubation" },
    {
      stage: "Incubation Period",
      description: "Eggs incubate for 21 days in controlled temperature & humidity",
    },
    { stage: "Hatching", description: "Eggs hatch and chicks emerge healthy and vigorous" },
    { stage: "Pick Up", description: "Collect your healthy day-old chicks ready to grow" },
  ];

  return (
    <section id="services" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHead
          eyebrow="Our Services"
          title="Professional poultry services."
          sub="Expert support from farm visits to full egg incubation."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Farm Visits & Poultry Selection */}
          <article className="group rounded-xl border border-border bg-card overflow-hidden shadow-[var(--shadow-soft)] hover:-translate-y-1 transition-transform">
            <div className="relative h-64 overflow-hidden bg-slate-900">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-60 z-0"
              >
                <source src={videoFarmVisit} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 via-slate-900/20 to-transparent z-0" />

              {/* Overlay: title, description, button */}
              <div className="absolute inset-0 flex items-end md:items-center z-10">
                <div className="w-full md:mx-6 md:my-6 max-w-2xl rounded-none md:rounded-xl bg-background/40 p-4 md:p-6 backdrop-blur-sm md:backdrop-blur-md text-foreground">
                  <h3 className="font-display text-lg md:text-2xl font-semibold">
                    Farm Visits & Poultry Selection
                  </h3>
                  <p className="mt-2 text-xs md:text-sm text-muted-foreground">
                    Get expert guidance on selecting the right poultry breeds and stock for your
                    needs. Our team helps you choose healthy birds suited to your farming goals.
                  </p>
                  <div className="mt-4 md:mt-6">
                    <a
                      href={`${SOCIALS.whatsapp}?text=${encodeURIComponent("Hi Kogogo Farm, I'd like to book a farm visit and get poultry selection guidance. Please let me know available slots.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="bg-primary">Book a Slot</Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8">
              <ul className="mt-2 space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Expert breed recommendation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Health assessment of stock</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Personalized farming advice</span>
                </li>
              </ul>
            </div>
          </article>

          {/* Incubation Services */}
          <article className="group rounded-xl border border-border bg-card overflow-hidden shadow-[var(--shadow-soft)] hover:-translate-y-1 transition-transform">
            <div className="relative h-64 overflow-hidden bg-slate-900">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-60 z-0"
              >
                <source src={videoIncubation} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 via-slate-900/20 to-transparent z-0" />

              {/* Overlay: title, short description & button */}
              <div className="absolute inset-0 flex items-end md:items-center z-10">
                <div className="w-full md:mx-6 md:my-6 max-w-2xl rounded-none md:rounded-xl bg-background/40 p-4 md:p-6 backdrop-blur-sm md:backdrop-blur-md text-foreground">
                  <h3 className="font-display text-lg md:text-2xl font-semibold">
                    Egg Incubation Services
                  </h3>
                  <p className="mt-2 text-xs md:text-sm text-muted-foreground">
                    Professional egg incubation with controlled temperature, humidity, and expert
                    care from start to healthy hatch.
                  </p>
                  <div className="mt-4 md:mt-6">
                    <a
                      href={`${SOCIALS.whatsapp}?text=${encodeURIComponent("Hi Kogogo Farm, I'm interested in your egg incubation services. I'd like to inquire about available slots and pricing.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="bg-primary">Inquire for Slot</Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="mt-6 space-y-4">
                <div className="text-sm font-semibold text-primary uppercase tracking-[0.1em]">
                  Incubation Process
                </div>
                <div className="grid gap-3">
                  {incubationSteps.map((step, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 pb-3 border-b border-border last:border-0"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{step.stage}</div>
                        <div className="text-xs text-muted-foreground">{step.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Breeds() {
  const breedsRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!breedsRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(breedsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="breeds" ref={breedsRef} className="py-20 bg-secondary/40 border-y border-border">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHead
          eyebrow="Breeds We Rear"
          title="Our Birds of Gold"
          sub="Each breed is raised with care to deliver the best meat or egg yield for Kenyan farmers and households."
        />
        <div
          className={`mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-700 ease-out`}
        >
          {BREEDS.map((breed) => (
            <article
              key={breed.name}
              className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-border bg-card shadow-[var(--shadow-soft)] transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_-35px_rgba(0,0,0,0.25)]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900/10">
                <img
                  loading="eager"
                  decoding="async"
                  src={breed.img}
                  alt={breed.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white backdrop-blur-sm">
                  Breed
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-semibold text-foreground">{breed.name}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{breed.desc}</p>
                <a
                  href={`${SOCIALS.whatsapp}?text=${encodeURIComponent("Hi Kogogo Farm, I'm interested in the " + breed.name + " breed. Could you share availability and price?")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 block sm:mt-auto sm:pt-6"
                >
                  <Button className="w-full bg-primary hover:bg-primary/90">Inquire</Button>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return <GalleryGrid />;
}

function Benefits() {
  return (
    <section id="benefits" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHead eyebrow="Why Eat Kogogo Poultry" title="Real nutrition, real flavour." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-xl border border-border p-6 bg-card shadow-[var(--shadow-soft)]"
            >
              <div
                className="h-11 w-11 rounded-lg flex items-center justify-center"
                style={{ background: "var(--gradient-gold)" }}
              >
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

function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-secondary/40 border-y border-border">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHead
          eyebrow="Testimonials"
          title="What customers say about Kogogo Farm."
          sub="Fresh poultry, trusted service and expert farm guidance — heard directly from our customers."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.name}
              className="rounded-[2rem] border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-1 hover:border-primary/40"
            >
              <p className="text-sm leading-7 text-muted-foreground">“{item.quote}”</p>
              <div className="mt-5 font-semibold text-foreground">{item.name}</div>
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
          <SectionHead
            align="left"
            eyebrow="Visit The Farm"
            title="Find us in Siaya Town."
            sub="We welcome farmers, restaurants and families. Walk-ins welcome during business hours."
          />
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" /> Siaya Town, Siaya County, Kenya
            </li>
            <li className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-primary mt-0.5" /> {SOCIALS.whatsappNumber}
            </li>
            <li className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary mt-0.5" /> {SOCIALS.email}
            </li>
          </ul>
          <div className="mt-6 flex gap-3">
            <a
              href="https://www.google.com/maps?q=Siaya+Town,+Kenya"
              target="_blank"
              rel="noopener noreferrer"
            >
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
    {
      q: "Do you deliver outside Siaya?",
      a: "Yes — we deliver across Siaya, Kisumu and surrounding counties. Bulk orders can be arranged nationwide.",
    },
    {
      q: "Are the chicks vaccinated?",
      a: "All our day-old chicks are vaccinated against Marek's, Newcastle and Gumboro before leaving the farm.",
    },
    {
      q: "What feed do you use?",
      a: "We use certified starter, grower and finisher feeds and supplement with greens for naturally healthy birds.",
    },
    {
      q: "Can I bring my eggs for incubation?",
      a: "Yes. Drop off fertile eggs at the farm; we'll handle the 21-day cycle and notify you on hatch day.",
    },
    {
      q: "Do you offer training?",
      a: "Yes — book a consultation for setup planning, disease prevention or full farm visits.",
    },
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
    setTimeout(() => {
      setSending(false);
      form.reset();
    }, 800);
  };
  return (
    <section id="contact" className="py-20 bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-12">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-gold">Contact</span>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold">
            Talk to the farm owner.
          </h2>
          <p className="mt-3 text-primary-foreground/80 max-w-md">
            Send us a message — we'll respond by WhatsApp or email, usually within an hour.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-gold" /> Siaya Town, Kenya
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-gold" /> {SOCIALS.whatsappNumber}
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gold" /> {SOCIALS.email}
            </li>
          </ul>
          <Socials className="mt-8" />
        </div>
        <form
          onSubmit={onSubmit}
          className="rounded-xl bg-background text-foreground p-6 md:p-8 shadow-[var(--shadow-soft)] space-y-4"
        >
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
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@email.com"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Tell us what you need…"
              className="mt-1"
            />
          </div>
          <Button
            type="submit"
            disabled={sending}
            className="w-full bg-primary hover:bg-primary/90"
          >
            <Send className="h-4 w-4" /> {sending ? "Opening…" : "Send Message"}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Sends via WhatsApp & opens your email app.
          </p>
        </form>
      </div>
    </section>
  );
}

function Socials({ className = "" }: { className?: string }) {
  const Item = ({
    href,
    label,
    children,
  }: {
    href: string;
    label: string;
    children: React.ReactNode;
  }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="h-10 w-10 inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-gold hover:text-gold-foreground transition-colors"
    >
      {children}
    </a>
  );
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Item href={SOCIALS.x} label="X (Twitter)">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M18.244 2H21l-6.52 7.45L22 22h-6.79l-4.78-6.24L4.8 22H2l6.97-7.96L2 2h6.91l4.32 5.71L18.244 2Zm-1.19 18h1.83L7.05 4H5.1l11.954 16Z" />
        </svg>
      </Item>
      <Item href={SOCIALS.instagram} label="Instagram">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
        </svg>
      </Item>
      <Item href={SOCIALS.tiktok} label="TikTok">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M16.5 3a5.5 5.5 0 0 0 4.5 4.5V11a8.4 8.4 0 0 1-4.5-1.4V16a6 6 0 1 1-6-6c.34 0 .67.03 1 .1v3.2a3 3 0 1 0 2 2.7V3h3Z" />
        </svg>
      </Item>
      <Item href={SOCIALS.whatsapp} label="WhatsApp">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M20 12a8 8 0 1 1-15.07-3.7L4 20l3.84-1A8 8 0 0 0 20 12Zm-8-6a6 6 0 0 0-5.13 9.1l-.5 1.84 1.9-.5A6 6 0 1 0 12 6Zm3.4 7.4c-.2-.1-1.16-.57-1.34-.64-.18-.07-.31-.1-.44.1-.13.2-.5.63-.62.76-.11.13-.23.14-.43.05-.2-.1-.84-.31-1.6-1-.6-.53-1-1.18-1.11-1.38-.12-.2-.01-.31.09-.41.09-.09.2-.23.3-.34.1-.11.13-.2.2-.33.07-.13.03-.25-.02-.34-.05-.1-.44-1.06-.6-1.45-.16-.39-.32-.34-.44-.34h-.38c-.13 0-.34.05-.52.25s-.69.67-.69 1.64.71 1.9.81 2.04c.1.13 1.4 2.13 3.39 2.99.47.2.84.32 1.13.41.47.15.9.13 1.24.08.38-.06 1.16-.47 1.32-.93.16-.45.16-.84.11-.93-.05-.09-.18-.15-.38-.25Z" />
        </svg>
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
            <div className="text-background/60">
              © {new Date().getFullYear()} Healthy & Fresh Poultry, Kenya.
            </div>
          </div>
        </div>
        <Socials />
      </div>
    </footer>
  );
}

function SectionHead({
  eyebrow,
  title,
  sub,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "text-center max-w-2xl mx-auto" : ""}>
      <span className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">
        {eyebrow}
      </span>
      <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
    </div>
  );
}
