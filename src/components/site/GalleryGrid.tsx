import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { X, Play } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

const galleryImages = import.meta.glob("../../assets/gallery/*.jpg", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const galleryImage = (fileName: string) =>
  galleryImages[`../../assets/gallery/${fileName}`];

const photoSet = (photoNumber: number) =>
  ["a", "b", "c"].map((suffix) => galleryImage(`photo-${photoNumber}${suffix}.jpg`));

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  images: string[];
  isVideo?: boolean;
  videoId?: string;
  youtubeUrl?: string;
  badge?: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "photo-1",
    title: "Battery Cage Housing",
    description: "Modern battery cage housing system designed for optimal layer welfare and egg production efficiency. Features well-ventilated compartments and automated feeding systems.",
    images: photoSet(1),
  },
  {
    id: "photo-2",
    title: "Our Layers at 2 Months Old",
    description: "Healthy and vibrant layer chickens at 2 months of age. At this stage, they show excellent feather development and strong body composition, preparing them for productive laying cycles.",
    images: photoSet(2),
  },
  {
    id: "photo-3",
    title: "Barred Plymouth Rock Rooster",
    description: "A magnificent Barred Plymouth Rock rooster displaying the breed's distinctive black and white barred plumage. Known for their friendly temperament and excellent laying traits in hens.",
    images: photoSet(3),
  },
  {
    id: "photo-4",
    title: "Turken & Isa Brown Roosters",
    description: "Featuring a striking Turken (Naked Neck) rooster alongside an Isa Brown rooster. The Turken's unique featherless neck gives it superior heat dissipation, while Isa Browns are renowned for exceptional egg production.",
    images: photoSet(4),
  },
  {
    id: "photo-5",
    title: "White Leghorn",
    description: "The elegant White Leghorn breed, one of the most prolific egg layers in the world. These birds are known for their energy, alertness, and ability to produce up to 300+ eggs per year.",
    images: photoSet(5),
  },
  {
    id: "photo-6",
    title: "White Holland Turkey",
    description: "A beautiful White Holland Turkey, prized for its pure white plumage and tender meat. These turkeys grow rapidly and are ideal for family gatherings and restaurant supply.",
    images: photoSet(6),
  },
  {
    id: "photo-7",
    title: "Helmeted Guinea Fowls",
    description: "Our flock of Helmeted Guinea Fowls with their characteristic helmet-like casques and spotted plumage. These birds are excellent for tick and pest control while providing nutritious meat and eggs.",
    images: photoSet(7),
  },
  {
    id: "photo-8",
    title: "Hybrid Rooster",
    description: "A robust hybrid rooster bred for superior performance and hardiness. These roosters combine the best traits from multiple breeds for improved meat quality and disease resistance.",
    images: photoSet(8),
  },
  {
    id: "photo-9",
    title: "Malay Chicken",
    description: "Did you know? The Malay chicken is one of the largest and heaviest chicken breeds, originally from Southeast Asia. They are known for their powerful physique, long legs, and aggressive behavior. Malays are primarily ornamental but also produce excellent meat quality.",
    images: photoSet(9),
    badge: "Did You Know?",
  },
  {
    id: "photo-10",
    title: "Brahma Chickens",
    description: "Our impressive flock of Brahma chickens, one of the giant chicken breeds. These gentle giants feature feathered legs and feet, excellent brooding abilities, and can weigh over 3.5 kg when fully grown.",
    images: photoSet(10),
  },
  {
    id: "photo-11",
    title: "Light Brahma Variety",
    description: "The Light Brahma variety showcases the elegant contrast of white and black feathering. These massive birds have exceptional temperament, making them perfect for family farms. They're cold-hardy, broody, and excellent mothers, capable of hatching and raising large numbers of chicks.",
    images: photoSet(11),
  },
  {
    id: "photo-12",
    title: "Rhode Island Red",
    description: "A robust Rhode Island Red chicken from our premium flock. This breed is legendary for exceptional egg production and meat quality. Known for their deep red plumage, hardiness, and ability to adapt to various climates.",
    images: photoSet(12),
  },
  {
    id: "photo-13",
    title: "Our Layers Feeding",
    description: "Our layer flock enjoying their premium feed. Proper nutrition is crucial for optimal egg production and bird health. We provide balanced, high-quality feed tailored to support consistent egg yield and strong immune systems.",
    images: photoSet(13),
  },
  {
    id: "photo-14",
    title: "White Leghorn Cross Rooster",
    description: "A stunning White Leghorn cross rooster displaying the breed's characteristic alert posture and pristine white plumage. These roosters are spirited, active, and known for their vigilance and protective nature.",
    images: photoSet(14),
  },
  {
    id: "photo-15",
    title: "Incubation & Hatchery",
    description: "Our state-of-the-art incubation and hatchery facility where we carefully manage temperature, humidity, and ventilation for optimal chick development. Watch fresh chicks hatch daily from fertile eggs collected from healthy parent flocks.",
    images: photoSet(15),
  },
];

const VIDEOS: GalleryItem[] = [
  {
    id: "video-1",
    title: "Our Layers Feeding",
    description: "Watch our healthy layer flock enjoying their premium feed. This video showcases their vitality and appetite, reflecting the quality care we provide daily.",
    images: [galleryImage("photo-13a.jpg")],
    isVideo: true,
    videoId: "WRq6jBOBXQ0",
    youtubeUrl: "https://youtube.com/shorts/WRq6jBOBXQ0?feature=share",
  },
  {
    id: "video-2",
    title: "Layers Stock",
    description: "Comprehensive view of our productive layer stock in their housing environment. See how we maintain optimal conditions for consistent egg production.",
    images: [galleryImage("photo-2a.jpg")],
    isVideo: true,
    videoId: "3Uk0JeY1it0",
    youtubeUrl: "https://youtu.be/3Uk0JeY1it0",
  },
  {
    id: "video-3",
    title: "Light Brahma Feeding",
    description: "Our magnificent Light Brahma chickens enjoying feeding time. See their size and gentle nature as they feast on quality nutrition.",
    images: [galleryImage("photo-11a.jpg")],
    isVideo: true,
    videoId: "AX0g4zfIYGM",
    youtubeUrl: "https://youtube.com/shorts/AX0g4zfIYGM?feature=share",
  },
  {
    id: "video-4",
    title: "Helmeted Guinea Fowl",
    description: "Watch our flock of Helmeted Guinea Fowls in action. These birds are excellent foragers and pest controllers, adding value to any farm.",
    images: [galleryImage("photo-7a.jpg")],
    isVideo: true,
    videoId: "BIZ1dX09jZM",
    youtubeUrl: "https://youtube.com/shorts/BIZ1dX09jZM?feature=share",
  },
];

export function GalleryGrid() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col gap-3 text-center mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Gallery
          </h2>
          <p className="mx-auto max-w-3xl font-display text-3xl font-bold text-foreground md:text-4xl">
            See our farm through pictures and video.
          </p>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
            Explore our diverse poultry breeds, modern facilities, and farm operations through our photo and video gallery.
          </p>
        </div>

        {/* Photo Gallery Grid */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-foreground mb-8">Photo Gallery</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {GALLERY_ITEMS.map((item) => (
              <GalleryCard
                key={item.id}
                item={item}
                onClick={() => {
                  setSelectedItem(item);
                  setCurrentImageIndex(0);
                }}
              />
            ))}
          </div>
        </div>

        {/* Video Gallery Grid */}
        <div>
          <h3 className="text-2xl font-semibold text-foreground mb-8">Video Gallery</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {VIDEOS.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onClick={() => {
                  setSelectedItem(video);
                  setCurrentImageIndex(0);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Full Screen Modal */}
      {selectedItem && (
        <GalleryModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          currentImageIndex={currentImageIndex}
          onImageIndexChange={setCurrentImageIndex}
        />
      )}
    </section>
  );
}

interface GalleryCardProps {
  item: GalleryItem;
  onClick: () => void;
}

function GalleryCard({ item, onClick }: GalleryCardProps) {
  const [currentImage, setCurrentImage] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % item.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [item.images.length]);

  return (
    <button
      onClick={onClick}
      className="group overflow-hidden rounded-[2rem] border border-border bg-card shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-left"
    >
      <div className="relative h-72 overflow-hidden bg-slate-900/10">
        {item.images.map((image, idx) => (
          <img
            key={idx}
            src={image}
            alt={`${item.title} - ${idx + 1}`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              currentImage === idx ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {item.images.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all ${
                currentImage === idx ? "w-6 bg-white" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground text-lg">{item.title}</h3>
          {item.badge && (
            <span className="inline-flex items-center rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-amber-600 flex-shrink-0">
              {item.badge}
            </span>
          )}
        </div>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{item.description}</p>
        <div className="mt-4 flex items-center gap-2 text-xs text-primary font-semibold">
          View Details
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </div>
      </div>
    </button>
  );
}

interface VideoCardProps {
  video: GalleryItem;
  onClick: () => void;
}

function VideoCard({ video, onClick }: VideoCardProps) {
  return (
    <button
      onClick={onClick}
      className="group overflow-hidden rounded-[2rem] border border-border bg-card shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-left"
    >
      <div className="relative h-72 overflow-hidden bg-slate-900/10">
        <img
          src={video.images[0]}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-all transform group-hover:scale-110">
            <Play className="h-8 w-8 text-white fill-white" />
          </div>
        </div>
      </div>
      <div className="p-5">
        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          <Play className="h-3 w-3" /> Video
        </span>
        <h3 className="mt-4 font-semibold text-foreground text-lg">{video.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{video.description}</p>
        <div className="mt-4 flex items-center gap-2 text-xs text-primary font-semibold">
          Watch Now
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </div>
      </div>
    </button>
  );
}

interface GalleryModalProps {
  item: GalleryItem;
  onClose: () => void;
  currentImageIndex: number;
  onImageIndexChange: (index: number) => void;
}

function GalleryModal({
  item,
  onClose,
  currentImageIndex,
  onImageIndexChange,
}: GalleryModalProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-4xl max-h-screen bg-background rounded-[2rem] overflow-hidden shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex items-center justify-center h-10 w-10 rounded-full bg-background/80 hover:bg-background transition-colors border border-border"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="grid md:grid-cols-[1fr_400px] h-full">
          {/* Main content */}
          <div>
            {item.isVideo ? (
              <YouTubeEmbed videoId={item.videoId!} title={item.title} />
            ) : (
              <Carousel
                opts={{ loop: true }}
                plugins={[plugin.current]}
                setApi={(api) => {
                  if (api) {
                    api.on("select", () => {
                      onImageIndexChange(api.selectedIndex);
                    });
                  }
                }}
                className="h-full"
              >
                <CarouselContent className="h-full">
                  {item.images.map((image, idx) => (
                    <CarouselItem key={idx} className="h-full">
                      <div className="flex items-center justify-center h-96 md:h-screen bg-slate-900/10">
                        <img
                          src={image}
                          alt={`${item.title} - ${idx + 1}`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            )}
          </div>

          {/* Details sidebar */}
          <div className="flex flex-col justify-between p-6 bg-muted/40 border-l border-border overflow-y-auto max-h-screen">
            <div>
              <div className="flex items-start gap-3 mb-6">
                <div>
                  {item.badge && (
                    <span className="inline-flex items-center rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-amber-600 mb-2">
                      {item.badge}
                    </span>
                  )}
                  <h2 className="text-2xl font-bold text-foreground">{item.title}</h2>
                </div>
              </div>

              <div className="prose prose-sm max-w-none text-muted-foreground">
                <p className="text-base leading-7">{item.description}</p>
              </div>

              {!item.isVideo && (
                <div className="mt-8">
                  <h3 className="font-semibold text-foreground mb-3">Photos ({item.images.length})</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {item.images.map((image, idx) => (
                      <button
                        key={idx}
                        onClick={() => onImageIndexChange(idx)}
                        className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          currentImageIndex === idx
                            ? "border-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {item.youtubeUrl && (
              <Button
                variant="outline"
                className="w-full mt-6"
                onClick={() => window.open(item.youtubeUrl, "_blank")}
              >
                Watch on YouTube
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
}

function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  return (
    <div className="w-full h-96 md:h-screen flex items-center justify-center bg-black">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
}
