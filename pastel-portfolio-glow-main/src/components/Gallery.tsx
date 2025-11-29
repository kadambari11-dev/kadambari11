import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import gallery1 from "@/assets/gallery1.jpg";
import gallery2 from "@/assets/gallery2.jpg";
import gallery3 from "@/assets/gallery3.jpg";
import gallery4 from "@/assets/gallery4.jpg";
import gallery5 from "@/assets/gallery5.jpg";

const images = [gallery1, gallery2, gallery3, gallery4, gallery5];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-gradient mb-4">Gallery</h2>
          <p className="text-muted-foreground text-lg">Explore my recent projects</p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          <div
            className="relative overflow-hidden rounded-2xl"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* duplicate images to create a smooth infinite loop */}
            <div
              className="flex gap-4 items-center infinite-scroll"
              style={{ animationPlayState: isPaused ? "paused" : "running" }}
            >
              {[...images, ...images].map((img, idx) => (
                <div key={idx} className="flex-shrink-0 p-2">
                  <img
                    src={img}
                    alt={`Gallery ${idx + 1}`}
                    loading="lazy"
                    draggable={false}
                    onClick={() => setSelectedImage(img)}
                    className="cursor-pointer rounded-lg shadow-card transition-transform duration-300 hover:scale-105 h-[180px] sm:h-[220px] md:h-[260px] lg:h-[300px] w-[280px] sm:w-[320px] md:w-[360px] lg:w-[420px] object-cover"
                  />
                </div>
              ))}
            </div>
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
