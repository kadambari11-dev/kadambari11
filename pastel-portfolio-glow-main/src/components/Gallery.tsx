import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import gallery1 from "@/assets/gallery1.jpg";
import gallery2 from "@/assets/gallery2.jpg";
import gallery3 from "@/assets/gallery3.jpg";
import gallery4 from "@/assets/gallery4.jpg";
import gallery5 from "@/assets/gallery5.jpg";

const images = [gallery1, gallery2, gallery3, gallery4, gallery5];

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [orientations, setOrientations] = useState<Record<number, "portrait" | "landscape">>({});

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-gradient mb-4">Gallery</h2>
          <p className="text-muted-foreground text-lg">Explore my recent projects</p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          <div className="relative overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 "
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className={`min-w-full relative flex items-center justify-center ${
                    orientations[idx] === "portrait" ? "bg-black/6" : ""
                  }`}
                  style={{ transition: "background-color .2s" }}
                >
                  <img
                    src={img}
                    alt={`Gallery ${idx + 1}`}
                    onLoad={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      setOrientations((prev) => ({
                        ...prev,
                        [idx]: target.naturalHeight > target.naturalWidth ? "portrait" : "landscape",
                      }));
                    }}
                    loading="lazy"
                    draggable={false}
                    className={`cursor-pointer transition-all duration-300 ${idx === currentIndex ? "animate-pop" : ""} ${
                      orientations[idx] === "portrait"
                        ? "w-auto max-h-[600px] object-contain px-4"
                        : "w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover"
                    }`}
                    onClick={() => setSelectedImage(img)}
                  />
                  {idx === currentIndex && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/12 to-transparent pointer-events-none" />
                  )}
                </div>
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/25 hover:bg-black/35"
            >
              <ChevronLeft size={24} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/25 hover:bg-black/35"
            >
              <ChevronRight size={24} />
            </Button>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "bg-primary w-8" : "bg-primary/30"
                }`}
              />
            ))}
          </div>
        </div>

        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-7xl p-0 border-0">
            <div className="relative">
              <img
                src={selectedImage || ""}
                alt="Enlarged"
                className="block mx-auto max-h-[calc(100vh-6rem)] w-auto object-contain rounded-lg"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-background/80 hover:bg-background/90"
              >
                <X size={24} />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Gallery;
