import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import certificate1 from "@/assets/certificate1.png";
import certificate2 from "@/assets/certificate2.png";
import certificate3 from "@/assets/certificate3.png";

const certificates = [
  { id: 1, image: certificate1, title: "MATLAB Certification" },
  { id: 2, image: certificate2, title: "Deep Learning Certification" },
  { id: 3, image: certificate3, title: "Machine Learning Certification" },
];

const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState<typeof certificates[0] | null>(null);

  return (
    <section id="certificates" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-gradient mb-4">Certificates</h2>
          <p className="text-muted-foreground text-lg">My achievements and recognitions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {certificates.map((cert, idx) => (
            <div
              key={cert.id}
              className="group relative cursor-pointer animate-fade-up rounded-xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 animate-tilt"
              style={{ animationDelay: `${idx * 100}ms` }}
              onClick={() => setSelectedCert(cert)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-xl transition-all duration-300" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-lg font-semibold text-foreground">{cert.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={!!selectedCert} onOpenChange={() => setSelectedCert(null)}>
          <DialogContent className="max-w-7xl p-0 border-0">
            <div className="relative">
              <img
                src={selectedCert?.image || ""}
                alt={selectedCert?.title}
                className="w-full h-auto rounded-lg"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedCert(null)}
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

export default Certificates;
